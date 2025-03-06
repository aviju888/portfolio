# Comprehensive Portfolio Site Documentation

## Overview & Architecture
This document provides exhaustive documentation for Adriel Vijuan's personal portfolio website. The site follows a domain-driven architecture that showcases three distinct areas of expertise while maintaining cohesive design principles and user experience.

### Technical Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS with custom animations
- **Rendering**: Hybrid (Server Components + Client Interactivity)
- **Deployment**: Vercel with CI/CD pipeline
- **Image Optimization**: Next.js Image component with WebP support
- **Animation**: Framer Motion + CSS animations
- **3D Effects**: Three.js (for Human section particles)

### Domain-Based Architecture
The site is organized into three primary domains, each with distinct styling, animations, and content:

1. **Software Engineering** (`/software`) - Blue color scheme
   - Showcases technical projects, skills, and software engineering expertise
   - Features particle effects, code snippets, and technology categorization
   - Blue gradient animations and styling

2. **Creative** (`/creative`) - Pink/Purple color scheme
   - Highlights photography, videography, and artistic endeavors
   - Features gallery layouts, equipment details, and project showcases
   - Pink/purple gradient animations and styling

3. **Human** (`/human`) - Gray color scheme
   - Presents philosophical thoughts, reflections, and personal writing
   - Features floating particles, minimalist typography, and thought fragments
   - Clean black/white/gray styling with subtle animations

### Core Components Structure
The codebase follows a modular component architecture with clear separation of concerns:

```
app/
├── components/
│   ├── domain/           # Domain-specific components
│   │   ├── CreativeHero.tsx
│   │   ├── DesignHero.tsx
│   │   ├── SoftwareHero.tsx
│   │   └── ProjectsSection.tsx
│   ├── layout/           # Structural layout components
│   │   ├── DomainProvider.tsx
│   │   ├── DomainSwitcher.tsx
│   │   ├── Experience.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   └── Skills.tsx
│   ├── shared/           # Cross-domain reusable components
│   └── ui/               # Primitive UI components
├── [domain]/             # Domain-specific pages
│   └── page.tsx
├── utils/                # Utility functions and helpers
├── globals.css           # Global styles and animations
├── layout.tsx            # Root layout with providers
└── page.tsx              # Landing page
```

### State Management
- **DomainProvider**: Context provider that manages the active domain state
- **Local component state**: React useState for component-specific state
- **URL-based state**: Next.js routing for maintaining navigation state

## Navigation System

### Primary Navigation
The site employs a sophisticated navigation system with the following components:

#### Header Component
```typescript
// Header.tsx
export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLinksOpen, setIsLinksOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { activeDomain } = useDomain();
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Navigation links
  const links = [
    { name: 'Resume', href: '/resume.pdf' },
    { name: 'GitHub', href: 'https://github.com/aviju888' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/adriel-vijuan' },
    { name: 'Email', href: 'mailto:avijuan@berkeley.edu' }
  ];

  // ... scroll and visibility effects
}
```

The Header handles:
- Logo/brand navigation (AV link to homepage)
- Primary navigation (Experience, About)
- Links dropdown (Resume, GitHub, LinkedIn, Email)
- Domain switcher (Creative, Software, Human)
- Mobile menu for responsive design
- Conditional styling based on scroll position

#### DomainSwitcher Component
```typescript
// DomainSwitcher.tsx
export type Domain = 'creative' | 'software' | 'human';

interface DomainSwitcherProps {
  activeDomain?: Domain;
  className?: string;
  onDomainSelect?: () => void;
}

interface DomainItem {
  id: Domain;
  name: string;
  color: string;
  icon: React.ReactNode;
}

export const DomainSwitcher = ({ activeDomain, className = '', onDomainSelect }: DomainSwitcherProps) => {
  // ... domain definitions and rendering logic
}
```

