'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';

// Define SVG icons for tools
const icons = {
  // Photography & Video Tools
  canva: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <path d="M9 8h6M9 12h6M9 16h6" />
    </svg>
  ),
  procreate: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2H7a2 2 0 01-2-2V5z" />
      <path d="M12 8c2.2 0 4 1.8 4 4s-1.8 4-4 4-4-1.8-4-4 1.8-4 4-4z" />
      <path d="M16 5.5l-4 4-4-4" />
    </svg>
  ),
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
    { name: '50mm f/1.8 + 20mm f/1.8', icon: icons.lens },
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
    )},
    { name: 'GarageBand', icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    )},
    { name: 'Logic Pro', icon: (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    )}
  ],
  design: [
    { name: 'Adobe Illustrator', icon: icons.illustrator },
    { name: 'Figma', icon: icons.figma },
    { name: 'Canva Pro', icon: icons.canva },
    { name: 'Procreate', icon: icons.procreate },
    { name: 'Adobe XD', icon: icons.xd }
  ]
};

export const Tools = () => {
  const [activeSection, setActiveSection] = useState<'photo' | 'video' | 'music' | 'design'>('photo');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  type SectionRefKey = 'photo' | 'video' | 'music' | 'design';

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRefs.current[activeSection];
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => observer.disconnect();
  }, [activeSection]);

  // Smooth scroll to section
  const scrollToSection = (sectionId: SectionRefKey) => {
    setActiveSection(sectionId);
    const element = sectionRefs.current[sectionId];
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Modern tool chip component
  const renderToolChip = (name: string, icon: React.ReactNode, delay: number, isVisible: boolean) => (
    <div
      className={`group relative bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 rounded-xl p-4 transition-all duration-500 transform hover:scale-105 hover:border-pink-500/40 backdrop-blur-sm ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center text-pink-300 group-hover:bg-pink-500/30 transition-colors duration-300">
          {icon}
        </div>
        <div>
          <h4 className="text-sm font-medium text-white group-hover:text-white transition-colors">
            {name}
          </h4>
        </div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-black relative overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-900/5 via-purple-900/5 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Modern header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 bg-clip-text text-transparent">
              Creative Tools & Skills
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Professional equipment and software I use to bring creative visions to life
          </p>
        </div>

        {/* Modern navigation tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {Object.entries(toolsData).map(([key, tools]) => (
            <button
              key={key}
              onClick={() => scrollToSection(key as SectionRefKey)}
              className={`group px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                activeSection === key
                  ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/25'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <span className="group-hover:scale-110 transition-transform duration-300">
                {categoryIcons[key as keyof typeof categoryIcons]}
              </span>
              <span className="capitalize">{key}</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                {tools.length}
              </span>
            </button>
          ))}
        </div>

        {/* Modern bento-style grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Object.entries(toolsData).map(([category, tools]) => (
            <div
              key={category}
              ref={(el) => {
                sectionRefs.current[category] = el;
              }}
              className={`space-y-4 ${
                activeSection === category ? 'block' : 'hidden'
              }`}
            >
              {/* Category header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30">
                  <span className="text-pink-300">
                    {categoryIcons[category as keyof typeof categoryIcons]}
                  </span>
                  <h3 className="text-lg font-semibold text-white capitalize">
                    {category}
                  </h3>
                </div>
              </div>

              {/* Tools grid */}
              <div className="grid gap-4">
                {tools.map((tool, index) =>
                  renderToolChip(tool.name, tool.icon, index * 100, isVisible)
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modern stats section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-pink-500/10 to-purple-500/10 border border-pink-500/20 backdrop-blur-sm">
            <div className="text-3xl font-bold text-pink-400 mb-2">5+</div>
            <div className="text-sm text-white/70">Years Experience</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/20 backdrop-blur-sm">
            <div className="text-3xl font-bold text-purple-400 mb-2">15+</div>
            <div className="text-sm text-white/70">Tools Mastered</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm">
            <div className="text-3xl font-bold text-blue-400 mb-2">100+</div>
            <div className="text-sm text-white/70">Projects Completed</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-pink-500/10 border border-cyan-500/20 backdrop-blur-sm">
            <div className="text-3xl font-bold text-cyan-400 mb-2">4</div>
            <div className="text-sm text-white/70">Creative Domains</div>
          </div>
        </div>
      </div>
    </section>
  );
}; 