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

// Schema for product creation and updating
const productSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string(),
  price: z.number().positive('Price must be positive'),
  salePrice: z.number().positive('Sale price must be positive').optional().nullable(),
  image: z.string().url('Image must be a valid URL').optional().nullable(),
  images: z.array(z.string().url('Image URL must be valid')).optional(),
  stock: z.number().int().nonnegative('Stock cannot be negative').default(0),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  sku: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  regionCodes: z.array(z.string()).default([]),
});

export const productRouter = router({
  // Public procedures - available to all users
  getAll: publicProcedure
    .input(
      z.object({
        limit: z.number().min(1).max(100).optional().default(10),
        cursor: z.string().optional(),
        search: z.string().optional(),
        categoryId: z.string().optional(),
        featured: z.boolean().optional(),
        minPrice: z.number().optional(),
        maxPrice: z.number().optional(),
        tags: z.array(z.string()).optional(),
        regionCode: z.string().optional(),
      })
    )
    .query(async ({ input }) => {
      const { 
        limit, 
        cursor, 
        search, 
        categoryId, 
        featured, 
        minPrice, 
        maxPrice,
        tags,
        regionCode
      } = input;

      // Build filter conditions
      const where: any = {
        isActive: true,
      };

      if (search) {
        where.OR = [
          { name: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
          { tags: { has: search } },
        ];
      }

      if (categoryId) {
        where.categoryId = categoryId;
      }

      if (featured) {
        where.isFeatured = featured;
      }

      if (minPrice !== undefined) {
        where.price = { ...(where.price || {}), gte: minPrice };
      }

      if (maxPrice !== undefined) {
        where.price = { ...(where.price || {}), lte: maxPrice };
      }

      if (tags && tags.length > 0) {
        where.tags = { hasSome: tags };
      }
      
      if (regionCode) {
        where.regionCodes = { has: regionCode };
      }

      // Get one more item for pagination cursor
      const products = await prisma.product.findMany({
        take: limit + 1,
        where,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: 'desc' },
        include: {
          category: true,
          promotions: {
            include: {
              promotion: true,
            },
          },
        },
      });

      // Check if we have a next page
      let nextCursor: string | null = null;
      if (products.length > limit) {
        const nextItem = products.pop();
        nextCursor = nextItem!.id;
      }

      return {
        products,
        nextCursor,
      };
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const product = await prisma.product.findUnique({
        where: { id: input.id },
        include: {
          category: true,
          promotions: {
            include: {
              promotion: true,
            },
          },
          reviews: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  avatar: true,
                },
              },
            },
          },
        },
      });

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        });
      }

      return product;
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const product = await prisma.product.findUnique({
        where: { slug: input.slug },
        include: {
          category: true,
          promotions: {
            include: {
              promotion: true,
            },
          },
          reviews: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  avatar: true,
                },
              },
            },
          },
        },
      });

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        });
      }

      return product;
    }),

  // Admin procedures - only available to admins
  create: adminProcedure
    .input(productSchema)
    .mutation(async ({ input }) => {
      // Check if slug already exists
      const existingProduct = await prisma.product.findUnique({
        where: { slug: input.slug },
      });

      if (existingProduct) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'A product with this slug already exists',
        });
      }

      // Create the product
      const product = await prisma.product.create({
        data: {
          ...input,
          images: input.images || [],
          tags: input.tags || [],
          regionCodes: input.regionCodes || [],
        },
      });

      return product;
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        data: productSchema.partial(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, data } = input;

      // Check if product exists
      const existingProduct = await prisma.product.findUnique({
        where: { id },
      });

      if (!existingProduct) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        });
      }

      // If slug is changing, check if the new slug is already in use
      if (data.slug && data.slug !== existingProduct.slug) {
        const slugExists = await prisma.product.findUnique({
          where: { slug: data.slug },
        });

        if (slugExists) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'A product with this slug already exists',
          });
        }
      }

      // Update the product
      const updatedProduct = await prisma.product.update({
        where: { id },
        data,
      });

      return updatedProduct;
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      // Check if product exists
      const existingProduct = await prisma.product.findUnique({
        where: { id: input.id },
      });

      if (!existingProduct) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        });
      }

      // Delete the product
      await prisma.product.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
}); 