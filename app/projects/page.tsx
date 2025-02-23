'use client';

import React, { useState } from 'react';
import Image from 'next/image';

interface Project {
  title: string;
  category: string;
  description: string[];
  technologies: string[];
  githubUrl?: string;
}

const projects: Project[] = [
  {
    title: 'Diffusion Models',
    category: 'ai-ml',
    description: [
      'Implementation and fine-tuning of Stable Diffusion models',
      'Experimented with various architectures and training techniques',
      'Achieved high-quality image generation results'
    ],
    technologies: ['Python', 'PyTorch', 'CUDA', 'Hugging Face'],
    githubUrl: 'https://github.com/aviju888/diffusion-models'
  },
  {
    title: 'Computer Vision Projects',
    category: 'computer-vision',
    description: [
      'Implemented various computer vision algorithms from scratch',
      'Built real-time object detection and tracking systems',
      'Developed custom image processing pipelines'
    ],
    technologies: ['Python', 'OpenCV', 'TensorFlow', 'NumPy'],
    githubUrl: 'https://github.com/aviju888/cv-projects'
  },
  {
    title: 'Computational Photography',
    category: 'comp-photo',
    description: [
      'Created advanced photo editing and manipulation tools',
      'Implemented HDR imaging and panorama stitching',
      'Developed neural style transfer applications'
    ],
    technologies: ['Python', 'OpenCV', 'PyTorch', 'Pillow'],
    githubUrl: 'https://github.com/aviju888/comp-photo'
  },
  {
    title: 'UI/UX Design Portfolio',
    category: 'design',
    description: [
      'Collection of user interface and experience design projects',
      'Focus on modern, minimalist, and accessible design',
      'Includes mobile app and web interfaces'
    ],
    technologies: ['Figma', 'Adobe XD', 'Sketch', 'Principle'],
    githubUrl: 'https://github.com/aviju888/design-portfolio'
  }
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'ai-ml', name: 'AI/ML' },
  { id: 'computer-vision', name: 'Computer Vision' },
  { id: 'comp-photo', name: 'Computational Photography' },
  { id: 'design', name: 'Design' },
  { id: 'photography', name: 'Photography' },
  { id: 'music', name: 'Music' }
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = projects.filter(project => 
    activeCategory === 'all' || project.category === activeCategory
  );

  return (
    <section className="container mx-auto px-4 py-24">
      <h2 className="text-4xl font-medium mb-16">Projects</h2>
      
      <div className="flex flex-wrap justify-center gap-4 mb-16">
        {categories.map(category => (
          <button
            key={category.id}
            className={`px-4 py-2 border border-white/30 rounded hover:-translate-y-0.5 transition-transform ${
              activeCategory === category.id ? 'bg-white/10' : ''
            }`}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <div 
            key={index}
            className="project-card"
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl">{project.title}</h3>
              {project.githubUrl && (
                <a 
                  href={project.githubUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image 
                    src="/icons/github.png" 
                    alt="GitHub" 
                    width={16} 
                    height={16} 
                    className="invert"
                  />
                </a>
              )}
            </div>
            
            <ul className="text-gray-300 mb-6 space-y-2">
              {project.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, i) => (
                <span 
                  key={i}
                  className="px-3 py-1 text-sm border border-white/30 rounded"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 