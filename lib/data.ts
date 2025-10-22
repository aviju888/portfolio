import { Profile, Project, Photos, Media, Tldr, Photo, MediaItem } from './types';

// Import JSON data
import profileData from '../data/profile.json';
import projectsData from '../data/projects.json';
import photosData from '../data/photos.json';
import mediaData from '../data/media.json';
import tldrData from '../data/tldr.json';

export const profile: Profile = profileData as Profile;
export const projects: Project[] = projectsData as Project[];
export const photos: Photos = photosData as Photos;
export const media: Media = mediaData as Media;
export const tldr: Tldr = tldrData as Tldr;

// Helper functions
export function getFeaturedProjects(): Project[] {
  return projects
    .filter(project => project.featured)
    .sort((a, b) => a.rank - b.rank);
}

export function getFeaturedPhotos(): Photo[] {
  return photos.featured
    .sort((a, b) => a.rank - b.rank);
}

export function getFeaturedMedia(): MediaItem[] {
  const allMedia = [...media.design, ...media.music, ...media.writing];
  return allMedia
    .filter(item => item.featured)
    .sort((a, b) => a.rank - b.rank);
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(project => project.slug === slug);
}

export function getProjectsByCategory(category: 'featured' | 'all'): Project[] {
  if (category === 'featured') {
    return getFeaturedProjects();
  }
  return projects.sort((a, b) => a.rank - b.rank);
}
