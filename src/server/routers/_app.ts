import { router } from '../trpc';
import { authRouter } from '../modules/auth';
import { productRouter } from '../modules/product';
import { categoryRouter } from '../modules/category';
import { promotionRouter } from '../modules/promotion';

export const appRouter = router({
  auth: authRouter,
  product: productRouter,
  category: categoryRouter,
  promotion: promotionRouter,
});

export type AppRouter = typeof appRouter; 