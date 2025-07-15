'use client';

import React from 'react';

// Define SVG icons for tools
const icons = {
  camera: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
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
  figma: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5.5A3.5 3.5 0 018.5 2H12v7H8.5A3.5 3.5 0 015 5.5z" />
      <path d="M12 2h3.5a3.5 3.5 0 110 7H12V2z" />
      <path d="M12 12.5a3.5 3.5 0 117 0 3.5 3.5 0 11-7 0z" />
      <path d="M5 19.5A3.5 3.5 0 018.5 16H12v3.5a3.5 3.5 0 11-7 0z" />
      <path d="M5 12.5A3.5 3.5 0 018.5 9H12v7H8.5A3.5 3.5 0 015 12.5z" />
    </svg>
  ),
  canva: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <path d="M9 8h6M9 12h6M9 16h6" />
    </svg>
  )
};

// Tools data organized by categories
const toolsData = {
  equipment: [
    { name: 'Sony A7IV', icon: icons.camera },
    { name: '50mm f/1.8 + 20mm f/1.8', icon: icons.camera },
    { name: 'Godox Lighting', icon: icons.camera },
    { name: 'DJI Ronin RS3', icon: icons.camera }
  ],
  software: [
    { name: 'Adobe Lightroom', icon: icons.lightroom },
    { name: 'Adobe Photoshop', icon: icons.photoshop },
    { name: 'Adobe Premiere Pro', icon: icons.premierePro },
    { name: 'Adobe After Effects', icon: icons.afterEffects },
    { name: 'DaVinci Resolve', icon: icons.davinci }
  ],
  design: [
    { name: 'Figma', icon: icons.figma },
    { name: 'Canva Pro', icon: icons.canva }
  ]
};

export const Tools = () => {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Tools & Skills</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Equipment, software, and design tools I use for creative projects.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Equipment */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Equipment</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {toolsData.equipment.map((tool, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70">
                    {tool.icon}
                  </div>
                  <span className="text-sm text-white/80">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Software */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Software</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {toolsData.software.map((tool, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70">
                    {tool.icon}
                  </div>
                  <span className="text-sm text-white/80">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Design */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-6">Design</h3>
            <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
              {toolsData.design.map((tool, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-lg">
                  <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70">
                    {tool.icon}
                  </div>
                  <span className="text-sm text-white/80">{tool.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 