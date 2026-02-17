import { getProjectBySlug } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Section from '@/app/components/Section';

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const hasDemo = project.links.demo && project.links.demo.length > 0;
  const hasRepo = project.links.repo && project.links.repo.length > 0;

  return (
    <Section>
      {/* Back link */}
      <Link href="/code" className="inline-flex items-center text-gray-500 hover:text-gray-900 dark:hover:text-white mb-8 transition-colors text-sm">
        ← All Projects
      </Link>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
            {project.title}
          </h1>
          <span className="text-sm text-gray-400 dark:text-gray-500 font-medium">{project.year}</span>
        </div>
        <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed max-w-2xl">
          {project.summary}
        </p>
      </div>

      {/* CTA buttons */}
      <div className="flex gap-3 mb-10">
        {hasDemo && (
          <a
            href={project.links.demo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Live Demo →
          </a>
        )}
        {hasRepo && (
          <a
            href={project.links.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            GitHub →
          </a>
        )}
      </div>

      {/* Screenshot */}
      {project.images[0] && (
        <div className="mb-10">
          <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 max-w-4xl">
            <Image
              src={project.images[0]}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      {/* Tech stack */}
      <div className="mb-10">
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Description */}
      {project.description.length > 0 && (
        <div className="mb-12 max-w-2xl">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">About</h2>
          <ul className="space-y-3">
            {project.description.map((item, index) => (
              <li key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed flex items-start gap-3">
                <span className="text-gray-300 dark:text-gray-600 mt-1.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Additional images */}
      {project.images.length > 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 max-w-4xl">
          {project.images.slice(1).map((image, index) => (
            <div key={index} className="relative aspect-video rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
              <Image
                src={image}
                alt={`${project.title} - ${index + 2}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="pt-8 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Built by Adriel Vijuan · {project.role}
        </p>
        <div className="flex gap-3">
          {hasDemo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              View Demo →
            </a>
          )}
          {hasRepo && (
            <a
              href={project.links.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              View Source →
            </a>
          )}
        </div>
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
