import { Profile, Project, Photos, Media, Tldr, Photo, Album, MediaItem, Experience, OptimizedImage } from './types';
export type { Project };

// Import JSON data
import profileData from '../data/profile.json';
import projectsData from '../data/projects.json';
import photosData from '../data/photos.json';
import mediaData from '../data/media.json';
import tldrData from '../data/tldr.json';
import experienceData from '../data/experience.json';

// Load optimization manifest (server-side only)
let optimizationManifest: any = null;
if (typeof window === 'undefined') {
  try {
    // Dynamic import to avoid bundling fs in client
    const fs = require('fs');
    const path = require('path');
    const manifestPath = path.join(process.cwd(), 'public/images/optimization-manifest.json');
    if (fs.existsSync(manifestPath)) {
      optimizationManifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    }
  } catch (error) {
    console.warn('Optimization manifest not found. Using original images.');
  }
}

export const profile: Profile = profileData as Profile;
export const projects: Project[] = projectsData as Project[];
export const photos: Photos = photosData as Photos;
export const media: Media = mediaData as Media;
export const tldr: Tldr = tldrData as Tldr;
export const experiences: Experience[] = experienceData as Experience[];

// Helper function to get optimized image data from manifest
function getOptimizedImageFromManifest(filename: string, category: 'gallery' | 'projects'): OptimizedImage | undefined {
  if (!optimizationManifest) return undefined;

  const items = category === 'gallery' ? optimizationManifest.gallery : optimizationManifest.projects;
  const item = items?.find((i: any) => i.filename === filename);

  if (!item || !item.variants) return undefined;

  // Convert variants structure to OptimizedImage format
  const optimized: OptimizedImage = {
    avif: {},
    webp: {},
    jpeg: {}
  };

  Object.entries(item.variants).forEach(([sizeKey, formats]: [string, any]) => {
    optimized.avif[sizeKey as keyof typeof optimized.avif] = formats.avif;
    optimized.webp[sizeKey as keyof typeof optimized.webp] = formats.webp;
    optimized.jpeg[sizeKey as keyof typeof optimized.jpeg] = formats.jpeg;
  });

  return optimized;
}

// Helper function to get filename from path
function getFilenameFromPath(imagePath: string): string {
  const filename = imagePath.split('/').pop() || imagePath;
  return filename.replace(/\.[^/.]+$/, ''); // Remove extension
}

// Helper functions
export function getFeaturedProjects(): Project[] {
  return projects
    .filter(project => project.featured)
    .sort((a, b) => a.rank - b.rank);
}

export function getFeaturedPhotos(): Photo[] {
  return photos.photos
    .filter(photo => photo.featured)
    .sort((a, b) => a.rank - b.rank)
    .map(photo => ({
      ...photo,
      optimized: getOptimizedImageFromManifest(getFilenameFromPath(photo.srcThumb), 'gallery')
    }));
}

// Get photos with diverse colors for rainbow scroll effect
export function getRainbowPhotos(count: number = 12): Photo[] {
  const visiblePhotos = photos.photos.filter(p => p.visible !== false);

  // Group photos by hue ranges (12 buckets of 30 degrees)
  const hueBuckets: Photo[][] = Array.from({ length: 12 }, () => []);

  visiblePhotos.forEach(photo => {
    const hsl = photo.dominantColor?.hsl;
    if (hsl && hsl.s >= 15) { // Skip grayscale
      const bucketIndex = Math.floor(hsl.h / 30) % 12;
      hueBuckets[bucketIndex].push(photo);
    }
  });

  // Pick one photo from each bucket that has photos, preferring higher saturation
  const selected: Photo[] = [];

  for (let i = 0; i < 12 && selected.length < count; i++) {
    const bucket = hueBuckets[i];
    if (bucket.length > 0) {
      // Sort by saturation (most saturated first) and pick one
      bucket.sort((a, b) => (b.dominantColor?.hsl?.s || 0) - (a.dominantColor?.hsl?.s || 0));
      selected.push(bucket[0]);
    }
  }

  // If we need more photos, fill from buckets with multiple photos
  let bucketIndex = 0;
  while (selected.length < count) {
    const bucket = hueBuckets[bucketIndex % 12];
    const nextPhoto = bucket.find(p => !selected.includes(p));
    if (nextPhoto) {
      selected.push(nextPhoto);
    }
    bucketIndex++;
    if (bucketIndex > 24) break; // Safety limit
  }

  return selected.map(photo => ({
    ...photo,
    optimized: getOptimizedImageFromManifest(getFilenameFromPath(photo.srcThumb), 'gallery')
  }));
}

export function getCategoryPreviewImage(category: 'All' | 'Graduation' | 'Dance' | 'Travel'): string {
  // Map categories to specific photo titles
  const categoryPhotoMap: Record<string, string> = {
    'All': 'Travel-03',
    'Graduation': 'Grad-01',
    'Dance': 'KOSMOS-04',
    'Travel': 'Travel-04',
  };
  
  const targetTitle = categoryPhotoMap[category];
  if (targetTitle) {
    const photo = photos.photos.find(p => p.title === targetTitle);
    if (photo) {
      return photo.srcThumb;
    }
  }
  
  // Fallback: get first photo in category
  const categoryPhotos = getPhotosByCategory(category);
  return categoryPhotos.length > 0 ? categoryPhotos[0].srcThumb : '';
}

export function getPhotosByAlbum(slug: string): Photo[] {
  return photos.photos
    .filter(photo => photo.album === slug)
    .sort((a, b) => a.rank - b.rank)
    .map(photo => ({
      ...photo,
      optimized: getOptimizedImageFromManifest(getFilenameFromPath(photo.srcThumb), 'gallery')
    }));
}

