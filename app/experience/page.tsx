'use client';

import { useState } from 'react';
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
      <div className="flex flex-wrap gap-2 mb-8">
        {[
          { key: 'all', label: 'All' },
          { key: 'Full-time', label: 'Full-time' },
          { key: 'Contract', label: 'Contract' },
          { key: 'Internship', label: 'Internship' }
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              activeTab === tab.key
                ? 'bg-sky-500 text-white shadow-md'
                : 'bg-white/5 hover:bg-white/8 border border-white/[0.1] text-white/80 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
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
          <p className="text-white/60">No experiences found for this category.</p>
        </div>
      )}
    </Section>
  );
}
