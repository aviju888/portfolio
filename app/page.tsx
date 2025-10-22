import Link from 'next/link';
import { profile, getFeaturedProjects, getFeaturedPhotos, getFeaturedMedia } from '@/lib/data';
import SpotlightRow from './components/SpotlightRow';
import Card from './components/Card';
import Tag from './components/Tag';

export default function Home() {
  const featuredProjects = getFeaturedProjects().slice(0, 2);
  const featuredPhotos = getFeaturedPhotos().slice(0, 2);
  const featuredMedia = getFeaturedMedia().slice(0, 1);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-28 md:py-36">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_40%_at_50%_-20%,rgba(96,165,250,.12),transparent_60%)]" />
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
      <section className="relative pt-20 md:pt-24 pb-28 
                          before:content-[''] before:absolute before:inset-x-0 before:-top-10 before:h-64 
                          before:bg-[radial-gradient(ellipse_at_top,rgba(96,165,250,0.12),transparent_60%)] before:pointer-events-none
                          after:content-[''] after:absolute after:inset-0 
                          after:bg-[radial-gradient(80%_60%_at_50%_120%,rgba(0,0,0,.25),transparent_60%)] after:pointer-events-none">
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
