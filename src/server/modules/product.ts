import { router, publicProcedure } from '../trpc';
import { z } from 'zod';
import { prisma } from '../db';
import { TRPCError } from '@trpc/server';
import { Prisma } from '@prisma/client';
import { isAdmin } from '../utils/middleware';
import { 
  slugSchema, 
  imageSchema, 
  paginationSchema,
  searchSchema,
  validateSlugUniqueness 
} from '../utils/schemas';

// Create an admin-only procedure
const adminProcedure = publicProcedure.use(isAdmin);

// Schema for product creation and updating
const productSchema = z.object({
  name: z.string().min(2, 'Product name must be at least 2 characters'),
  slug: slugSchema,
  description: z.string(),
  price: z.number().positive('Price must be positive'),
  salePrice: z.number().positive('Sale price must be positive').optional().nullable(),
  image: imageSchema,
  images: z.array(z.string().url('Image URL must be valid')).optional(),
  stock: z.number().int().nonnegative('Stock cannot be negative').default(0),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
  sku: z.string().optional().nullable(),
  categoryId: z.string().optional().nullable(),
  tags: z.array(z.string()).default([]),
  regionCodes: z.array(z.string()).default([]),
});

// Input schema for product listing
const productListSchema = z.object({
  ...paginationSchema.shape,
  ...searchSchema.shape,
  categoryId: z.string().optional(),
  isActive: z.boolean().optional(),
  featured: z.boolean().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  tags: z.array(z.string()).optional(),
  regionCode: z.string().optional(),
});

export const productRouter = router({
  // Public procedures - available to all users
  getAll: publicProcedure
    .input(productListSchema)
    .query(async ({ input }) => {
      const { 
        limit,
        page,
        search, 
        categoryId,
        isActive,
        featured, 
        minPrice, 
        maxPrice,
        tags,
        regionCode
      } = input;

      // Build filter conditions
      const where: Prisma.ProductWhereInput = {};

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

      if (isActive !== undefined) {
        where.isActive = isActive;
      }

      if (featured) {
        where.isFeatured = featured;
      }

      if (minPrice !== undefined || maxPrice !== undefined) {
        where.price = {
          ...(minPrice !== undefined ? { gte: minPrice } : {}),
          ...(maxPrice !== undefined ? { lte: maxPrice } : {})
        } as Prisma.FloatFilter;
      }

      if (tags && tags.length > 0) {
        where.tags = { hasSome: tags };
      }
      
      if (regionCode) {
        where.regionCodes = { has: regionCode };
      }

      const skip = (page - 1) * limit;

      // Get products with pagination
      const [products, total] = await Promise.all([
        prisma.product.findMany({
          take: limit,
          skip,
          where,
          orderBy: { createdAt: 'desc' },
          include: {
            category: true,
          },
        }),
        prisma.product.count({ where }),
      ]);

      return {
        products,
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
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

  create: adminProcedure
    .input(productSchema)
    .mutation(async ({ input }) => {
      await validateSlugUniqueness(prisma, 'product', input.slug);
      return prisma.product.create({ data: input });
    }),

  update: adminProcedure
    .input(z.object({
      id: z.string(),
      data: productSchema.partial(),
    }))
    .mutation(async ({ input }) => {
      const { id, data } = input;
      if (data.slug) {
        await validateSlugUniqueness(prisma, 'product', data.slug, id);
      }
      return prisma.product.update({ where: { id }, data });
    }),

  updateStatus: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const product = await prisma.product.findUnique({
        where: { id: input.id },
        select: { isActive: true },
      });

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        });
      }

      return prisma.product.update({
        where: { id: input.id },
        data: { isActive: !product.isActive },
      });
    }),

  updateFeatured: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const product = await prisma.product.findUnique({
        where: { id: input.id },
        select: { isFeatured: true },
      });

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        });
      }

      return prisma.product.update({
        where: { id: input.id },
        data: { isFeatured: !product.isFeatured },
      });
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      const product = await prisma.product.findUnique({
        where: { id: input.id },
      });

      if (!product) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Product not found',
        });
      }

      await prisma.product.delete({ where: { id: input.id } });
      return { success: true };
    }),
}); 