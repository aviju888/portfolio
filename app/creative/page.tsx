'use client';

import React, { useState, useEffect } from 'react';
import { CreativeHero } from '../components/domain/CreativeHero';
import { CreativeProjects } from '../components/domain/CreativeProjects';
import { Tools } from '../components/domain/CreativeSkills';
import Head from 'next/head';

export default function CreativePage() {
  const [isLoading, setIsLoading] = useState(true);

  // Gallery image preloading - preload first few gallery images
  useEffect(() => {
    // Set loading to false after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    // Preload key gallery images when browser is idle
    if ('requestIdleCallback' in window) {
      // @ts-ignore - TypeScript may not recognize requestIdleCallback
      window.requestIdleCallback(() => {
        const imagesToPreload = [
          '/images/gallery/gracegrad1.png',
          '/images/gallery/gracegrad2.jpg',
          '/images/gallery/unhinged1.jpg',
          '/images/gallery/unhinged2.png',
          '/images/gallery/unhinged3.png',
          '/images/gallery/ctrl1.jpg',
        ];
        
        imagesToPreload.forEach(src => {
          const img = new Image();
          img.src = src;
        });
      });
    }
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      <div className="bg-black min-h-screen">
        <CreativeHero />
        <CreativeProjects />
        <Tools />
      </div>
    </>
  );
} 