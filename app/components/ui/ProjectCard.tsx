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
      case 'ui-ux':
        return 'orange';
      default:
        return 'white';
    }
  };

  const accentColor = getAccentColor();

  // Create a black image data URL
  const blackImageDataUrl = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';

  return (
    <div
      className="group relative bg-white/[0.03] rounded-xl overflow-hidden cursor-pointer
        hover:bg-white/[0.06] transition-all duration-500"
      onClick={onClick}
    >
      {/* Image Container with Black Background */}
      <div className="aspect-video relative overflow-hidden bg-black">
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        
        {/* Image */}
        <Image
          src={thumbnail || blackImageDataUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            // If image fails to load, hide it to show black background
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 p-6 -mt-20">
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