'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ScrollIndicator } from '@/app/components/ui/ScrollIndicator';

// Skills data organized by categories
const skillsData = {
  languages: [
    { name: 'TypeScript', level: 90 },
    { name: 'Python', level: 95 },
    { name: 'Java', level: 85 },
    { name: 'C/C++', level: 80 },
    { name: 'SQL', level: 75 },
    { name: 'Rust', level: 65 }
  ],
  frameworks: [
    { name: 'React', level: 90 },
    { name: 'Next.js', level: 85 },
    { name: 'PyTorch', level: 80 },
    { name: 'TensorFlow', level: 75 },
    { name: 'Node.js', level: 80 },
    { name: 'Express', level: 75 }
  ],
  tools: [
    { name: 'Git', level: 90 },
    { name: 'Docker', level: 80 },
    { name: 'AWS', level: 75 },
    { name: 'CI/CD', level: 70 },
    { name: 'Kubernetes', level: 65 },
    { name: 'Linux/Unix', level: 85 }
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
      { threshold: 0.15 }
    );

    // Observe each section
    Object.values(sectionRefs).forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [visibleSections]);

  return (
    <section id="tech-stack" className="py-20 bg-black relative">
      <div className="container mx-auto px-6">
        <div className="mb-12 opacity-0 animate-fadeIn" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Skills & Technologies</h2>
          <p className="text-white/60 max-w-2xl">
            My toolkit for building robust applications, from front-end to back-end, AI systems to low-level architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Programming Languages */}
          <div 
            id="languages" 
            ref={sectionRefs.languages}
            className={`transition-all duration-1000 ${
              visibleSections.includes('languages') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
          >
            <h3 className="text-xl font-semibold mb-6 text-white inline-flex items-center">
              <span className="text-blue-400 mr-2 text-2xl">&#123;&#125;</span>
              Programming Languages
            </h3>
            <div className="space-y-4">
              {skillsData.languages.map((skill, idx) => (
                <div key={skill.name} className="relative">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-white">{skill.name}</span>
                    <span className="text-xs text-blue-300">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"
                      style={{ 
                        width: visibleSections.includes('languages') ? `${skill.level}%` : '0%',
                        transition: 'width 1.5s cubic-bezier(0.19, 1, 0.22, 1)',
                        transitionDelay: `${0.1 + idx * 0.1}s`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Frameworks & Libraries */}
          <div 
            id="frameworks" 
            ref={sectionRefs.frameworks}
            className={`transition-all duration-1000 ${
              visibleSections.includes('frameworks') 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '0.2s' }}
          >
            <h3 className="text-xl font-semibold mb-6 text-white inline-flex items-center">
              <span className="text-blue-400 mr-2 text-2xl">&#60;/&#62;</span>
              Frameworks & Libraries
            </h3>
            <div className="space-y-4">
              {skillsData.frameworks.map((skill, idx) => (
                <div key={skill.name} className="relative">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-white">{skill.name}</span>
                    <span className="text-xs text-blue-300">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ 
                        width: visibleSections.includes('frameworks') ? `${skill.level}%` : '0%',
                        transition: 'width 1.5s cubic-bezier(0.19, 1, 0.22, 1)',
                        transitionDelay: `${0.1 + idx * 0.1}s`
                      }}
                    ></div>
                  </div>
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
              <span className="text-blue-400 mr-2 text-2xl">⚙️</span>
              Tools & Technologies
            </h3>
            <div className="space-y-4">
              {skillsData.tools.map((skill, idx) => (
                <div key={skill.name} className="relative">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-white">{skill.name}</span>
                    <span className="text-xs text-blue-300">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full"
                      style={{ 
                        width: visibleSections.includes('tools') ? `${skill.level}%` : '0%',
                        transition: 'width 1.5s cubic-bezier(0.19, 1, 0.22, 1)',
                        transitionDelay: `${0.1 + idx * 0.1}s`
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-20">
          <ScrollIndicator />
        </div>
      </div>
    </section>
  );
}; 