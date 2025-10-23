import Link from 'next/link';
import { profile, getFeaturedProjects, getFeaturedPhotos, getFeaturedMedia, getCurrentExperiences, getRecentExperiences } from '@/lib/data';
import SpotlightRow from './components/SpotlightRow';
import Card from './components/Card';
import Tag from './components/Tag';
import ExperienceCard from './components/ExperienceCard';
import OrganicDivider from './components/OrganicDivider';
import AnimatedSection from './components/AnimatedSection';
import AnimatedText from './components/AnimatedText';

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
            {/* Subtle background gradient */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-0 bg-white" />
            </div>
        
        
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <AnimatedText 
            className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-4"
            delay={0}
            stagger={0.05}
          >
            Software Engineer & Creative
          </AnimatedText>
          
          <AnimatedText 
            className="text-[clamp(40px,7vw,80px)] leading-[1.05] tracking-tight font-semibold text-gray-900 mb-8"
            delay={0.2}
            stagger={0.1}
            splitBy="word"
          >
            {profile.name}
          </AnimatedText>
          
          <AnimatedText 
            className="text-[clamp(18px,2.2vw,24px)] text-gray-600 leading-relaxed mb-3 max-w-3xl mx-auto"
            delay={0.4}
            stagger={0.05}
          >
            {profile.headline}
          </AnimatedText>
          
          <AnimatedText 
            className="text-base md:text-lg text-gray-500 mb-16 max-w-2xl mx-auto"
            delay={0.6}
            stagger={0.02}
          >
            {profile.bioShort}
          </AnimatedText>
          
          <AnimatedSection 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            delay={0.0}
          >
            <Link href="/code" className="btn-primary">
              View Code
            </Link>
            <Link href="/photos" className="btn-ghost">
              See Photos
            </Link>
            <Link href="/tldr" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
              Quick TLDR →
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* Divider */}
      <div className="w-full glass-divider" />

      {/* Featured Projects */}
          <AnimatedSection className="relative py-24">
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
                    <Tag key={tag} category="framework">{tag}</Tag>
                  ))}
                </div>
              </Card>
            ))}
          </SpotlightRow>
        </div>
      </AnimatedSection>

      {/* Divider */}
      <div className="w-full glass-divider" />

      {/* Experience Strip */}
      {displayExperiences.length > 0 && (
        <AnimatedSection className="py-24">
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
        </AnimatedSection>
      )}

      {/* Divider */}
      <div className="w-full glass-divider" />

      {/* Featured Photos */}
      <AnimatedSection className="py-24">
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
                image={photo.srcThumb}
                href="/photos"
              />
            ))}
          </SpotlightRow>
        </div>
      </AnimatedSection>

      {/* Divider */}
      <div className="w-full glass-divider" />

      {/* Featured Media */}
      {featuredMedia.length > 0 && (
        <section className="relative py-24">
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

      {/* Divider */}
      <div className="w-full glass-divider" />

      {/* CTA Section */}
      <section className="py-24">
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
            <Link href="/resume" className="btn-secondary">
              View Resume
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
