'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function CreativePage() {
  const projects = [
    {
      title: "Dance Team Photography",
      description: "Dynamic performance captures and team portraits for UC Berkeley dance organizations",
      image: "/images/creative/afx-unhinged.jpg",
      year: "2022-2023",
      category: "Photography"
    },
    {
      title: "Graduation Photography",
      description: "Professional portrait photography for graduation milestones",
      image: "/images/gallery/monicagrad3.png",
      year: "2023-2024",
      category: "Photography"
    },
    {
      title: "[KOSMOS @ Cal] Film Production Lead",
      description: "Lead videographer and editor for dance team performances",
      image: "/images/creative/kosmos1.png",
      year: "2022-Present",
      category: "Videography",
      link: "https://youtube.com/playlist?list=PLkU2ISCXGJxisfy-wTkYTaF-Z44t-3UUS&si=-VNjpZuqT51-IVTE"
    },
    {
      title: "Event Videography",
      description: "Professional video coverage for dance events and competitions",
      image: "/images/creative/kosmos-rpd.jpg",
      year: "2023-Present",
      category: "Videography"
    },
    {
      title: "[AFX Dance] Training Team Director",
      description: "Led and coordinated 60+ member dance team",
      image: "/images/creative/airfx.png",
      year: "August 2024-December 2024",
      category: "Leadership",
      link: 'https://www.youtube.com/watch?v=bQH3FsdGZmQ&t=11s&pp=ygUNYWlyZnggYmFsY29ueQ%3D%3D'
    },
    {
      title: "[KOSMOS @ Cal] Design Lead",
      description: "Brand identity and content creation",
      image: "/images/creative/kosmos.png",
      year: "August 2022-Present",
      category: "Design",
      link: "https://instagram.com/kosmoskpop"
    }
  ];

  const skills = [
    {
      category: "Equipment",
      items: [
        { name: "Sony A7IV", icon: "📷" },
        { name: "50mm f/1.8 + 20mm f/1.8", icon: "🔍" },
        { name: "Godox Lighting", icon: "💡" },
        { name: "DJI Ronin RS3", icon: "🎥" }
      ]
    },
    {
      category: "Software",
      items: [
        { name: "Adobe Lightroom", icon: "🎨" },
        { name: "Adobe Photoshop", icon: "🖼️" },
        { name: "Adobe Premiere Pro", icon: "🎬" },
        { name: "Adobe After Effects", icon: "✨" },
        { name: "DaVinci Resolve", icon: "🎭" }
      ]
    },
    {
      category: "Design",
      items: [
        { name: "Figma", icon: "🎯" },
        { name: "Canva Pro", icon: "📐" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
        
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
            <div className="absolute -inset-6 md:-inset-8 rounded-3xl pointer-events-none z-0 animate-glow bg-gradient-to-tr from-purple-500/30 via-pink-500/20 to-blue-500/30 blur-2xl opacity-80 group-hover:opacity-100 transition duration-300"></div>
            <div className="glass-enhanced rounded-3xl shadow-2xl px-8 py-12 md:px-16 md:py-16 max-w-2xl w-full text-center border border-white/10 backdrop-blur-lg relative fade-in z-10 group-hover:scale-105 group-hover:shadow-2xl transition-transform duration-300">
              {/* Badge */}
              <div className="flex justify-center mb-2">
                <span className="px-4 py-1 rounded-full bg-white/10 text-xs font-semibold text-purple-200 tracking-widest shadow-sm border border-purple-400/20 backdrop-blur-sm">FEATURED</span>
              </div>
              {/* Accent Icon */}
              <div className="flex justify-center mb-6">
                <span className="inline-flex items-center justify-center w-14 h-14 rounded-full animated-gradient-icon shadow-lg animate-float-slow">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect x="3" y="7" width="18" height="13" rx="3" fill="currentColor" className="text-purple-400"/>
                    <circle cx="12" cy="13.5" r="3.5" fill="white" />
                    <rect x="7" y="2" width="10" height="5" rx="2" fill="currentColor" className="text-pink-400"/>
                  </svg>
                </span>
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-xl" style={{textShadow: '0 4px 24px rgba(102,126,234,0.25)'}}>
                Creative <span className="animated-gradient-text-smooth">Work</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-200 mb-6 font-medium tracking-wide">
                Photography, videography, and leadership across dance organizations and events
              </p>
              <p className="text-base md:text-lg text-gray-400 max-w-xl mx-auto">
                Capturing moments, telling stories, and leading teams to create compelling visual experiences.
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
              A collection of my creative work spanning photography, videography, and leadership
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
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-300 border border-purple-500/30">
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
            <h2 className="text-4xl font-bold text-white mb-4">Tools & Skills</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Equipment, software, and design tools I use for creative projects
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