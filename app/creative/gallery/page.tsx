'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';

// Sample placeholder data
const photos = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?q=80&w=1000',
    alt: 'Dance performance at UC Berkeley',
    dateTaken: 'October 15, 2023',
    description: 'Annual showcase performance at Zellerbach Hall',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?q=80&w=1000',
    alt: 'Street photography in San Francisco',
    dateTaken: 'June 8, 2023',
    description: 'Urban exploration series in Chinatown',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1000',
    alt: 'Portrait session',
    dateTaken: 'March 22, 2023',
    description: 'Natural light portrait series',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?q=80&w=1000',
    alt: 'Architecture study',
    dateTaken: 'January 17, 2023',
    description: 'Geometric patterns in modern buildings',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=1000',
    alt: 'Abstract light painting',
    dateTaken: 'December 3, 2022',
    description: 'Experimental long exposure techniques',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1000',
    alt: 'Landscape photography',
    dateTaken: 'August 30, 2022',
    description: 'Golden hour at Point Reyes National Seashore',
  },
];

export default function GalleryPage() {
  const [hoveredPhotoId, setHoveredPhotoId] = useState<number | null>(null);
  
  return (
    <div className="bg-black min-h-screen pb-32">
      {/* Page Title */}
      <div className="pt-32 pb-8 container mx-auto px-6">
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
      
      {/* Main gallery grid */}
      <div className="container mx-auto px-6 pt-8 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {photos.map((photo) => (
            <motion.div 
              key={photo.id}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: photo.id * 0.1 }}
              onMouseEnter={() => setHoveredPhotoId(photo.id)}
              onMouseLeave={() => setHoveredPhotoId(null)}
              whileHover={{ scale: 1.02 }}
            >
              <div className="relative w-full pb-[75%] overflow-hidden bg-gray-900">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                  unoptimized
                />
                
                {/* Hover overlay with metadata */}
                <motion.div 
                  className="absolute inset-0 bg-black/60 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: hoveredPhotoId === photo.id ? 1 : 0 }}
                >
                  <p className="text-white text-sm font-medium">{photo.alt}</p>
                  <p className="text-white/70 text-xs mt-1">{photo.dateTaken}</p>
                  <p className="text-white/60 text-xs mt-2">{photo.description}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 