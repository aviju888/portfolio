'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { photos } from '@/lib/data';
import { Photo } from '@/lib/types';
import Section from '../components/Section';
import FadeIn from '../components/FadeIn';

function getOptimizedSrc(photo: Photo): string {
  if (photo.optimized?.webp?.thumb_800) {
    return photo.optimized.webp.thumb_800;
  }
  if (photo.optimized?.jpeg?.thumb_800) {
    return photo.optimized.jpeg.thumb_800;
  }
  return photo.srcThumb;
}

function getFullSrc(photo: Photo): string {
  if (photo.optimized?.webp?.full_1920) {
    return photo.optimized.webp.full_1920;
  }
  if (photo.optimized?.webp?.full_1200) {
    return photo.optimized.webp.full_1200;
  }
  if (photo.optimized?.jpeg?.full_1920) {
    return photo.optimized.jpeg.full_1920;
  }
  return photo.srcFull;
}

interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
  priority?: boolean;
}

function PhotoCard({ photo, onClick, priority = false }: PhotoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const src = getOptimizedSrc(photo);

  return (
    <div
      onClick={onClick}
      className="cursor-pointer group break-inside-avoid mb-4"
    >
      <div className="relative w-full overflow-hidden rounded-xl shadow-md group-hover:shadow-xl transition-shadow duration-300">
        {/* Blur placeholder background */}
        {photo.blurDataURL && !isLoaded && (
          <div
            className="absolute inset-0 scale-110 blur-lg"
            style={{
              backgroundImage: `url(${photo.blurDataURL})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        )}
        {/* Pinterest-style: natural aspect ratio, no forced dimensions */}
        <img
          src={src}
          alt={photo.alt}
          className={`w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
    </div>
  );
}

export default function PhotosPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Only show visible photos
  const visiblePhotos = photos.photos.filter(p => p.visible !== false);

  const slides = visiblePhotos.map(photo => ({
    src: getFullSrc(photo),
    alt: photo.alt,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <FadeIn>
      <Section
        title="Photos"
        description="Graduation portraits, dance performances, travel, and more"
      >
        {/* Pinterest-style masonry grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4">
          {visiblePhotos.map((photo, index) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              onClick={() => openLightbox(index)}
              priority={index < 8}
            />
          ))}
        </div>

        {visiblePhotos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No photos yet.</p>
          </div>
        )}

        {/* Lightbox */}
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={lightboxIndex}
          slides={slides}
          styles={{
            container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
          }}
        />
      </Section>
    </FadeIn>
  );
}
