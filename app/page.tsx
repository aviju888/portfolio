'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function HomePage() {
  const featuredProjects = [
    {
      title: 'KOSMOS Website',
      description: 'Promotional and archival branding site',
      image: '/images/projects/kosmos-site.png',
      category: 'Software',
      href: '/software'
    },
    {
      title: 'Dance Team Photography',
      description: 'Dynamic performance captures and team portraits',
      image: '/images/creative/afx-unhinged.jpg',
      category: 'Creative',
      href: '/creative'
    },
    {
      title: 'Diffusion Models',
      description: 'Custom diffusion sampling loops implementation',
      image: '/images/projects/diffusion-models.png',
      category: 'Software',
      href: '/software'
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
        
        {/* Moving Particles */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
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
      <section className="relative min-h-screen flex items-center justify-center z-10">
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 slide-up">
              Hi, I'm <span className="gradient-text">Avi Ju</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 slide-up animation-delay-200">
              Creative technologist bridging the gap between art and engineering
            </p>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto slide-up animation-delay-400">
              I create compelling visual stories through photography and videography, 
              while building intelligent systems through machine learning and software development.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center slide-up animation-delay-600">
              <Link 
                href="/creative"
                className="px-8 py-4 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-colors hover:scale-105 transform duration-200"
              >
                View Creative Work
              </Link>
              <Link 
                href="/software"
                className="px-8 py-4 glass text-white font-semibold rounded-lg hover:bg-white/10 transition-colors hover:scale-105 transform duration-200"
              >
                View Software Projects
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Featured Work</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A selection of my recent projects across creative and software domains
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <Link
                key={index}
                href={project.href}
                className="group block"
              >
                <div className="relative overflow-hidden rounded-lg hover-lift glass">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors"></div>
                    <div className="absolute top-4 left-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.category === 'Creative' 
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                      }`}>
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gray-300 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm">
                      {project.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center glass p-12 rounded-2xl">
            <h2 className="text-4xl font-bold text-white mb-8">About Me</h2>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              I'm a UC Berkeley student passionate about both creative expression and technical innovation. 
              When I'm not coding machine learning models or building websites, you'll find me behind a camera 
              capturing dance performances or leading creative teams.
            </p>
            <Link 
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-lg hover:bg-white/20 transition-colors hover:scale-105 transform duration-200"
            >
              Learn More About Me
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
