'use client';

import Link from 'next/link';
import { profile, getFeaturedProjects, getRainbowPhotos, getFeaturedMedia, getCurrentExperiences, getRecentExperiences, Project } from '@/lib/data';
import SpotlightRow from './components/SpotlightRow';
import Card from './components/Card';
import Tag from './components/Tag';
import ExperienceCard from './components/ExperienceCard';
import OrganicDivider from './components/OrganicDivider';
import PhotoGallery from './components/PhotoGallery';
import CodeDroppingAnimation from './components/CodeDroppingAnimation';
import FadeIn from './components/FadeIn';
import ProjectModal from './components/ProjectModal';
import { useState, useEffect } from 'react';

export default function Home() {
  const featuredProjects = getFeaturedProjects().slice(0, 2);
  const rainbowPhotos = getRainbowPhotos(12);
  const featuredMedia = getFeaturedMedia().slice(0, 1);
  const currentExperiences = getCurrentExperiences();
  const recentExperiences = getRecentExperiences(2);
  const displayExperiences = [...currentExperiences, ...recentExperiences].slice(0, 4);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Auto-dismiss popup after 3 seconds
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        setShowPopup(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showPopup]);

  return (
    <FadeIn>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-32 md:py-48">
          {/* Code dropping animation */}
          <CodeDroppingAnimation />
          
          <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
            <div className="text-xs md:text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 md:mb-4">
              Software Engineer & Creative
            </div>
            
            <h1 className="text-[clamp(56px,10vw,80px)] md:text-[clamp(40px,7vw,80px)] leading-[1.05] tracking-tight font-semibold text-gray-900 mb-10 md:mb-8">
              {profile.name}
            </h1>
            
            <p className="text-[clamp(20px,4vw,24px)] md:text-[clamp(18px,2.2vw,24px)] text-gray-600 leading-relaxed mb-8 md:mb-3 max-w-3xl mx-auto">
              {profile.headline}
            </p>
            
            <div className="flex flex-col gap-4 md:flex-row md:gap-4 justify-center items-center">
              <Link href="/code" className="w-full md:w-auto px-6 py-3.5 md:px-0 md:py-0 text-base md:text-sm text-center md:text-left text-gray-900 md:text-gray-600 md:hover:text-gray-900 bg-gray-100 md:bg-transparent rounded-full md:rounded-none font-medium md:font-normal transition-all duration-200 group">
                View Code <span className="inline-block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">→</span>
              </Link>
              <Link href="/photos" className="w-full md:w-auto px-6 py-3.5 md:px-0 md:py-0 text-base md:text-sm text-center md:text-left text-gray-900 md:text-gray-600 md:hover:text-gray-900 bg-gray-100 md:bg-transparent rounded-full md:rounded-none font-medium md:font-normal transition-all duration-200 group">
                See Photos <span className="inline-block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">→</span>
              </Link>
              <Link href="/tldr" className="w-full md:w-auto px-6 py-3.5 md:px-0 md:py-0 text-base md:text-sm text-center md:text-left text-gray-900 md:text-gray-600 md:hover:text-gray-900 bg-gray-100 md:bg-transparent rounded-full md:rounded-none font-medium md:font-normal transition-all duration-200 group">
                Read TLDR <span className="inline-block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">→</span>
              </Link>
            </div>
          </div>
        </section>

      {/* Divider */}
      <div className="w-full glass-divider" />

        {/* Experience Strip */}
        {displayExperiences.length > 0 && (
          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
              <SpotlightRow 
                eyebrow="EXPERIENCE" 
                title="Current & Recent Work"
                description="My journey through software engineering, research, and creative work"
                viewAllHref="/experience"
              >
                {displayExperiences.map((experience, index) => (
                  <ExperienceCard
                    key={`${experience.company}-${experience.start}`}
                    experience={experience}
                  />
                ))}
              </SpotlightRow>
            </div>
          </section>
        )}

      {/* Divider */}
      <div className="w-full glass-divider" />

        {/* Featured Projects */}
        <section className="relative py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <SpotlightRow 
              eyebrow="CODE" 
              title="Featured Projects" 
              description="A few shipped pieces across frontend, CV/ML, and CRO."
              viewAllHref="/code"
            >
              {featuredProjects.map((project) => (
                <Card
                  key={project.slug}
                  title={project.title}
                  description={project.summary}
                  image={project.images[0]}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="flex flex-wrap gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <Tag key={tag} category="framework">{tag}</Tag>
                    ))}
                  </div>
                </Card>
              ))}
            </SpotlightRow>
          </div>
        </section>

      {/* Divider */}
      <div className="w-full glass-divider" />

        {/* Featured Photos */}
        <section className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="mb-16">
              <div className="mb-8">
                <div className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">
                  PHOTOGRAPHY
                </div>
                <div className="flex flex-col md:flex-row md:justify-between md:items-end">
                  <div>
                    <h2 className="text-h1-sm md:text-4xl font-semibold tracking-tight text-gray-900 mb-2">
                      Selected Shots
                    </h2>
                    <div className="w-12 h-[1px] bg-gray-300 mb-4" />
                    <p className="mt-3 text-gray-600 max-w-xl leading-relaxed">
                      Graduation portraits, dance performances, and events.
                    </p>
                  </div>
                  <a
                    href="/photos"
                    className="text-xs text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1 mt-3 md:mt-0"
                  >
                    View All
                    <span className="text-xs">→</span>
                  </a>
                </div>
              </div>
              
              <PhotoGallery photos={rainbowPhotos} variant="scroll" />
            </div>
          </div>
        </section>

      {/* Divider */}
      <div className="w-full glass-divider" />

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-h1-sm md:text-h1 font-bold text-gray-900 mb-6">
            Let's work together
          </h2>
          <p className="text-body text-gray-600 mb-12">
            I'm always interested in new opportunities and collaborations.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="btn-primary">
              Get in Touch
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              View Resume
            </a>
          </div>
        </div>
      </section>

      {/* Resume Popup */}
      {showPopup && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-2 duration-300">
          <div className="bg-red-500 text-white rounded-xl p-4 shadow-lg max-w-xs border border-red-400">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-red-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-red-100">Sorry, working on that!</p>
                <p className="text-xs text-red-200 mt-1">Resume PDF coming soon 🚀</p>
              </div>
              <button
                onClick={() => setShowPopup(false)}
                className="flex-shrink-0 text-red-200 hover:text-white transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        )}

      {/* Project Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      </div>
    </FadeIn>
  );
}
