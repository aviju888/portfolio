'use client';

import { motion } from 'framer-motion';

interface OrganicDividerProps {
  className?: string;
  variant?: 'wave' | 'blob' | 'curve' | 'zigzag' | 'flow';
  animated?: boolean;
}

export default function OrganicDivider({ 
  className = '', 
  variant = 'wave',
  animated = true
}: OrganicDividerProps) {
  const waveVariants = {
    wave: "M0,0 C300,40 600,0 900,20 C1050,30 1150,15 1200,10 L1200,120 L0,120 Z",
    blob: "M0,0 C200,60 400,20 600,40 C800,60 1000,30 1200,50 L1200,120 L0,120 Z",
    curve: "M0,0 C150,80 300,20 450,60 C600,100 750,40 900,80 C1050,120 1150,60 1200,100 L1200,120 L0,120 Z",
    zigzag: "M0,0 L200,60 L400,20 L600,60 L800,20 L1000,60 L1200,20 L1200,120 L0,120 Z",
    flow: "M0,0 C100,40 200,0 300,30 C400,60 500,20 600,50 C700,80 800,40 900,70 C1000,100 1100,60 1200,90 L1200,120 L0,120 Z"
  };

  const path = waveVariants[variant];

  const svgElement = (
    <svg 
      viewBox="0 0 1200 120" 
      preserveAspectRatio="none" 
      className="w-full h-12 md:h-20"
    >
      <path 
        d={path}
        fill="currentColor" 
        opacity="0.03"
      />
    </svg>
  );

  if (animated) {
    return (
      <motion.div 
        className={`w-full overflow-hidden ${className}`}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-50px" }}
      >
        {svgElement}
      </motion.div>
    );
  }

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      {svgElement}
    </div>
  );
}
