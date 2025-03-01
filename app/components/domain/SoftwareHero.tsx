'use client';

import React, { useState, useEffect } from 'react';
import { ScrollIndicator } from '../ui/ScrollIndicator';

export const SoftwareHero = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  
  // Function to handle smooth scrolling to a section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hero animation effect on mount
  useEffect(() => {
    setIsHeroVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center bg-black overflow-hidden">
      {/* Enhanced gradient overlay with animation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.05)_0%,transparent_70%)] opacity-0 animate-pulse" 
           style={{ 
             animation: 'pulse 8s infinite alternate', 
             opacity: isHeroVisible ? 1 : 0, 
             transition: 'opacity 1.5s ease-out'
           }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
      
      {/* Animated particles (subtle blue dots) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-blue-400/20"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              top: Math.random() * 100 + '%',
              left: Math.random() * 100 + '%',
              animation: `float ${Math.random() * 10 + 15}s infinite ease-in-out alternate`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
      
      {/* Content - Centered with staggered animations */}
      <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center items-center text-center">
        {/* Header Section */}
        <div className="max-w-3xl">
          <h1 
            className={`text-4xl md:text-6xl font-bold mb-6 leading-tight transform transition-all duration-1000 ${
              isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
              Building Intelligent Systems
            </div>
          </h1>
          <p 
            className={`text-base md:text-xl text-white/80 leading-relaxed mb-8 transform transition-all duration-1000 delay-300 ${
              isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Creating innovative software solutions at the intersection of computer vision, AI, and web development.
          </p>

          {/* Navigation - Centered with animation */}
          <div 
            className={`flex justify-center space-x-6 transform transition-all duration-1000 delay-500 ${
              isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <button 
              className="px-6 py-2.5 font-medium rounded-full border border-blue-400 bg-blue-500/10 text-white hover:bg-blue-500/20 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all duration-300 hover:-translate-y-1"
              onClick={() => scrollToSection('projects')}
            >
              Projects
            </button>
            <button 
              className="px-6 py-2.5 font-medium rounded-full border border-white/30 bg-white/5 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300 hover:-translate-y-1"
              onClick={() => scrollToSection('skills')}
            >
              Tech Stack
            </button>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator animation */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 animate-fadeIn" style={{ animationDelay: '1.8s', animationFillMode: 'forwards' }}>
        <span className="text-white/50 text-sm mb-2">Scroll to explore</span>
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center p-1">
          <div className="w-1 h-1 bg-blue-400 rounded-full animate-scrollBounce"></div>
        </div>
      </div>
    </section>
  );
}; 