'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ScrollIndicator } from '../ui/ScrollIndicator';
import { motion, useSpring, useTransform, useMotionValue } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export const CreativeHero = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<'focus' | 'equipment'>('focus');
  const heroRef = useRef<HTMLDivElement>(null);
  
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

  // Mouse movement effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
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
      
      setMousePosition({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center items-center bg-black overflow-hidden">
      {/* Enhanced gradient overlay with animation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.05)_0%,transparent_70%)] opacity-0 animate-pulse" 
           style={{ 
             animation: 'pulse 8s infinite alternate', 
             opacity: isHeroVisible ? 1 : 0, 
             transition: 'opacity 1.5s ease-out'
           }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
      
      {/* Animated blobs - simplified */}
      <motion.div 
        className="absolute top-1/4 -left-64 w-[600px] h-[600px] rounded-full bg-pink-500/10 blur-[80px] animate-blob"
        style={{ x: moveBackgroundX, y: moveBackgroundY }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] rounded-full bg-purple-500/10 blur-[80px] animate-blob animation-delay-2000"
        style={{ x: springX, y: springY }}
      />
      
      {/* Content Container */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center mt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHeroVisible ? 1 : 0, y: isHeroVisible ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">
            Creative Work
          </h1>
          <p className="mt-6 text-xl text-white/70 max-w-2xl mx-auto">
            Exploring visual storytelling through photography, videography, and design
          </p>
        </motion.div>
        
        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHeroVisible ? 1 : 0, y: isHeroVisible ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="flex flex-wrap gap-4 justify-center mt-8"
        >
          <button
            onClick={() => scrollToSection('projects')}
            className="px-6 py-3 rounded-full bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 transition-all font-medium flex items-center gap-2"
          >
            <span>View Projects</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </button>
          <button
            onClick={() => scrollToSection('skills')}
            className="px-6 py-3 rounded-full bg-white/5 text-white/80 hover:bg-white/10 transition-all font-medium"
          >
            Explore Skills
          </button>
          <Link
            href="/creative/gallery"
            className="px-6 py-3 rounded-full bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 transition-all font-medium flex items-center gap-2"
          >
            <span>View Gallery</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </Link>
        </motion.div>
        
        {/* Creative Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHeroVisible ? 1 : 0, y: isHeroVisible ? 0 : 20 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="mt-16 w-full max-w-2xl"
        >
          <div className="flex mb-6 bg-white/5 rounded-full p-1">
            <button
              onClick={() => setActiveTab('focus')}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'focus' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' : 'text-white/60'
              }`}
            >
              Focus Areas
            </button>
            <button
              onClick={() => setActiveTab('equipment')}
              className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'equipment' ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white' : 'text-white/60'
              }`}
            >
              Equipment
            </button>
          </div>
          
          <div className="bg-white/5 rounded-xl p-6">
            {activeTab === 'focus' ? (
              <ul className="text-left space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-medium text-white">Event Photography</h3>
                    <p className="text-white/60 text-sm">Capturing dynamic moments from performances and events</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-medium text-white">Dance Videography</h3>
                    <p className="text-white/60 text-sm">Documenting movement through creative cinematography</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-medium text-white">Visual Design</h3>
                    <p className="text-white/60 text-sm">Creating memorable visuals for marketing and branding</p>
                  </div>
                </li>
              </ul>
            ) : (
              <ul className="text-left space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-medium text-white">Sony Alpha Series</h3>
                    <p className="text-white/60 text-sm">A7III with G Master lenses for professional photography</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-medium text-white">Cinema Gear</h3>
                    <p className="text-white/60 text-sm">DJI Ronin, variable ND filters, and cinema lenses</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-pink-400 mt-1">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </span>
                  <div>
                    <h3 className="font-medium text-white">Software</h3>
                    <p className="text-white/60 text-sm">Adobe Creative Suite with Lightroom, Premiere, and After Effects</p>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHeroVisible ? 0.8 : 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="absolute bottom-10"
        >
          <ScrollIndicator onClick={() => scrollToSection('projects')} />
        </motion.div>
      </div>
    </section>
  );
}; 