'use client';

import React from 'react';
import { Button } from '../ui/Button';
import Link from 'next/link';

export const CreativeHero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="snap-section pt-20 pb-10 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Visual
              <span className="block bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 bg-clip-text text-transparent">
                Storytelling
              </span>
              <span className="block bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                Through Art
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto">
              Capturing moments, emotions, and stories through photography, videography, 
              music, and graphic design with a focus on authentic expression.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="snap-section px-4 pb-10">
        <div className="container mx-auto max-w-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-pink-500/10 to-purple-500/5 border border-pink-500/20 hover:border-pink-500/40 transition-all duration-500 hover:scale-105">
              <div className="text-center space-y-3">
                <div className="text-3xl md:text-4xl font-bold text-pink-400">50+</div>
                <div className="text-white/70 font-medium">Sessions</div>
              </div>
            </div>
            
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-blue-500/5 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-500 hover:scale-105">
              <div className="text-center space-y-3">
                <div className="text-3xl md:text-4xl font-bold text-purple-400">20+</div>
                <div className="text-white/70 font-medium">Videos</div>
              </div>
            </div>
            
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 hover:scale-105">
              <div className="text-center space-y-3">
                <div className="text-3xl md:text-4xl font-bold text-blue-400">3+</div>
                <div className="text-white/70 font-medium">Years</div>
              </div>
            </div>
            
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-pink-500/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 hover:scale-105">
              <div className="text-center space-y-3">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400">100%</div>
                <div className="text-white/70 font-medium">Satisfaction</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Creative Services Section */}
      <section className="snap-section px-4 pb-10">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Creative Services
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-pink-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Photography & Videography</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Professional photography and videography services for events, portraits, and commercial projects.
                  </p>
                </div>
              </div>
              
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Creative Direction</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Brand identity development, creative direction, and visual storytelling for businesses and individuals.
                  </p>
                </div>
              </div>
              
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Event Coverage</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Comprehensive event documentation and performance coverage with professional equipment and editing.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}; 