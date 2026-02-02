import { VisitorMode, VisitorModeConfig } from './types';

export const modeConfigs: Record<VisitorMode, VisitorModeConfig> = {
  hiring: {
    id: 'hiring',
    label: 'Hiring',
    icon: 'briefcase',
    navItems: [
      { name: 'Home', path: '/' },
      { name: 'Resume', path: '/resume.pdf', external: true },
      { name: 'Experience', path: '/experience' },
      { name: 'Code', path: '/code' },
      { name: 'Contact', path: '/contact' },
    ],
    sectionOrder: ['hero', 'experience', 'projects', 'photos', 'cta'],
    heroLinks: [
      { label: 'View Resume', href: '/resume.pdf', external: true },
      { label: 'See Experience', href: '/experience' },
      { label: 'Get in Touch', href: '/contact' },
    ],
  },
  tech: {
    id: 'tech',
    label: 'Tech',
    icon: 'code',
    navItems: [
      { name: 'Home', path: '/' },
      { name: 'Code', path: '/code' },
      { name: 'GitHub', path: 'https://github.com/aviju888', external: true },
      { name: 'Experience', path: '/experience' },
      { name: 'TLDR', path: '/tldr' },
      { name: 'Contact', path: '/contact' },
    ],
    sectionOrder: ['hero', 'projects', 'experience', 'photos', 'cta'],
    heroLinks: [
      { label: 'View Projects', href: '/code' },
      { label: 'GitHub', href: 'https://github.com/aviju888', external: true },
      { label: 'Read TLDR', href: '/tldr' },
    ],
  },
  creative: {
    id: 'creative',
    label: 'Creative',
    icon: 'camera',
    navItems: [
      { name: 'Home', path: '/' },
      { name: 'Photos', path: '/photos' },
      { name: 'Code', path: '/code' },
      { name: 'Contact', path: '/contact' },
    ],
    sectionOrder: ['hero', 'photos', 'projects', 'experience', 'cta'],
    heroLinks: [
      { label: 'View Gallery', href: '/photos' },
      { label: 'See Projects', href: '/code' },
      { label: 'Get in Touch', href: '/contact' },
    ],
  },
};

export function getModeConfig(mode: VisitorMode): VisitorModeConfig {
  return modeConfigs[mode];
}

export const defaultMode: VisitorMode = 'hiring';
