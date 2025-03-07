'use client';

import React, { useState, useEffect, useRef } from 'react';

// Generic project interface that works for both Software and Creative domains
export interface BaseProject {
  title: string;
  category: string;
  link?: string;
  year?: string;
}

// Software-specific project interface
export interface SoftwareProject extends BaseProject {
  description: string[];
  technologies: string[];
  githubUrl?: string;
  imageUrl: string;
}

// Creative-specific project interface
export interface CreativeProject extends BaseProject {
  description: string;
  thumbnail: string;
  tools: string[];
  features: string[];
  size?: 'regular' | 'large';
  accent?: string;
  style?: 'default' | 'minimal' | 'gradient' | 'outlined' | 'dark';
}

// Generic category interface
export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
}

// Props for the ProjectsGrid component
interface ProjectsGridProps<T extends BaseProject> {
  title: string;
  description: string;
  projects: T[];
  categories: Category[];
  domain: 'software' | 'creative';
  // Function to render each project card (allows for domain-specific rendering)
  renderProjectCard: (
    project: T, 
    index: number, 
    isVisible: boolean, 
    primaryColor: string,
    onClick?: (project: T) => void
  ) => React.ReactNode;
  // Modal content render function (optional)
  renderModal?: (project: T, onClose: () => void) => React.ReactNode;
}

export const ProjectsGrid = <T extends BaseProject>({
  title,
  description,
  projects,
  categories,
  domain,
  renderProjectCard,
  renderModal
}: ProjectsGridProps<T>) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [selectedProject, setSelectedProject] = useState<T | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  // Domain-specific colors
  const primaryColor = domain === 'software' ? 'blue' : 'pink';
  
  // Get filtered projects for display
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Handle project click for modal
  const handleProjectClick = (project: T) => {
    if (renderModal) {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };
  
  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Initialize visible projects when category changes
  useEffect(() => {
    // Make first 6 projects visible immediately for a better user experience
    setVisibleProjects(Array.from({ length: Math.min(6, filteredProjects.length) }, (_, i) => i));
  }, [activeCategory, filteredProjects.length]);
  
  // Set up intersection observer for lazy loading
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Wait a moment before observing to ensure DOM is ready
    const timer = setTimeout(() => {
      if (projectsRef.current) {
        const projectElements = projectsRef.current.querySelectorAll('.project-card-container');
        projectElements.forEach((el) => observer.observe(el));
      }
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [activeCategory, filteredProjects.length, visibleProjects]);

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="container mx-auto px-6">
        <div className="mb-12 opacity-0 animate-fadeIn" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-white">{title}</h2>
            <p className="text-white/60 max-w-2xl">
              {description}
            </p>
          </div>
        </div>

        {/* Sticky Category Navigation */}
        <div className="sticky top-[72px] z-30 bg-black/80 backdrop-blur-lg border-y border-white/10 mb-8">
          <div className="py-4 overflow-x-auto no-scrollbar">
            <div className="flex items-center gap-6">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center gap-2 text-lg whitespace-nowrap transition-all
                    ${activeCategory === category.id 
                      ? `text-${primaryColor}-400 scale-105` 
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
              className="project-card-container opacity-100 translate-y-0"
              style={{ 
                transitionDuration: '0.8s', 
                transitionDelay: `${index * 100}ms`,
                transitionProperty: 'transform, opacity',
                animationName: 'fadeInUp',
                animationDuration: '0.8s',
                animationDelay: `${index * 100}ms`,
                animationFillMode: 'both'
              }}
            >
              {renderProjectCard(
                project, 
                index, 
                visibleProjects.includes(index), 
                primaryColor,
                renderModal ? handleProjectClick : undefined
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedProject && renderModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          {renderModal(selectedProject, handleModalClose)}
        </div>
      )}
    </section>
  );
}; 