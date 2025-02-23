# New Portfolio Site Structure

## Overview
A Next.js-based personal portfolio website featuring three distinct domains: Creative, Software, and Design. Each domain offers a unique visual and interactive experience while maintaining a cohesive design language through domain-aware components and dynamic theming.

## Technical Stack
- Framework: Next.js 15.1.7 with App Router
- Language: TypeScript
- Styling: Tailwind CSS with CSS Variables for theming
- State Management: React Context for domain state
- Animations: CSS transitions and keyframe animations
- Font: Montserrat (Google Fonts)

## Core Features
- Domain-specific theming
- Smooth transitions between domains
- Responsive design
- Interactive UI components
- Context-aware styling
- Mobile-first approach

## File Structure
```
/app/
├── components/
│   ├── layout/
│   │   ├── Header.tsx           # Domain-aware navigation header
│   │   ├── DomainProvider.tsx   # Context provider for domain state
│   │   └── DomainSwitcher.tsx   # Domain navigation component
│   │
│   ├── domain/                  # Domain-specific components
│   │   ├── CreativeHero.tsx     # Creative domain hero
│   │   ├── SoftwareHero.tsx     # Software domain hero
│   │   └── DesignHero.tsx       # Design domain hero
│   │
│   └── ui/                      # Shared UI components
│       └── Button.tsx           # Domain-aware button component
│
├── [domain]/                    # Domain-specific pages
│   ├── creative/
│   ├── software/
│   └── design/
│
├── contact/                     # Contact page with domain-aware styling
│   └── page.tsx
│
├── layout.tsx                   # Root layout with DomainProvider
├── page.tsx                     # Homepage with domain selection
└── globals.css                  # Global styles and theme variables
```

## Component Details

### DomainProvider
```typescript
interface DomainContextType {
  activeDomain?: Domain;
}

type Domain = 'creative' | 'software' | 'design';
```
- Manages global domain state
- Provides domain context to child components
- Handles domain detection from URL

### Button Component
```typescript
interface ButtonProps {
  variant?: 'solid' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
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
  --gradient-design: linear-gradient(135deg, #F97316 0%, #FBBF24 100%);
  
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

.theme-design {
  --theme-primary: #F97316;
  --theme-secondary: #FBBF24;
  --theme-accent: #FFA500;
}
```

## Animations

### Keyframe Animations
```css
@keyframes gradient {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

@keyframes textGlow {
  0% { text-shadow: 0 0 10px rgba(255,255,255,0.1); }
  100% { 
    text-shadow: 0 0 20px rgba(255,255,255,0.2),
                 0 0 30px rgba(255,255,255,0.1);
  }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}
```

### Transition Classes
```css
.hover-lift {
  transition: transform var(--transition-medium);
}

.page-enter {
  opacity: 0;
  transform: translateY(20px);
}

.page-enter-active {
  opacity: 1;
  transform: translateY(0);
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
- Collapsible navigation
- Adaptive layouts
- Touch-friendly interactions

## Domain-Specific Features

### Creative Domain
- Artistic gradients (Pink to Purple)
- Image overlays
- Floating animations
- Creative project showcase

### Software Domain
- Technical gradients (Blue to Cyan)
- Code snippets
- Technology tags
- Project documentation

### Design Domain
- Design gradients (Orange to Yellow)
- Grid patterns
- UI component showcase
- Design process visualization

## Performance Optimizations
- CSS variable-based theming
- Efficient transitions
- Lazy-loaded images
- Minimal DOM updates
- Optimized animations

## Development Guidelines
1. Use 'use client' directive for interactive components
2. Maintain consistent spacing using Tailwind classes
3. Follow domain-specific color schemes
4. Implement smooth transitions
5. Ensure mobile responsiveness
6. Optimize assets and animations

## Future Enhancements
1. Page transition animations
2. Domain-specific loading states
3. Enhanced mobile interactions
4. Cross-domain filtering
5. Advanced animation patterns
6. SEO optimizations 