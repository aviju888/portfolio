export interface Profile {
  name: string;
  headline: string;
  bioShort: string;
  email: string;
  education: {
    school: string;
    degree: string;
    minor: string;
    start: string;
    end: string;
    location: string;
  };
  socials: {
    github: string;
    linkedin: string;
    x: string;
  };
  domain: string;
}

export interface ImageVariants {
  thumb_400?: string;
  thumb_800?: string;
  full_1200?: string;
  full_1920?: string;
  full_2400?: string;
}

export interface OptimizedImage {
  avif: ImageVariants;
  webp: ImageVariants;
  jpeg: ImageVariants;
}

export interface Project {
  slug: string;
  title: string;
  role: string;
  summary: string;
  description: string[];
  tags: string[];
  links: {
    repo: string;
    demo: string;
  };
  images: string[];
  optimized?: Record<string, OptimizedImage>; // Key is original filename
  featured: boolean;
  rank: number;
  status: string;
  year: string;
}

export interface Photo {
  id: string;
  album: string;
  srcThumb: string;
  srcFull: string;
  title: string;
  alt: string;
  description: string;
  orientation: 'portrait' | 'landscape';
  featured: boolean;
  dateTaken: string;
  rank: number;
  optimized?: OptimizedImage;
  blurDataURL?: string;
}

export interface Album {
  slug: string;
  title: string;
  category: string;
  cover: string;
  count: number;
  description: string;
}

export interface Photos {
  photos: Photo[];
  albums: Album[];
}

export interface MediaItem {
  title: string;
  desc: string;
  link: string;
  featured: boolean;
  rank: number;
}

export interface Media {
  design: MediaItem[];
  music: MediaItem[];
  writing: MediaItem[];
}

export interface Tldr {
  now: string[];
  topProjects: string[];
  selectedPhotos: string[];
  recentMedia: string[];
  contact: {
    email: string;
    links: string[];
  };
}

export interface Experience {
  company: string;
  role: string;
  start: string;
  end: string | null;
  location: string;
  type: 'Full-time' | 'Contract' | 'Internship';
  summary: string;
  highlights: string[];
  stack: string[];
  links: {
    site: string;
    repo: string;
    caseStudy: string;
  };
  logo: string;
}
