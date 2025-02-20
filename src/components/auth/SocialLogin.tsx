'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';

interface SocialLoginProps {
  callbackUrl?: string;
}

export default function SocialLogin({ callbackUrl = '/' }: SocialLoginProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <div className=" flex items-center">
          <div className="w-full border-t border-gray-600"></div>
        </div>
        <div className="relative flex justify-center text-sm mt-2 ">
          <span className="px-2 text-cloud-white bg-digital-black">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => signIn('google', { callbackUrl })}
          className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg hover:bg-slate-200 transition-colors"
        >
          <Image
            src="/icons/google.svg"
            alt="Google"
            width={20}
            height={20}
            className="mr-2"
          />
          <span className="text-cloud-white">Google</span>
        </button>

        <button
          onClick={() => signIn('facebook', { callbackUrl })}
          className="flex items-center justify-center px-4 py-2 border border-gray-600 rounded-lg hover:bg-slate-200 transition-colors"
        >
          <Image
            src="/icons/facebook.svg"
            alt="Facebook"
            width={25}
            height={25}
            className="mr-2"
          />
          <span className="text-cloud-white">Facebook</span>
        </button>
      </div>
    </div>
  );
} 