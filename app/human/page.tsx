'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HumanRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/');
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white text-center">
        <div className="animate-spin w-8 h-8 border-2 border-purple-600 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p>Redirecting to homepage...</p>
      </div>
    </div>
  );
}

