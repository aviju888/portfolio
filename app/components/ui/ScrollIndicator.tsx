'use client';

import React, { useState, useEffect } from 'react';
import { useDomain } from '../layout/DomainProvider';

export const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { activeDomain } = useDomain();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
      className={`fixed bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center
        transition-all duration-700 z-50 pointer-events-none
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
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