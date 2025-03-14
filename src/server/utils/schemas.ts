import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

// Common schema parts
export const slugSchema = z.string()
  .min(2, 'Slug must be at least 2 characters')
  .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens');

export const imageSchema = z.string()
  .url('Image must be a valid URL')
  .optional()
  .nullable();

export const dateRangeSchema = z.object({
  startDate: z.string().or(z.date()),
  endDate: z.string().or(z.date()),
}).refine(
  (data) => new Date(data.endDate) > new Date(data.startDate),
  { message: 'End date must be after start date' }
);

// Pagination and filtering
export const paginationSchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().min(1).max(100).optional().default(10),
});

export const searchSchema = z.object({
  search: z.string().optional(),
});

export const activeFilterSchema = z.object({
  includeInactive: z.boolean().optional().default(false),
});

export const validateSlugUniqueness = async (
  prisma: PrismaClient,
  model: 'product' | 'category',
  slug: string,
  excludeId?: string
) => {
  const where = {
    slug,
    ...(excludeId ? { NOT: { id: excludeId } } : {}),
  };

  const modelClient = prisma[model] as unknown as {
    findFirst: (args: { where: { slug: string; NOT?: { id: string } } }) => Promise<{ id: string } | null>
  };
  const existing = await modelClient.findFirst({ where });
  if (existing) {
    throw new Error(`A ${model} with this slug already exists`);
  }
}; 