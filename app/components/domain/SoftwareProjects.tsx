'use client';

import React from 'react';
import Image from 'next/image';
import { ProjectsGrid, SoftwareProject, Category } from '../shared/ProjectsGrid';

// Define project data
const projects: SoftwareProject[] = [
  {
    title: 'Diffusion Models',
    category: 'ai-ml',
    description: [
      'Implementation of custom diffusion sampling loops',
      'Inpainting capabilities and text-to-image generation',
      'Classifier-free guidance implementation'
    ],
    technologies: ['Python', 'PyTorch', 'Hugging Face'],
    githubUrl: 'https://github.com/aviju888/diffusion-models',
    imageUrl: '/images/projects/diffusion.jpg'
  },
  {
    title: 'Neural Style Transfer',
    category: 'ai-ml',
    description: [
      'Content and style disentanglement using CNNs',
      'Transfer artistic styles between images',
      'Experimented with various loss functions and architectures'
    ],
    technologies: ['TensorFlow', 'Keras', 'Python'],
    githubUrl: 'https://github.com/aviju888/neural-style',
    imageUrl: '/images/projects/neural-style.jpg'
  },
  {
    title: 'Colorizing Historical Imagery',
    category: 'computer-vision',
    description: [
      'Automated system for aligning Prokudin-Gorskii collection',
      'Multi-scale pyramid alignment algorithm',
      'Automated contrast optimization techniques'
    ],
    technologies: ['Python', 'NumPy', 'OpenCV'],
    githubUrl: 'https://github.com/aviju888/historical-colorization',
    imageUrl: '/images/projects/colorizing.jpg'
  },
  {
    title: 'Face Recognition System',
    category: 'computer-vision',
    description: [
      'Real-time face detection and recognition pipeline',
      'Expression analysis capabilities',
      'Optimized for low-latency processing'
    ],
    technologies: ['Python', 'dlib', 'OpenCV'],
    githubUrl: 'https://github.com/aviju888/face-recognition',
    imageUrl: '/images/projects/face-recognition.jpg'
  },
  {
    title: '61CPU Project',
    category: 'systems',
    description: [
      '5-stage pipelined RISC-V CPU implementation',
      'Complete datapath with hazard detection',
      'Pipeline optimization for performance'
    ],
    technologies: ['Logisim', 'Assembly', 'Git'],
    githubUrl: 'https://github.com/aviju888/61cpu',
    imageUrl: '/images/projects/cpu.jpg'
  },
  {
    title: 'Gitlet VCS',
    category: 'systems',
    description: [
      'Version control system implementation',
      'Branching, staging, and commit functionality',
      'Efficient storage and retrieval of file history'
    ],
    technologies: ['Java', 'JUnit', 'Git'],
    githubUrl: 'https://github.com/aviju888/gitlet',
    imageUrl: '/images/projects/gitlet.jpg'
  },
  {
    title: 'KOSMOS Website',
    category: 'web',
    description: [
      'Promotional and archival branding site',
      'Interactive biographies and event management',
      'Media galleries and performance archives'
    ],
    technologies: ['React', 'Next.js', 'Tailwind'],
    githubUrl: 'https://github.com/aviju888/kosmos-site',
    imageUrl: '/images/projects/kosmos.jpg'
  },
  {
    title: 'Personal Portfolio',
    category: 'web',
    description: [
      'Portfolio website with animated sections',
      'Interactive showcases of creative and technical work',
      'Responsive design with modern UI/UX principles'
    ],
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    githubUrl: 'https://github.com/aviju888/portfolio',
    imageUrl: '/images/projects/portfolio.jpg'
  }
];

const categories: Category[] = [
  { 
    id: 'all', 
    name: 'All', 
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5z" />
        <path d="M4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6z" />
        <path d="M16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
      </svg>
    ), 
    count: projects.length 
  },
  { 
    id: 'ai-ml', 
    name: 'AI/ML', 
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v8m0 12v-2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ), 
    count: projects.filter(p => p.category === 'ai-ml').length 
  },
  { 
    id: 'computer-vision', 
    name: 'Computer Vision', 
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <circle cx="12" cy="12" r="9" />
        <path d="M17.5 6.5L12 12" />
      </svg>
    ), 
    count: projects.filter(p => p.category === 'computer-vision').length 
  },
  { 
    id: 'systems', 
    name: 'Systems Architecture', 
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
      </svg>
    ), 
    count: projects.filter(p => p.category === 'systems').length 
  },
  { 
    id: 'web', 
    name: 'Web Development', 
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
      </svg>
    ), 
    count: projects.filter(p => p.category === 'web').length 
  }
];

export const SoftwareProjects = () => {
  // Render a software project card
  const renderSoftwareProjectCard = (
    project: SoftwareProject, 
    index: number, 
    isVisible: boolean, 
    primaryColor: string
  ) => {
    return (
      <div className={`project-card bg-white/[0.03] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all relative transform border border-blue-500/10 hover:border-blue-500/30`}>
        {/* Project Image with hover zoom */}
        <div className="h-48 relative overflow-hidden group">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10"></div>
        </div>

        {/* Project Content - Always visible with animations */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">
              {project.title}
            </h3>
            {project.githubUrl && (
              <a 
                href={project.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white/60 hover:text-blue-400 transition-all duration-300 hover:scale-110"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
              </a>
            )}
          </div>

          {/* Always visible project details */}
          <ul className="mb-4 space-y-1.5">
            {project.description.map((desc, i) => (
              <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                <span className="text-blue-400 mt-0.5">•</span>
                <span>{desc}</span>
              </li>
            ))}
          </ul>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="text-blue-300 text-xs px-2 py-1 rounded-md bg-blue-500/10 transition-all duration-300 hover:bg-blue-500/20"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <ProjectsGrid
      title="Featured Projects"
      description="A collection of my work spanning AI/ML, computer vision, systems architecture, and web development."
      projects={projects}
      categories={categories}
      domain="software"
      renderProjectCard={renderSoftwareProjectCard}
    />
  );
}; 