'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CustomCursorProps {
  enabled?: boolean;
}

export default function CustomCursor({ enabled = true }: CustomCursorProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile/touch
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    if (!enabled || isMobile) return;

    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.matches('a, button, [role="button"], input, textarea, select')) {
        setIsHovering(false);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseenter', handleMouseEnter, true);
    window.addEventListener('mouseleave', handleMouseLeave, true);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseenter', handleMouseEnter, true);
      window.removeEventListener('mouseleave', handleMouseLeave, true);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('resize', checkMobile);
    };
  }, [enabled, isMobile]);

  if (!enabled || isMobile) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 28,
        }}
      >
        <motion.div
          className="w-4 h-4 rounded-full bg-white"
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isClicking ? 0.8 : 1,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
          }}
        />
      </motion.div>

      {/* Trailing cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-40"
        animate={{
          x: mousePosition.x - 20,
          y: mousePosition.y - 20,
        }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 20,
        }}
      >
        <motion.div
          className="w-10 h-10 rounded-full border-2 border-accent/30"
          animate={{
            scale: isHovering ? 2 : 1,
            opacity: isHovering ? 0.6 : 0.3,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
          }}
        />
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-30"
        animate={{
          x: mousePosition.x - 30,
          y: mousePosition.y - 30,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
      >
        <motion.div
          className="w-16 h-16 rounded-full bg-gradient-to-r from-accent/20 via-accent-secondary/20 to-accent-tertiary/20 blur-sm"
          animate={{
            scale: isHovering ? 1.5 : 1,
            opacity: isHovering ? 0.8 : 0.4,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 25,
          }}
        />
      </motion.div>
    </>
  );
}
