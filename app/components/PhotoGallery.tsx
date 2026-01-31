'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Photo } from '@/lib/types';
import { getBestImageUrl } from '@/lib/imageUtils';

interface PhotoCardProps {
  photo: Photo;
  onClick: () => void;
  priority?: boolean;
}

function PhotoCard({ photo, onClick, priority = false }: PhotoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const src = getBestImageUrl(photo.optimized, photo.srcThumb, 'thumb_800');

  return (
    <div
      onClick={onClick}
      className="cursor-pointer group break-inside-avoid mb-4 md:mb-6"
    >
      <div className="relative w-full overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
        {/* Blur placeholder */}
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
        {/* Natural aspect ratio image */}
        <img
          src={src}
          alt={photo.alt}
          className={`w-full h-auto transition-all duration-500 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
    </div>
  );
}

interface PhotoGalleryProps {
  photos: Photo[];
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Only show visible photos
  const visiblePhotos = photos.filter(p => p.visible !== false);

  // Use optimized full-size images for lightbox if available
  const slides = visiblePhotos.map(photo => ({
    src: getBestImageUrl(photo.optimized, photo.srcFull, 'full_1920'),
    alt: photo.alt,
    description: photo.description,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      {/* Pinterest-style masonry grid */}
      <div className="columns-2 md:columns-3 lg:columns-4 gap-4 md:gap-6">
        {visiblePhotos.map((photo, index) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onClick={() => openLightbox(index)}
            priority={index < 4}
          />
        ))}
      </div>

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
    </>
  );
}