### Domain Context Provider
```typescript
// DomainProvider.tsx
export const DomainProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [activeDomain, setActiveDomain] = useState<Domain | undefined>();

  useEffect(() => {
    const domain = pathname.split('/')[1] as Domain;
    if (['creative', 'software', 'human'].includes(domain)) {
      setActiveDomain(domain);
    } else {
      setActiveDomain(undefined);
    }
  }, [pathname]);

  return (
    <DomainContext.Provider value={{ activeDomain }}>
      {children}
    </DomainContext.Provider>
  );
}
```

## Design System

### Color Palette
Each domain has a distinct color palette that is consistently applied across components:

1. **Software Domain**:
   ```css
   --software-primary: linear-gradient(to right, #2563eb, #0891b2, #2563eb);
   --software-light: rgba(56, 189, 248, 0.1);
   --software-text: #38bdf8;
   --software-accent: #0ea5e9;
   ```

2. **Creative Domain**:
   ```css
   --creative-primary: linear-gradient(to right, #ec4899, #a855f7, #ec4899);
   --creative-light: rgba(236, 72, 153, 0.1);
   --creative-text: #ec4899;
   --creative-accent: #d946ef;
   ```

3. **Human Domain**:
   ```css
   --human-primary: linear-gradient(to right, #71717a, #52525b, #71717a);
   --human-light: rgba(161, 161, 170, 0.1);
   --human-text: #d4d4d8;
   --human-accent: #a1a1aa;
   ```

4. **Global Colors**:
   ```css
   --bg-primary: #000000;
   --text-primary: #ffffff;
   --text-secondary: rgba(255, 255, 255, 0.7);
   --border-light: rgba(255, 255, 255, 0.1);
   ```

### Typography System
- **Font Family**: Plus Jakarta Sans (variable font for performance)
- **Font Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Scale**:
  - Headings: 4xl (2.25rem) to 8xl (8rem)
  - Body: xs (0.75rem) to xl (1.25rem)
  - Fine print: xs (0.75rem)

### Spacing System
- **Base unit**: 0.25rem (4px)
- **Scale**: Tailwind's default scale (0.25rem to 24rem)
- **Key spacings**:
  - Section padding: py-24 (6rem)
  - Component margin: mb-12 (3rem), mb-8 (2rem)
  - Content spacing: gap-4 (1rem), gap-6 (1.5rem)

### Animation System
The site employs a sophisticated animation system with consistent timing functions:

```css
/* globals.css */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes float {
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
}

@keyframes gradient-x {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

- **Entrance animations**: fadeInUp, staggered reveals
- **Hover effects**: scale-105, brightness adjustments
- **Background animations**: gradient-x, pulse
- **Scroll-triggered**: Intersection Observer API

## UI Component Library

### Button Component
```typescript
// Button.tsx
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'solid' | 'outline' | 'ghost' | 'link' | 'creative-primary' | 'creative-secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  href?: string;
  icon?: React.ReactNode;
  className?: string;
}

export const Button = ({ 
  variant = 'solid', 
  size = 'md', 
  children, 
  href, 
  icon,
  className = '',
  ...props 
}: ButtonProps) => {
  // Button implementation with conditional styling
}
```

### ProjectCard Component
```typescript
// ProjectCard.tsx
export interface ProjectCardProps {
  title: string;
  description: string[] | string;
  tools: string[];
  imageUrl?: string;
  githubUrl?: string;
  link?: string;
  onClick?: () => void;
  domain?: 'software' | 'creative' | 'human';
}
```

### ProjectsGrid Component
```typescript
// ProjectsGrid.tsx
export interface BaseProject {
  title: string;
  category: string;
  link?: string;
  year?: string;
}

export interface SoftwareProject extends BaseProject {
  description: string[];
  technologies: string[];
  githubUrl?: string;
  imageUrl: string;
}

export interface CreativeProject extends BaseProject {
  description: string;
  thumbnail: string;
  tools: string[];
  features: string[];
  size?: 'regular' | 'large';
  accent?: string;
  style?: 'default' | 'minimal' | 'gradient' | 'outlined' | 'dark';
}

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  count: number;
}

