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
    icon: <span className="mr-1 px-1">🔍</span>, 
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
  // Get category color based on category name
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'AI/ML':
        return 'blue';
      case 'Computer Vision':
        return 'cyan';
      case 'Systems':
        return 'teal';
      case 'Data Science':
        return 'indigo';
      case 'Web Development':
        return 'sky';
      default:
        return 'blue';
    }
  };

  const renderSoftwareProjectCard = (
    project: SoftwareProject,
    index: number,
    isVisible: boolean,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _primaryColor: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _onClick?: (project: SoftwareProject) => void
  ) => {
    const categoryColor = getCategoryColor(project.category);
    
    return (
      <div 
        onClick={() => _onClick && _onClick(project)}
        className={`group relative bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 cursor-pointer h-full border border-white/[0.05] hover:border-${categoryColor}-500/30 backdrop-blur-sm`}
      >
        {/* Project Image with modern hover effects */}
        <div className="h-56 relative overflow-hidden">
          <Image
            src={project.imageUrl}
            alt={project.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
          {/* Modern gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1.5 rounded-full text-xs font-medium bg-${categoryColor}-500/20 text-${categoryColor}-300 border border-${categoryColor}-500/30 backdrop-blur-sm`}>
              {project.category}
            </span>
          </div>
          
          {/* External link indicator */}
          {project.link && (
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </div>
          )}
        </div>

        {/* Project Content with modern typography */}
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-white group-hover:text-white transition-colors leading-tight">
              {project.title}
            </h3>
          </div>

          {/* Modern feature list */}
          <div className="space-y-2">
            {project.description.slice(0, 2).map((feature, i) => (
              <div key={i} className="flex items-start gap-2 text-white/60 text-sm">
                <div className={`w-1.5 h-1.5 rounded-full bg-${categoryColor}-400 mt-2 flex-shrink-0`}></div>
                <span className="leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
          
          {/* Modern technologies display */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.slice(0, 3).map((tech, i) => (
              <span
                key={i}
                className={`text-${categoryColor}-300 text-xs px-3 py-1.5 rounded-lg bg-${categoryColor}-500/10 border border-${categoryColor}-500/20 transition-all duration-300 hover:bg-${categoryColor}-500/20 font-medium`}
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="text-white/40 text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                +{project.technologies.length - 3} more
              </span>
            )}
          </div>

          {/* Year and link */}
          <div className="flex items-center justify-between pt-2 border-t border-white/5">
            <span className="text-xs text-white/40 font-medium">
              {project.year}
            </span>
            
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`text-${categoryColor}-400 hover:text-${categoryColor}-300 transition-colors duration-300 text-xs font-medium flex items-center gap-1 group/link`}
              >
                <span>View Project</span>
                <svg className="w-3 h-3 group-hover/link:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Render modern modal content for a project
  const renderSoftwareModal = (project: SoftwareProject, onClose: () => void) => {
    const categoryColor = getCategoryColor(project.category);
    
    return (
      <div className="bg-gradient-to-br from-black/95 to-black/90 border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-xl">
        <div className="p-6 sm:p-8">
          {/* Modal header */}
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1.5 rounded-full text-sm font-medium bg-${categoryColor}-500/20 text-${categoryColor}-300 border border-${categoryColor}-500/30`}>
                  {project.category}
                </span>
                <span className="text-white/40 text-sm">{project.year}</span>
              </div>
              <h3 className="text-3xl font-bold text-white leading-tight">{project.title}</h3>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110"
            >
              <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Modal content with modern layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Image section */}
            <div className="space-y-4">
              <div className="aspect-video relative rounded-xl overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-${categoryColor}-500/10 text-${categoryColor}-300 border border-${categoryColor}-500/30 hover:bg-${categoryColor}-500/20 transition-all duration-300 font-medium`}
                >
                  <span>Visit Project</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
            
            {/* Content section */}
            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className={`text-${categoryColor}-300 text-sm px-3 py-2 rounded-lg bg-${categoryColor}-500/10 border border-${categoryColor}-500/20 font-medium`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {project.description.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full bg-${categoryColor}-400 mt-2 flex-shrink-0`} />
                      <span className="text-white/70 leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ProjectsGrid
      title="Software Projects"
      description="A collection of my software projects spanning AI/ML, Computer Vision, Systems, Data Science, and Web Development."
      projects={projects}
      categories={categories}
      domain="software"
      renderProjectCard={renderSoftwareProjectCard}
      renderModal={renderSoftwareModal}
    />
  );
}; 