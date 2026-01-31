'use client';

import { useState, useEffect, useRef } from 'react';
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
      className="cursor-pointer group mb-3"
    >
      <div className="relative overflow-hidden rounded-lg shadow-md group-hover:shadow-xl transition-shadow duration-300">
        {photo.blurDataURL && !isLoaded && (
          <img
            src={photo.blurDataURL}
            alt=""
            className="absolute inset-0 w-full h-full scale-110 blur-lg object-cover"
            aria-hidden="true"
          />
        )}
        <img
          src={src}
          alt={photo.alt}
          className={`w-full h-auto block transition-all duration-500 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
    </div>
  );
}

// Horizontal scroll card - fixed height, variable width
function ScrollPhotoCard({ photo, onClick, priority = false }: PhotoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const src = getBestImageUrl(photo.optimized, photo.srcThumb, 'thumb_800');

  // Width based on orientation (height is fixed via parent)
  const aspectClass = photo.orientation === 'portrait'
    ? 'w-[200px] md:w-[240px]'
    : 'w-[300px] md:w-[360px]';

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer group flex-shrink-0 h-full ${aspectClass}`}
    >
      <div className="relative h-full overflow-hidden rounded-xl shadow-md group-hover:shadow-xl transition-all duration-300">
        {photo.blurDataURL && !isLoaded && (
          <img
            src={photo.blurDataURL}
            alt=""
            className="absolute inset-0 w-full h-full scale-110 blur-lg object-cover"
            aria-hidden="true"
          />
        )}
        <img
          src={src}
          alt={photo.alt}
          className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={() => setIsLoaded(true)}
          loading={priority ? 'eager' : 'lazy'}
        />
      </div>
    </div>
  );
}

// Distribute photos into columns round-robin style (left-to-right order)
function distributeToColumns<T>(items: T[], numColumns: number): T[][] {
  const columns: T[][] = Array.from({ length: numColumns }, () => []);
  items.forEach((item, index) => {
    columns[index % numColumns].push(item);
  });
  return columns;
}

interface PhotoGalleryProps {
  photos: Photo[];
  variant?: 'masonry' | 'scroll';
}

export default function PhotoGallery({ photos, variant = 'masonry' }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [numColumns, setNumColumns] = useState(4);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Responsive column count (for masonry)
  useEffect(() => {
    if (variant !== 'masonry') return;
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setNumColumns(2);
      else if (width < 1024) setNumColumns(3);
      else setNumColumns(4);
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, [variant]);

  // Only show visible photos
  const visiblePhotos = photos.filter(p => p.visible !== false);

  // Track original indices for lightbox
  const photosWithIndex = visiblePhotos.map((photo, index) => ({ photo, originalIndex: index }));

  // Distribute into columns round-robin (maintains left-to-right reading order)
  const columns = distributeToColumns(photosWithIndex, numColumns);

  const slides = visiblePhotos.map(photo => ({
    src: getBestImageUrl(photo.optimized, photo.srcFull, 'full_1920'),
    alt: photo.alt,
    description: photo.description,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (variant === 'scroll') {
    return (
      <>
        {/* Horizontal scroll gallery */}
        <div className="relative -mx-6 md:-mx-8">
          <div
            ref={scrollRef}
            className="flex gap-3 overflow-x-auto px-6 md:px-8 pb-4 scrollbar-hide"
            style={{ height: '280px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {visiblePhotos.map((photo, index) => (
              <ScrollPhotoCard
                key={photo.id}
                photo={photo}
                onClick={() => openLightbox(index)}
                priority={index < 4}
              />
            ))}
          </div>
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

  return (
    <>
      {/* Masonry with left-to-right ordering */}
      <div className="flex gap-3">
        {columns.map((column, colIndex) => (
          <div key={colIndex} className="flex-1 min-w-0">
            {column.map(({ photo, originalIndex }) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onClick={() => openLightbox(originalIndex)}
                priority={originalIndex < 4}
              />
            ))}
          </div>
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
