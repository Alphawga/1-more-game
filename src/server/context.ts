import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../app/api/auth/[...nextauth]/route';

export async function createContext(opts: trpcNext.CreateNextContextOptions) {
  const session = await getServerSession(authOptions);

  return {
    session,
  };
}

export type Context = trpc.inferAsyncReturnType<typeof createContext>; 