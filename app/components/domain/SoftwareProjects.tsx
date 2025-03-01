'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Define project types and data
interface Project {
  title: string;
  category: string;
  description: string[];
  technologies: string[];
  githubUrl?: string;
  imageUrl: string;
}

const projects: Project[] = [
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

const categories = [
  { id: 'all', name: 'All', icon: '⚡', count: projects.length },
  { id: 'ai-ml', name: 'AI/ML', icon: '🧠', count: projects.filter(p => p.category === 'ai-ml').length },
  { id: 'computer-vision', name: 'Computer Vision', icon: '👁️', count: projects.filter(p => p.category === 'computer-vision').length },
  { id: 'systems', name: 'Systems Architecture', icon: '⚙️', count: projects.filter(p => p.category === 'systems').length },
  { id: 'web', name: 'Web Development', icon: '🌐', count: projects.filter(p => p.category === 'web').length }
];

export const SoftwareProjects = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  // Get filtered projects for display
  const filteredProjects = projects.filter(project => 
    activeCategory === 'all' || project.category === activeCategory
  );

  // Intersection Observer for project cards
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '-1');
            if (index >= 0 && !visibleProjects.includes(index)) {
              setVisibleProjects(prev => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    // Reset visible projects when category changes
    setVisibleProjects([]);

    // Observe each project card
    if (projectsRef.current) {
      const projectElements = projectsRef.current.querySelectorAll('.project-card');
      projectElements.forEach((el) => observer.observe(el));
    }

    return () => observer.disconnect();
  }, [activeCategory]);

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="mb-12 opacity-0 animate-fadeIn" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">Featured Projects</h2>
            <p className="text-white/60 max-w-2xl">
              A collection of my work spanning AI/ML, computer vision, systems architecture, and web development.
            </p>
          </div>
        </div>

        {/* Sticky Category Navigation - Similar to creative page */}
        <div className="sticky top-20 z-30 bg-black/80 backdrop-blur-lg border-y border-white/10 mb-8">
          <div className="py-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 text-lg whitespace-nowrap transition-all
                    ${activeCategory === category.id 
                      ? 'text-blue-400 scale-105' 
                      : 'text-white/60 hover:text-white/80'}`}
                >
                  <span className="text-lg">{category.icon}</span>
                  {category.name}
                  <span className="text-sm text-white/40">({category.count})</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid with staggered animations */}
        <div ref={projectsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <div 
              key={`${activeCategory}-${index}`}
              data-index={index}
              className={`project-card bg-white/[0.03] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all relative transform border border-blue-500/10 hover:border-blue-500/30 ${
                visibleProjects.includes(index) 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-10 opacity-0'
              }`}
              style={{ 
                transitionDuration: '0.8s', 
                transitionDelay: `${index * 100}ms`,
                transitionProperty: 'transform, opacity, border-color' 
              }}
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}; 