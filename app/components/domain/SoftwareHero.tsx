'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/Button';
import { useSpring } from 'framer-motion';

export const SoftwareHero = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const mouseX = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 30 });
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  
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
    setIsMounted(true);
  }, []);

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;
      
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate particles only on client-side after component mounts
  useEffect(() => {
    if (!isMounted || !particlesContainerRef.current) return;
    
    // Clear any existing particles first
    particlesContainerRef.current.innerHTML = '';
    
    // Create the particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-blue-400/20';
      
      const width = Math.random() * 6 + 2;
      const height = Math.random() * 6 + 2;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const duration = Math.random() * 10 + 15;
      const delay = Math.random() * 5;
      
      particle.style.width = `${width}px`;
      particle.style.height = `${height}px`;
      particle.style.top = `${top}%`;
      particle.style.left = `${left}%`;
      particle.style.animation = `float ${duration}s infinite ease-in-out alternate`;
      particle.style.animationDelay = `${delay}s`;
      
      particlesContainerRef.current.appendChild(particle);
    }
  }, [isMounted]);

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
      
      {/* Animated particles container */}
      <div 
        ref={particlesContainerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />
      
      {/* Content - Modern layout with bento-style elements */}
      <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center items-center text-center max-w-6xl">
        {/* Modern hero layout with bento-style elements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
          {/* Main content - spans 7 columns on large screens */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header Section */}
            <div className="w-full max-w-4xl mx-auto">
              <h1 
                className={`text-6xl md:text-8xl font-bold mb-6 leading-tight transform transition-all duration-1000 ${
                  isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <div className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                  SOFTWARE
                </div>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full mt-4"></div>
              </h1>
              <p 
                className={`text-xl md:text-2xl text-white/80 leading-relaxed mb-8 font-light transform transition-all duration-1000 delay-300 ${
                  isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                My work at the intersection of AI/ML, Computer Vision, and Web Development.
              </p>

              {/* Modern button group */}
              <div 
                className={`flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto transform transition-all duration-1000 delay-500 ${
                  isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
              >
                <button
                  onClick={() => scrollToSection('projects')}
                  className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-medium hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10">View Projects</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
                
                <button
                  onClick={() => scrollToSection('skills')}
                  className="group px-8 py-4 rounded-2xl border border-blue-500/30 text-blue-400 hover:bg-blue-500/10 transition-all duration-300 font-medium backdrop-blur-sm"
                >
                  Explore Skills
                </button>
              </div>
            </div>
          </div>
          
          {/* Modern stats/features section - spans 5 columns */}
          <div 
            className={`lg:col-span-5 space-y-6 transform transition-all duration-1000 delay-700 ${
              isHeroVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            {/* Modern bento-style cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300">
                <div className="text-3xl font-bold text-blue-400 mb-2">10+</div>
                <div className="text-sm text-white/70">Projects Completed</div>
              </div>
              
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300">
                <div className="text-3xl font-bold text-cyan-400 mb-2">5+</div>
                <div className="text-sm text-white/70">Technologies</div>
              </div>
              
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-teal-500/20 backdrop-blur-sm hover:border-teal-500/40 transition-all duration-300">
                <div className="text-3xl font-bold text-teal-400 mb-2">3+</div>
                <div className="text-sm text-white/70">Years Experience</div>
              </div>
              
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 backdrop-blur-sm hover:border-indigo-500/40 transition-all duration-300">
                <div className="text-3xl font-bold text-indigo-400 mb-2">100%</div>
                <div className="text-sm text-white/70">Code Quality</div>
              </div>
            </div>
            
            {/* Modern feature highlights */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">AI/ML & Computer Vision</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span className="text-sm">Full-Stack Web Development</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                <span className="text-sm">System Architecture & Optimization</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 