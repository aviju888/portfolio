export interface Profile {
  name: string;
  headline: string;
  bioShort: string;
  email: string;
  socials: {
    github: string;
    linkedin: string;
    instagram: string;
  };
  domain: string;
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
  featured: boolean;
  rank: number;
  status: string;
  year: string;
}

export interface Photo {
  src: string;
  alt: string;
  description: string;
  dateTaken: string;
  rank: number;
}

export interface Album {
  title: string;
  slug: string;
  count: number;
  thumb: string;
}

export interface Photos {
  featured: Photo[];
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
