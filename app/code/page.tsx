'use client';

import { useState } from 'react';
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
      <div className="flex space-x-1 mb-8">
        <button
          onClick={() => setActiveTab('featured')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            activeTab === 'featured'
              ? 'bg-accent text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          Featured
        </button>
        <button
          onClick={() => setActiveTab('all')}
          className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
            activeTab === 'all'
              ? 'bg-accent text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          All
        </button>
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
