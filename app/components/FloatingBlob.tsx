'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface FloatingBlobProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'cyan' | 'blue' | 'purple' | 'mixed';
  duration?: number;
  delay?: number;
}

export default function FloatingBlob({ 
  className = '',
  size = 'md',
  color = 'cyan',
  duration = 8,
  delay = 0
}: FloatingBlobProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const sizeClasses = {
    sm: 'w-32 h-32',
    md: 'w-48 h-48',
    lg: 'w-64 h-64',
    xl: 'w-96 h-96'
  };

  const colorClasses = {
    cyan: 'bg-accent/10',
    blue: 'bg-accent-secondary/8',
    purple: 'bg-accent-tertiary/6',
    mixed: 'bg-gradient-to-br from-accent/8 via-accent-secondary/6 to-accent-tertiary/4'
  };

  // Reduce animation on mobile
  const animationProps = isMobile ? {
    y: [-10, 10, -10],
    x: [-5, 5, -5],
    scale: [1, 1.05, 1],
    opacity: [0.2, 0.4, 0.2]
  } : {
    y: [-20, 20, -20],
    x: [-10, 10, -10],
    scale: [1, 1.1, 1],
    opacity: [0.3, 0.6, 0.3]
  };

  return (
    <motion.div
      className={`absolute rounded-full blur-3xl pointer-events-none ${sizeClasses[size]} ${colorClasses[color]} ${className}`}
      animate={animationProps}
      transition={{
        duration: isMobile ? duration * 1.5 : duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
}
