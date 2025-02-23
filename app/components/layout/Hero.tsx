'use client';

import React from 'react';
import { Button } from '../ui/Button';
import Image from 'next/image';

export const Hero = () => {
  return (
    <section className="h-screen flex flex-col justify-center items-center text-center p-0">
      <div className="container">
        <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-gray-100 to-[#7d12ff] bg-clip-text text-transparent animate-glow">
          Adriel Vijuan
        </h1>
        <div className="text-2xl mb-8">AI | SOFTWARE | CREATIVE</div>
        
        <Button href="mailto:avijuan@berkeley.edu">
          Contact Me ↗
        </Button>

        <div className="flex gap-6 justify-center mt-8">
          <a href="https://github.com/aviju888" target="_blank" rel="noopener noreferrer">
            <Image 
              src="/icons/github.png" 
              alt="GitHub" 
              width={24} 
              height={24} 
              className="invert hover:scale-110 transition-transform"
            />
          </a>
          <a href="https://linkedin.com/in/adriel-vijuan" target="_blank" rel="noopener noreferrer">
            <Image 
              src="/icons/linkedin.png" 
              alt="LinkedIn" 
              width={24} 
              height={24} 
              className="invert hover:scale-110 transition-transform"
            />
          </a>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <Image 
              src="/icons/resume.png" 
              alt="Resume" 
              width={24} 
              height={24} 
              className="invert hover:scale-110 transition-transform"
            />
          </a>
        </div>
      </div>
    </section>
  );
}; 