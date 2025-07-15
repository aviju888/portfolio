'use client';

import React from 'react';
import { Button } from '../ui/Button';

export const SoftwareHero = () => {
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
              Building
              <span className="block bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-600 bg-clip-text text-transparent">
                Intelligent
              </span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-600 bg-clip-text text-transparent">
                Systems
              </span>
            </h1>
            <p className="text-base md:text-lg text-white/70 max-w-xl mx-auto">
              Crafting software solutions at the intersection of AI/ML, Computer Vision, 
              and Full-Stack Development with a focus on elegant, scalable architecture.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="snap-section px-4 pb-10">
        <div className="container mx-auto max-w-3xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-500 hover:scale-105">
              <div className="text-center space-y-3">
                <div className="text-3xl md:text-4xl font-bold text-blue-400">10+</div>
                <div className="text-white/70 font-medium">Projects</div>
              </div>
            </div>
            
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-teal-500/5 border border-cyan-500/20 hover:border-cyan-500/40 transition-all duration-500 hover:scale-105">
              <div className="text-center space-y-3">
                <div className="text-3xl md:text-4xl font-bold text-cyan-400">5+</div>
                <div className="text-white/70 font-medium">Technologies</div>
              </div>
            </div>
            
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-teal-500/10 to-blue-500/5 border border-teal-500/20 hover:border-teal-500/40 transition-all duration-500 hover:scale-105">
              <div className="text-center space-y-3">
                <div className="text-3xl md:text-4xl font-bold text-teal-400">3+</div>
                <div className="text-white/70 font-medium">Years</div>
              </div>
            </div>
            
            <div className="group p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-blue-500/5 border border-indigo-500/20 hover:border-indigo-500/40 transition-all duration-500 hover:scale-105">
              <div className="text-center space-y-3">
                <div className="text-3xl md:text-4xl font-bold text-indigo-400">100%</div>
                <div className="text-white/70 font-medium">Quality</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="snap-section px-4 pb-10">
        <div className="container mx-auto max-w-3xl">
          <div className="text-center space-y-6">
            <h2 className="text-xl md:text-2xl font-bold text-white">
              Areas of Expertise
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">AI/ML & Computer Vision</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Building intelligent systems with deep learning, computer vision, and machine learning algorithms.
                  </p>
                </div>
              </div>
              
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Full-Stack Development</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Creating robust web applications with modern frameworks and scalable architecture.
                  </p>
                </div>
              </div>
              
              <div className="group p-8 rounded-3xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-105">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-teal-500/20 flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">System Architecture</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Designing efficient, scalable systems with performance optimization and best practices.
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