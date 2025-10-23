'use client';

import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import Image from 'next/image';

interface ParallaxPhotoProps {
  src: string;
  alt: string;
  index: number;
  className?: string;
}

export default function ParallaxPhoto({ src, alt, index, className = '' }: ParallaxPhotoProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Vary parallax speed based on index for depth effect
  const yOffset = index % 2 === 0 ? [0, -30] : [0, -50];
  const y = useTransform(scrollYProgress, [0, 1], yOffset);
  
  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={`group relative overflow-hidden rounded-xl border border-white/[0.1] bg-black aspect-[4/5] ${className}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}
