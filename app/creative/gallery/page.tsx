'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

// Sample placeholder data
const photos = [
  // Example order based on color similarity
  {
    id: 1,
    src: '/images/gallery/gracegrad1.png',
    alt: 'UC Berkeley Grad Shoot',
    dateTaken: 'Spring 2024',
    description: 'Client-Shoot for Grace L.',
  },
  {
    id: 2,
    src: '/images/gallery/gracegrad2.jpg',
    alt: 'UC Berkeley Graduation',
    dateTaken: 'Spring 2024',
    description: 'Graduation ceremony photoshoot',
  },
  {
    id: 3,
    src: '/images/gallery/unhinged1.jpg',
    alt: 'AFX unhiNGed',
    dateTaken: 'Spring 2024',
    description: 'AFX Dance - Project Team Performance',
  },
  {
    id: 4,
    src: '/images/gallery/unhinged2.png',
    alt: 'AFX unhiNGed - Series 2',
    dateTaken: 'Spring 2024',
    description: 'Dance performance at UC Berkeley',
  },
  {
    id: 5,
    src: '/images/gallery/unhinged3.png',
    alt: 'AFX unhiNGed - Series 3',
    dateTaken: 'Spring 2024',
    description: 'Stage performance highlights',
  },
  {
    id: 6,
    src: '/images/gallery/ctrl1.jpg',
    alt: 'CTRLFX',
    dateTaken: 'Fall 2023',
    description: 'AFX Dance - Training Team Performance',
  },
  {
    id: 7,
    src: '/images/gallery/ctrl2.png',
    alt: 'CTRLFX - Series 2',
    dateTaken: 'Fall 2023',
    description: 'Training team showcase event',
  },
  {
    id: 8,
    src: '/images/gallery/ctrl3.png',
    alt: 'CTRLFX - Series 3',
    dateTaken: 'Fall 2023',
    description: 'Performance highlights',
  },
  {
    id: 9,
    src: '/images/gallery/ctrl4.png',
    alt: 'CTRLFX - Series 4',
    dateTaken: 'Fall 2023',
    description: 'Dance event coverage',
  },
  {
    id: 10,
    src: '/images/gallery/kosmos1.png',
    alt: 'KOSMOS Dance Team',
    dateTaken: 'Spring 2024',
    description: 'KOSMOS @ Cal - Performance Series',
  },
  {
    id: 11,
    src: '/images/gallery/kosmos2.png',
    alt: 'KOSMOS Dance Team - Series 2',
    dateTaken: 'Spring 2024',
    description: 'Choreography performance',
  },
  {
    id: 12,
    src: '/images/gallery/kosmos3.png',
    alt: 'KOSMOS Dance Team - Series 3',
    dateTaken: 'Fall 2023',
    description: 'Stage performance at UC Berkeley',
  },
  {
    id: 13,
    src: '/images/gallery/kosmos4.png',
    alt: 'KOSMOS Dance Team - Series 4',
    dateTaken: 'Fall 2023',
    description: 'Dance workshop and performance',
  },
  {
    id: 14,
    src: '/images/gallery/kosmos5.png',
    alt: 'KOSMOS Dance Team - Series 5',
    dateTaken: 'Spring 2023',
    description: 'Showcase event highlights',
  },
  {
    id: 15,
    src: '/images/gallery/kosmos6.png',
    alt: 'KOSMOS Dance Team - Series 6',
    dateTaken: 'Spring 2023',
    description: 'Dance competition entry',
  },
  {
    id: 16,
    src: '/images/gallery/allen1.png',
    alt: 'Allen Performance',
    dateTaken: 'Summer 2023',
    description: 'Portrait series at Allen venue',
  },
  {
    id: 17,
    src: '/images/gallery/canada1.png',
    alt: 'Canada Travel Series',
    dateTaken: 'Summer 2023',
    description: 'Landscape photography in Canada',
  },
  {
    id: 18,
    src: '/images/gallery/canada2.png',
    alt: 'Canada Travel Series - Part 2',
    dateTaken: 'Summer 2023',
    description: 'Urban exploration in Canadian cities',
  },
  {
    id: 19,
    src: '/images/gallery/canada3.png',
    alt: 'Canada Travel Series - Part 3',
    dateTaken: 'Summer 2023',
    description: 'Nature and wildlife photography',
  },
  {
    id: 20,
    src: '/images/gallery/sf1.png',
    alt: 'San Francisco Series',
    dateTaken: 'Fall 2023',
    description: 'Urban photography in San Francisco',
  },
  {
    id: 21,
    src: '/images/gallery/monicagrad1.png',
    alt: 'Monica Graduation',
    dateTaken: 'Spring 2024',
    description: 'Graduation photoshoot for Monica',
  },
  {
    id: 22,
    src: '/images/gallery/monicagrad2.png',
    alt: 'Monica Graduation - Series 2',
    dateTaken: 'Spring 2024',
    description: 'Ceremony highlights',
  },
  {
    id: 23,
    src: '/images/gallery/monicagrad3.png',
    alt: 'Monica Graduation - Series 3',
    dateTaken: 'Spring 2024',
    description: 'Family and friends celebration',
  },
  {
    id: 24,
    src: '/images/gallery/glamity1.png',
    alt: 'Glamity Dance',
    dateTaken: 'Fall 2023',
    description: 'Glamity dance performance',
  },
  {
    id: 25,
    src: '/images/gallery/glamity2.png',
    alt: 'Glamity Dance - Series 2',
    dateTaken: 'Fall 2023',
    description: 'Stage performance highlights',
  },
  {
    id: 26,
    src: '/images/gallery/glamity3.png',
    alt: 'Glamity Dance - Series 3',
    dateTaken: 'Fall 2023',
    description: 'Dance event coverage',
  },
  {
    id: 27,
    src: '/images/gallery/afxdancecamp1.png',
    alt: 'AFX Dance Camp',
    dateTaken: 'Summer 2023',
    description: 'Dance camp activities',
  },
  {
    id: 28,
    src: '/images/gallery/afxdancecamp2.png',
    alt: 'AFX Dance Camp - Series 2',
    dateTaken: 'Summer 2023',
    description: 'Group dance sessions',
  },
  {
    id: 29,
    src: '/images/gallery/afxdancecamp3.png',
    alt: 'AFX Dance Camp - Series 3',
    dateTaken: 'Summer 2023',
    description: 'Final performance highlights',
  }
];

