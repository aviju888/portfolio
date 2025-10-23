'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, getProjectsByCategory } from '@/lib/data';
import Card from '../components/Card';
import Tag from '../components/Tag';
import Section from '../components/Section';

export default function CodePage() {
  const [activeTab, setActiveTab] = useState<'featured' | 'all'>('featured');
  const displayProjects = getProjectsByCategory(activeTab);

  return (
    <Section title="Code" description="My work in software development, AI/ML, and computer vision">
      {/* Tabs */}
      <div className="relative flex space-x-1 mb-8 p-1 bg-gray-50 rounded-2xl glass-border w-fit">
        
        <motion.button
          onClick={() => setActiveTab('featured')}
          className={`relative px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${
            activeTab === 'featured'
              ? 'text-gray-900 font-bold'
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          {activeTab === 'featured' && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white rounded-xl"
              style={{
                zIndex: -1,
                boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(0, 0, 0, 0.05)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          Featured
        </motion.button>
        <motion.button
          onClick={() => setActiveTab('all')}
          className={`relative px-4 py-2 rounded-xl font-semibold transition-colors duration-200 ${
            activeTab === 'all'
              ? 'text-gray-900 font-bold'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          {activeTab === 'all' && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white rounded-xl"
              style={{
                zIndex: -1,
                boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(0, 0, 0, 0.05)'
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          All
        </motion.button>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
        {displayProjects.map((project) => (
          <Card
            key={project.slug}
            title={project.title}
            subtitle={project.role}
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
              {project.year} • {project.status}
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
