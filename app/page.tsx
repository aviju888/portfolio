'use client';

import Link from 'next/link';
import { profile, getFeaturedProjects, getRainbowPhotos, getFeaturedMedia, getCurrentExperiences, getRecentExperiences, Project } from '@/lib/data';
import SpotlightRow from './components/SpotlightRow';
import Card from './components/Card';
import Tag from './components/Tag';
import ExperienceCard from './components/ExperienceCard';
import PhotoGallery from './components/PhotoGallery';
import CodeDroppingAnimation from './components/CodeDroppingAnimation';
import FadeIn from './components/FadeIn';
import ProjectModal from './components/ProjectModal';
import { useState, Fragment } from 'react';
import { useVisitorMode } from './context/VisitorModeContext';
import { getModeConfig } from '@/lib/visitorModeConfig';
import { VisitorMode } from '@/lib/types';

// Section components
function HeroSection() {
  const { mode } = useVisitorMode();
  const config = getModeConfig(mode);

  return (
    <section className="relative overflow-hidden py-32 md:py-48">
      <CodeDroppingAnimation />

      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <div className="text-xs md:text-xs uppercase tracking-[0.2em] text-gray-500 mb-6 md:mb-4">
          {config.heroSubtitle}
        </div>

        <h1 className="text-[clamp(56px,10vw,80px)] md:text-[clamp(40px,7vw,80px)] leading-[1.05] tracking-tight font-semibold text-gray-900 mb-10 md:mb-8">
          {profile.name}
        </h1>

        <p className="text-[clamp(20px,4vw,24px)] md:text-[clamp(18px,2.2vw,24px)] text-gray-600 leading-relaxed mb-8 md:mb-3 max-w-3xl mx-auto">
          {profile.headline}
        </p>

        <div className="flex flex-col gap-4 md:flex-row md:gap-4 justify-center items-center">
          {config.heroLinks.map((link) => (
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto px-6 py-3.5 md:px-0 md:py-0 text-base md:text-sm text-center md:text-left text-gray-900 md:text-gray-600 md:hover:text-gray-900 bg-gray-100 md:bg-transparent rounded-full md:rounded-none font-medium md:font-normal transition-all duration-200 group"
              >
                {link.label} <span className="inline-block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">→</span>
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="w-full md:w-auto px-6 py-3.5 md:px-0 md:py-0 text-base md:text-sm text-center md:text-left text-gray-900 md:text-gray-600 md:hover:text-gray-900 bg-gray-100 md:bg-transparent rounded-full md:rounded-none font-medium md:font-normal transition-all duration-200 group"
              >
                {link.label} <span className="inline-block opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200">→</span>
              </Link>
            )
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperienceSection({ mode }: { mode: VisitorMode }) {
  const currentExperiences = getCurrentExperiences();
  const recentExperiences = getRecentExperiences(2);
  const displayExperiences = [...currentExperiences, ...recentExperiences].slice(0, 4);
  const config = getModeConfig(mode);
  const override = config.sectionOverrides['experience'];

  if (displayExperiences.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SpotlightRow
          eyebrow="EXPERIENCE"
          title="Current & Recent Work"
          description={override?.description ?? "My journey through software engineering, research, and creative work"}
          viewAllHref="/experience"
        >
          {displayExperiences.map((experience) => (
            <ExperienceCard
              key={`${experience.company}-${experience.start}`}
              experience={experience}
              compact
            />
          ))}
        </SpotlightRow>
      </div>
    </section>
  );
}

function ProjectsSection({ onSelectProject, mode }: { onSelectProject: (project: Project) => void; mode: VisitorMode }) {
  const featuredProjects = getFeaturedProjects().slice(0, 2);
  const config = getModeConfig(mode);
  const override = config.sectionOverrides['projects'];

  return (
    <section className="relative py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SpotlightRow
          eyebrow="CODE"
          title="Featured Projects"
          description={override?.description ?? "A few shipped pieces across frontend, CV/ML, and CRO."}
          viewAllHref="/code"
        >
          {featuredProjects.map((project) => (
            <Card
              key={project.slug}
              title={project.title}
              description={project.summary}
              image={project.images[0]}
              onClick={() => onSelectProject(project)}
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
  );
}

function PhotosSection({ mode }: { mode: VisitorMode }) {
  const rainbowPhotos = getRainbowPhotos(12);
  const config = getModeConfig(mode);
  const override = config.sectionOverrides['photos'];

  return (
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
                  {override?.description ?? "Graduation portraits, dance performances, and events."}
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
  );
}

function CTASection({ mode }: { mode: VisitorMode }) {
  const { cta } = getModeConfig(mode);

  const SecondaryTag = cta.secondaryExternal ? 'a' : Link;
  const secondaryProps = cta.secondaryExternal
    ? { href: cta.secondaryHref, target: '_blank' as const, rel: 'noopener noreferrer' }
    : { href: cta.secondaryHref };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-h1-sm md:text-h1 font-bold text-gray-900 mb-6">
          {cta.heading}
        </h2>
        <p className="text-body text-gray-600 mb-12">
          {cta.description}
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link href={cta.primaryHref} className="btn-primary">
            {cta.primaryLabel}
          </Link>
          <SecondaryTag {...secondaryProps} className="btn-secondary">
            {cta.secondaryLabel}
          </SecondaryTag>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { mode, isHydrated } = useVisitorMode();
  const config = getModeConfig(mode);

  // Section mapping
  const sections: Record<string, JSX.Element | null> = {
    hero: <HeroSection />,
    experience: <ExperienceSection mode={mode} />,
    projects: <ProjectsSection onSelectProject={setSelectedProject} mode={mode} />,
    photos: <PhotosSection mode={mode} />,
    cta: <CTASection mode={mode} />,
  };

  // Don't render until hydrated to prevent layout shift
  if (!isHydrated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <FadeIn>
      <div className="min-h-screen">
        {config.sectionOrder.map((sectionKey, index) => {
          const isSecondary = config.secondarySections.includes(sectionKey);
          return (
            <Fragment key={sectionKey}>
              {index > 0 && <div className="w-full glass-divider" />}
              {isSecondary ? (
                <div className="bg-gray-50 border-y border-gray-100">
                  {sections[sectionKey]}
                </div>
              ) : (
                sections[sectionKey]
              )}
            </Fragment>
          );
        })}

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </FadeIn>
  );
}
