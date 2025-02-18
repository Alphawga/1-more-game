import { getServerSession } from 'next-auth/next';
import { authOptions } from './api/auth/[...nextauth]/route';
import Link from 'next/link';

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <div className="min-h-screen p-8">
      <main className="max-w-4xl mx-auto">
        {session ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome, {session.user?.name}</h1>
            <Link
              href="/api/auth/signout"
              className="mt-4 inline-block bg-red-500 text-white px-4 py-2 rounded"
            >
              Sign Out
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold">Welcome to Our App</h1>
            <div className="mt-4 space-x-4">
              <Link
                href="/auth/signin"
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded"
              >
                Sign In
              </Link>
              <Link
                href="/auth/register"
                className="inline-block bg-green-500 text-white px-4 py-2 rounded"
              >
                Register
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
