import { fetchRequestHandler } from '@trpc/server/adapters/fetch';
import { appRouter } from '@/server/routers/_app';
import { createContext } from '@/server/context';

// Use the edge runtime to improve performance
export const runtime = 'edge';

// Handle tRPC requests
const handler = async (req: Request) => {
  return fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createContext({ req }),
    onError:
      process.env.NODE_ENV === 'development'
        ? ({ path, error }) => {
            console.error(`❌ tRPC error on ${path ?? '<no-path>'}: ${error.message}`);
          }
        : undefined,
  });
};

// Export both GET and POST handlers
export { handler as GET, handler as POST }; 