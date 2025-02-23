'use client';

import React from 'react';
import { Button } from '../ui/Button';

export const CreativeHero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
            <div className="text-white/90">Creative</div>
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">
              Portfolio
            </div>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
            media, design, and music.
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40 text-sm animate-bounce">
        Scroll to explore
      </div>
    </section>
  );
}; 