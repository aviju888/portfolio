import Link from 'next/link';
import { profile, getFeaturedProjects, getFeaturedPhotos, getFeaturedMedia, getCurrentExperiences, getRecentExperiences } from '@/lib/data';
import SpotlightRow from './components/SpotlightRow';
import Card from './components/Card';
import Tag from './components/Tag';
import ExperienceCard from './components/ExperienceCard';
import OrganicDivider from './components/OrganicDivider';

export default function Home() {
  const featuredProjects = getFeaturedProjects().slice(0, 2);
  const featuredPhotos = getFeaturedPhotos().slice(0, 2);
  const featuredMedia = getFeaturedMedia().slice(0, 1);
  const currentExperiences = getCurrentExperiences();
  const recentExperiences = getRecentExperiences(2);
  const displayExperiences = [...currentExperiences, ...recentExperiences].slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-28 md:py-36 overflow-hidden">
        {/* Multi-layer mesh gradient */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(70%_40%_at_50%_-20%,rgba(96,165,250,.12),transparent_60%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_80%_10%,rgba(147,51,234,.08),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_20%_80%,rgba(59,130,246,.06),transparent_40%)]" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">
            Software Engineer & Creative
          </p>
          <h1 className="text-[clamp(40px,7vw,80px)] leading-[1.05] tracking-tight font-semibold text-white mb-8">
            {profile.name}
          </h1>
          <p className="text-[clamp(18px,2.2vw,24px)] text-white/70 leading-relaxed mb-3 max-w-3xl mx-auto">
            {profile.headline}
          </p>
          <p className="text-base md:text-lg text-white/50 mb-16 max-w-2xl mx-auto">
            {profile.bioShort}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/code" className="btn-primary">
              View Code
            </Link>
            <Link href="/photos" className="btn-ghost">
              See Photos
            </Link>
            <Link href="/tldr" className="mt-2 text-sm text-white/60 hover:text-white/90 transition-colors">
              Quick TLDR →
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="relative pt-20 md:pt-24 pb-28 overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 -top-10 h-64 bg-[radial-gradient(ellipse_at_top,rgba(96,165,250,0.12),transparent_60%)]" />
          <div className="absolute inset-x-0 top-20 h-64 bg-[radial-gradient(ellipse_at_top_right,rgba(147,51,234,0.06),transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_120%,rgba(0,0,0,.25),transparent_60%)]" />
        </div>
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
                subtitle={project.role}
                description={project.summary}
                image={project.images[0]}
                href={`/code/${project.slug}`}
              >
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </div>
              </Card>
            ))}
          </SpotlightRow>
        </div>
      </section>

      {/* Organic Divider */}
      <OrganicDivider className="text-white/60" />

      {/* Experience Strip */}
      {displayExperiences.length > 0 && (
        <section className="py-24">
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

      {/* Organic Divider */}
      <OrganicDivider variant="blob" className="text-white/40 rotate-180" />

      {/* Featured Photos */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <SpotlightRow 
            eyebrow="PHOTOGRAPHY" 
            title="Selected Shots"
            description="Graduation portraits, dance performances, and events."
            viewAllHref="/photos"
          >
            {featuredPhotos.map((photo, index) => (
              <Card
                key={index}
                title={photo.alt}
                subtitle={photo.dateTaken}
                description={photo.description}
                image={photo.src}
                href="/photos"
              />
            ))}
          </SpotlightRow>
        </div>
      </section>

      {/* Featured Media */}
      {featuredMedia.length > 0 && (
        <section className="relative pt-20 md:pt-24 pb-28 
                            before:content-[''] before:absolute before:inset-x-0 before:-top-10 before:h-64 
                            before:bg-[radial-gradient(ellipse_at_top,rgba(96,165,250,0.12),transparent_60%)] before:pointer-events-none
                            after:content-[''] after:absolute after:inset-0 
                            after:bg-[radial-gradient(80%_60%_at_50%_120%,rgba(0,0,0,.25),transparent_60%)] after:pointer-events-none">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <SpotlightRow 
              eyebrow="CREATIVE WORK" 
              title="Recent Work"
              viewAllHref="/media"
            >
              {featuredMedia.map((item, index) => (
                <Card
                  key={index}
                  title={item.title}
                  description={item.desc}
                  href={item.link || '/media'}
                />
              ))}
            </SpotlightRow>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-h1-sm md:text-h1 font-bold text-white mb-6">
            Let's work together
          </h2>
          <p className="text-body text-gray-400 mb-12">
            I'm always interested in new opportunities and collaborations.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/contact" className="btn-primary">
              Get in Touch
            </Link>
            <Link href="/resume" className="btn-secondary">
              View Resume
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
