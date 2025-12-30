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
  
  // Determine if description items look like highlights (short bullet points) or paragraphs
  const hasHighlights = project.description.length > 0 && 
    project.description.every(item => item.length < 100);
  const hasOverview = project.description.length > 0 && 
    project.description.some(item => item.length >= 100);
  
  // Extract proof cards from description (first 4 short items)
  const proofCards = project.description
    .filter(item => item.length < 100)
    .slice(0, 4);
  
  // Get remaining bullets for notes (if any)
  const notes = project.description
    .filter(item => item.length < 100)
    .slice(4);
  
  // Determine CTA buttons
  const hasDemo = project.links.demo && project.links.demo.length > 0;
  const hasRepo = project.links.repo && project.links.repo.length > 0;
  
  return (
    <Section>
      {/* Back link */}
      <Link href="/code" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors">
        ← Back to Projects
      </Link>
      
      {/* Title and optional summary */}
      <div className="mb-6">
        <h1 className="text-h1-sm md:text-h1 font-bold text-gray-900 tracking-tight mb-3">
          {project.title}
        </h1>
        {project.summary && (
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {project.summary}
          </p>
        )}
      </div>
      
      {/* Unified CTA + Tags row */}
      <div className="flex flex-wrap items-center gap-4 mb-8">
        {/* CTAs grouped together */}
        <div className="flex gap-3">
          {hasDemo ? (
            <a 
              href={project.links.demo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary"
            >
              Live Demo →
            </a>
          ) : hasRepo ? (
            <a 
              href={project.links.repo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary"
            >
              GitHub →
            </a>
          ) : null}
          {hasDemo && hasRepo && (
            <a 
              href={project.links.repo} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-secondary"
            >
              GitHub →
            </a>
          )}
          {!hasDemo && (
            <a 
              href="/contact" 
              className="btn-secondary"
            >
              Contact →
            </a>
          )}
        </div>
        
        {/* Tags inline */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-gray-500">Tags:</span>
          {project.tags.map((tag, index) => (
            <span key={tag} className="text-sm text-gray-700">
              {tag}{index < project.tags.length - 1 ? ' •' : ''}
            </span>
          ))}
        </div>
      </div>
      
      {/* Main content: Media left, Proof cards right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mb-12">
        {/* Media column with caption */}
        <div>
          {project.images[0] ? (
            <div>
              <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 mb-3">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <p className="text-sm text-gray-500">
                Example output: {project.summary || 'project demo'}
              </p>
            </div>
          ) : (
            <div className="relative aspect-video rounded-2xl overflow-hidden border border-gray-200 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400">No image available</span>
            </div>
          )}
        </div>
        
        {/* Proof cards column */}
        <div className="flex flex-col justify-center">
          {proofCards.length > 0 ? (
            <div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {proofCards.map((item, index) => {
                  // Extract key metric/number if present
                  const match = item.match(/(\d+[\+\-]?)\s*([^•]+)/);
                  const metric = match ? match[1] : null;
                  const label = match ? match[2].trim() : item;
                  
                  return (
                    <div 
                      key={index} 
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                    >
                      {metric && (
                        <div className="text-2xl font-bold text-gray-900 mb-1">{metric}</div>
                      )}
                      <div className="text-sm text-gray-700 leading-snug">{label}</div>
                    </div>
                  );
                })}
              </div>
              
              {/* Optional notes bullets */}
              {notes.length > 0 && (
                <ul className="space-y-2 mt-4">
                  {notes.map((note, index) => (
                    <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                      <span className="text-gray-400 mt-0.5">•</span>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <p className="text-sm text-gray-500 mb-2">Built</p>
              <p className="text-gray-900 font-medium">{project.year} • {project.role}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Project Notes section */}
      <div className="mb-12">
        {hasOverview ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
            <div className="prose prose-lg max-w-none">
              {project.description
                .filter(item => item.length >= 100)
                .map((paragraph, index) => (
                  <p key={index} className="text-base md:text-lg text-gray-700 leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
            </div>
          </div>
        ) : (
          <div className="bg-gray-50 rounded-xl p-6 md:p-8 border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Project Notes (v1)</h2>
            <p className="text-sm text-gray-600 mb-6">
              Building writeup soon — meanwhile, here's what I'd improve next.
            </p>
            
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-3">What I'd improve next</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Enhanced error handling and edge cases</li>
                <li>• Performance optimizations</li>
                <li>• Additional features based on user feedback</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      
      {/* Additional images */}
      {project.images.length > 1 && (
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
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
      
      {/* Footer CTA */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 border-t border-gray-200">
        {hasRepo && (
          <a 
            href={project.links.repo} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-secondary"
          >
            View on GitHub →
          </a>
        )}
        <a 
          href="/contact" 
          className="btn-primary"
        >
          Get in Touch →
        </a>
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