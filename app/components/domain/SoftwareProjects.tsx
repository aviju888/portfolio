'use client';

import React from 'react';
import Image from 'next/image';

// Define project data as a simple array
const projects = [
  {
    title: 'KOSMOS Website',
    description: 'Promotional and archival branding site with interactive biographies and event management',
    imageUrl: '/images/projects/kosmos-site.png',
    year: 'January 2025',
    link: 'https://kosmosucb.github.io/'
  },
  {
    title: 'Diffusion Models',
    description: 'Implementation of custom diffusion sampling loops with inpainting and text-conditional translation',
    imageUrl: '/images/projects/diffusion-models.png',
    year: 'November 2024',
    link: 'https://aviju888.github.io/computer-vision/old_1/web/proj5.html'
  },
  {
    title: 'Hybrid Images Project',
    description: 'Created images combining low and high-frequency content using Gaussian and Laplacian filtering',
    imageUrl: '/images/projects/hybrid-images.png',
    year: 'October 2024',
    link: 'https://aviju888.github.io/computer-vision/old_1/web/proj2.html'
  },
  {
    title: 'Colorizing Historical Imagery',
    description: 'Automated system for aligning and colorizing Prokudin-Gorskii collection with multi-scale alignment',
    imageUrl: '/images/projects/colorizing-imagery.png',
    year: 'September 2024',
    link: 'https://aviju888.github.io/computer-vision/old_1/web/proj1.html'
  },
  {
    title: 'Asthma & AQI Analysis',
    description: 'Research on correlation between air quality and asthma rates using linear regression analysis',
    imageUrl: '/images/projects/asthma-aqi.png',
    year: 'May 2024',
    link: '/images/projects/ph142-final.pdf'
  },
  {
    title: 'PASAE Website',
    description: 'Organization website redesign with modern UI/UX and mobile responsiveness',
    imageUrl: '/images/projects/pasae-site.png',
    year: 'Fall 2023-Spring 2024',
    link: 'https://pasae.studentorg.berkeley.edu/'
  },
  {
    title: 'TERF Toxic Speech Detection',
    description: 'ML model to detect and classify toxic speech through Twitter API with data preprocessing',
    imageUrl: '/images/projects/detect-toxic-speech.png',
    year: 'Fall 2023'
  },
  {
    title: 'Pacman AI Agent',
    description: 'Built AI algorithms for Pacman simulation with strategic decision-making and Q-Learning',
    imageUrl: '/images/projects/pacman.png',
    year: 'April 2023'
  },
  {
    title: '61CPU Project',
    description: '5-stage pipelined RISC-V CPU implementation with hazard detection and forwarding',
    imageUrl: '/images/projects/cs61cpu.png',
    year: 'Spring 2023'
  },
  {
    title: 'Gitlet Version Control',
    description: 'Mini version of Git version control system with core commands and persistent storage',
    imageUrl: '/images/projects/gitlet.png',
    year: 'Spring 2022'
  },
  {
    title: 'Solar Water Heating Optimization',
    description: 'Analysis of solar water heating system performance with time-series analysis',
    imageUrl: '/images/projects/lbl-swhs.png',
    year: 'July 2021',
    link: 'https://docs.google.com/presentation/d/1ckUw_FGskqT6gWPi_v5Z3NdMZqIRxGN9/edit?usp=sharing&ouid=103769897949865466045&rtpof=true&sd=true'
  }
];

export const SoftwareProjects = () => {
  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Software Projects</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Machine learning, computer vision, systems programming, and web development projects.
          </p>
        </div>

        {/* Horizontal Gallery */}
        <div className="overflow-x-auto">
          <div className="flex gap-6 pb-4 min-w-max">
            {projects.map((project, index) => (
              <div
                key={index}
                className="w-80 flex-shrink-0 bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-colors"
              >
                {/* Image */}
                <div className="relative h-48 bg-gray-800">
                  <Image
                    src={project.imageUrl}
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