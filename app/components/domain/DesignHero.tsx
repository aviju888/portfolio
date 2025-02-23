'use client';

import React from 'react';
import { Button } from '../ui/Button';

export const DesignHero = () => {
  return (
    <section className="min-h-screen relative overflow-hidden bg-gradient-to-br from-orange-500/20 to-yellow-500/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_100%)]" />
      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-500 to-yellow-500 text-transparent bg-clip-text animate-textGlow">
            UI/UX
            <br />
            Design
          </h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">
            Creating intuitive and beautiful user experiences.
            Explore my design process and portfolio.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="aspect-square rounded-2xl bg-white/5 p-4 flex items-center justify-center hover:bg-white/10 transition-colors">
              <span className="text-white/80">UI Design</span>
            </div>
            <div className="aspect-square rounded-2xl bg-white/5 p-4 flex items-center justify-center hover:bg-white/10 transition-colors">
              <span className="text-white/80">UX Research</span>
            </div>
            <div className="aspect-square rounded-2xl bg-white/5 p-4 flex items-center justify-center hover:bg-white/10 transition-colors">
              <span className="text-white/80">Prototyping</span>
            </div>
            <div className="aspect-square rounded-2xl bg-white/5 p-4 flex items-center justify-center hover:bg-white/10 transition-colors">
              <span className="text-white/80">Design Systems</span>
            </div>
          </div>
          <div className="flex gap-4">
            <Button variant="solid">
              View Designs
            </Button>
            <Button variant="ghost">
              Process
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 opacity-30">
        <div className="relative w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10" />
          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(249,115,22,0.1)_0%,rgba(234,179,8,0.1)_100%)]" />
        </div>
      </div>
    </section>
  );
}; 