'use client';

import { useState, useEffect } from 'react';
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
}

export default function PhotoGallery({ photos }: PhotoGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [numColumns, setNumColumns] = useState(4);

  // Responsive column count
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setNumColumns(2);
      else if (width < 1024) setNumColumns(3);
      else setNumColumns(4);
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

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
