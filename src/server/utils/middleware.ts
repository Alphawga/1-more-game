import { middleware } from '../trpc';
import { TRPCError } from '@trpc/server';
import { prisma } from '../db';

export const isAdmin = middleware(async ({ ctx, next }) => {
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