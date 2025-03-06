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
      {/* Animated gradient background with parallax effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-black opacity-90"
        style={{ 
          x: moveBackgroundX,
          y: moveBackgroundY
        }}
      />
      
      {/* Animated particles container - now empty and populated by JS after mount */}
      <div 
        ref={particlesContainerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />
      
      {/* Content */}
      <div className="container mx-auto px-6 z-10 text-center">
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHeroVisible ? 0 : 20, opacity: isHeroVisible ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
            Creativity
          </span>
        </motion.h1>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHeroVisible ? 0 : 20, opacity: isHeroVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10"
        >
          My experience in exploring art in some of its many forms: 
          <br></br>
          Photography, Videography, Music, Graphic Design, and more.
        </motion.p>
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHeroVisible ? 0 : 20, opacity: isHeroVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium hover:shadow-lg hover:scale-105 transition-all duration-300 transform"
          >
            View Projects
          </button>
          
          <Link
            href="/creative/gallery"
            className="px-6 py-3 rounded-full bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all font-medium flex items-center gap-2"
          >
            <span>View Gallery</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </Link>
        </motion.div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center">
          <ScrollIndicator onClick={() => scrollToSection('projects')} />
        </div>
      </div>
    </section>
  );
}; 