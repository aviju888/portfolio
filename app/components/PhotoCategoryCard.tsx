'use client';

import Link from 'next/link';

interface PhotoCategoryCardProps {
  category: 'All' | 'Graduation' | 'Dance' | 'Travel';
  previewImage: string;
  href: string;
}

export default function PhotoCategoryCard({ category, previewImage, href }: PhotoCategoryCardProps) {
  return (
    <Link
      href={href}
      className="group relative block h-[200px] md:h-[240px] rounded-xl md:rounded-2xl overflow-hidden glass-border transition-all duration-300 hover:shadow-lg hover:scale-[1.02]"
    >
      {/* Blurry background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${previewImage})`,
          filter: 'blur(0px) brightness(0.75)',
          transform: 'scale(1.1)',
        }}
      />
      
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
      
      {/* Content */}
      <div className="relative h-full flex items-center justify-center z-10">
        <span className="text-white text-lg md:text-xl font-semibold tracking-tight drop-shadow-lg">
          {category}
        </span>
      </div>
      
      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
    </Link>
  );
}

