'use client';

import React from 'react';
import Image from 'next/image';

// Define project data as a simple array
const projectsData = [
  {
    title: "Dance Team Photography",
    description: "Dynamic performance captures and team portraits for UC Berkeley dance organizations",
    thumbnail: "/images/creative/afx-unhinged.jpg",
    year: "2022-2023"
  },
  {
    title: "Graduation Photography",
    description: "Professional portrait photography for graduation milestones",
    thumbnail: "/images/gallery/monicagrad3.png",
    year: "2023-2024"
  },
  {
    title: "[KOSMOS @ Cal] Film Production Lead",
    description: "Lead videographer and editor for dance team performances",
    thumbnail: "/images/creative/kosmos1.png",
    year: "2022-Present",
    link: "https://youtube.com/playlist?list=PLkU2ISCXGJxisfy-wTkYTaF-Z44t-3UUS&si=-VNjpZuqT51-IVTE"
  },
  {
    title: "Event Videography",
    description: "Professional video coverage for dance events and competitions",
    thumbnail: "/images/creative/kosmos-rpd.jpg",
    year: "2023-Present"
  },
  {
    title: "[AFX Dance] Training Team Director",
    description: "Led and coordinated 60+ member dance team",
    thumbnail: "/images/creative/airfx.png",
    year: "August 2024-December 2024",
    link: 'https://www.youtube.com/watch?v=bQH3FsdGZmQ&t=11s&pp=ygUNYWlyZnggYmFsY29ueQ%3D%3D'
  },
  {
    title: "[KOSMOS @ Cal] Design Lead",
    description: "Brand identity and content creation",
    thumbnail: "/images/creative/kosmos.png",
    year: "August 2022-Present",
    link: "https://instagram.com/kosmoskpop"
  }
];

export const CreativeProjects = () => {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Creative Projects</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Photography, videography, and leadership work across dance organizations and events.
          </p>
        </div>

        {/* Horizontal Gallery */}
        <div className="overflow-x-auto">
          <div className="flex gap-6 pb-4 min-w-max">
            {projectsData.map((project, index) => (
              <div
                key={index}
                className="w-80 flex-shrink-0 bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-800">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                  <p className="text-white/70 text-sm mb-3">{project.description}</p>
                  <span className="text-white/50 text-xs">{project.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 