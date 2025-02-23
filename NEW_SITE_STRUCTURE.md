# New Portfolio Site Structure

## Overview
A Next.js-based personal portfolio website featuring three distinct domains: Creative, Software, and UI/UX. Each domain offers a unique visual and interactive experience while maintaining a cohesive design language through domain-aware components and dynamic theming.

## Technical Stack
- Framework: Next.js 15.1.7 with App Router
- Language: TypeScript
- Styling: Tailwind CSS with CSS Variables for theming
- State Management: React Context for domain state
- Animations: CSS transitions and keyframe animations
- Font: Plus Jakarta Sans (Google Fonts)
- Image Optimization: Next.js Image with WebP support

## Core Features
- Domain-specific theming
- Smooth transitions between domains
- Responsive design
- Interactive UI components
- Context-aware styling
- Mobile-first approach
- Optimized image loading

## File Structure
```
/app/
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # Domain-aware navigation header with dropdown
│   │   ├── DomainProvider.tsx   # Context provider for domain state
│   │   ├── DomainSwitcher.tsx   # Domain navigation component
│   │   ├── Experience.tsx       # Timeline component for experience
│   │   └── Skills.tsx          # Skills showcase grid
│   │
│   ├── domain/                  # Domain-specific components
│   │   ├── CreativeHero.tsx     # Creative domain hero
│   │   ├── SoftwareHero.tsx     # Software domain hero
│   │   └── UIUXHero.tsx        # UI/UX domain hero
│   │
│   └── ui/                      # Shared UI components
│       ├── Button.tsx           # Domain-aware button component
│       ├── ProjectCard.tsx      # Optimized project card with image handling
│       └── ScrollIndicator.tsx  # Scroll animation indicator
│
├── [domain]/                    # Domain-specific pages
│   ├── creative/
│   │   └── page.tsx            # Creative portfolio page
│   ├── software/
│   │   └── page.tsx            # Software projects page
│   └── ui-ux/
│       └── page.tsx            # UI/UX design page
│
├── experience/                  # Experience timeline page
│   └── page.tsx
│
├── about/                      # About page
│   └── page.tsx
│
├── layout.tsx                   # Root layout with DomainProvider
├── page.tsx                     # Homepage with domain selection
└── globals.css                  # Global styles and theme variables
```

## Image Optimization Configuration
```javascript
// next.config.js
{
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  }
}
```

## Component Details

### ProjectCard
```typescript
interface ProjectCardProps {
  title: string;
  description: string;
  tools: string[];
  thumbnail?: string;
  link?: string;
  onClick?: () => void;
}
```
Features:
- Optimized image loading with WebP support
- Responsive image sizing
- Lazy loading for performance
- Black image fallback
- Blur placeholder effect
- Domain-specific styling

### Button Component
```typescript
interface ButtonProps {
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  className?: string;
}
```
Features:
- Domain-aware gradients
- Multiple variants and sizes
- Hover animations
- Link support

### Header Component
Features:
- Domain-aware styling
- Responsive navigation
- Links dropdown menu
- Mobile menu
- Scroll-aware background
- Smooth transitions

## Styling System

### CSS Variables
```css
:root {
  /* Base Colors */
  --color-background: #0a0a0a;
  --color-text: #ffffff;
  
  /* Domain Gradients */
  --gradient-creative: linear-gradient(135deg, #FF1493 0%, #7928CA 100%);
  --gradient-software: linear-gradient(135deg, #0891B2 0%, #2563EB 100%);
  --gradient-ui-ux: linear-gradient(135deg, #F97316 0%, #FBBF24 100%);
  
  /* Transitions */
  --transition-slow: 700ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-medium: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

### Domain-Specific Themes
```css
.theme-creative {
  --theme-primary: #FF1493;
  --theme-secondary: #7928CA;
  --theme-accent: #FF69B4;
}

.theme-software {
  --theme-primary: #0891B2;
  --theme-secondary: #2563EB;
  --theme-accent: #38BDF8;
}

.theme-ui-ux {
  --theme-primary: #F97316;
  --theme-secondary: #FBBF24;
  --theme-accent: #FFA500;
}
```

## Responsive Design
- Breakpoints:
  ```css
  sm: 640px   /* Mobile */
  md: 768px   /* Tablet */
  lg: 1024px  /* Desktop */
  xl: 1280px  /* Large Desktop */
  ```
- Mobile-first approach
- Adaptive layouts
- Responsive images
- Touch-friendly interactions

## Domain-Specific Features

### Creative Domain
- Artistic gradients (Pink to Purple)
- Photography and videography showcase
- Dynamic project cards
- Media galleries

### Software Domain
- Technical gradients (Blue to Cyan)
- Code snippets
- Project documentation
- Technology tags

### UI/UX Domain
- Design gradients (Orange to Yellow)
- Project case studies
- Design process visualization
- Prototype demonstrations

## Performance Optimizations
- WebP image format support
- Responsive image loading
- Lazy loading for off-screen content
- Blur image placeholders
- Optimized font loading
- Minimal bundle size

## Development Guidelines
1. Use 'use client' directive for interactive components
2. Implement proper image optimization
3. Follow domain-specific color schemes
4. Ensure responsive design
5. Optimize for performance
6. Maintain consistent styling

## Future Enhancements
1. Image gallery lightbox
2. Advanced filtering system
3. Case study deep-dives
4. Animation improvements
5. SEO optimizations
6. Performance monitoring 