'use client';

import { useState } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { photos } from '@/lib/data';
import Section from '../components/Section';
import Card from '../components/Card';
import ParallaxPhoto from '../components/ParallaxPhoto';

export default function PhotosPage() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  
  const slides = photos.featured.map(photo => ({
    src: photo.src,
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
      {/* Organic blob accent */}
      <div className="pointer-events-none absolute top-0 right-0 w-[500px] h-[500px] overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-white/5 to-white/3 
                        rounded-full blur-3xl animate-pulse" 
             style={{ animationDuration: '8s' }} />
      </div>
      {/* Featured Photos */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-white mb-6">
          Selected Shots
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {photos.featured.map((photo, index) => (
            <div
              key={index}
              onClick={() => openLightbox(index)}
              className="cursor-pointer"
            >
              <ParallaxPhoto
                src={photo.src}
                alt={photo.alt}
                index={index}
              />
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
        <h3 className="text-2xl font-bold text-white mb-6">
          Albums
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 lg:gap-12">
          {photos.albums.map((album, index) => (
            <Card
              key={index}
              title={album.title}
              subtitle={`${album.count} photos`}
              image={album.thumb}
              href={`/photos/${album.slug}`}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
