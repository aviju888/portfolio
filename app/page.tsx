'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { type Domain } from './components/layout/DomainSwitcher';

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
        return prev + 2; // Faster loading progress
      });
    }, 15); // Faster interval

    // Start the animation sequence faster
    const timer1 = setTimeout(() => {
      setFadeOutName(true);
    }, 1200); // Faster delay

    const timer2 = setTimeout(() => {
      setIsInitialAnimation(false);
    }, 1500); // Faster delay

    return () => {
      clearInterval(loadingInterval);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const domains: {
    id: Domain;
    title: string;
    gradient: string;
  }[] = [
    {
      id: 'creative',
      title: 'CREATIVE',
      gradient: 'from-pink-500 to-purple-500',
    },
    {
      id: 'software',
      title: 'SOFTWARE',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      id: 'ui-ux',
      title: 'UI/UX',
      gradient: 'from-orange-500 to-yellow-500',
    },
  ];

  if (isInitialAnimation) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black">
        <h1 
          className={`text-5xl md:text-7xl font-medium mb-6
            bg-gradient-to-r from-[#FF1493] via-[#7d12ff] to-[#00BFFF]
            bg-[length:200%_auto] animate-gradient-x
            bg-clip-text text-transparent
            transition-all duration-1000
            ${fadeOutName ? 'opacity-0 transform translate-y-10' : ''}`}
          style={{
            opacity: nameVisible ? 1 : 0,
            transform: nameVisible ? 'scale(1.02)' : 'scale(0.98)',
            transition: 'opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.23, 1, 0.32, 1)'
          }}
        >
          ADRIEL VIJUAN
        </h1>
        
        {/* Loading Bar - Fixed positioning with more spacing */}
        <div className="relative h-1 w-48 mt-10">
          <div 
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-[2px] bg-white/10 overflow-hidden
              transition-opacity duration-1000
              ${fadeOutName ? 'opacity-0' : 'opacity-100'}`}
            style={{
              opacity: nameVisible ? 1 : 0,
              transition: 'opacity 0.8s ease-out'
            }}
          >
            <div 
              className="h-full bg-white/50 transition-all duration-300 ease-out"
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
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8">
      {domains.map((domain, index) => (
        <Link
          key={domain.id}
          href={`/${domain.id}`}
          className={`group relative text-3xl md:text-5xl font-medium tracking-wider
            transition-all duration-500 hover:tracking-widest
            animate-fadeIn opacity-0`}
          style={{
            animationDelay: `${index * 200}ms`
          }}
        >
          <span className={`bg-gradient-to-r ${domain.gradient} bg-clip-text text-transparent
            opacity-70 group-hover:opacity-100 transition-opacity`}>
            {domain.title}
          </span>
        </Link>
      ))}
    </div>
  );
}
