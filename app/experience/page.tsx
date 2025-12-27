'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { getExperiencesByType, profile } from '@/lib/data';
import ExperienceCard from '../components/ExperienceCard';
import Section from '../components/Section';
import Tag from '../components/Tag';
import FadeIn from '../components/FadeIn';

export default function ExperiencePage() {
  const [activeTab, setActiveTab] = useState<'all' | 'Software' | 'Web' | 'Misc'>('all');
  const displayExperiences = getExperiencesByType(activeTab);

  return (
    <FadeIn>
      <Section 
      // eyebrow="EXPERIENCE" 
      title="Experience" 
      description="My education, skills, and teams"
    >
      {/* Education and Skills Side by Side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Education Module */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          {/* Date in top right */}
          <div className="flex justify-end mb-4">
            <span className="text-sm text-gray-500">{profile.education.start}–{profile.education.end}</span>
          </div>
          
          {/* Centered Berkeley Logo */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center">
              <img 
                src="/images/icons/cal.svg" 
                alt="UC Berkeley" 
                className="w-10 h-10"
              />
            </div>
          </div>
          
          {/* Education Details */}
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{profile.education.school}</h3>
            <p className="text-gray-700 font-medium text-sm mb-1">{profile.education.degree}</p>
            <p className="text-gray-500 text-sm mb-3">{profile.education.minor}</p>
            <p className="text-sm text-gray-500">{profile.education.location}</p>
          </div>
        </div>

        {/* Skills Module */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Skills & Technologies</h3>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Frontend</h4>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'].map(skill => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Backend & Tools</h4>
              <div className="flex flex-wrap gap-2">
                {['Python', 'FastAPI', 'Supabase', 'PostgreSQL', 'Git'].map(skill => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">ML & CV</h4>
              <div className="flex flex-wrap gap-2">
                {['PyTorch', 'OpenCV', 'NumPy', 'scikit-learn', 'Jupyter'].map(skill => (
                  <Tag key={skill}>{skill}</Tag>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Work Experience Filter Tabs */}
      <div className="relative flex flex-wrap gap-2 mb-8 p-1 bg-gray-50 rounded-2xl glass-border">
        
        {[
          { key: 'all', label: 'All' },
          { key: 'Software', label: 'Software' },
          { key: 'Web', label: 'Web' },
          { key: 'Misc', label: 'Misc' }
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
    </FadeIn>
  );
}
