'use client';

import React, { useState, useEffect } from 'react';

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
  date?: string;
}

// Creative-specific project interface
export interface CreativeProject extends BaseProject {
  description: string;
  thumbnail: string;
  tools: string[];
  features: string[];
  year: string;
  link?: string;
  size?: string;
  style?: string;
}

// Generic category interface
export type Category = {
  id: string;
  name: string;
  count: number;
};

// Props for the ProjectsGrid component
interface ProjectsGridProps<T extends BaseProject> {
  title: string;
  description: string;
  projects: T[];
  categories: Category[];
  domain: 'software' | 'creative';
  // Function to render each project card (allows for domain-specific rendering)
  renderProjectCard: (project: T, index: number) => React.ReactNode;
  // Modal content render function (optional)
  renderModal?: (project: T | null, isOpen: boolean, onClose: () => void) => React.ReactNode;
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
  const [selectedProject, setSelectedProject] = useState<T | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Get filtered projects for display
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  const handleProjectClick = (project: T) => {
    if (renderModal) {
      setSelectedProject(project);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            {title}
          </h2>
          <p className="text-xl md:text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Category filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          <button
            onClick={() => setActiveCategory('all')}
            className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
              activeCategory === 'all'
                ? 'bg-white/10 text-white border-2 border-white/20 shadow-xl'
                : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border-2 border-white/10 hover:border-white/20'
            }`}
          >
            All ({projects.length})
          </button>
          
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 ${
                activeCategory === category.id
                  ? 'bg-white/10 text-white border-2 border-white/20 shadow-xl'
                  : 'bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border-2 border-white/10 hover:border-white/20'
              }`}
            >
              {category.name} ({category.count})
            </button>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div
              key={`${project.title}-${index}`}
              onClick={() => handleProjectClick(project)}
              className="cursor-pointer group"
            >
              {renderProjectCard(project, index)}
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="p-12 rounded-3xl bg-white/5 border border-white/10 max-w-md mx-auto">
              <p className="text-white/60 text-lg font-medium">
                No projects found in this category.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {renderModal && (
        renderModal(selectedProject, isModalOpen, closeModal)
      )}
    </section>
  );
}; 