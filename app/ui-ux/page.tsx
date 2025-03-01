'use client';

import React, { useState } from 'react';
import { ScrollIndicator } from '@/app/components/ui/ScrollIndicator';

export default function UIUXPage() {
  const [activeTab, setActiveTab] = useState<'focus' | 'tools'>('focus');

  return (
    <section className="relative min-h-screen flex flex-col justify-between bg-black pb-16">
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.05)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-20 flex-grow flex flex-col">
        {/* Header Section - More dramatic */}
        <div className="mb-12 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <div className="bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
              UI/UX Design
            </div>
          </h1>
          <p className="text-base md:text-xl text-white/80 leading-relaxed">
            Creating intuitive, accessible, and delightful user experiences through thoughtful design.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8 border-b border-white/10 pb-2">
          <button 
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'focus' 
                ? 'text-orange-400 border-b-2 border-orange-400' 
                : 'text-white/60 hover:text-white/80'
            }`}
            onClick={() => setActiveTab('focus')}
          >
            Areas of Focus
          </button>
          <button 
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'tools' 
                ? 'text-orange-400 border-b-2 border-orange-400' 
                : 'text-white/60 hover:text-white/80'
            }`}
            onClick={() => setActiveTab('tools')}
          >
            Design Tools
          </button>
        </div>

        {/* Main Content - Tab-based */}
        <div className="flex-grow max-w-4xl">
          {/* Areas of Focus Tab */}
          <div className={`space-y-6 ${activeTab === 'focus' ? 'block' : 'hidden'}`}>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-colors">
              <h3 className="text-xl font-medium mb-4 text-white">UI Design</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span>Visual design systems and component libraries</span>
                </li>
                <li className="flex items-start gap-3 text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span>Responsive web and mobile interfaces</span>
                </li>
                <li className="flex items-start gap-3 text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span>Interactive prototypes and animations</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-colors">
              <h3 className="text-xl font-medium mb-4 text-white">UX Research</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span>User interviews and usability testing</span>
                </li>
                <li className="flex items-start gap-3 text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span>Information architecture and user flows</span>
                </li>
                <li className="flex items-start gap-3 text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-2 flex-shrink-0" />
                  <span>Heuristic evaluation and accessibility audits</span>
                </li>
              </ul>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-colors">
              <h3 className="text-xl font-medium mb-4 text-white">Coming Soon</h3>
              <p className="text-white/80">
                Full UI/UX portfolio with case studies and process documentation is currently in development.
                Check back soon to see detailed examples of my design work!
              </p>
            </div>
          </div>
          
          {/* Design Tools Tab */}
          <div className={`${activeTab === 'tools' ? 'block' : 'hidden'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                <h3 className="text-xl font-medium mb-4 text-white">UI Design Tools</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-orange-900/30 border border-orange-500/30 text-orange-300 rounded-md">Figma</span>
                  <span className="px-3 py-1.5 bg-orange-900/30 border border-orange-500/30 text-orange-300 rounded-md">Adobe XD</span>
                  <span className="px-3 py-1.5 bg-orange-900/30 border border-orange-500/30 text-orange-300 rounded-md">Sketch</span>
                  <span className="px-3 py-1.5 bg-orange-900/30 border border-orange-500/30 text-orange-300 rounded-md">Illustrator</span>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                <h3 className="text-xl font-medium mb-4 text-white">Prototyping</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-orange-900/30 border border-orange-500/30 text-orange-300 rounded-md">Figma Prototyping</span>
                  <span className="px-3 py-1.5 bg-orange-900/30 border border-orange-500/30 text-orange-300 rounded-md">Principle</span>
                  <span className="px-3 py-1.5 bg-orange-900/30 border border-orange-500/30 text-orange-300 rounded-md">ProtoPie</span>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                <h3 className="text-xl font-medium mb-4 text-white">UX Research</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-orange-900/30 border border-orange-500/30 text-orange-300 rounded-md">Maze</span>
                  <span className="px-3 py-1.5 bg-orange-900/30 border border-orange-500/30 text-orange-300 rounded-md">Hotjar</span>
                  <span className="px-3 py-1.5 bg-orange-900/30 border border-orange-500/30 text-orange-300 rounded-md">UserTesting</span>
                  <span className="px-3 py-1.5 bg-orange-900/30 border border-orange-500/30 text-orange-300 rounded-md">Optimal Workshop</span>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-orange-500/20 hover:border-orange-500/40 transition-colors">
                <h3 className="text-xl font-medium mb-4 text-white">Design Systems</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-orange-900/30 border border-orange-500/30 text-orange-300 rounded-md">Figma Libraries</span>
                  <span className="px-3 py-1.5 bg-orange-900/30 border border-orange-500/30 text-orange-300 rounded-md">Storybook</span>
                  <span className="px-3 py-1.5 bg-orange-900/30 border border-orange-500/30 text-orange-300 rounded-md">Zeroheight</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="relative z-20 pb-4">
        <ScrollIndicator />
      </div>
    </section>
  );
} 