'use client';

import React from 'react';

export const SoftwareHero = () => {
  const categories = [
    { icon: '🤖', label: 'AI/ML' },
    { icon: '👁️', label: 'Computer Vision' },
    { icon: '🌐', label: 'Web Development' },
    { icon: '⚙️', label: 'Systems & Architecture' }
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
            <div className="text-white/90">Software</div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text">
              Engineering
            </div>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
            ai/ml, computer vision, web development, and systems.
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