export const ProjectsGrid = <T extends BaseProject>({
  title,
  description,
  projects,
  categories,
  domain,
  renderProjectCard,
  renderModal
}: ProjectsGridProps<T>) => {
  // Implementation with filtering, animations, and rendering logic
}
```

## Domain-Specific Components

### SoftwareHero Component
```typescript
// SoftwareHero.tsx
export const SoftwareHero = () => {
  const [isHeroVisible, setIsHeroVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const particlesContainerRef = useRef<HTMLDivElement>(null);
  
  // ... scroll and animation logic

  // Client-side only particle generation to prevent hydration mismatches
  useEffect(() => {
    if (!isMounted || !particlesContainerRef.current) return;
    
    // Clear any existing particles first
    particlesContainerRef.current.innerHTML = '';
    
    // Create the particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-blue-400/20';
      
      const width = Math.random() * 6 + 2;
      const height = Math.random() * 6 + 2;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const duration = Math.random() * 10 + 15;
      const delay = Math.random() * 5;
      
      particle.style.width = `${width}px`;
      particle.style.height = `${height}px`;
      particle.style.top = `${top}%`;
      particle.style.left = `${left}%`;
      particle.style.animation = `float ${duration}s infinite ease-in-out alternate`;
      particle.style.animationDelay = `${delay}s`;
      
      particlesContainerRef.current.appendChild(particle);
    }
  }, [isMounted]);
  
  // ... render method
}
```

### CreativeHero Component
```typescript
// CreativeHero.tsx
export const CreativeHero = () => {
  // Similar structure to SoftwareHero, but with pink/purple styling
  // Client-side particle generation for hydration consistency
  
  // ... implementation details
}
```

### HumanHero Component
```typescript
// HumanPage.tsx (contains hero section)
export default function HumanPage() {
  // ... state and refs
  
  // Three.js floating particles for more sophisticated 3D effect
  const FloatingParticles = () => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const particleCount = 150;
    const particleSpeed = 0.01;
    
    // ... particle implementation with Three.js
  };
  
  // ... render method with Three.js Canvas
}
```

## Full Content Details

### Landing Page Content
- Hero title: "ADRIEL VIJUAN"
- Subtitle: "UC Berkeley EECS '24"
- Three domain cards:
  - Software: "Building intelligent systems"
  - Creative: "Visual storytelling"
  - Human: "Thoughts & reflections"

### Software Domain Content
- **Projects**:
  1. **Diffusion Models**
     - Category: AI/ML
     - Description: Implementation and fine-tuning of Stable Diffusion models
     - Technologies: Python, PyTorch, CUDA, Hugging Face
     - GitHub URL: https://github.com/aviju888/diffusion-models

  2. **Computer Vision Projects**
     - Category: Computer Vision
     - Description: Object detection, tracking, and image processing
     - Technologies: Python, OpenCV, TensorFlow, NumPy
     - GitHub URL: https://github.com/aviju888/cv-projects

  3. **Computational Photography**
     - Category: Computational Photography
     - Description: HDR imaging, panorama stitching, neural style transfer
     - Technologies: Python, OpenCV, PyTorch, Pillow
     - GitHub URL: https://github.com/aviju888/comp-photo

  4. **Portfolio Website**
     - Category: Web Development
     - Description: Personal portfolio with Next.js, TypeScript, and Tailwind
     - Technologies: Next.js, TypeScript, Tailwind CSS, Framer Motion
     - GitHub URL: https://github.com/aviju888/personal-portfolio

- **Skills**:
  - Programming Languages: Python, TypeScript, JavaScript, C, Java, SQL
  - Frameworks: React, Next.js, PyTorch, TensorFlow
  - Tools: Git, Docker, VS Code, Linux
  - AI/ML: Deep learning, computer vision, generative models

### Creative Domain Content
- **Photography & Videography Projects**:
  1. **Dance Photography Portfolio**
     - Description: Dynamic dance performances and studio portraits
     - Tools: Sony A7IV, Adobe Lightroom, Photoshop
     - Features: Performance documentation, event coverage

  2. **KOSMOS Dance Videos**
     - Description: Dance performance videos and promotional content
     - Role: Lead Videographer & Editor
     - Tools: Premiere Pro, After Effects

- **Leadership Projects**:
  1. **AFX Dance - Training Team Director**
     - Description: Led 60+ member dance team
     - Role: Director & Choreographer
     - Responsibilities: Production management, choreography

  2. **KOSMOS @ Cal - Design Lead**
     - Description: Brand identity and content creation
     - Role: Graphic Design Lead & Sr. Filming Lead
     - Deliverables: Marketing materials, merchandise design

- **Equipment & Tools**:
  - Camera: Sony A7IV
  - Lighting: Godox system
  - Editing: Adobe Creative Suite (Lightroom, Photoshop, Premiere Pro, After Effects)

### Human Domain Content
- **Philosophical Content**:
  1. **The Perpetual Learner** - Essay on continuous learning and growth
  2. **The Beauty of Duality** - Reflections on balancing opposites
  3. **Human Connection** - Thoughts on authentic relationships
  4. **Elegant Simplicity** - Philosophy of minimalism and efficiency
  5. **Present Awareness** - Observations on mindfulness

- **Fragments** - Brief philosophical thoughts:
  - 7 short fragments on technology, consciousness, art, and identity

### About Page Content
- **Photo**: Circular portrait photo
- **Bio Sections**:
  - Education: UC Berkeley EECS '24, Data Science minor
  - Focus areas: AI/ML, software design, creativity
  - Personal interests: Learning, photography, dance leadership

### Experience Page Content
- **Professional Experience**:
  1. **Figma** - User Research Intern (May-Aug 2024)
  2. **UC Berkeley EECS** - Undergraduate Researcher (Jan 2023-Present)
  3. **Apple** - Software Engineering Intern (May-Aug 2023)
  4. **UC Berkeley** - Teaching Assistant for CS61A (Aug-Dec 2022)

## Technical Implementation Details

### Responsive Design Strategy
The site follows a mobile-first approach with three breakpoint tiers:
- **Mobile**: <768px (default styles)
- **Tablet**: ≥768px (`md:` prefix)
- **Desktop**: ≥1024px (`lg:` prefix)

Example implementation:
```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Content */}
</div>
```

### Animation Implementation
- **CSS Animations**: For simple, performance-critical animations
- **Framer Motion**: For complex, interactive animations
- **Intersection Observer**: For scroll-triggered animations
- **Three.js**: For 3D particle animations in the Human section

### Image Optimization Strategy
- **Next.js Image Component**: For automatic responsive image handling
- **WebP Format**: For better compression with quality
- **Lazy Loading**: For performance optimization
- **Prioritization**: Key above-the-fold images use `priority` prop

Example:
```jsx
<Image 
  src="/images/adriel.jpeg"
  alt="Photo of Adriel Vijuan"
  width={160}
  height={160}
  className="object-cover hover:scale-105 transition-transform duration-500"
  priority
