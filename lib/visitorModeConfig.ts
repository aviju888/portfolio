import { VisitorMode, VisitorModeConfig } from './types';

export const modeConfigs: Record<VisitorMode, VisitorModeConfig> = {
  hiring: {
    id: 'hiring',
    label: 'Hiring',
    icon: 'briefcase',
    navItems: [
      { name: 'Home', path: '/' },
      { name: 'Resume', path: '/adriel-vijuan-resume.pdf', external: true },
      { name: 'Experience', path: '/experience' },
      { name: 'Code', path: '/code' },
      { name: 'Contact', path: '/contact' },
    ],
    sectionOrder: ['hero', 'experience', 'projects', 'photos', 'cta'],
    heroLinks: [
      { label: 'View Resume', href: '/adriel-vijuan-resume.pdf', external: true },
      { label: 'See Experience', href: '/experience' },
      { label: 'Get in Touch', href: '/contact' },
    ],
    heroSubtitle: 'Software Engineer & Creative',
    cta: {
      heading: "Let's work together",
      description: "I'm always interested in new opportunities.",
      primaryLabel: 'Get in Touch',
      primaryHref: '/contact',
      secondaryLabel: 'View Resume',
      secondaryHref: '/adriel-vijuan-resume.pdf',
      secondaryExternal: true,
    },
    contactDescription: 'Interested in working together?',
    secondarySections: ['photos'],
    sectionOverrides: {
      photos: { description: "When I'm not coding, I shoot portraits and events." },
    },
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
    heroSubtitle: 'Software Engineer',
    cta: {
      heading: "Let's build something",
      description: "Always down to collaborate.",
      primaryLabel: 'Get in Touch',
      primaryHref: '/contact',
      secondaryLabel: 'GitHub',
      secondaryHref: 'https://github.com/aviju888',
      secondaryExternal: true,
    },
    contactDescription: 'Want to collaborate?',
    secondarySections: ['photos'],
    sectionOverrides: {
      photos: { description: "When I'm not coding, I shoot portraits and events." },
    },
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
    heroSubtitle: 'Photographer & Creative',
    cta: {
      heading: 'Like what you see?',
      description: "Let's make something together.",
      primaryLabel: 'Book a Shoot',
      primaryHref: '/contact',
      secondaryLabel: 'View Gallery',
      secondaryHref: '/photos',
    },
    contactDescription: 'Inquire about a shoot.',
    secondarySections: ['projects', 'experience'],
    sectionOverrides: {
      projects: { description: 'I also build things — here are a couple side projects.' },
      experience: { description: 'My background in software engineering and research.' },
    },
  },
};

export function getModeConfig(mode: VisitorMode): VisitorModeConfig {
  return modeConfigs[mode];
}

export const defaultMode: VisitorMode = 'hiring';
