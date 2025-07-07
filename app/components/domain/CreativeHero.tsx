'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ScrollIndicator } from '../ui/ScrollIndicator';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import Link from 'next/link';

export const CreativeHero = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
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

  // Generate particles only on client-side after component mounts
  useEffect(() => {
    if (!isMounted || !particlesContainerRef.current) return;
    
    // Clear any existing particles first
    particlesContainerRef.current.innerHTML = '';
    
    // Create the particles
    for (let i = 0; i < 25; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-pink-500/20';
      
      const width = Math.random() * 4 + 2;
      const height = Math.random() * 4 + 2;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const duration = Math.random() * 10 + 10;
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

  // Mouse movement effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring config for smoother motion
  const springConfig = { damping: 30, stiffness: 150 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);
  
  // Parallax movement values
  const moveBackgroundX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const moveBackgroundY = useTransform(springY, [-0.5, 0.5], [-10, 10]);
  
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

  return (
    <section ref={heroRef} className="min-h-screen relative flex items-center justify-center overflow-hidden bg-black">
      {/* Modern gradient background with parallax effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black opacity-90"
        style={{ 
          x: moveBackgroundX,
          y: moveBackgroundY
        }}
      />
      
      {/* Animated particles container */}
      <div 
        ref={particlesContainerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />
      
      {/* Content */}
      <div className="container mx-auto px-6 z-10 text-center max-w-6xl">
        {/* Modern hero layout with bento-style elements */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Main content - spans 7 columns on large screens */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHeroVisible ? 0 : 20, opacity: isHeroVisible ? 1 : 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              {/* Modern typography with better hierarchy */}
              <div className="space-y-4">
                <h1 className="text-6xl md:text-8xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
                    CREATIVITY
                  </span>
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
              </div>
              
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
                Exploring art in its many forms through photography, videography, music, and graphic design.
              </p>
            </motion.div>
            
            {/* Modern button group */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: isHeroVisible ? 0 : 20, opacity: isHeroVisible ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto"
            >
              <button
                onClick={() => scrollToSection('projects')}
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10">View Projects</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              <Link
                href="/creative/gallery"
                className="group px-8 py-4 rounded-2xl border border-pink-500/30 text-pink-400 hover:bg-pink-500/10 transition-all duration-300 font-medium flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <span>View Gallery</span>
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </Link>
            </motion.div>
          </div>
          
          {/* Modern stats/features section - spans 5 columns */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: isHeroVisible ? 0 : 20, opacity: isHeroVisible ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Modern bento-style cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 backdrop-blur-sm hover:border-pink-500/40 transition-all duration-300">
                <div className="text-3xl font-bold text-pink-400 mb-2">50+</div>
                <div className="text-sm text-white/70">Photography Sessions</div>
              </div>
              
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-sm hover:border-purple-500/40 transition-all duration-300">
                <div className="text-3xl font-bold text-purple-400 mb-2">20+</div>
                <div className="text-sm text-white/70">Video Projects</div>
              </div>
              
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm hover:border-blue-500/40 transition-all duration-300">
                <div className="text-3xl font-bold text-blue-400 mb-2">3+</div>
                <div className="text-sm text-white/70">Years Experience</div>
              </div>
              
              <div className="group p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-pink-500/10 border border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all duration-300">
                <div className="text-3xl font-bold text-cyan-400 mb-2">100%</div>
                <div className="text-sm text-white/70">Client Satisfaction</div>
              </div>
            </div>
            
            {/* Modern feature highlights */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                <span className="text-sm">Professional Photography & Videography</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Creative Direction & Brand Identity</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Event Coverage & Performance Documentation</span>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <ScrollIndicator onClick={() => scrollToSection('projects')} />
        </div>
      </div>
    </section>
  );
}; 