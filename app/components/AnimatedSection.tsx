'use client';

import { ReactNode, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function AnimatedSection({ 
  children, 
  className = '', 
  delay = 0
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: true, 
    margin: '-50px 0px',
    amount: 0.1
  });

  const variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.2,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
        delay: delay || 0,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}