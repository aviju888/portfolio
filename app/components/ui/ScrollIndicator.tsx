'use client';

import React, { useState, useEffect } from 'react';
import { useDomain } from '../layout/DomainProvider';

export const ScrollIndicator = () => {
  const { activeDomain } = useDomain();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the indicator after a delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);

    // Hide the indicator when user scrolls
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(false);
      } else if (window.scrollY === 0) {
        // Show it again when back at the top
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(showTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getGradientByDomain = () => {
    switch (activeDomain) {
      case 'creative':
        return 'from-pink-500 to-purple-500';
      case 'software':
        return 'from-blue-500 to-cyan-500';
      case 'ui-ux':
        return 'from-orange-500 to-yellow-500';
      default:
        return 'from-white/20 to-white/10';
    }
  };

  return (
    <div 
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-50 transition-opacity duration-500 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="text-white/50 mb-2 text-sm">Scroll to explore</div>
      <div 
        className={`w-6 h-12 rounded-full border-2 border-white/20 relative
          before:absolute before:w-1 before:h-1 before:rounded-full
          before:bg-gradient-to-b ${getGradientByDomain()}
          before:left-1/2 before:-translate-x-1/2 before:top-2
          before:animate-scrollBounce`}
      />
    </div>
  );
}; 