'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function HumanPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4 py-16">
      <div className={`text-center mb-8 transition-all duration-700 ${isLoading ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
        <h1 className="text-1xl sm:text-2xl md:text-3xl font-light tracking-wider text-white uppercase">
          under construction.
        </h1>
      </div>

      {/* 4:3 Image Placeholder - Smaller */}
      <div className={`w-full max-w-lg mx-auto relative aspect-[4/3] mb-6 bg-white/5 border border-white/10 rounded-lg overflow-hidden transition-all duration-700 delay-100 ${isLoading ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg 
            className="w-12 h-12 text-white/30" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
      </div>
    </div>
  );
} 