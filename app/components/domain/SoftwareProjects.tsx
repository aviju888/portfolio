'use client';

import React from 'react';
import Image from 'next/image';
import { ProjectsGrid, SoftwareProject, Category } from '../shared/ProjectsGrid';
import { CodeBracketIcon, CpuChipIcon, ServerIcon, ChartBarIcon, GlobeAltIcon } from '@heroicons/react/24/outline';

// Define project data
const projects: SoftwareProject[] = [
  {
    title: 'KOSMOS Website',
    category: 'Web Development',
    description: [
      'Promotional and archival branding site',
      'Interactive biographies',
      'Event management',
      'Media galleries'
    ],
    technologies: ['React', 'Next.js'],
    imageUrl: '/images/projects/kosmos-site.png',
    year: 'January 2025',
    link: 'https://kosmosucb.github.io/'
  },
  {
    title: 'Diffusion Models',
    category: 'AI/ML',
    description: [
      'Implementation of custom diffusion sampling loops',
      'Inpainting capabilities',
      'Text-conditional image translation',
      'Classifier-free guidance'
    ],
    technologies: ['Python', 'PyTorch', 'Hugging Face'],
    imageUrl: '/images/projects/diffusion-models.png',
    year: 'November 2024',
    link: 'https://aviju888.github.io/computer-vision/old_1/web/proj5.html'
  },
  {
    title: 'Hybrid Images Project',
    category: 'Computer Vision',
    description: [
      'Created images combining low and high-frequency content',
      'Gaussian and Laplacian filtering',
      'Multiresolution blending',
      'Fourier Transform analysis'
    ],
    technologies: ['Python', 'OpenCV', 'NumPy', 'SciPy', 'Matplotlib'],
    imageUrl: '/images/projects/hybrid-images.png',
    year: 'October 2024',
    link: 'https://aviju888.github.io/computer-vision/old_1/web/proj2.html'
  },
  {
    title: 'Colorizing Historical Imagery',
    category: 'Computer Vision',
    description: [
      'Automated system for aligning and colorizing Prokudin-Gorskii collection',
      'L2 norm alignment',
      'Multi-scale pyramid alignment',
      'Automated contrast optimization'
    ],
    technologies: ['Python', 'NumPy', 'SciPy', 'scikit-learn', 'Matplotlib'],
    imageUrl: '/images/projects/colorizing-imagery.png',
    year: 'September 2024',
    link: 'https://aviju888.github.io/computer-vision/old_1/web/proj1.html'
  },
  {
    title: 'Asthma & AQI Analysis',
    category: 'Data Science',
    description: [
      'Research on correlation between air quality and asthma rates',
      'Linear regression analysis',
      'Statistical modeling',
      'Data visualization'
    ],
    technologies: ['R', 'R Markdown'],
    imageUrl: '/images/projects/asthma-aqi.png',
    year: 'May 2024',
    link: '/images/projects/ph142-final.pdf'
  },
  {
    title: 'PASAE Website',
    category: 'Web Development',
    description: [
      'Organization website redesign',
      'Modern UI/UX',
      'Mobile responsiveness',
      'Performance optimization'
    ],
    technologies: ['React.js', 'HTML', 'CSS', 'JavaScript'],
    imageUrl: '/images/projects/pasae-site.png',
    year: 'Fall 2023-Spring 2024',
    link: 'https://pasae.studentorg.berkeley.edu/'
  },
  {
    title: 'TERF Toxic Speech Detection',
    category: 'AI/ML',
    description: [
      'ML model to detect and classify toxic speech through Twitter API.',
      'Data collection and preprocessing',
      'Feature engineering'
    ],
    technologies: ['Python', 'NLTK', 'scikit-learn', 'TensorFlow/PyTorch'],
    imageUrl: '/images/projects/detect-toxic-speech.png',
    year: 'Fall 2023',
    // link: 'https://github.com/yourusername/toxic-speech-detection'
  },
  {
    title: 'Pacman AI Agent',
    category: 'AI/ML',
    description: [
      'Built AI algorithms for Pacman simulation with strategic decision-making',
      'Implemented search strategies (DFS, BFS, A* Search)',
      'Developed Minimax and Expectimax algorithms',
      'Applied Q-Learning and Value Iteration',
      'Fine-tuned reward functions'
    ],
    technologies: ['Python', 'NumPy', 'Matplotlib'],
    imageUrl: '/images/projects/pacman.png',
    year: 'April 2023',
    // link: 'https://github.com/yourusername/pacman-ai-project'
  },
  {
    title: '61CPU Project',
    category: 'Systems',
    description: [
      '5-stage pipelined RISC-V CPU implementation',
      'Complete datapath implementation',
      'Hazard detection and forwarding',
      'Pipeline optimization'
    ],
    technologies: ['Logisim', 'Assembly', 'Git'],
    imageUrl: '/images/projects/cs61cpu.png',
    year: 'Spring 2023'
  },
  {
    title: 'Gitlet Version Control',
    category: 'Systems',
    description: [
      'Mini version of Git version control system',
      'Core Git commands implementation',
      'Persistent storage system',
      'Conflict resolution'
    ],
    technologies: ['Java', 'JUnit'],
    imageUrl: '/images/projects/gitlet.png',
    year: 'Spring 2022'
  },
  {
    title: 'Solar Water Heating Optimization',
    category: 'Data Science',
    description: [
      'Analysis of solar water heating system performance',
      'Time-series analysis',
      'Performance prediction',
      'System optimization'
    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter'],
    imageUrl: '/images/projects/lbl-swhs.png',
    year: 'July 2021',
    link: 'https://docs.google.com/presentation/d/1ckUw_FGskqT6gWPi_v5Z3NdMZqIRxGN9/edit?usp=sharing&ouid=103769897949865466045&rtpof=true&sd=true'
  }
];

const categories: Category[] = [
  { 
    id: 'all', 
    name: 'All', 
    icon: <span className="mr-1">🔍</span>, 
    count: projects.length 
  },
  { 
    id: 'AI/ML', 
    name: 'AI/ML', 
    icon: <CodeBracketIcon className="w-4 h-4 mr-1" />, 
    count: projects.filter(p => p.category === 'AI/ML').length 
  },
  { 
    id: 'Computer Vision', 
    name: 'Computer Vision', 
    icon: <CpuChipIcon className="w-4 h-4 mr-1" />, 
    count: projects.filter(p => p.category === 'Computer Vision').length 
  },
  { 
    id: 'Systems', 
    name: 'Systems', 
    icon: <ServerIcon className="w-4 h-4 mr-1" />, 
    count: projects.filter(p => p.category === 'Systems').length 
  },
  { 
    id: 'Data Science', 
    name: 'Data Science', 
    icon: <ChartBarIcon className="w-4 h-4 mr-1" />, 
    count: projects.filter(p => p.category === 'Data Science').length 
  },
  { 
    id: 'Web Development', 
    name: 'Web Dev', 
    icon: <GlobeAltIcon className="w-4 h-4 mr-1" />, 
    count: projects.filter(p => p.category === 'Web Development').length 
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
      <div
        className={`project-card-container transform transition-all duration-700 ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
        data-index={index}
      >
        <div className="bg-black/30 border border-blue-500/10 hover:border-blue-500/30 rounded-xl overflow-hidden transition-all duration-300 h-full">
          {/* Project image */}
          {project.imageUrl && (
            <div className="relative h-40 overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
          )}
          
          {/* Project content */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">{project.title}</h3>
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium">GitHub</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </div>
                </a>
              )}
              {project.link && !project.githubUrl && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-medium">View</span>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </div>
                </a>
              )}
              {project.githubUrl && project.link && (
                <div className="flex gap-2">
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300" onClick={e => e.stopPropagation()}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300" onClick={e => e.stopPropagation()}>
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                  </a>
                </div>
              )}
            </div>
            
            <ul className="list-disc ml-5 mb-4 text-white/80 space-y-1">
              {project.description.map((desc, i) => (
                <li key={i}>{desc}</li>
              ))}
            </ul>
            
            <div className="flex flex-wrap gap-2 mt-4">
              {project.technologies.map((tech, i) => (
                <span 
                  key={i}
                  className="text-xs bg-blue-900/30 border border-blue-500/30 px-2 py-1 rounded-full text-blue-300 hover:bg-blue-800/40 transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            {project.year && (
              <div className="mt-4 text-xs text-blue-400">
                {project.year}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <ProjectsGrid
      title="Projects"
      description="Selected projects showcasing my work in AI/ML, Computer Vision, Systems Architecture, Data Science, and Web Development."
      projects={projects}
      categories={categories}
      domain="software"
      renderProjectCard={renderSoftwareProjectCard}
    />
  );
}; 