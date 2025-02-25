'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { trpc } from '@/utils/trpc';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const token = searchParams.get('token');

  const verifyEmail = trpc.auth.verifyEmail.useMutation({
    onSuccess: () => {
      setStatus('success');
      setTimeout(() => {
        router.push('/auth/signin');
      }, 3000);
    },
    onError: () => {
      setStatus('error');
    },
  });

  useEffect(() => {
    if (!token) {
      setStatus('error');
      return;
    }

    verifyEmail.mutate({ token });
  }, [token, verifyEmail]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8 text-center">
        {status === 'loading' && <p>Verifying your email...</p>}
        {status === 'success' && (
          <div>
            <h2 className="text-2xl font-bold text-green-600">Email Verified!</h2>
            <p className="mt-2">Redirecting to login page...</p>
          </div>
        )}
        {status === 'error' && (
          <div>
            <h2 className="text-2xl font-bold text-red-600">Verification Failed</h2>
            <p className="mt-2">The verification link is invalid or has expired.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmail() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="max-w-md w-full space-y-8 p-8 text-center">
          <p>Loading...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
} 