export default function GalleryPage() {
  const [selectedPhoto, setSelectedPhoto] = useState<typeof photos[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Initialize loading state
  useEffect(() => {
    // Set loading to false after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle click outside to close modal
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setSelectedPhoto(null);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setSelectedPhoto(null);
      }
    }
    
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  // Handle photo click
  const handlePhotoClick = (photo: typeof photos[0]) => {
    setSelectedPhoto(photo);
  };
  
  // Navigate to next or previous photo
  const navigatePhoto = useCallback((direction: 'next' | 'prev') => {
    if (!selectedPhoto) return;
    
    const currentIndex = photos.findIndex(photo => photo.id === selectedPhoto.id);
    let newIndex;
    
    if (direction === 'next') {
      newIndex = (currentIndex + 1) % photos.length;
    } else {
      newIndex = (currentIndex - 1 + photos.length) % photos.length;
    }
    
    setSelectedPhoto(photos[newIndex]);
  }, [selectedPhoto]);

  // Handle key navigation
  useEffect(() => {
    function handleKeyNavigation(event: KeyboardEvent) {
      if (!selectedPhoto) return;
      
      if (event.key === 'ArrowRight') {
        navigatePhoto('next');
      } else if (event.key === 'ArrowLeft') {
        navigatePhoto('prev');
      }
    }
    
    document.addEventListener('keydown', handleKeyNavigation);
    return () => {
      document.removeEventListener('keydown', handleKeyNavigation);
    };
  }, [selectedPhoto, navigatePhoto]);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedPhoto]);
  
  return (
    <div className="bg-black min-h-screen pb-24">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <div className="w-12 h-12 border-t-4 border-b-4 border-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Page Title */}
      <div className="pt-28 pb-6 container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link 
            href="/creative" 
            className="text-white/60 hover:text-white flex items-center gap-2 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Creative</span>
          </Link>
          <h1 className="text-4xl font-light tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600">GALLERY</h1>
        </div>
      </div>
      
      {/* Responsive gallery grid with more columns */}
      <div className="container mx-auto px-2 pt-2 pb-16">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          {photos.map((photo, index) => (
            <motion.div 
              key={photo.id}
              className="relative cursor-pointer bg-zinc-900/20 hover:bg-zinc-900/30 rounded overflow-hidden group"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 10 : 0 }}
              transition={{ duration: 0.3, delay: photo.id * 0.03 }}
              onClick={() => handlePhotoClick(photo)}
            >
              <div className="relative w-full h-0 pb-[100%]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  layout="fill"
                  objectFit="cover"
                  className="absolute"
                  priority={index < 12} // Prioritize loading first 12 visible images
                  quality={85}
                />
                
                {/* Hover overlay with metadata */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2"
                >
                  <p className="text-white text-xs sm:text-sm font-medium">{photo.alt}</p>
                  <p className="text-pink-300 text-xs mt-0.5">{photo.dateTaken}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Optimized Modal for Full Image Display */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/90 backdrop-blur-sm"
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-[96vw] max-h-[94vh] flex flex-col md:flex-row bg-zinc-900/90 rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Responsive image container that adapts to image orientation */}
              <div className="relative flex flex-col items-center justify-center bg-black/70 p-0">
                <Image
                  src={selectedPhoto.src}
                  alt={selectedPhoto.alt}
                  width={1200}
                  height={800}
                  className="max-h-[65vh] md:max-h-[80vh] w-auto object-contain"
                  priority
                  quality={90}
                />
                
                {/* Small minimal navigation controls below image */}
                <div className="flex items-center justify-center space-x-6 py-3">
                  <button 
                    className="text-white/60 hover:text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigatePhoto('prev');
                    }}
                    aria-label="Previous image"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  
                  <button 
                    className="text-white/60 hover:text-white transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigatePhoto('next');
                    }}
                    aria-label="Next image"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {/* Info panel that adjusts based on screen size */}
              <div className="w-full md:w-72 lg:w-80 p-4 flex flex-col justify-between bg-zinc-900/95">
                <div>
                  <h3 className="text-xl font-medium text-white">{selectedPhoto.alt}</h3>
                  <p className="text-pink-400 text-sm mt-1 mb-3">{selectedPhoto.dateTaken}</p>
                  <p className="text-white/80 text-sm">{selectedPhoto.description}</p>
                </div>
                
                <button 
                  onClick={() => setSelectedPhoto(null)}
                  className="mt-4 self-end text-white/60 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Additional close button for easy access */}
              <button
                className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/50 text-white/80 hover:text-white hover:bg-black/70 transition-colors"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 