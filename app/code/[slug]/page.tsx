import { getProjectBySlug, getProjectCategory } from '@/lib/data';
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
      </div>
      
      {/* Main content: Image left, Description right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 mb-12">
        {/* Image column */}
        <div>
          {project.images[0] && (
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 mb-4">
              <Image
                src={project.images[0]}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
          
          {/* Meta info with tags */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span>{project.year}</span>
            <span>({getProjectCategory(project)})</span>
            {project.tags.map(tag => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
        
        {/* Description column */}
        <div className="flex flex-col justify-center">
          <div className="prose prose-lg">
            {project.description.map((paragraph, index) => (
              <p key={index} className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}
          </div>
          
          {/* Links */}
          <div className="flex gap-4 mt-6">
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
        </div>
      </div>
      
      {/* Additional images */}
      {project.images.length > 1 && (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6 mt-12">
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
    </Section>
  );
}

export async function generateStaticParams() {
  const { projects } = await import('@/lib/data');
  return projects.map((project) => ({
    slug: project.slug,
  }));
}