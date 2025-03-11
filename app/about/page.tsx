'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '../components/ui/Button';
import { motion, useSpring } from 'framer-motion';

export default function About() {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const mouseX = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 30 });
  const particlesContainerRef = useRef<HTMLDivElement>(null);

  // Hero animation effect on mount
  useEffect(() => {
    // Set state immediately to trigger animations
    setIsHeroVisible(true);
    setIsMounted(true);
    
    // Force a re-render when the component mounts
    const timer = setTimeout(() => {
      setIsHeroVisible(state => state);
    }, 100);
    
    return () => clearTimeout(timer);
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
    for (let i = 0; i < 15; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-purple-600/20';
      
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
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Gradient overlay with animation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(125,18,255,0.05)_0%,transparent_70%)] opacity-0 animate-pulse" 
           style={{ 
             animation: 'pulse 8s infinite alternate', 
             opacity: isHeroVisible ? 1 : 0, 
             transition: 'opacity 1.5s ease-out'
           }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-zinc-950" />
      
      {/* Animated particles container */}
      <div 
        ref={particlesContainerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />

      <section className="container max-w-2xl mx-auto px-6 py-8 md:py-10 relative z-10">
        {/* Header */}
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHeroVisible ? 0 : 20, opacity: isHeroVisible ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-4xl font-bold mb-8 md:mb-10 bg-gradient-to-r from-gray-100 to-[#7d12ff] bg-clip-text text-transparent text-center pt-12"
        >
          About Me
        </motion.h1>
        
        {/* Image - Centered */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: isHeroVisible ? 1 : 0.9, opacity: isHeroVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center mb-8"
        >
          <div className="w-28 md:w-32">
            <div className="aspect-square overflow-hidden rounded-full border border-white/10 hover:border-[#7d12ff] transition-colors duration-500 bg-zinc-900">
              <Image 
                src="/images/adriel.jpeg"
                alt="Photo of Adriel Vijuan"
                width={160}
                height={160}
                className="object-cover hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHeroVisible ? 0 : 20, opacity: isHeroVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-6"
        >
          <div className="space-y-4 text-sm md:text-base leading-relaxed">
            <p className="text-white/90 pl-2 md:pl-4">
              Hi, I&apos;m Adriel! I am currently a 4th-year at UC Berkeley majoring in Electrical Engineering and Computer Sciences with a minor in Data Science. My passions lie at the intersection of artificial intelligence, software design, and creativity. I enjoy leveraging technology to solve real-world problems while adding a touch of innovation and artistry to my work.
            </p>
            <p className="text-white/90 pl-2 md:pl-4">
              Over the years, I&apos;ve done work in AI/ML, front-end development, and computational photography. Whether I&apos;m fine-tuning a diffusion model, leading a team, or capturing moments through photography, I&apos;m constantly seeking to blend logic with creativity.
            </p>
            <p className="text-white/90 pl-2 md:pl-4">
              Above all, I find myself to be a person with a true passion for learning. You&apos;ll likely find me teaching myself new skills, capturing moments through my camera, leading dance teams, or actively seeking ways to grow and connect with the community around me.
            </p>
          </div>
          
          {/* Contact Button */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHeroVisible ? 0 : 20, opacity: isHeroVisible ? 1 : 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex justify-center pt-6"
          >
            <Button 
              href="mailto:avijuan@berkeley.edu"
              variant="creative-primary"
              className="text-sm hover:scale-105 transition-transform duration-300"
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>}
            >
              Get in Touch
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
} 