export function getAlbumBySlug(slug: string): Album | undefined {
  return photos.albums.find(album => album.slug === slug);
}

export function getAlbumsByCategory(category: string): Album[] {
  if (category === 'All') {
    return photos.albums;
  }
  return photos.albums.filter(album => album.category === category);
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

function projectMatchesType(project: Project, type: string): boolean {
  const tags = project.tags.map(tag => tag.toLowerCase());
  const role = project.role.toLowerCase();
  const summary = project.summary.toLowerCase();
  
  switch (type) {
    case 'AI/ML':
      return tags.some(tag => 
        ['pytorch', 'tensorflow', 'ai', 'ml', 'machine learning', 'artificial intelligence', 'hugging face'].includes(tag)
      ) || role.includes('ai') || role.includes('ml') || summary.includes('ai') || summary.includes('ml');
    
    case 'Computer Vision':
      return tags.some(tag => 
        ['opencv', 'computer vision', 'cv', 'image processing'].includes(tag)
      ) || role.toLowerCase().includes('computer vision') || summary.includes('computer vision');
    
    case 'Web Development':
      return tags.some(tag => 
        ['react', 'next.js', 'javascript', 'typescript', 'html', 'css', 'tailwind css', 'frontend', 'backend'].includes(tag)
      ) || role.toLowerCase().includes('web') || role.toLowerCase().includes('frontend') || role.toLowerCase().includes('backend');
    
    case 'Data Science':
      return tags.some(tag => 
        ['r', 'pandas', 'numpy', 'matplotlib', 'jupyter', 'statistics', 'data science'].includes(tag)
      ) || role.toLowerCase().includes('data') || summary.includes('data');
    
    case 'Systems':
      return tags.some(tag => 
        ['java', 'logisim', 'assembly', 'git', 'systems'].includes(tag)
      ) || role.toLowerCase().includes('systems') || summary.includes('systems');
    
    default:
      return false;
  }
}

export function getProjectCategory(project: Project): string {
  const categories = ['AI/ML', 'Computer Vision', 'Web Development', 'Data Science', 'Systems'];
  
  for (const category of categories) {
    if (projectMatchesType(project, category)) {
      return category;
    }
  }
  
  return 'Web Development'; // Default fallback
}

export function getProjectsByType(type: string): Project[] {
  if (type === 'All') {
    return projects.sort((a, b) => a.rank - b.rank);
  }
  
  return projects.filter(project => projectMatchesType(project, type))
    .sort((a, b) => a.rank - b.rank);
}

export function getPhotosByCategory(category: string): Photo[] {
  const filteredPhotos = category === 'All'
    ? photos.photos
    : photos.photos.filter(photo => photo.album === category.toLowerCase());

  return filteredPhotos
    .sort((a, b) => a.rank - b.rank)
    .map(photo => ({
      ...photo,
      optimized: getOptimizedImageFromManifest(getFilenameFromPath(photo.srcThumb), 'gallery')
    }));
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

export function getExperiencesByType(type: 'all' | 'Software' | 'Web' | 'Misc'): Experience[] {
  if (type === 'all') {
    return experiences.sort((a, b) => {
      const aDate = a.end ? new Date(a.end) : new Date();
      const bDate = b.end ? new Date(b.end) : new Date();
      return bDate.getTime() - aDate.getTime();
    });
  }
  
  return experiences.filter(exp => {
    const role = exp.role.toLowerCase();
    const summary = exp.summary.toLowerCase();
    const stack = exp.stack.map(s => s.toLowerCase());
    
    // First check for Web (web-specific roles)
    const isWeb = (role.includes('web') || role.includes('frontend') || role.includes('backend') ||
                  summary.includes('web') || summary.includes('frontend') || summary.includes('backend') ||
                  stack.some(s => ['react', 'next.js', 'javascript', 'typescript', 'html', 'css', 'tailwind css'].includes(s))) &&
                  !role.includes('software engineer') && !role.includes('software');
    
    // Then check for Software (software engineering roles)
    const isSoftware = role.includes('software') || role.includes('engineer') || role.includes('developer') ||
                      summary.includes('software') || summary.includes('development') ||
                      stack.some(s => ['python', 'java', 'c++', 'c', 'rust', 'go'].includes(s));
    
    // Everything else is Misc
    const isMisc = !isWeb && !isSoftware;
    
    switch (type) {
      case 'Web':
        return isWeb;
      case 'Software':
        return isSoftware;
      case 'Misc':
        return isMisc;
      default:
        return false;
    }
  }).sort((a, b) => {
    const aDate = a.end ? new Date(a.end) : new Date();
    const bDate = b.end ? new Date(b.end) : new Date();
    return bDate.getTime() - aDate.getTime();
  });
}

export function formatDateRange(start: string, end: string | null): string {
  // Handle YYYY-MM format by parsing year and month directly
  let startFormatted: string;
  if (start.includes('-') && start.split('-').length === 2) {
    const [year, month] = start.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    startFormatted = `${monthNames[parseInt(month) - 1]} ${year}`;
  } else {
    const startDate = new Date(start);
    startFormatted = startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  
  if (end === null) {
    return `${startFormatted} — Present`;
  }
  
  let endFormatted: string;
  if (end.includes('-') && end.split('-').length === 2) {
    const [year, month] = end.split('-');
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    endFormatted = `${monthNames[parseInt(month) - 1]} ${year}`;
  } else {
    const endDate = new Date(end);
    endFormatted = endDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  }
  
  return `${startFormatted} — ${endFormatted}`;
}
