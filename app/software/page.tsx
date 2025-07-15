'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function SoftwarePage() {
  const projects = [
    {
      title: 'KOSMOS Website',
      description: 'Promotional and archival branding site with interactive biographies and event management',
      image: '/images/projects/kosmos-site.png',
      year: 'January 2025',
      category: 'Web Development',
      link: 'https://kosmosucb.github.io/'
    },
    {
      title: 'Diffusion Models',
      description: 'Implementation of custom diffusion sampling loops with inpainting and text-conditional translation',
      image: '/images/projects/diffusion-models.png',
      year: 'November 2024',
      category: 'AI/ML',
      link: 'https://aviju888.github.io/computer-vision/old_1/web/proj5.html'
    },
    {
      title: 'Hybrid Images Project',
      description: 'Created images combining low and high-frequency content using Gaussian and Laplacian filtering',
      image: '/images/projects/hybrid-images.png',
      year: 'October 2024',
      category: 'Computer Vision',
      link: 'https://aviju888.github.io/computer-vision/old_1/web/proj2.html'
    },
    {
      title: 'Colorizing Historical Imagery',
      description: 'Automated system for aligning and colorizing Prokudin-Gorskii collection with multi-scale alignment',
      image: '/images/projects/colorizing-imagery.png',
      year: 'September 2024',
      category: 'Computer Vision',
      link: 'https://aviju888.github.io/computer-vision/old_1/web/proj1.html'
    },
    {
      title: 'Asthma & AQI Analysis',
      description: 'Research on correlation between air quality and asthma rates using linear regression analysis',
      image: '/images/projects/asthma-aqi.png',
      year: 'May 2024',
      category: 'Data Science',
      link: '/images/projects/ph142-final.pdf'
    },
    {
      title: 'PASAE Website',
      description: 'Organization website redesign with modern UI/UX and mobile responsiveness',
      image: '/images/projects/pasae-site.png',
      year: 'Fall 2023-Spring 2024',
      category: 'Web Development',
      link: 'https://pasae.studentorg.berkeley.edu/'
    },
    {
      title: 'TERF Toxic Speech Detection',
      description: 'ML model to detect and classify toxic speech through Twitter API with data preprocessing',
      image: '/images/projects/detect-toxic-speech.png',
      year: 'Fall 2023',
      category: 'AI/ML'
    },
    {
      title: 'Pacman AI Agent',
      description: 'Built AI algorithms for Pacman simulation with strategic decision-making and Q-Learning',
      image: '/images/projects/pacman.png',
      year: 'April 2023',
      category: 'AI/ML'
    },
    {
      title: '61CPU Project',
      description: '5-stage pipelined RISC-V CPU implementation with hazard detection and forwarding',
      image: '/images/projects/cs61cpu.png',
      year: 'Spring 2023',
      category: 'Systems'
    },
    {
      title: 'Gitlet Version Control',
      description: 'Mini version of Git version control system with core commands and persistent storage',
      image: '/images/projects/gitlet.png',
      year: 'Spring 2022',
      category: 'Systems'
    },
    {
      title: 'Solar Water Heating Optimization',
      description: 'Analysis of solar water heating system performance with time-series analysis',
      image: '/images/projects/lbl-swhs.png',
      year: 'July 2021',
      category: 'Data Science',
      link: 'https://docs.google.com/presentation/d/1ckUw_FGskqT6gWPi_v5Z3NdMZqIRxGN9/edit?usp=sharing&ouid=103769897949865466045&rtpof=true&sd=true'
    }
  ];

  const skills = [
    {
      category: "Languages",
      items: [
        { name: "TypeScript", icon: "🔷" },
        { name: "Python", icon: "🐍" },
        { name: "Java", icon: "☕" },
        { name: "C/C++", icon: "⚙️" },
        { name: "SQL", icon: "🗄️" }
      ]
    },
    {
      category: "Frameworks & Libraries",
      items: [
        { name: "React", icon: "⚛️" },
        { name: "Next.js", icon: "▲" },
        { name: "PyTorch", icon: "🔥" },
        { name: "TensorFlow", icon: "🧠" }
      ]
    },
    {
      category: "Tools & Platforms",
      items: [
        { name: "Git", icon: "📝" },
        { name: "Docker", icon: "🐳" },
        { name: "AWS", icon: "☁️" }
      ]
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI/ML': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Computer Vision': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Systems': return 'bg-orange-500/20 text-orange-300 border-orange-500/30';
      case 'Data Science': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'Web Development': return 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
        
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
      <section className="pt-32 pb-20 relative z-10 flex items-center justify-center min-h-[50vh]">
        <div className="w-full flex justify-center">
          <div className="relative group">
            {/* Soft Glow Behind Card */}
            <div className="absolute -inset-6 md:-inset-8 rounded-3xl pointer-events-none z-0 animate-glow bg-gradient-to-tr from-blue-500/30 via-cyan-500/20 to-indigo-500/30 blur-2xl opacity-80 group-hover:opacity-100 transition duration-300"></div>
            <div className="glass-enhanced rounded-3xl shadow-2xl px-8 py-12 md:px-16 md:py-16 max-w-2xl w-full text-center border border-white/10 backdrop-blur-lg relative fade-in z-10 group-hover:scale-105 group-hover:shadow-2xl transition-transform duration-300">
              {/* Badge */}
              <div className="flex justify-center mb-2">
                <span className="px-4 py-1 rounded-full bg-white/10 text-xs font-semibold text-blue-200 tracking-widest shadow-sm border border-blue-400/20 backdrop-blur-sm">FEATURED</span>
              </div>
              {/* Accent Icon */}
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full animated-gradient-icon shadow-lg animate-float-slow">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="5" width="18" height="14" rx="3" fill="currentColor" className="text-blue-400"/>
                    <path d="M8 13l-2 2 2 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M16 13l2 2-2 2" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="7" y="2" width="10" height="4" rx="2" fill="currentColor" className="text-cyan-400"/>
                  </svg>
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-xl" style={{textShadow: '0 4px 24px rgba(102,126,234,0.25)'}}>
                Software <span className="animated-gradient-text-smooth">Projects</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-6 font-medium tracking-wide">
                Machine learning, computer vision, systems programming, and web development
              </p>
              <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto">
                Building intelligent systems and scalable applications that solve real-world problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Projects</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              A collection of my software projects spanning multiple domains and technologies
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <div key={index} className="group">
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
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getCategoryColor(project.category)}`}>
                        {project.category}
                      </span>
                    </div>
                    {project.link && (
                      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
                        >
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </a>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-semibold text-white group-hover:text-gray-300 transition-colors">
                        {project.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-sm mb-3">{project.description}</p>
                    <span className="text-gray-500 text-xs">{project.year}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Technologies</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Programming languages, frameworks, and tools I use for software development
            </p>
          </div>

          <div className="max-w-6xl mx-auto space-y-12">
            {skills.map((skillGroup, index) => (
              <div key={index}>
                <h3 className="text-2xl font-semibold text-white mb-8 text-center">{skillGroup.category}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {skillGroup.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-3 p-4 glass rounded-lg hover:bg-white/10 transition-colors hover:scale-105 transform duration-200">
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-sm text-white/80 font-medium">{item.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
} 