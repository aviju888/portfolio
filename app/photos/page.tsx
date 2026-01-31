'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { getPhotosByCategory, getFeaturedPhotos } from '@/lib/data';
import { Photo } from '@/lib/types';
import Section from '../components/Section';
import FadeIn from '../components/FadeIn';

type Category = 'All' | 'Portraits' | 'Dance Teams' | 'Travel';

const categoryMap: Record<Category, string> = {
  'All': 'All',
  'Portraits': 'graduation',
  'Dance Teams': 'dance',
  'Travel': 'travel',
};

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
        <div className={`relative ${photo.orientation === 'portrait' ? 'aspect-[3/4]' : 'aspect-[4/3]'}`}>
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
          <Image
            src={src}
            alt={photo.alt}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className={`object-cover transition-all duration-500 group-hover:scale-105 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
            priority={priority}
          />
        </div>
      </div>
      <div className="mt-2 px-1">
        <h4 className="font-medium text-gray-900 text-sm group-hover:text-gray-700 transition-colors truncate">
          {photo.title}
        </h4>
        <p className="text-xs text-gray-500">{photo.dateTaken}</p>
      </div>
    </div>
  );
}

export default function PhotosPage() {
  const [activeTab, setActiveTab] = useState<Category>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const getPhotos = useCallback(() => {
    if (activeTab === 'All') {
      return getPhotosByCategory('All');
    }
    return getPhotosByCategory(categoryMap[activeTab]);
  }, [activeTab]);

  const displayPhotos = getPhotos();
  const featuredPhotos = getFeaturedPhotos();

  const slides = displayPhotos.map(photo => ({
    src: getFullSrc(photo),
    alt: photo.alt,
  }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const tabs: Category[] = ['All', 'Portraits', 'Dance Teams', 'Travel'];

  return (
    <FadeIn>
      <Section
        title="Photos"
        description="Graduation portraits, dance performances, travel, and more"
      >
        {/* Featured Photos - Only show on All tab */}
        {activeTab === 'All' && (
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Featured</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {featuredPhotos.slice(0, 8).map((photo, index) => (
                <PhotoCard
                  key={photo.id}
                  photo={photo}
                  onClick={() => {
                    const fullIndex = displayPhotos.findIndex(p => p.id === photo.id);
                    if (fullIndex >= 0) openLightbox(fullIndex);
                  }}
                  priority={index < 4}
                />
              ))}
            </div>
          </div>
        )}

        {/* Filter Tabs */}
        <div className="sticky top-16 z-10 bg-white/80 backdrop-blur-md -mx-6 px-6 py-3 mb-6">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <motion.button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm transition-colors ${
                  activeTab === tab
                    ? 'text-white'
                    : 'text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200'
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activePhotoTab"
                    className="absolute inset-0 bg-gray-900 rounded-full"
                    style={{ zIndex: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                {tab}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Photo Grid - Masonry */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="columns-2 md:columns-3 lg:columns-4 gap-4"
          >
            {displayPhotos.map((photo, index) => (
              <PhotoCard
                key={photo.id}
                photo={photo}
                onClick={() => openLightbox(index)}
                priority={activeTab === 'All' && index < 8}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {displayPhotos.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500">No photos in this category yet.</p>
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
