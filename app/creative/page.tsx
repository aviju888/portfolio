'use client';

import { useState, useEffect } from 'react';
import { CreativeHero } from '../components/domain/CreativeHero';
import { ProjectCard } from '../components/ui/ProjectCard';
import Image from 'next/image';

interface Project {
  title: string;
  description: string;
  category: string;
  thumbnail: string;
  tools: string[];
  features: string[];
  year: string;
  link?: string;
}

const projects = {
  photography: [
    {
      title: "Dance Team Photography",
      description: "Dynamic performance captures and team portraits for UC Berkeley dance organizations",
      category: "photography",
      thumbnail: "/images/dance-photo.jpg",
      tools: ["Sony A7III", "Adobe Lightroom", "Adobe Photoshop"],
      features: [
        "Performance documentation",
        "Studio portraits",
        "Event coverage",
        "Post-processing workflow"
      ],
      year: "2023-2024",
      link: "https://instagram.com/azra.jpeg"
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
      year: "2023-2024"
    }
  ],
  videography: [
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
      link: "https://youtube.com/@kosmoskpop"
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
      year: "2023-Present"
    }
  ],
  design: [
    {
      title: "KOSMOS Brand Identity",
      description: "Comprehensive brand identity and social media design",
      category: "design",
      thumbnail: "/images/kosmos-brand.jpg",
      tools: ["Adobe Creative Suite", "Figma", "Canva Pro"],
      features: [
        "Brand style guide",
        "Social templates",
        "Marketing materials",
        "Merchandise design"
      ],
      year: "2022-Present",
      link: "https://instagram.com/kosmoskpop"
    }
  ],
  music: [
    {
      title: "Music Production",
      description: "Original compositions and dance music remixes",
      category: "music",
      thumbnail: "/images/music-prod.jpg",
      tools: ["Logic Pro X", "FL Studio", "Ableton Live"],
      features: [
        "Original composition",
        "Dance remixes",
        "Sound design",
        "Audio mixing"
      ],
      year: "2022-Present",
      link: "https://soundcloud.com/azra-ayje"
    }
  ]
};

export default function CreativePage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  // Intersection Observer for sections
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.5 });

    // Observe all section elements
    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <CreativeHero />
      
      {/* Category Navigation - Sticky */}
      <div className="sticky top-20 z-30 bg-black/80 backdrop-blur-lg border-y border-white/10">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-8 py-4 overflow-x-auto no-scrollbar">
            {Object.entries(projects).map(([category, items]) => (
              <a
                key={category}
                href={`#${category}`}
                className={`flex items-center gap-2 text-lg whitespace-nowrap transition-all
                  ${activeSection === category 
                    ? 'text-pink-400 scale-105' 
                    : 'text-white/60 hover:text-white/80'}`}
              >
                <span className="text-lg font-mono">
                  {category === 'photography' ? '◎' :
                   category === 'videography' ? '▶' :
                   category === 'design' ? '◈' : '♪'}
                </span>
                {category.charAt(0).toUpperCase() + category.slice(1)}
                <span className="text-sm text-white/40">({items.length})</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Project Sections */}
      {Object.entries(projects).map(([category, items]) => (
        <section 
          key={category}
          id={category}
          className="py-16 first:pt-8"
        >
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {items.map((project, index) => (
                <ProjectCard
                  key={index}
                  title={project.title}
                  description={project.description}
                  tools={project.tools}
                  thumbnail={project.thumbnail}
                  link={project.link}
                  onClick={() => {
                    setSelectedProject(project);
                    setIsModalOpen(true);
                  }}
                />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Project Modal */}
      {isModalOpen && selectedProject && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-[#111] max-w-4xl w-full rounded-xl p-8 max-h-[90vh] overflow-y-auto"
            onClick={e => e.stopPropagation()}
          >
            <div className="aspect-video relative mb-8 rounded-lg overflow-hidden">
              <Image
                src={selectedProject.thumbnail}
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold">{selectedProject.title}</h2>
              {selectedProject.link && (
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-400 hover:text-pink-500 transition-colors"
                >
                  View Project ↗
                </a>
              )}
            </div>
            
            <p className="text-white/80 text-lg mb-8">{selectedProject.description}</p>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-medium mb-4">Features</h3>
                <ul className="space-y-2">
                  {selectedProject.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-4">Tools & Technologies</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tools.map((tool, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-sm bg-pink-500/10 text-pink-400/80
                        border border-pink-500/20"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-white/10 flex justify-between items-center">
              <span className="text-white/40">{selectedProject.year}</span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 