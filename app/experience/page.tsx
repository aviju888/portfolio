'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { getExperiencesByType } from '@/lib/data';
import ExperienceCard from '../components/ExperienceCard';
import Section from '../components/Section';

export default function ExperiencePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'Full-time' | 'Contract' | 'Internship'>('all');
  const displayExperiences = getExperiencesByType(activeTab);

  return (
    <Section 
      eyebrow="EXPERIENCE" 
      title="Work & Research" 
      description="My journey through software engineering, research, and creative work"
    >
      {/* Filter Tabs */}
      <div className="relative flex flex-wrap gap-2 mb-8 p-1 bg-gray-50 rounded-2xl glass-border">
        
        {[
          { key: 'all', label: 'All' },
          { key: 'Full-time', label: 'Full-time' },
          { key: 'Contract', label: 'Contract' },
          { key: 'Internship', label: 'Internship' }
        ].map((tab) => (
          <motion.button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              activeTab === tab.key
                ? 'text-gray-900 font-bold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {activeTab === tab.key && (
              <motion.div
                layoutId="activeTabExperience"
                className="absolute inset-0 bg-white rounded-xl"
                style={{
                  zIndex: -1,
                  boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(0, 0, 0, 0.05)'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {tab.label}
          </motion.button>
        ))}
      </div>

      {/* Experiences Grid */}
      <div className="space-y-6">
        {displayExperiences.map((experience, index) => (
          <ExperienceCard
            key={`${experience.company}-${experience.start}`}
            experience={experience}
          />
        ))}
      </div>

      {/* Empty State */}
      {displayExperiences.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No experiences found for this category.</p>
        </div>
      )}
    </Section>
  );
}
