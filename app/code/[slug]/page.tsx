import { notFound } from 'next/navigation';
import { getProjectBySlug, projects } from '@/lib/data';
import Tag from '../../components/Tag';
import Section from '../../components/Section';
import Link from 'next/link';

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <Section>
      <div className="max-w-4xl mx-auto">
        {/* Project Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            {project.title}
          </h1>
          <p className="text-xl text-accent mb-4">
            {project.role}
          </p>
          <p className="text-lg text-gray-300 mb-6">
            {project.summary}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>

        {/* Project Images */}
        {project.images.length > 0 && (
          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.slice(0, 3).map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Project Details */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            About this project
          </h2>
          <ul className="space-y-3">
            {project.description.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-accent mr-3">•</span>
                <span className="text-gray-300">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Project Links */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Links
          </h2>
          <div className="flex flex-col sm:flex-row gap-4">
            {project.links.demo && (
              <Link
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                View Demo
              </Link>
            )}
            {project.links.repo && (
              <Link
                href={project.links.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                View Code
              </Link>
            )}
          </div>
        </div>

        {/* Project Meta */}
        <div className="border-t border-gray-700 pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-400">
            <div>
              <span className="font-medium text-white">Year:</span> {project.year}
            </div>
            <div>
              <span className="font-medium text-white">Status:</span> {project.status}
            </div>
            <div>
              <span className="font-medium text-white">Role:</span> {project.role}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
