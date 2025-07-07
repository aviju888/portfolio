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
    thumbnail: "/images/creative/afx-unhinged.jpg",
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
    thumbnail: "/images/gallery/monicagrad3.png",
    tools: ["Sony A7IV", "Adobe Lightroom", "Studio Lighting"],
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
    title: "[KOSMOS @ Cal] Film Production Lead",
    description: "Lead videographer and editor for dance team performances",
    category: "videography",
    thumbnail: "/images/creative/kosmos1.png",
    tools: ["Adobe Premiere Pro", "After Effects", "DaVinci Resolve"],
    features: [
      "Multi-camera capture",
      "Color grading",
      "Motion graphics",
      "Sound design"
    ],
    year: "2022-Present",
    link: "https://youtube.com/playlist?list=PLkU2ISCXGJxisfy-wTkYTaF-Z44t-3UUS&si=-VNjpZuqT51-IVTE",
    size: "large",
    style: "dark"
  },
  {
    title: "Event Videography",
    description: "Professional video coverage for dance events and competitions",
    category: "videography",
    thumbnail: "/images/creative/kosmos-rpd.jpg",
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
    title: "[AFX Dance] Training Team Director",
    description: "Led and coordinated 60+ member dance team",
    category: "leadership",
    thumbnail: "/images/creative/airfx.png",
    tools: ["Choreography", "Team Management", "Event Planning"],
    features: [
      "Choreography development",
      "Performance blocking",
      "Production management",
      "Music selection"
    ],
    year: "August 2024-December 2024",
    link: 'https://www.youtube.com/watch?v=bQH3FsdGZmQ&t=11s&pp=ygUNYWlyZnggYmFsY29ueQ%3D%3D',
    size: "regular",
    style: "gradient"
  },
  {
    title: "[KOSMOS @ Cal] Design Lead",
    description: "Brand identity and content creation",
    category: "leadership",
    thumbnail: "/images/creative/kosmos.png",
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
];

export const CreativeProjects = () => {
  // Render a modern creative project card
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
        className={`group relative bg-gradient-to-br from-white/[0.03] to-white/[0.01] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 cursor-pointer h-full border border-white/[0.05] hover:border-${categoryStyle.accent}-500/30 backdrop-blur-sm`}
      >
        {/* Project Image with modern hover effects */}
        <div className="h-56 relative overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
          />
          {/* Modern gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500"></div>
          
          {/* Category badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-3 py-1.5 rounded-full text-xs font-medium bg-${categoryStyle.accent}-500/20 text-${categoryStyle.accent}-300 border border-${categoryStyle.accent}-500/30 backdrop-blur-sm`}>
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
            <p className="text-white/70 text-sm leading-relaxed line-clamp-2">
              {project.description}
            </p>
          </div>

          {/* Modern feature list */}
          <div className="space-y-2">
            {project.features.slice(0, 2).map((feature, i) => (
              <div key={i} className="flex items-start gap-2 text-white/60 text-sm">
                <div className={`w-1.5 h-1.5 rounded-full bg-${categoryStyle.accent}-400 mt-2 flex-shrink-0`}></div>
                <span className="leading-relaxed">{feature}</span>
              </div>
            ))}
          </div>
          
          {/* Modern tools display */}
          <div className="flex flex-wrap gap-2 pt-2">
            {project.tools.slice(0, 3).map((tool, i) => (
              <span
                key={i}
                className={`text-${categoryStyle.accent}-300 text-xs px-3 py-1.5 rounded-lg bg-${categoryStyle.accent}-500/10 border border-${categoryStyle.accent}-500/20 transition-all duration-300 hover:bg-${categoryStyle.accent}-500/20 font-medium`}
              >
                {tool}
              </span>
            ))}
            {project.tools.length > 3 && (
              <span className="text-white/40 text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                +{project.tools.length - 3} more
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
                className={`text-${categoryStyle.accent}-400 hover:text-${categoryStyle.accent}-300 transition-colors duration-300 text-xs font-medium flex items-center gap-1 group/link`}
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
  const renderCreativeModal = (project: CreativeProject, onClose: () => void) => {
    const categoryStyle = categoryStyles[project.category as keyof typeof categoryStyles];
    
    return (
      <div className="bg-gradient-to-br from-black/95 to-black/90 border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto backdrop-blur-xl">
        <div className="p-6 sm:p-8">
          {/* Modal header */}
          <div className="flex justify-between items-start mb-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1.5 rounded-full text-sm font-medium bg-${categoryStyle.accent}-500/20 text-${categoryStyle.accent}-300 border border-${categoryStyle.accent}-500/30`}>
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
                  src={project.thumbnail}
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
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-${categoryStyle.accent}-500/10 text-${categoryStyle.accent}-300 border border-${categoryStyle.accent}-500/30 hover:bg-${categoryStyle.accent}-500/20 transition-all duration-300 font-medium`}
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
                <h4 className="text-lg font-semibold text-white mb-3">Description</h4>
                <p className="text-white/80 leading-relaxed">
                  {project.description}
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Tools & Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, i) => (
                    <span
                      key={i}
                      className={`text-${categoryStyle.accent}-300 text-sm px-3 py-2 rounded-lg bg-${categoryStyle.accent}-500/10 border border-${categoryStyle.accent}-500/20 font-medium`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-white mb-3">Key Features</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full bg-${categoryStyle.accent}-400 mt-2 flex-shrink-0`} />
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