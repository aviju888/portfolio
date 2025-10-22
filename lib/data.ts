import { Profile, Project, Photos, Media, Tldr, Photo, MediaItem, Experience } from './types';

// Import JSON data
import profileData from '../data/profile.json';
import projectsData from '../data/projects.json';
import photosData from '../data/photos.json';
import mediaData from '../data/media.json';
import tldrData from '../data/tldr.json';
import experienceData from '../data/experience.json';

export const profile: Profile = profileData as Profile;
export const projects: Project[] = projectsData as Project[];
export const photos: Photos = photosData as Photos;
export const media: Media = mediaData as Media;
export const tldr: Tldr = tldrData as Tldr;
export const experiences: Experience[] = experienceData as Experience[];

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

// Experience helper functions
export function getCurrentExperiences(): Experience[] {
  return experiences
    .filter(exp => exp.end === null)
    .sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());
}

export function getRecentExperiences(limit: number = 2): Experience[] {
  return experiences
    .filter(exp => exp.end !== null)
    .sort((a, b) => new Date(b.end!).getTime() - new Date(a.end!).getTime())
    .slice(0, limit);
}

export function getExperiencesByType(type: 'all' | 'Full-time' | 'Contract' | 'Internship'): Experience[] {
  if (type === 'all') {
    return experiences.sort((a, b) => {
      const aDate = a.end ? new Date(a.end) : new Date();
      const bDate = b.end ? new Date(b.end) : new Date();
      return bDate.getTime() - aDate.getTime();
    });
  }
  return experiences
    .filter(exp => exp.type === type)
    .sort((a, b) => {
      const aDate = a.end ? new Date(a.end) : new Date();
      const bDate = b.end ? new Date(b.end) : new Date();
      return bDate.getTime() - aDate.getTime();
    });
}

export function formatDateRange(start: string, end: string | null): string {
  const startDate = new Date(start);
  const startFormatted = startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  
  if (end === null) {
    return `${startFormatted} — Present`;
  }
  
  const endDate = new Date(end);
  const endFormatted = endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  return `${startFormatted} — ${endFormatted}`;
}
