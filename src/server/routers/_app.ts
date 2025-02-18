import { router } from '../trpc';
import { authRouter } from '../modules/auth';

export const appRouter = router({
  auth: authRouter,
});

export type AppRouter = typeof appRouter; 