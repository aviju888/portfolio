import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Experience } from '@/lib/types';
import { formatDateRange } from '@/lib/data';
import Tag from './Tag';

interface ExperienceCardProps {
  experience: Experience;
  className?: string;
}

export default function ExperienceCard({ experience, className = '' }: ExperienceCardProps) {
  const isCurrent = experience.end === null;
  const dateRange = formatDateRange(experience.start, experience.end);

  return (
    <div className={`group relative bg-white/[0.02] rounded-2xl border border-white/[0.1] p-6 
                    transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]
                    hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,.35)] hover:border-white/[0.15]
                    hover:ring-1 hover:ring-white/[0.1]
                    ${isCurrent ? 'ring-1 ring-sky-400/20' : ''}
                    ${className}`}>
      
      {/* Highlight overlay - top-right shimmer on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300
                      bg-[radial-gradient(120px_120px_at_85%_15%,rgba(255,255,255,0.06),transparent_60%)]" />
      
      {/* Current role badge */}
      {isCurrent && (
        <div className="absolute -top-2 -right-2 bg-sky-400 text-white text-xs font-medium px-2 py-1 rounded-full">
          Current
        </div>
      )}
      
      {/* Header with logo and role info */}
      <div className="flex items-start gap-4 mb-4">
        {experience.logo && (
          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-white/[0.05] border border-white/[0.1] flex items-center justify-center">
            <Image
              src={experience.logo}
              alt={`${experience.company} logo`}
              width={32}
              height={32}
              className="opacity-70 hover:opacity-90 transition-opacity"
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="text-xl font-semibold tracking-tighter text-white mb-1">
                {experience.role}
              </h3>
              <p className="text-sky-400 font-medium">
                {experience.company}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/50 mb-1">
                {dateRange}
              </p>
              <div className="flex gap-2">
                <Tag className="text-xs">
                  {experience.type}
                </Tag>
                <span className="text-xs text-white/40">
                  {experience.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Summary */}
      <p className="text-sm text-white/70 mb-4 leading-relaxed">
        {experience.summary}
      </p>
      
      {/* Highlights */}
      {experience.highlights.length > 0 && (
        <div className="mb-4">
          <ul className="space-y-1">
            {experience.highlights.map((highlight, index) => (
              <li key={index} className="text-sm text-white/60 flex items-start">
                <span className="text-sky-400 mr-2 mt-1">•</span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Tech Stack */}
      {experience.stack.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-1.5">
            {experience.stack.map((tech) => (
              <Tag key={tech} className="text-xs">
                {tech}
              </Tag>
            ))}
          </div>
        </div>
      )}
      
      {/* Links */}
      <div className="flex gap-3">
        {experience.links.caseStudy && (
          <Link 
            href={experience.links.caseStudy}
            className="text-sm text-sky-400 hover:text-sky-300 transition-colors"
          >
            View Case Study →
          </Link>
        )}
        {experience.links.repo && (
          <Link 
            href={experience.links.repo}
            className="text-sm text-white/60 hover:text-white/80 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Repository →
          </Link>
        )}
        {experience.links.site && (
          <Link 
            href={experience.links.site}
            className="text-sm text-white/60 hover:text-white/80 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Company Site →
          </Link>
        )}
      </div>
    </div>
  );
}
