'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Define SVG icons for tools
const icons = {
  // Photography & Video Tools
  camera: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  lens: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  gimbal: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v4M12 18v4M4.93 4.93L7.76 7.76M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    </svg>
  ),
  lights: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v8M12 18v4M4.93 10.93l1.41 1.41M17.66 10.93l-1.41 1.41M2 16h2M20 16h2M6 18h12a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" />
    </svg>
  ),
  
  // Photo & Video Editing
  photoshop: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 12a6 6 0 0112 0c0 3-2.5 6-6 6s-6-3-6-6z" />
      <path d="M12 4v16" />
      <path d="M8 9h8" />
    </svg>
  ),
  lightroom: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 12v6a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h12" />
      <path d="M18 13v-3h-3" />
      <path d="M10 9.8L6 14h4l-2 2.2" />
    </svg>
  ),
  premierePro: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 4v16M4 12h16M4 12l2-2M4 12l2 2M20 12l-2-2M20 12l-2 2" />
    </svg>
  ),
  afterEffects: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17H4a2 2 0 01-2-2V5a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-1" />
      <rect x="8" y="14" width="8" height="8" rx="1" />
      <path d="M8 18h8" />
    </svg>
  ),
  davinci: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 12h6M12 9v6M12 18v3M7 15l-3 3 3 3M17 15l3 3-3 3" />
      <path d="M14.5 7.5L12 2l-2.5 5.5" />
      <path d="M20.5 10l2.5 2-2.5 2" />
      <path d="M3.5 10L1 12l2.5 2" />
    </svg>
  ),
  
  // Design & Illustration
  illustrator: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M8 8l8 8M16 8l-8 8" />
    </svg>
  ),
  xd: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M10 8v8M14 8l-2.2 4L14 16" />
    </svg>
  ),
  figma: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 110 7H12V2z" />
      <path d="M12 12.5a3.5 3.5 0 117 0 3.5 3.5 0 11-7 0z" />
      <path d="M5 19.5A3.5 3.5 0 018.5 16H12v3.5a3.5 3.5 0 11-7 0z" />
      <path d="M5 12.5A3.5 3.5 0 018.5 9H12v7H8.5A3.5 3.5 0 015 12.5z" />
    </svg>
  ),
  
  // Web & Development
  html: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 18l-6-6 6-6M8 12h8" />
    </svg>
  ),
  css: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 2l2 16.5L12 22l6-3.5L20 2H4zM8.5 8h7M7.5 12.5h7M6.5 17l7 2 4-2" />
    </svg>
  ),
  js: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 8v8.4c0 1.5-1.1 2.6-2.5 2.6S10 17.9 10 16.4" />
      <path d="M7 8v8" />
      <rect x="3" y="2" width="18" height="20" rx="2" />
    </svg>
  ),
  react: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" />
      <path d="M12 6.5c-2.2 0-4.3.4-5.9 1.1C4 8.5 3 9.7 3 11c0 1.3 1 2.5 3.1 3.4 1.6.7 3.7 1.1 5.9 1.1s4.3-.4 5.9-1.1c2.1-.9 3.1-2.1 3.1-3.4 0-1.3-1-2.5-3.1-3.4C16.3 6.9 14.2 6.5 12 6.5z" />
      <path d="M12 6.5c-1.3 0-2.5 2-3.4 5.2-.3 1.3-.6 2.9-.6 4.3 0 1.4.3 3 .6 4.3.9 3.2 2.1 5.2 3.4 5.2 1.3 0 2.5-2 3.4-5.2.3-1.3.6-2.9.6-4.3 0-1.4-.3-3-.6-4.3-.9-3.2-2.1-5.2-3.4-5.2z" transform="rotate(60 12 12)" />
      <path d="M12 6.5c-1.3 0-2.5 2-3.4 5.2-.3 1.3-.6 2.9-.6 4.3 0 1.4.3 3 .6 4.3.9 3.2 2.1 5.2 3.4 5.2 1.3 0 2.5-2 3.4-5.2.3-1.3.6-2.9.6-4.3 0-1.4-.3-3-.6-4.3-.9-3.2-2.1-5.2-3.4-5.2z" transform="rotate(300 12 12)" />
    </svg>
  ),

  // Category icons for headers
  equipment: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  software: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  webdev: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  )
};

// Category icons for headers
const categoryIcons = {
  photo: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  video: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
    </svg>
  ),
  music: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  ),
  design: (
    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19l7-7 3 3-7 7-3-3z" />
      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
      <path d="M2 2l7.586 7.586" />
    </svg>
  )
};

