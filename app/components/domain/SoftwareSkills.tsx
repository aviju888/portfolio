'use client';

import React from 'react';

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
  )
};

// Skills data organized by categories
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
    { name: 'AWS', icon: icons.aws }
  ]
};

export const SoftwareSkills = () => {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Technical Skills</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            My technical expertise spans multiple domains, focusing on machine learning, 
            software development, and cloud infrastructure.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Languages */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Languages</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {skillsData.languages.map((skill, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70">
                    {skill.icon}
                  </div>
                  <span className="text-sm text-white/80">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Frameworks */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Frameworks & Libraries</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {skillsData.frameworks.map((skill, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70">
                    {skill.icon}
                  </div>
                  <span className="text-sm text-white/80">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Tools & Platforms</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {skillsData.tools.map((skill, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70">
                    {skill.icon}
                  </div>
                  <span className="text-sm text-white/80">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 