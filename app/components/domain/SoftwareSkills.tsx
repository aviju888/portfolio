'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { ScrollIndicator } from '@/app/components/ui/ScrollIndicator';

// Define SVG icons for each skill type
const icons = {
  typescript: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 3h18v18H3z" />
      <path d="M12 8v8" />
      <path d="M8 12h8" />
    </svg>
  ),
  python: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 7.5C9.5 7.5 7.5 9 7.5 12s2 4.5 4.5 4.5c.5 0 1-.1 1.5-.2v-3.8c-1 0-1.8-.3-1.8-1s.8-1 1.8-1 1.8.3 1.8 1v3.8c.5.1 1 .2 1.5.2 2.5 0 4.5-1.5 4.5-4.5s-2-4.5-4.5-4.5c-2.2 0-4 1.2-4.5 3" />
    </svg>
  ),
  java: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 21c8 0 16-5 16-11 0-2-1-3-3-3s-3 1-3 3c0 1.5 1 3 3 3M9 7c0-1-1-4-4-4" />
      <path d="M7 17c2-1 5-1 7-1 4 0 6-2 6-5s-3-5-6-5c-4 0-5 3-5 6" />
    </svg>
  ),
  cpp: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h8M14 8v8M18 8v8M22 12h-2M6 8v8M2 12h2" />
    </svg>
  ),
  sql: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="M7 10h4M7 14h2" />
      <line x1="16" y1="10" x2="16" y2="14" />
    </svg>
  ),
  react: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="12" r="10" strokeDasharray="20,50" strokeDashoffset="10" />
      <circle cx="12" cy="12" r="6" strokeDasharray="10,30" strokeDashoffset="15" />
    </svg>
  ),
  nextjs: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  pytorch: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 17l4-4M12 19c2 0 7-1 7-8 0-5-3-8-7-8-5 0-7 3-7 8 0 4 2 8 7 8z" />
      <circle cx="16" cy="7" r="2" />
    </svg>
  ),
  tensorflow: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2v20M2 6h20M2 18h20" />
      <path d="M7 6v12M17 6v12" />
    </svg>
  ),
  git: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v18M8 8h3M8 12h8M8 16h3M16.5 14.5l3 3-3 3" />
    </svg>
  ),
  docker: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="8" width="4" height="4" />
      <rect x="9" y="8" width="4" height="4" />
      <rect x="15" y="8" width="4" height="4" />
      <rect x="3" y="4" width="4" height="4" />
      <rect x="9" y="4" width="4" height="4" />
      <path d="M21 17.5c-1-1.5-2-2-4.5-2-3 0-5 2-8.5 2s-4.5-2-4.5-2" />
    </svg>
  ),
  aws: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 16l-3 6M19 16l3 6M15 9l-3 6M9 9l3 6M12 3l4 4M12 3L8 7" />
    </svg>
  ),
  cicd: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4zM6 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      <path d="M18 16c0-2.4-4.5-3.5-6-4 1.5-.5 6-1.6 6-4a2 2 0 1 0 0-4c-1.89 0-3 .5-4 1-1-2-4-4-8-4" />
      <path d="M6 4v4" />
      <path d="M6 12v4" />
      <path d="M18 4v4" />
      <path d="M12 16l-2-1.25" />
    </svg>
  ),
  tools: (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  )
};

// Skills data organized by categories with icons
const skillsData = {
  languages: [
    { name: 'TypeScript', icon: icons.typescript },
    { name: 'Python', icon: icons.python },
    { name: 'Java', icon: icons.java },
    { name: 'C/C++', icon: icons.cpp },
    { name: 'SQL', icon: icons.sql }
  ],
  frameworks: [
    { name: 'React', icon: icons.react },
    { name: 'Next.js', icon: icons.nextjs },
    { name: 'PyTorch', icon: icons.pytorch },
    { name: 'TensorFlow', icon: icons.tensorflow }
  ],
  tools: [
    { name: 'Git', icon: icons.git },
    { name: 'Docker', icon: icons.docker },
    { name: 'AWS', icon: icons.aws },
    { name: 'CI/CD', icon: icons.cicd }
  ]
};

export const SoftwareSkills = () => {
  const [activeSection, setActiveSection] = useState<'languages' | 'frameworks' | 'tools'>('languages');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  type SectionRefKey = 'languages' | 'frameworks' | 'tools';

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

  // Modern skill chip component
  const renderSkillChip = (name: string, icon: React.ReactNode, delay: number, isVisible: boolean) => (
    <div
      className={`group relative bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4 transition-all duration-500 transform hover:scale-105 hover:border-blue-500/40 backdrop-blur-sm ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-300 group-hover:bg-blue-500/30 transition-colors duration-300">
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
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-cyan-900/5 to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Modern header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Technical Skills
            </span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            My technical expertise spans multiple domains, focusing on machine learning, 
            software development, and cloud infrastructure.
          </p>
        </div>

        {/* Modern navigation tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {Object.entries(skillsData).map(([key, skills]) => (
            <button
              key={key}
              onClick={() => scrollToSection(key as SectionRefKey)}
              className={`group px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${
                activeSection === key
                  ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
            >
              <span className="group-hover:scale-110 transition-transform duration-300">
                {key === 'languages' && (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                  </svg>
                )}
                {key === 'frameworks' && (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                )}
                {key === 'tools' && (
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                  </svg>
                )}
              </span>
              <span className="capitalize">{key}</span>
              <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                {skills.length}
              </span>
            </button>
          ))}
        </div>

        {/* Modern bento-style grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {Object.entries(skillsData).map(([category, skills]) => (
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
                <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30">
                  <span className="text-blue-300">
                    {category === 'languages' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    )}
                    {category === 'frameworks' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                    )}
                    {category === 'tools' && (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                      </svg>
                    )}
                  </span>
                  <h3 className="text-lg font-semibold text-white capitalize">
                    {category}
                  </h3>
                </div>
              </div>

              {/* Skills grid */}
              <div className="grid gap-4">
                {skills.map((skill, index) =>
                  renderSkillChip(skill.name, skill.icon, index * 100, isVisible)
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modern stats section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 backdrop-blur-sm">
            <div className="text-3xl font-bold text-blue-400 mb-2">5+</div>
            <div className="text-sm text-white/70">Programming Languages</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 backdrop-blur-sm">
            <div className="text-3xl font-bold text-cyan-400 mb-2">4+</div>
            <div className="text-sm text-white/70">Frameworks & Libraries</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-teal-500/10 to-blue-500/10 border border-teal-500/20 backdrop-blur-sm">
            <div className="text-3xl font-bold text-teal-400 mb-2">4+</div>
            <div className="text-sm text-white/70">Tools & Platforms</div>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-blue-500/10 border border-indigo-500/20 backdrop-blur-sm">
            <div className="text-3xl font-bold text-indigo-400 mb-2">3+</div>
            <div className="text-sm text-white/70">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}; 