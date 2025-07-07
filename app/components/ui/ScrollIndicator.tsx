'use client';

import React, { useState, useEffect } from 'react';
import { useDomain } from '../layout/DomainProvider';
import { motion } from 'framer-motion';

interface ScrollIndicatorProps {
  onClick?: () => void;
}

export const ScrollIndicator = ({ onClick }: ScrollIndicatorProps) => {
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
      case 'human':
        return 'from-gray-500 to-gray-700';
      default:
        return 'from-white/50 to-white/30';
    }
  };

  return (
    <motion.div 
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center z-50 cursor-pointer`}
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        y: isVisible ? 0 : 20 
      }}
      transition={{ 
        duration: 0.5, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }}
      whileHover={{ y: -5 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Modern text label */}
      <motion.div 
        className="text-white/60 mb-3 text-sm font-medium tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        Scroll to explore
      </motion.div>
      
      {/* Modern scroll indicator */}
      <motion.div 
        className={`relative w-6 h-12 rounded-full border-2 border-white/20 overflow-hidden backdrop-blur-sm bg-white/5`}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        {/* Animated scroll ball */}
        <motion.div 
          className={`absolute w-1.5 h-1.5 rounded-full bg-gradient-to-b ${getGradientByDomain()} left-1/2 -translate-x-1/2`}
          animate={{
            y: [8, 32, 8]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Glow effect */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-b ${getGradientByDomain()} opacity-20 blur-sm`} />
      </motion.div>
      
      {/* Subtle pulse animation */}
      <motion.div
        className={`absolute w-6 h-12 rounded-full border border-white/10`}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0, 0.5]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
}; 