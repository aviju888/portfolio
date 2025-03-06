'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  const [visibleSections, setVisibleSections] = useState<string[]>([]);
  const sectionRefs = {
    languages: useRef<HTMLDivElement>(null),
    frameworks: useRef<HTMLDivElement>(null),
    tools: useRef<HTMLDivElement>(null)
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
  }, [visibleSections, sectionRefs]);

  // Function to render a skill chip
  const renderSkillChip = (name: string, icon: React.ReactNode, delay: number, isVisible: boolean) => (
    <div 
      key={name}
      className="inline-flex items-center rounded-full px-3 py-1.5 bg-blue-500/10 text-blue-300 m-1 transition-all duration-300"
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
    <section id="skills" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Technical Skills
          </h2>
          <p className="text-white/70 max-w-lg mx-auto">
            My technical expertise spans multiple domains, focusing on machine learning, 
            software development, and cloud infrastructure.
          </p>
        </div>

        {/* Programming Languages */}
        <div 
          id="languages" 
          ref={sectionRefs.languages}
          className={`mb-16 transition-all duration-1000 ${
            visibleSections.includes('languages') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
        >
          <h3 className="text-xl font-semibold mb-6 text-white inline-flex items-center">
            <span className="text-blue-400 mr-2 text-xl">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M8 9l3 3-3 3M16 15h-8M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5z" />
              </svg>
            </span>
            Programming Languages
          </h3>
          <div className="flex flex-wrap">
            {skillsData.languages.map((skill, idx) => (
              <div key={skill.name}>
                {renderSkillChip(skill.name, skill.icon, idx, visibleSections.includes('languages'))}
              </div>
            ))}
          </div>
        </div>

        {/* Frameworks & Libraries */}
        <div 
          id="frameworks" 
          ref={sectionRefs.frameworks}
          className={`mb-16 transition-all duration-1000 ${
            visibleSections.includes('frameworks') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.2s' }}
        >
          <h3 className="text-xl font-semibold mb-6 text-white inline-flex items-center">
            <span className="text-blue-400 mr-2 text-xl">
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 18l2-2-2-2M9 18H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-2M12 12v8M12 12l-4 4M12 12l4 4" />
              </svg>
            </span>
            Frameworks & Libraries
          </h3>
          <div className="flex flex-wrap">
            {skillsData.frameworks.map((skill, idx) => (
              <div key={skill.name}>
                {renderSkillChip(skill.name, skill.icon, idx, visibleSections.includes('frameworks'))}
              </div>
            ))}
          </div>
        </div>

        {/* Tools & Technologies */}
        <div 
          id="tools" 
          ref={sectionRefs.tools}
          className={`transition-all duration-1000 ${
            visibleSections.includes('tools') 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.4s' }}
        >
          <h3 className="text-xl font-semibold mb-6 text-white inline-flex items-center">
            <span className="text-blue-400 mr-2 text-xl">
              {icons.tools}
            </span>
            Tools & Technologies
          </h3>
          <div className="flex flex-wrap">
            {skillsData.tools.map((skill, idx) => (
              <div key={skill.name}>
                {renderSkillChip(skill.name, skill.icon, idx, visibleSections.includes('tools'))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-20">
          <ScrollIndicator onClick={() => {
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
              projectsSection.scrollIntoView({ behavior: 'smooth' });
            }
          }} />
        </div>
      </div>
    </section>
  );
}; 