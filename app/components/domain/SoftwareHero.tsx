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
      
      {/* Animated particles container - now empty and populated by JS after mount */}
      <div 
        ref={particlesContainerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />
      
      {/* Content - Centered with staggered animations */}
      <div className="container mx-auto px-6 relative z-10 flex-grow flex flex-col justify-center items-center text-center">
        {/* Header Section */}
        <div className="w-full max-w-4xl">
          <h1 
            className={`text-4xl md:text-6xl font-bold mb-6 leading-tight transform transition-all duration-1000 ${
              isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <div className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
              SOFTWARE<br className="md:hidden" /> DEVELOPMENT
            </div>
          </h1>
          <p 
            className={`text-sm md:text-xl text-white/80 leading-relaxed mb-8 transform transition-all duration-1000 delay-300 ${
              isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            My work at the intersection of AI/ML, Computer Vision, and Web Development.
          </p>

          {/* Navigation - Centered with animation */}
          <div 
            className={`flex justify-center space-x-6 transform transition-all duration-1000 delay-500 ${
              isHeroVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Button 
              variant="creative-primary"
              onClick={() => scrollToSection('projects')}
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>}
              className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20"
            >
              View Projects
            </Button>
            <Button 
              variant="creative-secondary"
              onClick={() => scrollToSection('skills')}
            >
              Explore Skills
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}; 