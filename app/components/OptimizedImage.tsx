'use client';

import { useState } from 'react';
import { OptimizedImage as OptimizedImageType } from '@/lib/types';
import { getImageSources, getImageSizes, getBestImageUrl, getPlaceholderDataUrl } from '@/lib/imageUtils';

interface OptimizedImageProps {
  optimized?: OptimizedImageType;
  fallbackSrc: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  priority?: boolean;
  onClick?: () => void;
  type?: 'thumbnail' | 'full' | 'card';
}

export default function OptimizedImage({
  optimized,
  fallbackSrc,
  alt,
  className = '',
  loading = 'lazy',
  priority = false,
  onClick,
  type = 'thumbnail',
}: OptimizedImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // If optimized images exist, use picture element with progressive format support
  if (optimized && !hasError) {
    const sources = getImageSources(optimized);
    const sizes = getImageSizes(type);

    return (
      <picture className={className} onClick={onClick}>
        {sources.map((source, index) => (
          <source
            key={index}
            type={source.type}
            srcSet={source.srcSet}
            sizes={sizes}
          />
        ))}
        <img
          src={getBestImageUrl(optimized, fallbackSrc, type === 'thumbnail' ? 'thumb_800' : 'full_1920')}
          alt={alt}
          loading={priority ? 'eager' : loading}
          className={`transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          } ${className}`}
          onLoad={() => setImageLoaded(true)}
          onError={() => setHasError(true)}
        />
      </picture>
    );
  }

  // Fallback to regular img if no optimized images or error occurred
  return (
    <img
      src={fallbackSrc}
      alt={alt}
      loading={priority ? 'eager' : loading}
      className={`transition-opacity duration-300 ${
        imageLoaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
      onLoad={() => setImageLoaded(true)}
      onClick={onClick}
    />
  );
}
