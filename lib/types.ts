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
  visible?: boolean;
  dominantColor?: {
    hex: string;
    hsl: { h: number; s: number; l: number };
  };
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

export type VisitorMode = 'hiring' | 'tech' | 'creative';

export interface NavItem {
  name: string;
  path: string;
  external?: boolean;
}

export interface HeroLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface SectionOverride {
  description?: string;
}

export interface CTAConfig {
  heading: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  primaryExternal?: boolean;
  secondaryLabel: string;
  secondaryHref: string;
  secondaryExternal?: boolean;
}

export interface VisitorModeConfig {
  id: VisitorMode;
  label: string;
  icon: 'briefcase' | 'code' | 'camera';
  navItems: NavItem[];
  sectionOrder: string[];
  heroLinks: HeroLink[];
  heroSubtitle: string;
  cta: CTAConfig;
  contactDescription: string;
  secondarySections: string[];
  sectionOverrides: Record<string, SectionOverride>;
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
  logoStyle?: 'contained' | 'white';
  logoBg?: 'dark';
}
