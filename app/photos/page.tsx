'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { getFeaturedPhotos, getAlbumsByCategory } from '@/lib/data';
import Section from '../components/Section';
import Card from '../components/Card';
import ParallaxPhoto from '../components/ParallaxPhoto';

export default function PhotosPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Graduation' | 'Dance' | 'Travel' | 'Events'>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const featuredPhotos = getFeaturedPhotos();
  const displayAlbums = getAlbumsByCategory(activeTab);
  
  const slides = featuredPhotos.map(photo => ({
    src: photo.srcFull,
    alt: photo.alt,
    description: photo.description,
  }));
  
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <Section 
      title="Photos" 
      description="Selected shots from my photography work - graduation portraits, dance performances, and events"
    >
      {/* Filter Tabs */}
      <div className="relative flex flex-wrap gap-2 mb-8 p-1 bg-gray-50 rounded-2xl glass-border">
        {['All', 'Graduation', 'Dance', 'Travel', 'Events'].map((category) => (
          <motion.button
            key={category}
            onClick={() => setActiveTab(category as any)}
            className={`relative px-4 py-2 rounded-xl font-semibold transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              activeTab === category
                ? 'text-gray-900 font-bold'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            {activeTab === category && (
              <motion.div
                layoutId="activeTabPhotos"
                className="absolute inset-0 bg-white rounded-xl"
                style={{
                  zIndex: -1,
                  boxShadow: '0 2px 8px 0 rgba(0, 0, 0, 0.15), inset 0 1px 0 0 rgba(0, 0, 0, 0.05)'
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
            {category}
          </motion.button>
        ))}
      </div>

      {/* Featured Photos */}
      <div className="mb-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Selected Shots
        </h3>
        <div className="columns-2 md:columns-3 gap-6 space-y-6">
          {featuredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="cursor-pointer group break-inside-avoid mb-6"
            >
              <div className="w-full overflow-hidden rounded-xl">
                <img
                  src={photo.srcThumb}
                  alt={photo.alt}
                  className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="mt-3">
                <h4 className="font-medium text-gray-900 text-sm group-hover:text-gray-700 transition-colors">
                  {photo.title}
                </h4>
                <p className="text-xs text-gray-500 mt-1">{photo.dateTaken}</p>
              </div>
            </div>
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

      {/* Albums */}
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Albums
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayAlbums.map((album) => (
            <Card
              key={album.slug}
              title={album.title}
              subtitle={`${album.count} photos`}
              image={album.cover}
              href={`/photos/${album.slug}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
