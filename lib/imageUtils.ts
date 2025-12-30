import { OptimizedImage, ImageVariants } from './types';

/**
 * Get srcset string for a specific format
 */
export function getImageSrcSet(variants: ImageVariants): string {
  const srcsets: string[] = [];

  if (variants.thumb_400) srcsets.push(`${variants.thumb_400} 400w`);
  if (variants.thumb_800) srcsets.push(`${variants.thumb_800} 800w`);
  if (variants.full_1200) srcsets.push(`${variants.full_1200} 1200w`);
  if (variants.full_1920) srcsets.push(`${variants.full_1920} 1920w`);
  if (variants.full_2400) srcsets.push(`${variants.full_2400} 2400w`);

  return srcsets.join(', ');
}

/**
 * Get picture sources for progressive format support
 * Returns array of source elements (AVIF, WebP, then JPEG fallback)
 */
export function getImageSources(optimized: OptimizedImage) {
  return [
    {
      type: 'image/avif',
      srcSet: getImageSrcSet(optimized.avif),
    },
    {
      type: 'image/webp',
      srcSet: getImageSrcSet(optimized.webp),
    },
    {
      type: 'image/jpeg',
      srcSet: getImageSrcSet(optimized.jpeg),
    },
  ];
}

/**
 * Get a single optimized image URL for a specific size
 * Prefers WebP format, falls back to JPEG
 */
export function getOptimizedImageUrl(
  optimized: OptimizedImage | undefined,
  size: 'thumb_400' | 'thumb_800' | 'full_1200' | 'full_1920' | 'full_2400' = 'thumb_800',
  preferredFormat: 'avif' | 'webp' | 'jpeg' = 'webp'
): string | undefined {
  if (!optimized) return undefined;

  // Try preferred format first
  if (optimized[preferredFormat]?.[size]) {
    return optimized[preferredFormat][size];
  }

  // Fallback to other formats
  if (optimized.webp?.[size]) return optimized.webp[size];
  if (optimized.jpeg?.[size]) return optimized.jpeg[size];
  if (optimized.avif?.[size]) return optimized.avif[size];

  return undefined;
}

/**
 * Get the best available image URL with fallback to original
 */
export function getBestImageUrl(
  optimized: OptimizedImage | undefined,
  originalSrc: string,
  size: 'thumb_400' | 'thumb_800' | 'full_1200' | 'full_1920' | 'full_2400' = 'thumb_800'
): string {
  return getOptimizedImageUrl(optimized, size) || originalSrc;
}

/**
 * Get appropriate sizes attribute for responsive images
 */
export function getImageSizes(type: 'thumbnail' | 'full' | 'card' = 'thumbnail'): string {
  switch (type) {
    case 'thumbnail':
      // Grid thumbnails: 50vw on mobile, 33vw on tablet, 25vw on desktop
      return '(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw';
    case 'card':
      // Project cards: 100vw on mobile, 50vw on tablet, 33vw on desktop
      return '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw';
    case 'full':
      // Lightbox/detail views: nearly full viewport
      return '(max-width: 768px) 100vw, 90vw';
    default:
      return '100vw';
  }
}

/**
 * Generate a tiny blur placeholder data URL
 * This would ideally be generated at build time, but for now returns empty
 */
export function getPlaceholderDataUrl(): string {
  // Tiny 1x1 transparent pixel as placeholder
  return 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1 1"%3E%3C/svg%3E';
}
