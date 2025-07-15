'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-green-600/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
        
        {/* Moving Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${5 + Math.random() * 10}s`
              }}
            />
          ))}
        </div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 slide-up">
                About <span className="gradient-text">Me</span>
              </h1>
              <p className="text-xl text-gray-300 slide-up animation-delay-200">
                Creative technologist passionate about bridging art and engineering
              </p>
            </div>

            {/* Profile Section */}
            <div className="grid md:grid-cols-3 gap-12 items-start">
              {/* Profile Image */}
              <div className="md:col-span-1">
                <div className="relative">
                  <div className="aspect-square relative rounded-2xl overflow-hidden hover-lift glass">
                    <Image
                      src="/images/profile.jpg"
                      alt="Avi Ju"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
                </div>
              </div>

              {/* Bio */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">Who I Am</h2>
                  <p className="text-gray-300 leading-relaxed mb-4">
                    I'm a UC Berkeley student with a unique blend of creative and technical skills. 
                    When I'm not coding machine learning models or building websites, you'll find me 
                    behind a camera capturing dance performances or leading creative teams.
                  </p>
                  <p className="text-gray-300 leading-relaxed">
                    My passion lies in creating compelling visual stories through photography and videography, 
                    while simultaneously building intelligent systems through software development. 
                    This dual focus allows me to approach problems from both artistic and technical perspectives.
                  </p>
                </div>

                {/* Quick Links */}
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="/resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 glass text-white font-medium rounded-lg hover:bg-white/10 transition-colors hover:scale-105 transform duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Resume
                    </a>
                    <a
                      href="https://github.com/aviju888"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 glass text-white font-medium rounded-lg hover:bg-white/10 transition-colors hover:scale-105 transform duration-200"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                    <a
                      href="mailto:avijuan@berkeley.edu"
                      className="inline-flex items-center gap-2 px-6 py-3 glass text-white font-medium rounded-lg hover:bg-white/10 transition-colors hover:scale-105 transform duration-200"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">Experience</h2>
              <p className="text-gray-400 max-w-2xl mx-auto">
                My journey across creative and technical domains
              </p>
            </div>

            <div className="space-y-12">
              {/* Creative Experience */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-8 text-center">Creative Leadership</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="glass p-6 rounded-lg hover:scale-105 transform duration-200">
                    <h4 className="text-lg font-semibold text-white mb-2">AFX Dance - Training Team Director</h4>
                    <p className="text-gray-400 text-sm mb-3">August 2024 - December 2024</p>
                    <p className="text-gray-300 text-sm">
                      Led and coordinated a 60+ member dance team, developing choreography and managing performances.
                    </p>
                  </div>
                  <div className="glass p-6 rounded-lg hover:scale-105 transform duration-200">
                    <h4 className="text-lg font-semibold text-white mb-2">KOSMOS @ Cal - Design Lead</h4>
                    <p className="text-gray-400 text-sm mb-3">August 2022 - Present</p>
                    <p className="text-gray-300 text-sm">
                      Brand identity and content creation, including marketing materials and social media content.
                    </p>
                  </div>
                </div>
              </div>

              {/* Technical Experience */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-8 text-center">Technical Projects</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="glass p-6 rounded-lg hover:scale-105 transform duration-200">
                    <h4 className="text-lg font-semibold text-white mb-2">Machine Learning Research</h4>
                    <p className="text-gray-400 text-sm mb-3">2023 - Present</p>
                    <p className="text-gray-300 text-sm">
                      Implemented custom diffusion models, computer vision algorithms, and AI agents for various applications.
                    </p>
                  </div>
                  <div className="glass p-6 rounded-lg hover:scale-105 transform duration-200">
                    <h4 className="text-lg font-semibold text-white mb-2">Web Development</h4>
                    <p className="text-gray-400 text-sm mb-3">2023 - Present</p>
                    <p className="text-gray-300 text-sm">
                      Built modern websites and applications using React, Next.js, and other modern web technologies.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education & Interests */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Education */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Education</h3>
                <div className="glass p-6 rounded-lg hover:scale-105 transform duration-200">
                  <h4 className="text-lg font-semibold text-white mb-2">University of California, Berkeley</h4>
                  <p className="text-gray-400 text-sm mb-3">Computer Science & Engineering</p>
                  <p className="text-gray-300 text-sm">
                    Focusing on machine learning, computer vision, and software engineering while pursuing creative interests.
                  </p>
                </div>
              </div>

              {/* Interests */}
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Interests</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-300">Photography & Videography</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-300">Machine Learning & AI</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-gray-300">Dance & Performance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                    <span className="text-gray-300">Web Development</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 