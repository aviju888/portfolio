'use client';

import React from 'react';
import Image from 'next/image';
import { ProjectsGrid, CreativeProject, Category } from '../shared/ProjectsGrid';

// Define color schemes for different categories
const categoryStyles = {
  photography: {
    bgFrom: 'from-pink-900/30',
    bgTo: 'to-purple-900/20',
    border: 'border-pink-500/30',
    text: 'text-pink-300',
    accent: 'pink'
  },
  videography: {
    bgFrom: 'from-blue-900/30',
    bgTo: 'to-indigo-900/20',
    border: 'border-blue-500/30',
    text: 'text-blue-300',
    accent: 'blue'
  },
  leadership: {
    bgFrom: 'from-amber-900/30',
    bgTo: 'to-yellow-900/20',
    border: 'border-amber-500/30',
    text: 'text-amber-300',
    accent: 'amber'
  },
  design: {
    bgFrom: 'from-emerald-900/30',
    bgTo: 'to-teal-900/20',
    border: 'border-emerald-500/30',
    text: 'text-emerald-300',
    accent: 'emerald'
  }
};

// Define project data as a flat array instead of grouped by category
const projectsData: CreativeProject[] = [
  // Photography projects
  {
    title: "Dance Team Photography",
    description: "Dynamic performance captures and team portraits for UC Berkeley dance organizations",
    category: "photography",
    thumbnail: "/images/dance-photo.jpg",
    tools: ["Sony A7III", "Adobe Lightroom", "Adobe Photoshop"],
    features: [
      "Performance documentation",
      "Studio portraits",
      "Photo direction",
      "Post-processing"
    ],
    year: "2022-2023"
  },
  {
    title: "Graduation Photography",
    description: "Professional portrait photography for graduation milestones",
    category: "photography",
    thumbnail: "/images/grad-photo.jpg",
    tools: ["Sony A7III", "Adobe Lightroom", "Studio Lighting"],
    features: [
      "Location scouting",
      "Professional lighting",
      "Same-day previews",
      "Full retouching"
    ],
    year: "2023-2024",
    style: "minimal"
  },
  // Videography projects
  {
    title: "KOSMOS Dance Videos",
    description: "Lead videographer and editor for dance team performances",
    category: "videography",
    thumbnail: "/images/kosmos-video.jpg",
    tools: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve"],
    features: [
      "Multi-camera capture",
      "Color grading",
      "Motion graphics",
      "Sound design"
    ],
    year: "2022-Present",
    link: "https://youtube.com/@kosmoskpop",
    size: "large",
    style: "dark"
  },
  {
    title: "Event Videography",
    description: "Professional video coverage for dance events and competitions",
    category: "videography",
    thumbnail: "/images/event-video.jpg",
    tools: ["Adobe Premiere Pro", "DaVinci Resolve", "DJI RS 3"],
    features: [
      "Live coverage",
      "Highlight reels",
      "Social optimization",
      "Quick delivery"
    ],
    year: "2023-Present",
    style: "outlined"
  },
  // Leadership projects
  {
    title: "AFX Dance - Training Team Director",
    description: "Led and coordinated 60+ member dance team",
    category: "leadership",
    thumbnail: "/images/afx-dance.jpg",
    tools: ["Choreography", "Team Management", "Event Planning"],
    features: [
      "Choreography development",
      "Performance blocking",
      "Production management",
      "Music selection"
    ],
    year: "August 2024-December 2024",
    size: "regular",
    style: "gradient"
  },
  {
    title: "KOSMOS @ Cal - Design Lead",
    description: "Brand identity and content creation",
    category: "leadership",
    thumbnail: "/images/kosmos-design.jpg",
    tools: ["Adobe Creative Suite", "Figma", "Canva Pro"],
    features: [
      "Marketing flyers",
      "Logo design",
      "Merchandise design",
      "Social media content"
    ],
    year: "August 2022-Present",
    link: "https://instagram.com/kosmoskpop",
    style: "default"
  },
  // Design projects
  {
    title: "Motion Graphics Collection",
    description: "Animated graphics and transitions for digital content",
    category: "design",
    thumbnail: "/images/motion-graphics.jpg",
    tools: ["After Effects", "Premiere Pro", "Illustrator"],
    features: [
      "Custom animations",
      "Brand motion graphics",
      "Visual effects",
      "Typography animation"
    ],
    year: "2023",
    size: "large",
    style: "minimal"
  }
];

