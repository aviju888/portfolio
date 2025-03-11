'use client';

import React, { useState, useEffect } from 'react';
import { CreativeHero } from '../components/domain/CreativeHero';
import { CreativeProjects } from '../components/domain/CreativeProjects';
import { Tools } from '../components/domain/CreativeSkills';

export default function CreativePage() {
  const [isLoading, setIsLoading] = useState(true);

  // Gallery image preloading - preload first few gallery images
  useEffect(() => {
    // Set loading to false after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    // Preload key gallery images
    setTimeout(() => {
      const imagesToPreload = [
        '/images/gallery/gracegrad1.png',
        '/images/gallery/gracegrad2.jpg',
        '/images/gallery/gracegrad3.jpg'
      ];
      
      // Preload the first few images
      imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
      });
    }, 500);
    
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