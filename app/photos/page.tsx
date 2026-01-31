'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
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
  originalIndex: number;
  onClick: () => void;
  priority?: boolean;
}

function PhotoCard({ photo, originalIndex, onClick, priority = false }: PhotoCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const src = getOptimizedSrc(photo);

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

interface ColorSliderProps {
  value: number | null; // 0-360 hue, null = all
  onChange: (hue: number | null) => void;
}

function ColorSlider({ value, onChange }: ColorSliderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleInteraction = (clientX: number) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const hue = Math.round((x / rect.width) * 360);
    onChange(hue);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    handleInteraction(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) handleInteraction(e.clientX);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleInteraction(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging) handleInteraction(e.touches[0].clientX);
  };

  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        ref={sliderRef}
        className="relative h-2 flex-1 rounded-full cursor-pointer select-none"
        style={{
          background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
      >
        {/* Thumb */}
        {value !== null && (
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full border-2 border-white shadow-md pointer-events-none"
            style={{
              left: `${(value / 360) * 100}%`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: `hsl(${value}, 70%, 50%)`,
            }}
          />
        )}
      </div>

      {/* Reset button */}
      {value !== null && (
        <button
          onClick={() => onChange(null)}
          className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        >
          Reset
        </button>
      )}
    </div>
  );
}

export default function PhotosPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [numColumns, setNumColumns] = useState(4);
  const [selectedHue, setSelectedHue] = useState<number | null>(null);

  // Responsive column count
  useEffect(() => {
    const updateColumns = () => {
      const width = window.innerWidth;
      if (width < 640) setNumColumns(2);
      else if (width < 1024) setNumColumns(3);
      else if (width < 1280) setNumColumns(4);
      else setNumColumns(5);
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  // Only show visible photos
  const visiblePhotos = photos.photos.filter(p => p.visible !== false);

  // Filter photos based on selected hue (within ±30 degrees)
  const filteredPhotos = useMemo(() => {
    if (selectedHue === null) return visiblePhotos;

    return visiblePhotos.filter(photo => {
      const hsl = photo.dominantColor?.hsl;
      if (!hsl || hsl.s < 15) return false; // Skip grayscale

      // Calculate hue distance (wrapping around 360)
      const hueDiff = Math.abs(hsl.h - selectedHue);
      const wrappedDiff = Math.min(hueDiff, 360 - hueDiff);
      return wrappedDiff <= 30;
    });
  }, [visiblePhotos, selectedHue]);

  // Track original indices for lightbox (relative to filtered set)
  const photosWithIndex = filteredPhotos.map((photo, index) => ({ photo, originalIndex: index }));

  // Distribute into columns round-robin (maintains left-to-right reading order)
  const columns = distributeToColumns(photosWithIndex, numColumns);

  const slides = filteredPhotos.map(photo => ({
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
        {/* Color spectrum slider */}
        <ColorSlider value={selectedHue} onChange={setSelectedHue} />

        {/* Masonry with left-to-right ordering */}
        <div className="flex gap-3">
          {columns.map((column, colIndex) => (
            <div key={colIndex} className="flex-1 min-w-0">
              {column.map(({ photo, originalIndex }) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  originalIndex={originalIndex}
                  onClick={() => openLightbox(originalIndex)}
                  priority={originalIndex < 8}
                />
              ))}
            </div>
          ))}
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400">No photos match this color.</p>
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
