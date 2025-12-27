'use client';

import { ReactNode, useState } from 'react';
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
  const [isExpanded, setIsExpanded] = useState(false);
  
  const hasExpandableContent = !!(experience.summary || experience.highlights.length > 0 || experience.stack.length > 0 || experience.links.repo || experience.links.site);

  return (
        <div 
          onClick={hasExpandableContent ? () => setIsExpanded(!isExpanded) : undefined}
          className={`group relative rounded-2xl glass-border p-4 md:p-6 
                        transition-all duration-200 ease-out
                        ${hasExpandableContent ? 'md:cursor-default cursor-pointer' : ''}
                        ${isCurrent 
                          ? 'bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 hover:from-blue-100/60 hover:via-indigo-100/45 hover:to-purple-100/60 hover:shadow-sm' 
                          : 'bg-white hover:bg-gray-50 hover:shadow-sm'
                        }
                        ${className}`}>
      
      
      {/* Current role badge */}
      {isCurrent && (
        <div className="absolute -top-2.5 -right-2.5 md:-right-2.5 bg-gray-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg z-20">
          Current
        </div>
      )}
      
      {/* Expand/Collapse indicator - Mobile only, shows on hover */}
      {hasExpandableContent && (
        <div
          className={`md:hidden absolute top-4 w-8 h-8 flex items-center justify-center pointer-events-none z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isCurrent ? 'right-16' : 'right-4'}`}
          aria-label={isExpanded ? 'Collapsed' : 'Expandable'}
        >
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      )}
      
      {/* Header with logo and role info */}
      <div className="flex items-start gap-3 md:gap-4 mb-4 pr-10 md:pr-0">
        {experience.logo && (
          <div className={`flex-shrink-0 w-14 h-14 rounded-xl border border-gray-200 flex items-center justify-center ${
            ['KOSMOS @ Cal', 'Self-Employed', 'AFX Dance', 'PASAE', 'Apex Agent Labs'].includes(experience.company) 
              ? 'bg-gray-900' 
              : 'bg-gray-100'
          }`}>
            <Image
              src={experience.logo}
              alt={`${experience.company} logo`}
              width={36}
              height={36}
              className="opacity-90 transition-opacity"
            />
          </div>
        )}
        
        <div className="flex-1 min-w-0">
          {/* Role Title - Most Prominent */}
          <h3 className="text-xl md:text-2xl font-bold tracking-tight text-gray-900 mb-0">
            {experience.role}
          </h3>
          
          {/* Company and Type */}
          <div className="flex items-center gap-2 flex-wrap mb-0.5">
            <p className="text-sm md:text-base font-semibold text-gray-800">
              {experience.company}
            </p>
            <span className="text-gray-300">•</span>
            <span className="text-sm text-gray-600">
              {experience.type}
            </span>
          </div>
          
          {/* Date and Location */}
          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
            <span className="font-medium">{dateRange}</span>
            <span className="text-gray-400">•</span>
            <span>{experience.location}</span>
          </div>
        </div>
      </div>
      
      {/* Summary and Highlights - Collapsible on mobile */}
      {(experience.summary || experience.highlights.length > 0) && (
        <div className={`mb-2 ${hasExpandableContent ? (isExpanded ? 'block' : 'hidden md:block') : ''}`}>
          <ul className="space-y-1">
            {experience.summary && (
              <li className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-gray-400 mt-0.5 flex-shrink-0 text-xs">▸</span>
                <span className="flex-1 leading-relaxed">{experience.summary}</span>
              </li>
            )}
            {experience.highlights.map((highlight, index) => (
              <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-gray-400 mt-0.5 flex-shrink-0 text-xs">▸</span>
                <span className="flex-1 leading-relaxed">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Tech Stack - Collapsible on mobile */}
      {experience.stack.length > 0 && (
        <div className={`mb-3 mt-[5px] ${hasExpandableContent ? (isExpanded ? 'block' : 'hidden md:block') : ''}`}>
          <div className="flex flex-wrap gap-2">
            {experience.stack.map((tech) => (
              <Tag key={tech} className="text-xs">
                {tech}
              </Tag>
            ))}
          </div>
        </div>
      )}
      
      {/* Links - Collapsible on mobile */}
      {(experience.links.repo || experience.links.site) && (
        <div className={`flex flex-wrap gap-4 pt-4 border-t border-gray-100 ${hasExpandableContent ? (isExpanded ? 'flex' : 'hidden md:flex') : ''}`}>
          {experience.links.repo && (
            <Link 
              href={experience.links.repo}
              onClick={(e) => e.stopPropagation()}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Repository →
            </Link>
          )}
          {experience.links.site && (
            <Link 
              href={experience.links.site}
              onClick={(e) => e.stopPropagation()}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              Company Site →
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
