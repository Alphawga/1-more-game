import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '../db';
import { TRPCError } from '@trpc/server';
import { isAdmin } from '../utils/middleware';
import { dateRangeSchema, activeFilterSchema } from '../utils/schemas';
import { Prisma } from '@prisma/client';

// Create an admin-only procedure
const adminProcedure = publicProcedure.use(isAdmin);

// Schema for promotion creation and updating
const promotionSchema = z.object({
  name: z.string().min(2, 'Promotion name must be at least 2 characters'),
  description: z.string().optional(),
  discountType: z.enum(['PERCENTAGE', 'FIXED', 'BUY_X_GET_Y', 'BUNDLE']),
  discountValue: z.number().positive('Discount value must be positive'),
  code: z.string().optional().nullable(),
  ...dateRangeSchema.shape,
  isActive: z.boolean().default(true),
});

export const promotionRouter = router({
  // Public procedures - available to all users
  getActive: publicProcedure
    .query(async () => {
      const now = new Date();
      
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

  getByProductId: publicProcedure
    .input(z.object({ productId: z.string() }))
    .query(async ({ input }) => {
      const now = new Date();
      
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

  // Admin procedures
  getAll: adminProcedure
    .input(z.object({
      ...activeFilterSchema.shape,
      includeExpired: z.boolean().optional().default(false),
    }))
    .query(async ({ input }) => {
      const { includeInactive, includeExpired } = input;
      const now = new Date();
      
      const where: Prisma.PromotionWhereInput = {};
      
      if (!includeInactive) {
        where.isActive = true;
      }
      
      if (!includeExpired) {
        where.endDate = { gte: now };
      }

      return prisma.promotion.findMany({
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
    }),

  create: adminProcedure
    .input(promotionSchema.extend({
      productIds: z.array(z.string()).optional(),
    }))
    .mutation(async ({ input }) => {
      const { productIds, ...promotionData } = input;
      
      // Check if code already exists if provided
      if (promotionData.code) {
        const existing = await prisma.promotion.findUnique({
          where: { code: promotionData.code },
        });

        if (existing) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'A promotion with this code already exists',
          });
        }
      }

      const promotion = await prisma.promotion.create({
        data: {
          ...promotionData,
          startDate: new Date(promotionData.startDate),
          endDate: new Date(promotionData.endDate),
        },
      });

      if (productIds?.length) {
        await prisma.productPromotion.createMany({
          data: productIds.map(productId => ({
            productId,
            promotionId: promotion.id,
          })),
        });
      }

      return promotion;
    }),

  update: adminProcedure
    .input(z.object({
      id: z.string(),
      data: promotionSchema.partial(),
      productIds: z.array(z.string()).optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, data, productIds } = input;

      const existing = await prisma.promotion.findUnique({
        where: { id },
      });

      if (!existing) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Promotion not found',
        });
      }

      if (data.code && data.code !== existing.code) {
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

      const updateData = {
        ...data,
        ...(data.startDate && { startDate: new Date(data.startDate) }),
        ...(data.endDate && { endDate: new Date(data.endDate) }),
      };

      const [updatedPromotion] = await prisma.$transaction([
        prisma.promotion.update({
          where: { id },
          data: updateData,
        }),
        ...(productIds !== undefined ? [
          prisma.productPromotion.deleteMany({
            where: { promotionId: id },
          }),
          ...(productIds.length > 0 ? [
            prisma.productPromotion.createMany({
              data: productIds.map(productId => ({
                productId,
                promotionId: id,
              })),
            }),
          ] : []),
        ] : []),
      ]);

      return updatedPromotion;
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const promotion = await prisma.promotion.findUnique({
        where: { id: input.id },
      });

      if (!promotion) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Promotion not found',
        });
      }

      await prisma.$transaction([
        prisma.productPromotion.deleteMany({
          where: { promotionId: input.id },
        }),
        prisma.promotion.delete({
          where: { id: input.id },
        }),
      ]);

      return { success: true };
    }),
}); 