// Define categories with counts for filtering
const categories: Category[] = [
  { 
    id: 'all', 
    name: 'All', 
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 7h-3m-2.5 0H12m-8 0H2m18 5h-2m-3 0H7m-5 0H2m18 5h-5m-4 0H2" />
        <path d="M14 15h1.5a1.5 1.5 0 0 1 1.5 1.5v0a1.5 1.5 0 0 1-1.5 1.5H15v1" />
      </svg>
    ), 
    count: projectsData.length 
  },
  { 
    id: 'photography', 
    name: 'Photography', 
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ), 
    count: projectsData.filter(p => p.category === 'photography').length 
  },
  { 
    id: 'videography', 
    name: 'Videography', 
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
      </svg>
    ), 
    count: projectsData.filter(p => p.category === 'videography').length 
  },
  { 
    id: 'leadership', 
    name: 'Leadership', 
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21v-2a5 5 0 00-5-5H9a5 5 0 00-5 5v2" />
      </svg>
    ), 
    count: projectsData.filter(p => p.category === 'leadership').length 
  },
  { 
    id: 'design', 
    name: 'Design', 
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 19l7-7 3 3-7 7-3-3z" />
        <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
        <path d="M2 2l7.586 7.586" />
      </svg>
    ), 
    count: projectsData.filter(p => p.category === 'design').length 
  }
];

export const CreativeProjects = () => {
  // Render a creative project card
  const renderCreativeProjectCard = (
    project: CreativeProject, 
    index: number, 
    isVisible: boolean, 
    primaryColor: string,
    onClick?: (project: CreativeProject) => void
  ) => {
    const categoryStyle = categoryStyles[project.category as keyof typeof categoryStyles];
    
    return (
      <div 
        onClick={() => onClick && onClick(project)}
        className={`project-card bg-white/[0.03] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all relative transform ${categoryStyle.border} hover:border-${project.category}-500/30 cursor-pointer h-full`}
      >
        {/* Project Image with hover zoom */}
        <div className="h-48 relative overflow-hidden group">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/10"></div>
        </div>

        {/* Project Content - Always visible with animations */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-xl font-semibold text-white group-hover:text-white transition-colors">
              {project.title}
            </h3>
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`text-white/60 hover:${categoryStyle.text} transition-all duration-300 hover:scale-110`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </a>
            )}
          </div>

          {/* Always visible project details with bullet points */}
          <ul className="mb-4 space-y-1.5">
            {project.features.slice(0, 3).map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-white/70 text-sm">
                <span className={`${categoryStyle.text} mt-0.5`}>•</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {project.tools.map((tool, i) => (
              <span
                key={i}
                className={`${categoryStyle.text} text-xs px-2 py-1 rounded-md bg-${project.category}-500/10 transition-all duration-300 hover:bg-${project.category}-500/20`}
              >
                {tool}
              </span>
            ))}
          </div>

          {/* Year display */}
          <div className="mt-3 text-xs text-white/40">
            {project.year}
          </div>
        </div>
      </div>
    );
  };

  // Render modal content for a project
  const renderCreativeModal = (project: CreativeProject, onClose: () => void) => {
    return (
      <div className="bg-[#0a0a0a] border border-white/10 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-5 sm:p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-2xl font-medium text-white">{project.title}</h3>
            <button 
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition-colors"
            >
              <svg className="w-5 h-5 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Modal content */}
          <div className="aspect-video relative mb-5 rounded-md overflow-hidden">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
          
          <div className="space-y-5">
            <p className="text-white/80">
              {project.description}
            </p>
            
            <div>
              <h4 className="text-sm text-white/50 mb-2">Tools Used</h4>
              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool, i) => (
                  <span
                    key={i}
                    className="text-white/80 text-sm px-3 py-1 rounded-md bg-white/5"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="text-sm text-white/50 mb-2">Features</h4>
              <ul className="space-y-1.5">
                {project.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1 h-1 rounded-full bg-white/50 mt-2 flex-shrink-0" />
                    <span className="text-white/70">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="pt-4 flex justify-between items-center border-t border-white/5">
              <span className="text-sm text-white/40">{project.year}</span>
              
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-1.5 rounded-full bg-white/5 text-white text-sm flex items-center gap-2 hover:bg-white/10 transition-colors"
                >
                  Visit Project
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <ProjectsGrid
      title="Creative Work"
      description="A selection of my creative projects across photography, videography, leadership, and design."
      projects={projectsData}
      categories={categories}
      domain="creative"
      renderProjectCard={renderCreativeProjectCard}
      renderModal={renderCreativeModal}
    />
  );
}; 