// Tools data organized by categories with icons
const toolsData = {
  photo: [
    { name: 'Sony A7IV', icon: icons.camera },
    { name: 'Sigma 24-70mm f/2.8', icon: icons.lens },
    { name: 'Godox Lighting', icon: icons.lights },
    { name: 'Adobe Lightroom', icon: icons.lightroom },
    { name: 'Adobe Photoshop', icon: icons.photoshop }
  ],
  video: [
    { name: 'Sony A7IV', icon: icons.camera },
    { name: 'DJI Ronin RS3', icon: icons.gimbal },
    { name: 'Adobe Premiere Pro', icon: icons.premierePro },
    { name: 'Adobe After Effects', icon: icons.afterEffects },
    { name: 'DaVinci Resolve', icon: icons.davinci }
  ],
  music: [
    { name: 'MIDI Keyboard', icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M7 4v16M17 4v16M2 11h20M2 17h20" />
        <path d="M5 11v3M9 11v3M13 11v3M17 11v3M21 11v3" />
      </svg>
    ) },
    { name: 'Logic Pro X', icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 18l3.5-6 4.5 7.5M9 15h6M3 8l3-4 1.5 6" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ) },
    { name: 'Ableton Live', icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M8 8v8M12 8v8M16 8v8" />
      </svg>
    ) },
    { name: 'Audio Interface', icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2" />
        <circle cx="6" cy="12" r="2" />
        <circle cx="12" cy="12" r="2" />
        <circle cx="18" cy="12" r="2" />
      </svg>
    ) }
  ],
  design: [
    { name: 'Adobe Illustrator', icon: icons.illustrator },
    { name: 'Adobe XD', icon: icons.xd },
    { name: 'Figma', icon: icons.figma },
    { name: 'HTML/CSS', icon: icons.html },
    { name: 'JavaScript', icon: icons.js },
    { name: 'React', icon: icons.react }
  ]
};

export const Tools = () => {
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const sectionRefs = {
    photo: useRef<HTMLDivElement>(null),
    video: useRef<HTMLDivElement>(null),
    music: useRef<HTMLDivElement>(null),
    design: useRef<HTMLDivElement>(null)
  };

  // Intersection Observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id') || '';
            if (id && !visibleSections.includes(id)) {
              setVisibleSections(prev => [...prev, id]);
            }
          }
        });
      },
      { 
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach(ref => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [visibleSections]);

  // Function to render a tool chip
  const renderToolChip = (name: string, icon: React.ReactNode, delay: number, isVisible: boolean) => (
    <div 
      className="inline-flex items-center rounded-full px-3 py-1.5 bg-pink-500/10 text-pink-300 m-1 transition-all duration-300"
      style={{ 
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1)' : 'scale(0.9)',
        transitionDelay: `${delay * 0.05}s`
      }}
    >
      <span className="mr-2">{icon}</span>
      {name}
    </div>
  );

  return (
    <section id="tools" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            Tools & Equipment
          </h2>
          <p className="text-white/70 max-w-lg mx-auto">
            The professional tools and equipment I'm experienced with using across
            photography, videography, music production, and design.
          </p>
        </div>

        {/* Photography */}
        <div 
          id="photo" 
          ref={sectionRefs.photo}
          className={`mb-16 transition-all duration-1000 ${
            visibleSections.includes('photo') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-xl font-semibold mb-6 text-white inline-flex items-center">
            <span className="text-pink-400 mr-2 text-xl">
              {categoryIcons.photo}
            </span>
            Photography
          </h3>
          <div className="flex flex-wrap">
            {toolsData.photo.map((tool, idx) => 
              renderToolChip(tool.name, tool.icon, idx, visibleSections.includes('photo'))
            )}
          </div>
        </div>

        {/* Video */}
        <div 
          id="video" 
          ref={sectionRefs.video}
          className={`mb-16 transition-all duration-1000 ${
            visibleSections.includes('video') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.2s' }}
        >
          <h3 className="text-xl font-semibold mb-6 text-white inline-flex items-center">
            <span className="text-pink-400 mr-2 text-xl">
              {categoryIcons.video}
            </span>
            Video
          </h3>
          <div className="flex flex-wrap">
            {toolsData.video.map((tool, idx) => 
              renderToolChip(tool.name, tool.icon, idx, visibleSections.includes('video'))
            )}
          </div>
        </div>

        {/* Music */}
        <div 
          id="music" 
          ref={sectionRefs.music}
          className={`mb-16 transition-all duration-1000 ${
            visibleSections.includes('music') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.3s' }}
        >
          <h3 className="text-xl font-semibold mb-6 text-white inline-flex items-center">
            <span className="text-pink-400 mr-2 text-xl">
              {categoryIcons.music}
            </span>
            Music
          </h3>
          <div className="flex flex-wrap">
            {toolsData.music.map((tool, idx) => 
              renderToolChip(tool.name, tool.icon, idx, visibleSections.includes('music'))
            )}
          </div>
        </div>

        {/* Design */}
        <div 
          id="design" 
          ref={sectionRefs.design}
          className={`transition-all duration-1000 ${
            visibleSections.includes('design') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.4s' }}
        >
          <h3 className="text-xl font-semibold mb-6 text-white inline-flex items-center">
            <span className="text-pink-400 mr-2 text-xl">
              {categoryIcons.design}
            </span>
            Design
          </h3>
          <div className="flex flex-wrap">
            {toolsData.design.map((tool, idx) => 
              renderToolChip(tool.name, tool.icon, idx, visibleSections.includes('design'))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper function to format category names
function formatCategoryName(category: string): string {
  switch(category) {
    case 'equipment':
      return 'Photography & Video Equipment';
    case 'software':
      return 'Editing & Design Software';
    case 'webdev':
      return 'Web Development';
    default:
      return category.charAt(0).toUpperCase() + category.slice(1);
  }
} 