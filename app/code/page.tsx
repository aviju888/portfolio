'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, getProjectsByType } from '@/lib/data';
import Card from '../components/Card';
import Tag from '../components/Tag';
import Section from '../components/Section';
import FadeIn from '../components/FadeIn';

export default function CodePage() {
  const [activeTab, setActiveTab] = useState<string>('All');
  const displayProjects = getProjectsByType(activeTab);

  return (
    <FadeIn>
      <Section title="Code" description="AI/ML, frontend, web development, and more">
      {/* Filter Tabs */}
      <div className="relative flex flex-wrap gap-2 mb-8 p-1 bg-gray-50 rounded-2xl glass-border">
        {['All', 'AI/ML', 'Computer Vision', 'Web Development', 'Data Science', 'Systems'].map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveTab(category)}
            className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              activeTab === category
                ? 'text-gray-900 font-bold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {activeTab === category && (
              <motion.div
                layoutId="activeTabCode"
                className="absolute inset-0 bg-white rounded-xl"
                style={{
                  zIndex: -1,
                  boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(0, 0, 0, 0.05)'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {category}
          </motion.button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
        {displayProjects.map((project) => (
          <Card
            key={project.slug}
            title={project.title}
            description={project.summary}
            image={project.images[0]}
            href={`/code/${project.slug}`}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.slice(0, 4).map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </div>
            <div className="text-sm text-gray-500">
              {project.year}
            </div>
          </Card>
        ))}
      </div>
    </Section>
    </FadeIn>
  );
}
