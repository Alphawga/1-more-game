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

// Schema for category creation and updating
const categorySchema = z.object({
  name: z.string().min(2, 'Category name must be at least 2 characters'),
  slug: z.string().min(2, 'Slug must be at least 2 characters').regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().optional(),
  image: z.string().url('Image must be a valid URL').optional().nullable(),
  isActive: z.boolean().default(true),
  parentId: z.string().optional().nullable(),
});

export const categoryRouter = router({
  // Public procedures - available to all users
  getAll: publicProcedure
    .input(
      z.object({
        includeInactive: z.boolean().optional().default(false),
        includeProducts: z.boolean().optional().default(false),
      })
    )
    .query(async ({ input }) => {
      const { includeInactive, includeProducts } = input;

      // Build filter conditions
      const where: any = {};
      
      if (!includeInactive) {
        where.isActive = true;
      }

      // Query categories
      const categories = await prisma.category.findMany({
        where,
        include: {
          children: true,
          products: includeProducts,
        },
        orderBy: { name: 'asc' },
      });

      return categories;
    }),

  getById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input }) => {
      const category = await prisma.category.findUnique({
        where: { id: input.id },
        include: {
          children: true,
          parent: true,
          products: {
            where: { isActive: true },
            include: {
              promotions: {
                include: {
                  promotion: true,
                },
              },
            },
          },
        },
      });

      if (!category) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Category not found',
        });
      }

      return category;
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      const category = await prisma.category.findUnique({
        where: { slug: input.slug },
        include: {
          children: true,
          parent: true,
          products: {
            where: { isActive: true },
            include: {
              promotions: {
                include: {
                  promotion: true,
                },
              },
            },
          },
        },
      });

      if (!category) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Category not found',
        });
      }

      return category;
    }),

  // Get categories for sidebar navigation (hierarchical)
  getNavigation: publicProcedure.query(async () => {
    // Get all active root categories (no parent)
    const rootCategories = await prisma.category.findMany({
      where: {
        isActive: true,
        parentId: null,
      },
      include: {
        children: {
          where: { isActive: true },
          include: {
            children: {
              where: { isActive: true },
            },
          },
        },
      },
      orderBy: { name: 'asc' },
    });

    return rootCategories;
  }),

  // Admin procedures - only available to admins
  create: adminProcedure
    .input(categorySchema)
    .mutation(async ({ input }) => {
      // Check if slug already exists
      const existingCategory = await prisma.category.findUnique({
        where: { slug: input.slug },
      });

      if (existingCategory) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'A category with this slug already exists',
        });
      }

      // If parent ID is provided, check if parent exists
      if (input.parentId) {
        const parentCategory = await prisma.category.findUnique({
          where: { id: input.parentId },
        });

        if (!parentCategory) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'Parent category not found',
          });
        }
      }

      // Create the category
      const category = await prisma.category.create({
        data: input,
      });

      return category;
    }),

  update: adminProcedure
    .input(
      z.object({
        id: z.string(),
        data: categorySchema.partial(),
      })
    )
    .mutation(async ({ input }) => {
      const { id, data } = input;

      // Check if category exists
      const existingCategory = await prisma.category.findUnique({
        where: { id },
        include: { children: true },
      });

      if (!existingCategory) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Category not found',
        });
      }

      // If slug is changing, check if the new slug is already in use
      if (data.slug && data.slug !== existingCategory.slug) {
        const slugExists = await prisma.category.findUnique({
          where: { slug: data.slug },
        });

        if (slugExists) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'A category with this slug already exists',
          });
        }
      }

      // Check for circular reference in parent-child relationship
      if (data.parentId) {
        // Cannot set parent to self
        if (data.parentId === id) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'A category cannot be its own parent',
          });
        }

        // Cannot set parent to one of its own children (would create circular reference)
        const isChildCategory = async (parentId: string, potentialChildId: string): Promise<boolean> => {
          if (parentId === potentialChildId) return true;
          
          const children = await prisma.category.findMany({
            where: { parentId },
            select: { id: true },
          });
          
          for (const child of children) {
            if (await isChildCategory(child.id, potentialChildId)) {
              return true;
            }
          }
          
          return false;
        };

        if (await isChildCategory(id, data.parentId)) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Cannot create circular reference in category hierarchy',
          });
        }
      }

      // Update the category
      const updatedCategory = await prisma.category.update({
        where: { id },
        data,
      });

      return updatedCategory;
    }),

  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input }) => {
      // Check if category exists
      const existingCategory = await prisma.category.findUnique({
        where: { id: input.id },
        include: { 
          children: true,
          products: true
        },
      });

      if (!existingCategory) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'Category not found',
        });
      }

      // Check if category has children
      if (existingCategory.children.length > 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Cannot delete a category with child categories',
        });
      }

      // Check if category has products
      if (existingCategory.products.length > 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Cannot delete a category with products',
        });
      }

      // Delete the category
      await prisma.category.delete({
        where: { id: input.id },
      });

      return { success: true };
    }),
}); 