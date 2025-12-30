'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { Photo } from '@/lib/types';
import OptimizedImage from '@/app/components/OptimizedImage';
import { getBestImageUrl } from '@/lib/imageUtils';

interface AlbumClientProps {
  photos: Photo[];
}

export default function AlbumClient({ photos }: AlbumClientProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Use optimized full-size images for lightbox if available
  const slides = photos.map(photo => ({
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
      {/* Photo Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            onClick={() => openLightbox(index)}
            className="cursor-pointer group"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-full overflow-hidden rounded-xl">
              <OptimizedImage
                optimized={photo.optimized}
                fallbackSrc={photo.srcThumb}
                alt={photo.alt}
                className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
                type="thumbnail"
              />
            </div>
            <div className="mt-2">
              <h4 className="font-medium text-gray-900 text-sm">{photo.title}</h4>
              <p className="text-xs text-gray-500">{photo.dateTaken}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {photos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No photos found in this album.</p>
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
    </>
  );
}
