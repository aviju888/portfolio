'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Home() {
  const [isInitialAnimation, setIsInitialAnimation] = useState(true);
  const [fadeOutName, setFadeOutName] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [nameVisible, setNameVisible] = useState(false);

  useEffect(() => {
    // Make the name visible immediately
    setNameVisible(true);
    
    // Start the loading animation immediately
    const loadingInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(loadingInterval);
          return 100;
        }
        return prev + 4; // Faster loading progress
      });
    }, 15); // Faster interval

    // Start the animation sequence faster
    const timer1 = setTimeout(() => {
      setFadeOutName(true);
    }, 1000); // Faster delay

    const timer2 = setTimeout(() => {
      setIsInitialAnimation(false);
    }, 1300); // Faster delay

    return () => {
      clearInterval(loadingInterval);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const domains = [
    {
      id: 'software',
      name: 'SOFTWARE',
      description: 'Explore my software engineering and machine learning projects',
      gradient: 'from-blue-500 to-cyan-500 animate-gradient-x',
      icon: '💻'
    },
    {
      id: 'creative',
      name: 'CREATIVE',
      description: 'Discover my photography, videography, and design work',
      gradient: 'from-pink-500 to-purple-500 animate-gradient-x',
      icon: '📷'
    },
    {
      id: 'human',
      name: 'HUMAN',
      description: 'Explore my thoughts, philosophies, and personal journey',
      gradient: 'from-gray-500 to-gray-700 animate-gradient-x',
      icon: '🧠'
    }
  ];

  if (isInitialAnimation) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black px-4">
        <h1 
          className={`text-4xl sm:text-5xl md:text-6xl font-medium mb-4 sm:mb-6 text-center
            bg-gradient-to-r from-pink-500 to-purple-500
            bg-clip-text text-transparent
            transition-all duration-700
            ${fadeOutName ? 'opacity-0 transform translate-y-6' : ''}`}
          style={{
            opacity: nameVisible ? 1 : 0,
            transform: nameVisible ? 'scale(1)' : 'scale(0.98)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out'
          }}
        >
          ADRIEL VIJUAN
        </h1>
        
        {/* Simplified Loading Bar */}
        <div className="relative h-1 w-40 max-w-full mt-6">
          <div 
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-[1px] bg-white/10 overflow-hidden
              transition-opacity duration-700
              ${fadeOutName ? 'opacity-0' : 'opacity-100'}`}
            style={{
              opacity: nameVisible ? 1 : 0,
              transition: 'opacity 0.6s ease-out'
            }}
          >
            <div 
              className="h-full bg-white/40 transition-all duration-300 ease-out"
              style={{ 
                width: `${loadingProgress}%`,
                transition: 'width 0.3s ease-out'
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 sm:gap-5 p-4 sm:p-6">
      {domains.map((domain, index) => (
        <Link
          key={domain.id}
          href={`/${domain.id}`}
          className={`group relative text-2xl sm:text-3xl md:text-4xl font-medium tracking-wide
            transition-all duration-300 hover:tracking-wider active:scale-95
            animate-fadeIn opacity-0 w-full text-center sm:w-auto py-2 px-4 rounded-md hover:bg-white/[0.03]`}
          style={{
            animationDelay: `${index * 150}ms`
          }}
        >
          <span className={`bg-gradient-to-r ${domain.gradient} bg-clip-text text-transparent
            opacity-80 group-hover:opacity-100 transition-opacity`}>
            {domain.name}
          </span>
        </Link>
      ))}
    </div>
  );
}
