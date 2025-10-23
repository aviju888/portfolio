import { getProjectBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Tag from '@/app/components/Tag';
import Section from '@/app/components/Section';

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  
  if (!project) {
    notFound();
  }
  
  return (
    <Section>
      {/* Back link */}
      <Link href="/code" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
        ← Back to Projects
      </Link>
      
      {/* Project header */}
      <div className="mb-12">
        <h1 className="text-h1-sm md:text-h1 font-bold text-gray-900 tracking-tight mb-4">
          {project.title}
        </h1>
        <p className="text-xl text-gray-600 mb-6">{project.summary}</p>
        
        {/* Meta info */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-6">
          <span>{project.year}</span>
        </div>
        
        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </div>
      </div>
      
      {/* Main image */}
      {project.images[0] && (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 mb-12">
          <Image
            src={project.images[0]}
            alt={project.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
      
      {/* Description sections */}
      <div className="prose prose-lg max-w-3xl">
        {project.description.map((paragraph, index) => (
          <p key={index} className="text-lg text-gray-700 leading-relaxed mb-6">
            {paragraph}
          </p>
        ))}
      </div>
      
      {/* Additional images */}
      {project.images.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {project.images.slice(1).map((image, index) => (
            <div key={index} className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 bg-gray-100">
              <Image
                src={image}
                alt={`${project.title} - Image ${index + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}
      
      {/* Links */}
      <div className="flex gap-4 mt-12">
        {project.links.demo && (
          <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="btn-primary">
            View →
          </a>
        )}
        {project.links.repo && (
          <a href={project.links.repo} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            Github →
          </a>
        )}
      </div>
    </Section>
  );
}

export async function generateStaticParams() {
  const { projects } = await import('@/lib/data');
  return projects.map((project) => ({
    slug: project.slug,
  }));
}