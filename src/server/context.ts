import * as trpc from '@trpc/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../app/api/auth/[...nextauth]/route';

interface CreateContextOptions {
  req: Request;
}

export async function createContext({ req }: CreateContextOptions) {
  const session = await getServerSession(authOptions);

  return {
    req,
    session,
  };
}

export type Context = Awaited<ReturnType<typeof createContext>>; 