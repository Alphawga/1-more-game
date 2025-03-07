import { router, publicProcedure, middleware } from '../trpc';
import { z } from 'zod';
import { prisma } from '../db';
import { TRPCError } from '@trpc/server';

// Middleware to check admin role
const isAdmin = middleware(async ({ ctx, next }) => {
  // Check if user is authenticated and has admin role
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'You must be logged in to access this resource',
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: ctx.session.user.id },
    select: { role: true },
  });

  if (!user || (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN')) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'You do not have permission to access this resource',
    });
  }

  return next({
    ctx: {
      ...ctx,
      user: {
        ...ctx.session.user,
        role: user.role,
      },
    },
  });
});

// Create an admin-only procedure
const adminProcedure = publicProcedure.use(isAdmin);

// Schema for promotion creation and updating
const promotionSchema = z.object({
  name: z.string().min(2, 'Promotion name must be at least 2 characters'),
  description: z.string().optional(),
  discountType: z.enum(['PERCENTAGE', 'FIXED', 'BUY_X_GET_Y', 'BUNDLE']),
  discountValue: z.number().positive('Discount value must be positive'),
  code: z.string().optional().nullable(),
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()),
  isActive: z.boolean().default(true),
});

export const promotionRouter = router({
  // Public procedures - available to all users
  getActive: publicProcedure
    .query(async () => {
      const now = new Date();
      
      // Get all active promotions
      const promotions = await prisma.promotion.findMany({
        where: {
          isActive: true,
          startDate: { lte: now },
          endDate: { gte: now },
        },
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      });

      return promotions;
    }),

  // Get active promotions for a specific product
  getByProductId: publicProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ input }) => {
      const now = new Date();
      
      // Get active promotions for the product
      const productPromotions = await prisma.productPromotion.findMany({
        where: {
          productId: input.productId,
          promotion: {
            isActive: true,
            startDate: { lte: now },
            endDate: { gte: now },
          },
        },
        include: {
          promotion: true,
        },
      });

      return productPromotions.map(pp => pp.promotion);
    }),

  // Admin procedures - only available to admins
  getAll: adminProcedure
    .input(
      z.object({
        includeInactive: z.boolean().optional().default(false),
        includeExpired: z.boolean().optional().default(false),
      })
    )
    .query(async ({ input }) => {
      const { includeInactive, includeExpired } = input;
      const now = new Date();
      
      // Build filter conditions
      const where: any = {};
      
      if (!includeInactive) {
        where.isActive = true;
      }
      
      if (!includeExpired) {
        where.endDate = { gte: now };
      }

      // Query promotions
      const promotions = await prisma.promotion.findMany({
        where,
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
        orderBy: { endDate: 'asc' },
      });

      return promotions;
    }),

  getById: adminProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const promotion = await prisma.promotion.findUnique({
        where: { id: input.id },
        include: {
          products: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!promotion) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Promotion not found',
        });
      }

      return promotion;
    }),

  create: adminProcedure
    .input(
      promotionSchema.extend({
        productIds: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { productIds, ...promotionData } = input;
      
      // Check if code already exists if provided
      if (promotionData.code) {
        const existingPromotion = await prisma.promotion.findUnique({
          where: { code: promotionData.code },
        });

        if (existingPromotion) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'A promotion with this code already exists',
          });
        }
      }

      // Ensure that startDate and endDate are valid dates
      const startDate = new Date(promotionData.startDate);
      const endDate = new Date(promotionData.endDate);
      
      // Validate that endDate is after startDate
      if (endDate <= startDate) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'End date must be after start date',
        });
      }

      // Create promotion
      const promotion = await prisma.promotion.create({
        data: {
          ...promotionData,
          startDate,
          endDate,
        },
      });

      // If productIds are provided, link products to the promotion
      if (productIds && productIds.length > 0) {
        const productPromotions = productIds.map(productId => ({
          productId,
          promotionId: promotion.id,
        }));

        await prisma.productPromotion.createMany({
          data: productPromotions,
        });
      }

      return promotion;
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        data: promotionSchema.partial(),
        productIds: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, data, productIds } = input;

      // Check if promotion exists
      const existingPromotion = await prisma.promotion.findUnique({
        where: { id },
      });

      if (!existingPromotion) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Promotion not found',
        });
      }

      // If code is changing, check if the new code is already in use
      if (data.code && data.code !== existingPromotion.code) {
        const codeExists = await prisma.promotion.findUnique({
          where: { code: data.code },
        });

        if (codeExists) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'A promotion with this code already exists',
          });
        }
      }

      // Prepare date updates if provided
      const updateData: any = { ...data };
      
      if (data.startDate) {
        updateData.startDate = new Date(data.startDate);
      }
      
      if (data.endDate) {
        updateData.endDate = new Date(data.endDate);
      }
      
      // Validate dates if both are being updated
      if (updateData.startDate && updateData.endDate) {
        if (updateData.endDate <= updateData.startDate) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'End date must be after start date',
          });
        }
      } else if (updateData.startDate && !updateData.endDate) {
        // Validate with existing end date
        if (new Date(existingPromotion.endDate) <= updateData.startDate) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'End date must be after start date',
          });
        }
      } else if (!updateData.startDate && updateData.endDate) {
        // Validate with existing start date
        if (updateData.endDate <= new Date(existingPromotion.startDate)) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'End date must be after start date',
          });
        }
      }

      // Update the promotion
      const updatedPromotion = await prisma.promotion.update({
        where: { id },
        data: updateData,
      });

      // If productIds are provided, update product associations
      if (productIds !== undefined) {
        // First delete all existing product associations
        await prisma.productPromotion.deleteMany({
          where: { promotionId: id },
        });

        // Then create new ones if array is not empty
        if (productIds.length > 0) {
          const productPromotions = productIds.map(productId => ({
            productId,
            promotionId: id,
          }));

          await prisma.productPromotion.createMany({
            data: productPromotions,
          });
        }
      }

      return updatedPromotion;
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      // Check if promotion exists
      const existingPromotion = await prisma.promotion.findUnique({
        where: { id: input.id },
      });

      if (!existingPromotion) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Promotion not found',
        });
      }

      // Delete product associations first
      await prisma.productPromotion.deleteMany({
        where: { promotionId: input.id },
      });

      // Delete the promotion
      await prisma.promotion.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
}); 