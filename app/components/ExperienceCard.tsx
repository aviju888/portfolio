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
        <div className={`group relative bg-white rounded-2xl glass-border p-6 
                        transition-colors duration-200 ease-out
                        hover:bg-gray-50
                        ${isCurrent ? 'ring-1 ring-gray-300 bg-gray-50' : ''}
                        ${className}`}>
      
      
          {/* Current role badge */}
          {isCurrent && (
            <div className="absolute -top-2 -right-2 bg-gray-900 text-white text-xs font-medium px-3 py-1 rounded-full shadow-md">
              Current
            </div>
          )}
      
      {/* Header with logo and role info */}
      <div className="flex items-start gap-4 mb-4">
        {experience.logo && (
          <div className={`flex-shrink-0 w-12 h-12 rounded-lg border border-gray-200 flex items-center justify-center ${
            ['KOSMOS @ Cal', 'Self-Employed', 'AFX Dance', 'PASAE', 'Apex Agent Labs'].includes(experience.company) 
              ? 'bg-gray-900' 
              : 'bg-gray-100'
          }`}>
            <Image
              src={experience.logo}
              alt={`${experience.company} logo`}
              width={32}
              height={32}
              className="opacity-90 transition-opacity"
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-2 gap-2">
            <div>
              <h3 className="text-xl font-semibold tracking-tighter text-gray-900 mb-1">
                {experience.role}
              </h3>
              <p className="text-gray-700 font-medium">
                {experience.company}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-sm text-gray-500 mb-1">
                {dateRange}
              </p>
              <div className="flex gap-2 sm:justify-end">
                <Tag className="text-xs">
                  {experience.type}
                </Tag>
                <span className="text-xs text-gray-400">
                  {experience.location}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Summary */}
      <p className="text-sm text-gray-700 mb-4 leading-relaxed">
        {experience.summary}
      </p>
      
      {/* Highlights */}
      {experience.highlights.length > 0 && (
        <div className="mb-4">
          <ul className="space-y-1">
            {experience.highlights.map((highlight, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                <span className="text-gray-600 mt-0.5 flex-shrink-0">•</span>
                <span className="flex-1">{highlight}</span>
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
            className="text-sm text-gray-700 hover:text-gray-900 transition-colors"
          >
            View Case Study →
          </Link>
        )}
        {experience.links.repo && (
          <Link 
            href={experience.links.repo}
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Repository →
          </Link>
        )}
        {experience.links.site && (
          <Link 
            href={experience.links.site}
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors"
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
