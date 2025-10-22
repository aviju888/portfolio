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
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            {profile.name}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {profile.headline}
          </p>
          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            {profile.bioShort}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/code" className="btn-primary">
              View Code
            </Link>
            <Link href="/photos" className="btn-secondary">
              See Photos
            </Link>
            <Link href="/tldr" className="btn-secondary">
              Quick TLDR
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 bg-gray-800/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SpotlightRow title="Featured Projects" viewAllHref="/code">
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
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SpotlightRow title="Selected Shots" viewAllHref="/photos">
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
        <section className="py-16 bg-gray-800/50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <SpotlightRow title="Recent Work" viewAllHref="/media">
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
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Let's work together
          </h2>
          <p className="text-lg text-gray-400 mb-8">
            I'm always interested in new opportunities and collaborations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
