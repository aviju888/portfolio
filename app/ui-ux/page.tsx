'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function UiUxRedirectPage() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to the human page
    router.push('/human');
  }, [router]);
  
  // Show a loading message while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4 text-white">Redirecting...</h1>
        <p className="text-white/70">
          This section has been moved to the new HUMAN page.
        </p>
      </div>
    </div>
  );
} 