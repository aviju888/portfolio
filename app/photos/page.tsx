'use client';

import { useState, useEffect, useMemo } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { photos } from '@/lib/data';
import { Photo } from '@/lib/types';
import Section from '../components/Section';
import FadeIn from '../components/FadeIn';

// Group colors into buckets for the sidebar
function getColorBuckets(photos: Photo[]) {
  const buckets: { [key: string]: { color: string; photos: Photo[]; hue: number } } = {};

  photos.forEach(photo => {
    if (!photo.dominantColor?.hsl) return;
    const { h, s, l } = photo.dominantColor.hsl;

    // Group by hue ranges (12 buckets of 30 degrees each)
    // But also separate low saturation (grays) and very dark/light
    let bucketKey: string;
    let bucketHue: number;

    if (s < 15) {
      // Grayscale
      bucketKey = 'gray';
      bucketHue = -1;
    } else if (l < 15) {
      // Very dark
      bucketKey = 'dark';
      bucketHue = -2;
    } else if (l > 85) {
      // Very light
      bucketKey = 'light';
      bucketHue = 361;
    } else {
      // Color buckets by hue
      bucketHue = Math.floor(h / 30) * 30;
      bucketKey = `hue-${bucketHue}`;
    }

    if (!buckets[bucketKey]) {
      // Get representative color
      let color: string;
      if (bucketKey === 'gray') color = '#888888';
      else if (bucketKey === 'dark') color = '#222222';
      else if (bucketKey === 'light') color = '#f5f5f5';
      else color = `hsl(${bucketHue + 15}, 70%, 50%)`;

      buckets[bucketKey] = { color, photos: [], hue: bucketHue };
    }
    buckets[bucketKey].photos.push(photo);
  });

  // Sort by hue, with special buckets at the end
  return Object.values(buckets).sort((a, b) => {
    if (a.hue < 0 && b.hue >= 0) return 1;
    if (b.hue < 0 && a.hue >= 0) return -1;
    return a.hue - b.hue;
  });
}

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

interface ColorSidebarProps {
  buckets: { color: string; photos: Photo[]; hue: number }[];
  selectedBucket: number | null;
  onSelect: (index: number | null) => void;
  totalPhotos: number;
}

function ColorSidebar({ buckets, selectedBucket, onSelect, totalPhotos }: ColorSidebarProps) {
  return (
    <div className="flex flex-col gap-1 w-6 shrink-0">
      {/* "All" button at top */}
      <button
        onClick={() => onSelect(null)}
        className={`w-6 h-6 rounded-full border-2 transition-all ${
          selectedBucket === null
            ? 'border-gray-900 dark:border-white scale-110'
            : 'border-gray-300 dark:border-gray-600 hover:border-gray-500'
        }`}
        style={{
          background: 'conic-gradient(from 0deg, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)',
        }}
        title={`All photos (${totalPhotos})`}
      />

      {/* Color buckets */}
      {buckets.map((bucket, index) => {
        const height = Math.max(16, Math.min(48, bucket.photos.length * 3));
        return (
          <button
            key={index}
            onClick={() => onSelect(selectedBucket === index ? null : index)}
            className={`w-6 rounded-full transition-all ${
              selectedBucket === index
                ? 'ring-2 ring-offset-2 ring-gray-900 dark:ring-white scale-110'
                : 'hover:scale-110'
            }`}
            style={{
              backgroundColor: bucket.color,
              height: `${height}px`,
            }}
            title={`${bucket.photos.length} photos`}
          />
        );
      })}
    </div>
  );
}

export default function PhotosPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [numColumns, setNumColumns] = useState(4);
  const [selectedBucket, setSelectedBucket] = useState<number | null>(null);

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

  // Get color buckets for sidebar
  const colorBuckets = useMemo(() => getColorBuckets(visiblePhotos), [visiblePhotos]);

  // Filter photos based on selected color bucket
  const filteredPhotos = useMemo(() => {
    if (selectedBucket === null) return visiblePhotos;
    const bucket = colorBuckets[selectedBucket];
    return bucket ? bucket.photos : visiblePhotos;
  }, [visiblePhotos, colorBuckets, selectedBucket]);

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
        <div className="flex gap-4">
          {/* Color sidebar */}
          <ColorSidebar
            buckets={colorBuckets}
            selectedBucket={selectedBucket}
            onSelect={setSelectedBucket}
            totalPhotos={visiblePhotos.length}
          />

          {/* Masonry with left-to-right ordering */}
          <div className="flex gap-3 flex-1">
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
        </div>

        {filteredPhotos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No photos match this color.</p>
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
