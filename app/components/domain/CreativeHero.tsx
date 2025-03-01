'use client';

import React, { useState } from 'react';
import { ScrollIndicator } from '../ui/ScrollIndicator';

export const CreativeHero = () => {
  const [activeTab, setActiveTab] = useState<'focus' | 'equipment'>('focus');

  return (
    <section className="relative min-h-screen flex flex-col justify-between bg-black pb-16">
      {/* Enhanced gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.05)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 pt-20 flex-grow flex flex-col">
        {/* Header Section - More dramatic */}
        <div className="mb-12 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <div className="bg-gradient-to-r from-pink-500 via-purple-400 to-pink-500 bg-clip-text text-transparent animate-gradient-x bg-[length:200%_auto]">
              Creative Portfolio
            </div>
          </h1>
          <p className="text-base md:text-xl text-white/80 leading-relaxed">
            Visual storytelling through photography, videography, and digital media.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-4 mb-8 border-b border-white/10 pb-2">
          <button 
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'focus' 
                ? 'text-pink-400 border-b-2 border-pink-400' 
                : 'text-white/60 hover:text-white/80'
            }`}
            onClick={() => setActiveTab('focus')}
          >
            Areas of Focus
          </button>
          <button 
            className={`px-4 py-2 font-medium transition-colors ${
              activeTab === 'equipment' 
                ? 'text-pink-400 border-b-2 border-pink-400' 
                : 'text-white/60 hover:text-white/80'
            }`}
            onClick={() => setActiveTab('equipment')}
          >
            Equipment & Tools
          </button>
        </div>

        {/* Main Content - Tab-based */}
        <div className="flex-grow max-w-4xl">
          {/* Areas of Focus Tab */}
          <div className={`space-y-6 ${activeTab === 'focus' ? 'block' : 'hidden'}`}>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-colors">
              <h3 className="text-xl font-medium mb-4 text-white">Photography</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 flex-shrink-0" />
                  <span>Graduation & portrait sessions</span>
                </li>
                <li className="flex items-start gap-3 text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 flex-shrink-0" />
                  <span>Dance team documentation</span>
                </li>
                <li className="flex items-start gap-3 text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 flex-shrink-0" />
                  <span>Studio lighting and composition</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-colors">
              <h3 className="text-xl font-medium mb-4 text-white">Videography & Motion</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 flex-shrink-0" />
                  <span>Dance performance videos</span>
                </li>
                <li className="flex items-start gap-3 text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 flex-shrink-0" />
                  <span>Motion graphics and visual effects</span>
                </li>
                <li className="flex items-start gap-3 text-white/80">
                  <span className="w-1.5 h-1.5 rounded-full bg-pink-500 mt-2 flex-shrink-0" />
                  <span>Social media content creation</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Equipment & Tools Tab */}
          <div className={`${activeTab === 'equipment' ? 'block' : 'hidden'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-colors">
                <h3 className="text-xl font-medium mb-4 text-white">Camera Equipment</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-pink-900/30 border border-pink-500/30 text-pink-300 rounded-md">Sony A7III</span>
                  <span className="px-3 py-1.5 bg-pink-900/30 border border-pink-500/30 text-pink-300 rounded-md">Sigma 24-70mm</span>
                  <span className="px-3 py-1.5 bg-pink-900/30 border border-pink-500/30 text-pink-300 rounded-md">Sony 85mm</span>
                  <span className="px-3 py-1.5 bg-pink-900/30 border border-pink-500/30 text-pink-300 rounded-md">Godox Lighting</span>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-colors">
                <h3 className="text-xl font-medium mb-4 text-white">Photo Editing</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-pink-900/30 border border-pink-500/30 text-pink-300 rounded-md">Lightroom</span>
                  <span className="px-3 py-1.5 bg-pink-900/30 border border-pink-500/30 text-pink-300 rounded-md">Photoshop</span>
                  <span className="px-3 py-1.5 bg-pink-900/30 border border-pink-500/30 text-pink-300 rounded-md">Capture One</span>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-colors">
                <h3 className="text-xl font-medium mb-4 text-white">Video & Motion</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-pink-900/30 border border-pink-500/30 text-pink-300 rounded-md">Premiere Pro</span>
                  <span className="px-3 py-1.5 bg-pink-900/30 border border-pink-500/30 text-pink-300 rounded-md">After Effects</span>
                  <span className="px-3 py-1.5 bg-pink-900/30 border border-pink-500/30 text-pink-300 rounded-md">DaVinci Resolve</span>
                </div>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-pink-500/20 hover:border-pink-500/40 transition-colors">
                <h3 className="text-xl font-medium mb-4 text-white">Studio Setup</h3>
                <div className="flex flex-wrap gap-3">
                  <span className="px-3 py-1.5 bg-pink-900/30 border border-pink-500/30 text-pink-300 rounded-md">Backdrop Systems</span>
                  <span className="px-3 py-1.5 bg-pink-900/30 border border-pink-500/30 text-pink-300 rounded-md">Softboxes</span>
                  <span className="px-3 py-1.5 bg-pink-900/30 border border-pink-500/30 text-pink-300 rounded-md">Light Modifiers</span>
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
}; 