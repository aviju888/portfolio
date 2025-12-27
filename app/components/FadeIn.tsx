'use client';

import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function FadeIn({ children, className = '', delay = 0 }: FadeInProps) {
  return (
    <div 
      className={`fade-in-cascade ${className}`}
      style={{
        '--cascade-delay': `${delay}ms`
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}



