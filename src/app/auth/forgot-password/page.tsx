'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { trpc } from '@/utils/trpc';

export default function ForgotPassword() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [error, setError] = useState('');

  const forgotPassword = trpc.auth.forgotPassword.useMutation({
    onSuccess: () => {
      setStatus('success');
      setTimeout(() => {
        router.push('/auth/signin');
      }, 3000);
    },
    onError: (error) => {
      setError(error.message);
      setStatus('idle');
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    forgotPassword.mutate({ email });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        {status === 'success' ? (
          <div className="text-center">
            <p className="text-green-600">
              If an account exists with that email, we've sent password reset instructions.
            </p>
            <p className="mt-2">Redirecting to login page...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 text-red-600 p-3 rounded">{error}</div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded border p-2"
                required
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-blue-500 text-white p-2 rounded disabled:bg-blue-300"
            >
              {status === 'loading' ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
} 