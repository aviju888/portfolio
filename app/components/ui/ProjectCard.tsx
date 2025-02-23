'use client';

import React from 'react';
import Image from 'next/image';
import { useDomain } from '../layout/DomainProvider';

interface ProjectCardProps {
  title: string;
  description: string;
  tools: string[];
  thumbnail?: string;
  link?: string;
  onClick?: () => void;
}

export const ProjectCard = ({ 
  title, 
  description, 
  tools, 
  thumbnail, 
  link,
  onClick 
}: ProjectCardProps) => {
  const { activeDomain } = useDomain();

  const getAccentColor = () => {
    switch (activeDomain) {
      case 'creative':
        return 'pink';
      case 'software':
        return 'blue';
      case 'design':
        return 'orange';
      default:
        return 'white';
    }
  };

  const accentColor = getAccentColor();

  return (
    <div
      className="group relative bg-white/[0.03] rounded-xl overflow-hidden cursor-pointer
        hover:bg-white/[0.06] transition-all duration-500"
      onClick={onClick}
    >
      {thumbnail && (
        <div className="aspect-video relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
          <Image
            src={thumbnail}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      )}

      <div className={`relative z-20 p-6 ${thumbnail ? '-mt-20' : ''}`}>
        <div className="flex items-center justify-between mb-2">
          <h3 className={`text-2xl font-medium text-white group-hover:text-${accentColor}-400 transition-colors`}>
            {title}
          </h3>
          {link && (
            <a 
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={e => e.stopPropagation()}
              className={`text-white/60 hover:text-${accentColor}-400 transition-colors`}
            >
              ↗
            </a>
          )}
        </div>
        <p className="text-white/70 mb-4">
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {tools.slice(0, 3).map((tool, i) => (
            <span
              key={i}
              className={`px-3 py-1 text-sm bg-${accentColor}-500/10 text-${accentColor}-400/80
                border border-${accentColor}-500/20`}
            >
              {tool}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}; 