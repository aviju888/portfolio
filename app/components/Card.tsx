'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ImageSkeleton from './ImageSkeleton';

interface CardProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  href?: string;
  children?: ReactNode;
  className?: string;
  loading?: boolean;
}

export default function Card({
  title,
  subtitle,
  description,
  image,
  href,
  children,
  className = '',
  loading = false
}: CardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleClick = () => {
    // Save scroll position if navigating to a case study from projects page
    if (href && href.startsWith('/code/') && typeof window !== 'undefined') {
      sessionStorage.setItem('codePageScrollPosition', window.scrollY.toString());
    }
  };

  const cardContent = (
    <div 
      className={`group relative bg-white rounded-2xl glass-border p-6 
                  transition-colors duration-200 ease-out
                  hover:bg-gray-50
                  ${className}`}
    >
      {/* Image with inset frame */}
      {image && (
        <div className="relative overflow-hidden rounded-lg bg-gray-100 aspect-[16/9] mb-4 p-1">
          {!imageLoaded && <ImageSkeleton />}
          <Image
            src={image}
            alt={`${title}${subtitle ? ` - ${subtitle}` : ''}${description ? `: ${description}` : ''}`}
            fill
            className={`object-cover transition-opacity duration-300 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
        </div>
      )}
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700 transition-colors">
          {title}
        </h3>
        
        {subtitle && (
          <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
            {subtitle}
          </p>
        )}
        
        {description && (
          <p className="text-sm text-gray-700 group-hover:text-gray-800 transition-colors leading-relaxed">
            {description}
          </p>
        )}
        
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block" onClick={handleClick}>
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}