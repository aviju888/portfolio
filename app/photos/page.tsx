'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { getPhotosByCategory } from '@/lib/data';
import Section from '../components/Section';
import FadeIn from '../components/FadeIn';

function PhotosSkeleton() {
  // Vary heights to match masonry layout
  const heights = ['h-48', 'h-64', 'h-56', 'h-72', 'h-52', 'h-60', 'h-48', 'h-64', 'h-56', 'h-60', 'h-52', 'h-68'];
  
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="break-inside-avoid mb-6">
          <div className={`w-full overflow-hidden rounded-xl shadow-md bg-gray-100 ${heights[index % heights.length]} animate-pulse`} />
          <div className="mt-3">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
            <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function PhotosPage() {
  const [activeTab, setActiveTab] = useState<'All' | 'Graduation' | 'Dance' | 'Travel' | 'Events'>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);
  
  const displayPhotos = getPhotosByCategory(activeTab);
  
  const slides = displayPhotos.map(photo => ({
    src: photo.srcFull,
    alt: photo.alt,
    description: photo.description,
  }));
  
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  // Show skeleton on initial load and when tab changes
  useEffect(() => {
    setImagesLoaded(false);
    setShowContent(false);
    
    if (displayPhotos.length === 0) {
      setImagesLoaded(true);
      setShowContent(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = displayPhotos.length;
    const minDisplayTime = 300; // Minimum time to show skeleton
    const startTime = Date.now();

    const checkAllLoaded = () => {
      loadedCount++;
      const elapsed = Date.now() - startTime;
      
      if (loadedCount >= totalImages) {
        // Ensure skeleton shows for minimum time, then fade in content
        const remainingTime = Math.max(0, minDisplayTime - elapsed);
        setTimeout(() => {
          setImagesLoaded(true);
          // Small delay before showing content for smooth transition
          setTimeout(() => {
            setShowContent(true);
          }, 50);
        }, remainingTime);
      }
    };

    // Preload all images
    displayPhotos.forEach((photo) => {
      const img = new Image();
      img.onload = checkAllLoaded;
      img.onerror = checkAllLoaded;
      img.src = photo.srcThumb;
    });
  }, [activeTab, displayPhotos]);

  // Prevent scrolling past the footer
  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY > maxScroll) {
        window.scrollTo(0, maxScroll);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <FadeIn>
      <Section 
        title="Photos" 
        description="Graduation portraits, dance organizations, travel, and more"
      >
      {/* Filter Tabs */}
      <div className="relative overflow-x-auto md:overflow-visible mb-8 -mx-6 md:mx-0 px-6 md:px-0">
        <div className="flex gap-3 md:flex-wrap md:gap-2 md:p-1 md:bg-gray-50 md:rounded-2xl md:glass-border min-w-max md:min-w-0">
          {['All', 'Graduation', 'Dance', 'Travel', 'Events'].map((category) => (
            <motion.button
              key={category}
              onClick={() => setActiveTab(category as any)}
              className={`relative flex-shrink-0 px-6 py-3.5 md:px-4 md:py-2 rounded-full md:rounded-xl font-semibold text-base md:text-sm transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                activeTab === category
                  ? 'bg-gray-900 text-white md:bg-transparent md:text-gray-900 md:font-bold'
                  : 'bg-gray-100 text-gray-700 md:bg-transparent md:text-gray-500 md:hover:text-gray-900'
              }`}
            >
              {activeTab === category && (
                <motion.div
                  layoutId="activeTabPhotos"
                  className="hidden md:block absolute inset-0 bg-white rounded-xl"
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
      </div>

      {/* Photos Grid */}
      <div className="relative min-h-[400px]">
        {/* Skeleton - fades out */}
        <div 
          className={`transition-opacity duration-500 ${
            showContent ? 'opacity-0 pointer-events-none absolute inset-0' : 'opacity-100'
          }`}
        >
          <PhotosSkeleton />
        </div>
        
        {/* Real content - fades in */}
        {imagesLoaded && (
          <div 
            className={`columns-2 md:columns-3 lg:columns-4 gap-6 space-y-6 transition-opacity duration-500 ${
              showContent ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {displayPhotos.map((photo, index) => (
              <div
                key={photo.id}
                onClick={() => openLightbox(index)}
                className="cursor-pointer group break-inside-avoid mb-6"
              >
                <div className="w-full overflow-hidden rounded-xl shadow-md group-hover:shadow-lg transition-shadow duration-300">
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
        )}
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
    </Section>
    </FadeIn>
  );
}