/>
```

### Build & Deployment
- **Development**: Next.js development server with hot reloading
- **Build Pipeline**: TypeScript compilation and linting
- **Deployment**: Vercel with automatic preview deployments
- **Performance Optimizations**:
  - Code splitting
  - Static generation where possible
  - Image optimization
  - Font optimization

## Required Resources & Image Assets

### Image Requirements
1. **Profile Photo**:
   - File: `/public/images/adriel.jpeg`
   - Size: At least 320x320px (higher resolution preferred)
   - Format: JPEG or WebP

2. **Project Images**:
   - Directory: `/public/images/projects/`
   - Required files:
     - `diffusion.jpg` - Stable Diffusion project image
     - `cv-projects.jpg` - Computer Vision projects image
     - `comp-photo.jpg` - Computational Photography project image
     - `portfolio.jpg` - Portfolio website project image
   - Recommended size: 1200x800px (16:9 aspect ratio)
   - Format: JPEG or WebP

3. **Creative Portfolio Images**:
   - Directory: `/public/images/gallery/`
   - At least 8-12 high-quality photography samples
   - Recommended sizes: 1200x800px (landscape), 800x1200px (portrait)
   - Format: JPEG or WebP

4. **Background Assets**:
   - Directory: `/public/images/backgrounds/`
   - Optional textures or patterns for custom backgrounds

5. **Icons & Logos**:
   - Directory: `/public/images/icons/`
   - Technology icons for skills sections
   - Social media icons

6. **Document Assets**:
   - File: `/public/resume.pdf` - Current resume/CV

### Image Placement Instructions
1. Create the necessary directory structure in the `/public` folder
2. Place images in their respective directories following the naming conventions
3. Optimize all images for web (compress without significant quality loss)
4. Use consistent aspect ratios within each category

## Code Organization & Best Practices

### Component Structure Pattern
All components follow a consistent pattern:
1. Import statements
2. Type definitions and interfaces
3. Component definition
4. Internal state and hooks
5. Helper functions
6. Return statement with JSX
7. Export statement

### Styling Approach
- Tailwind CSS for component styling
- CSS Variables for theme colors and values
- CSS Modules for component-specific styles (when needed)
- Inline styles only for dynamic values

### Performance Optimizations
- React.memo for expensive components
- Dynamic imports for code splitting
- Intersection Observer for lazy loading
- useCallback and useMemo for optimization
- Image optimization with Next.js Image

### Accessibility Features
- Semantic HTML elements
- ARIA attributes where needed
- Keyboard navigation support
- Color contrast compliance
- Focus states for interactive elements

## Getting Started & Development

### Local Development Setup
1. Clone the repository
2. Install dependencies with `npm install`
3. Run the development server with `npm run dev`
4. Visit http://localhost:3000 to see the site

### Directory Structure
```
/
├── app/                      # Next.js App Router
│   ├── about/                # About page
│   ├── components/           # React components
│   ├── creative/             # Creative domain
│   ├── experience/           # Experience page
│   ├── human/                # Human domain
│   ├── software/             # Software domain
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Landing page
├── public/                   # Static assets
│   ├── images/               # Image assets
│   │   ├── projects/         # Project images
│   │   └── gallery/          # Creative gallery
│   ├── fonts/                # Local fonts
│   └── resume.pdf            # Resume file
├── .gitignore                # Git ignore file
├── next.config.js            # Next.js configuration
├── package.json              # NPM dependencies
├── tailwind.config.js        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── NEW_SITE_STRUCTURE.md     # This documentation
```

## Future Enhancements & Roadmap

### Planned Features
1. **Blog Integration** - For longer-form writing in the Human section
2. **Project Detail Pages** - Extended case studies for each project
3. **Dark/Light Mode Toggle** - Theme switching functionality
4. **Animation Preferences** - Respecting reduced motion settings
5. **Internationalization** - Multi-language support

### Technical Debt & Improvements
1. **Test Coverage** - Adding Jest and React Testing Library tests
2. **Storybook Integration** - For component documentation
3. **Analytics Implementation** - For usage insights
4. **Performance Optimization** - Further image and code optimizations

## Maintenance Guidelines

### Content Updates
1. **Adding Projects**:
   - Add project data to the relevant domain file
   - Upload project images to the appropriate directory
   - Update project counts in category filters

2. **Updating Experience**:
   - Modify the experience data in the timeline component
   - Ensure consistent formatting and styling

3. **Updating Skills**:
   - Add or remove skills in the relevant skill components
   - Maintain categorization and styling consistency

### Troubleshooting Common Issues
1. **Image Loading Issues** - Check file paths and image formats
2. **Animation Performance** - Reduce animation complexity on mobile
3. **Build Errors** - Check for TypeScript errors and missing dependencies
4. **Responsive Breakpoints** - Test on various device sizes
5. **Hydration Errors** - Ensure consistent server/client rendering 