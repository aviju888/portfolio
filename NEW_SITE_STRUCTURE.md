# Portfolio Site Structure Documentation

## Overview
This document provides comprehensive details about the architecture, design system, and content structure of Adriel Vijuan's portfolio website. The portfolio is a multi-domain showcase highlighting expertise in Software Engineering, Creative work (Photography/Videography), and Human aspects (philosophy and personal reflections).

## Core Architecture

### Domain-Based Structure
The site is organized around three primary domains, each with distinct styling and content:
1. **Software Engineering** (`/software`) - Blue color scheme
2. **Creative** (`/creative`) - Pink/Purple color scheme
3. **Human** (`/human`) - Gray color scheme

### Navigation System
- **Header** with conditional styling based on the active domain
- **Domain Switcher** for navigating between primary sections
  - Recently updated to show Creative on top, Software in middle, Human at bottom for mobile view
  - Custom SVG icons for each domain (paintbrush for Creative, code brackets for Software, person icon for Human)
- **Page Navigation** within each domain
- **Scroll Indicator** for vertical navigation (removed from Human section for cleaner design)

## Typography & Fonts

### Primary Font
- **Plus Jakarta Sans** (Google Font)
- Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- Fallbacks: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif
- Variable font implementation for optimal performance

### Text Sizes
- Headings: 
  - Hero titles: `text-4xl md:text-6xl` (2.25rem/4rem)
  - Human hero: `text-4xl md:text-[8rem]` (recently adjusted from 10rem to 8rem)
  - Section titles: `text-3xl` (1.875rem)
  - Card titles: `text-xl` (1.25rem)
- Body:
  - Large: `text-lg md:text-xl` (1.125rem/1.25rem)
  - Regular: `text-base` (1rem)
  - Small: `text-sm` (0.875rem)
  - Extra small: `text-xs` (0.75rem)
- Special:
  - Code/monospace: `font-mono`

### Text Styling
- Font weights: light (300), regular (400), medium (500), semibold (600), bold (700)
- Line heights: tight (leading-tight), relaxed (leading-relaxed)
- Tracking: normal, wider (tracking-wider), widest (tracking-widest)

## Color System

### Global Colors
- **Background**: Black (`#000000`)
- **Text**: 
  - Primary: White (`#FFFFFF`)
  - Secondary: White with opacity (`text-white/80`, `text-white/60`)
  - Tertiary: White with opacity (`text-white/50`, `text-white/40`)

### Domain-Specific Colors
1. **Software Domain**:
   - Primary: Blue (`from-blue-500 to-cyan-500`)
   - Accent: Blue 400 (`text-blue-400`)
   - Highlight: Cyan 400 (`text-cyan-400`)
   - Background elements: Blue with opacity (`bg-blue-900/30`, `border-blue-500/30`)

2. **Creative Domain**:
   - Primary: Pink/Purple (`from-pink-500 to-purple-500`, `via-purple-400`)
   - Accent: Pink 400 (`text-pink-400`)
   - Highlight: Purple 400 (`text-purple-400`)
   - Background elements: Pink with opacity (`bg-pink-900/30`, `border-pink-500/30`)

3. **Human Domain**:
   - Primary: Gray (`from-gray-500 to-gray-700`)
   - Accent: Gray 400 (`text-gray-400`)
   - Highlight: Gray 300 (`text-gray-300`)
   - Background elements: Gray with opacity (`bg-gray-900/30`, `border-gray-500/30`)

### Gradient System
- Linear gradients (predominantly horizontal):
  - Software: `bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500`
  - Creative: `bg-gradient-to-r from-pink-500 via-purple-400 to-pink-500`
  - Human: `bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500`

- Radial gradients (for background effects):
  - Software: `bg-[radial-gradient(circle_at_center,rgba(0,150,255,0.01)_0%,transparent_70%)]`
  - Creative: `bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.05)_0%,transparent_70%)]`
  - Human: `bg-[radial-gradient(circle_at_center,rgba(161,161,170,0.05)_0%,transparent_70%)]`

- Vertical gradients (overlays):
  - `bg-gradient-to-b from-transparent via-transparent to-black/80`

## Layout System

### Page Structure
- **Root Layout**: Header + Main Content + Footer
- **Section Heights**: Full screen (`min-h-screen`, `h-screen`) for hero sections
- **Container System**: Centered content with responsive padding
  - `container mx-auto px-6` for standard sections
  - Custom max-width constraints where needed (`max-w-4xl`, `max-w-3xl`, `max-w-2xl`)

### Grid System
- Based on Tailwind's grid utilities:
  - Main grids: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
  - Technology grids: `grid-cols-2 md:grid-cols-4`
  - Gap spacing: `gap-4`, `gap-6`, `gap-8`

### Spacing System
- Vertical rhythm:
  - Section spacing: `py-24`, `py-16`
  - Component spacing: `mb-12`, `mb-8`, `mb-6`, `mb-4`
  - Inner spacing: `p-6`, `py-2 px-4`
  - Small spacing: `gap-2`, `gap-3`, `gap-4`
  - About page top padding: increased to `pt-24` for better vertical positioning

### Responsive Breakpoints
- Mobile-first approach with Tailwind breakpoints:
  - Default: Mobile
  - `md`: Medium screens (768px+)
  - `lg`: Large screens (1024px+)

## Component Library

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
- Domain-aware styling
- Multiple variants
- Link support
- Consistent hover effects
- Size variations

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
- Hover animations
- Technology tag display

Note: The project card styling is consistent across domains (software and creative) to maintain visual coherence.

### Hero Sections
Each domain has a customized hero section:
- `SoftwareHero` - Blue gradient, advanced particle animations (client-side rendering)
- `CreativeHero` - Pink/purple gradient, artistic particle effects (client-side rendering)
- `HumanHero` - Clean typography with "HUMAN" title (8rem font size) and Three.js particle animations

### ProjectsGrid Component
```typescript
// Recent fixes to prevent infinite loop in useEffect
export const ProjectsGrid = <T extends BaseProject>({
  title,
  description,
  projects,
  categories,
  domain,
  renderProjectCard,
  renderModal
}: ProjectsGridProps<T>) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [visibleProjects, setVisibleProjects] = useState<number[]>([]);
  const [selectedProject, setSelectedProject] = useState<T | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  // Domain-specific colors
  const primaryColor = domain === 'software' ? 'blue' : 'pink';
  
  // Get filtered projects for display
  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  // Initialize visible projects when category changes
  useEffect(() => {
    // Make first 6 projects visible immediately for a better user experience
    setVisibleProjects(Array.from({ length: Math.min(6, filteredProjects.length) }, (_, i) => i));
  }, [activeCategory, filteredProjects.length]);
  
  // Set up intersection observer for lazy loading
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '-1');
            if (index >= 0 && !visibleProjects.includes(index)) {
              setVisibleProjects(prev => [...prev, index]);
            }
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    // Wait a moment before observing to ensure DOM is ready
    const timer = setTimeout(() => {
      if (projectsRef.current) {
        const projectElements = projectsRef.current.querySelectorAll('.project-card-container');
        projectElements.forEach((el) => observer.observe(el));
      }
    }, 100);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [activeCategory, filteredProjects.length]);

  // ... rest of the component
}
```

### Tab Navigation
- Used in domain hero sections
- Underline style for active tab
- Consistent styling across domains
- All tabs are properly clickable with cursor-pointer styling
- Active tab state is visually distinct with appropriate color coding

### Tag/Technology Display
- Software: Blue tags (`bg-blue-900/30 border-blue-500/30 text-blue-300`)
- Creative: Pink tags (`bg-pink-900/30 border-pink-500/30 text-pink-300`)
- Human: Gray tags (`bg-gray-900/30 border-gray-500/30 text-gray-300`)

### DomainSwitcher Component
```typescript
export type Domain = 'creative' | 'software' | 'human';

interface DomainSwitcherProps {
  activeDomain?: Domain;
  className?: string;
  onDomainSelect?: () => void;
}

// Define the domain item type for better TypeScript support
interface DomainItem {
  id: Domain;
  name: string;
  color: string;
  icon: React.ReactNode;
}

export const DomainSwitcher = ({ activeDomain, className = '', onDomainSelect }: DomainSwitcherProps) => {
  // Check if this is the mobile version based on the className containing "w-full"
  const isMobile = className.includes('w-full');
  const router = useRouter();

  const domains: DomainItem[] = [
    { 
      id: 'creative', 
      name: 'Creative', 
      color: 'from-pink-500 to-purple-500', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'software', 
      name: 'Software', 
      color: 'from-blue-500 to-cyan-500', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 9l3 3-3 3M16 9l-3 3 3 3M7 4h10c1.105 0 2 .895 2 2v12c0 1.105-.895 2-2 2H7c-1.105 0-2-.895-2-2V6c0-1.105.895-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) 
    },
    { 
      id: 'human', 
      name: 'Human', 
      color: 'from-gray-500 to-gray-700', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 4a4 4 0 100 8 4 4 0 000-8z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) 
    },
  ];

  // For mobile view, we need to render vertically in the requested order
  const orderedDomains: DomainItem[] = isMobile ? 
    [
      domains.find(d => d.id === 'creative')!, 
      domains.find(d => d.id === 'software')!, 
      domains.find(d => d.id === 'human')!
    ] :
    domains;

  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'gap-4'} ${className}`}>
      {orderedDomains.map((domain) => (
        <button
          key={domain.id}
          onClick={(e) => {
            e.preventDefault();
            router.push(`/${domain.id}`);
            if (onDomainSelect) {
              onDomainSelect();
            }
          }}
          className={`
            ${isMobile ? 'w-full justify-center py-4 mb-2 rounded-lg' : 'px-4 py-2 rounded-full'} 
            transition-all duration-300 flex items-center gap-2
            ${activeDomain === domain.id 
              ? `bg-gradient-to-r ${domain.color} text-white ${isMobile ? '' : 'scale-105'}` 
              : 'bg-white/5 hover:bg-white/10'
            }
          `}
        >
          <span className="text-lg">{domain.icon}</span>
          <span>{domain.name}</span>
        </button>
      ))}
    </div>
  );
}
```

## Animation System

### Text Animations
- `animate-gradient-x`: Moving gradient background for titles (3s infinite animation)
- `animate-textGlow`: Subtle pulsing glow effect for text elements
- `animate-typing`: Typewriter effect (for landing page)
- `animate-textScroll`: Scrolling text effect for longer content

### Entrance Animations
- `animate-nameEntrance`: Special entrance for name with scale and opacity changes
- `animate-domainEntrance`: Delayed entrance for domain titles with y-axis movement
- `animate-fadeIn`: Simple fade-in with optional staggered timing and y-axis movement
- Page transitions between domains

### Interactive Animations
- `animate-pulse`: Pulsing effect for background elements (particularly used in Software domain)
- `animate-float`: Subtle floating movement for particles and decorative elements with random timing
- `hover:scale-105`, `hover:-translate-y-0.5`: Subtle lift effects on hover
- `transition-all`, `transition-colors`, `transition-transform`: Smooth state changes

### Recent Animation Fixes
1. **Hydration Mismatch Fix**: Prevented server/client rendering differences for random elements
   ```javascript
   // Client-side only particle generation with useEffect
   useEffect(() => {
     if (!isMounted || !particlesContainerRef.current) return;
     
     // Clear any existing particles
     particlesContainerRef.current.innerHTML = '';
     
     // Create particles with random properties only on client
     for (let i = 0; i < 20; i++) {
       const particle = document.createElement('div');
       particle.className = 'absolute rounded-full bg-blue-400/20';
       
       // Random properties generated only on client
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
   ```

2. **Infinite Loop Fix**: Prevented infinite re-rendering in ProjectsGrid component

### Implementation
- CSS keyframes defined in globals.css:
  ```css
  @keyframes pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
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
- React useEffect hooks for managing animations:
  - Intersection Observer for triggering animations on scroll
  - State-based animation triggers
  - Timed sequences using setTimeout and CSS transition delays

### Domain-Specific Animations
1. **Software Domain**:
   - Blue gradient animations with pulsing effect
   - Floating particles with randomized movement
   - Project card reveal animations when scrolling
   - Tab navigation with underline transitions

2. **Creative Domain**:
   - Pink/purple gradient animations
   - Image gallery hover effects with scale transitions
   - Portfolio piece entrance animations

3. **Human Domain**:
   - Three.js floating particle animations
   - Minimalist typography animations
   - Staggered text entrance effects
   - Scroll-triggered content reveals

## Human Page Content

### Hero Section
- Large "HUMAN" text (8rem font size) with extra margins for spacing
- Subtitle: "THOUGHTS · PHILOSOPHY · REFLECTIONS"
- Three.js particle animation background
- Clean, minimalist design with focus on typography
- "SCROLL DOWN" indicator removed for cleaner design

### Philosophical Content
The Human section features five main philosophical essays:

1. **The Perpetual Learner**
   - Theme: Constant learning and growth
   - Quote: "We don't stop playing because we grow old; we grow old because we stop playing." - George Bernard Shaw
   - Content: Reflections on curiosity and lifelong learning

2. **The Beauty of Duality**
   - Theme: Balancing opposing forces
   - Quote: "Life is a balance of holding on and letting go." - Rumi
   - Content: Discussion of how logic and creativity complement each other

3. **Human Connection**
   - Theme: Authentic relationships
   - Quote: "The most basic and powerful way to connect to another person is to listen." - Rachel Naomi Remen
   - Content: Reflections on empathy and connection in a digital world

4. **Elegant Simplicity**
   - Theme: Finding beauty in simplicity
   - Quote: "Simplicity is the ultimate sophistication." - Leonardo da Vinci
   - Content: Philosophy of minimalism and efficient design

5. **Present Awareness**
   - Theme: Mindfulness and attention
   - Quote: "The real voyage of discovery consists not in seeking new landscapes, but in having new eyes." - Marcel Proust
   - Content: Observations on being fully present in the moment

### Philosophical Fragments
Short, thought-provoking statements on various topics:
1. Technology's invisibility
2. Artificial vs. human intelligence
3. Photography as capturing time
4. Programming languages as cognitive extensions
5. Unlearning in education
6. Dance as embodied philosophy
7. Self as process rather than entity

## Navigation Pathways

### Primary Navigation
1. **Landing Page** (`/`)
   - Domain selection (Software, Creative, Human)
   - Loading animation

2. **Domain Pages**:
   - Software (`/software`)
   - Creative (`/creative`)
   - Human (`/human`)

3. **Information Pages**:
   - Projects (`/projects`)
   - About (`/about`) - Recently adjusted spacing to improve layout
   - Experience (`/experience`)

### Secondary Navigation
- **Tab Navigation** within domain pages
- **Category Filters** for projects
- **Scroll Navigation** within long pages

### External Links
- GitHub
- LinkedIn
- Resume download
- Email contact

## Page Content Details

### Landing Page (`/`)
- Animated entrance with name "ADRIEL VIJUAN"
- UC Berkeley EECS typing animation
- Loading bar animation (0-100%)
- Domain options with descriptive text:
  - "SOFTWARE" - Blue gradient
  - "CREATIVE" - Pink/Purple gradient
  - "HUMAN" - Gray gradient
- Footer text: "© 2024 Adriel Vijuan. All rights reserved."

### Software Domain (`/software`)
#### Hero Section Content
- Title: "Building Intelligent Systems" (animated blue gradient with gradient-x animation)
- Description: "Creating innovative software solutions at the intersection of computer vision, AI, and web development."
- Full-screen hero section with centered content and enhanced visual effects:
  - Pulsing blue gradient background animation
  - Floating particle animations (subtle blue dots)
  - Staggered entrance animations for text and buttons
  - Animated scroll indicator at bottom

#### Projects Section
- Category filters using tab-style navigation (sticky at top of section):
  - All (8)
  - AI/ML (2) 
  - Computer Vision (2)
  - Systems Architecture (2)
  - Web Development (2)
- Each filter tab has:
  - Icon (emoji)
  - Category name
  - Count of projects in that category
  - Blue underline indicator for active category
  - Hover effects for inactive categories

- Projects displayed in responsive grid (1, 2, or 3 columns depending on screen size)
- Project cards with:
  - Thin blue border outline (10% opacity, brightens to 30% on hover)
  - Project image with zoom hover effect
  - Project title with GitHub link icon
  - Bulleted description points (always visible)
  - Technology tags with hover effects
  - Staggered entrance animations when scrolling into view

#### Skills & Technologies Section
Four cards displaying proficiency in different areas:
1. **Languages**
   - Python
   - TypeScript
   - JavaScript
   - C
   - Java

2. **AI & ML**
   - PyTorch (Deep Learning)
   - TensorFlow (Model Serving)
   - OpenCV (Image Processing)
   - Hugging Face (Transformers)

3. **Web**
   - React
   - Next.js
   - Tailwind CSS
   - Node.js

4. **Tools**
   - Git
   - Docker
   - VS Code
   - Linux/Unix

### Creative Domain (`/creative`)
#### Hero Section Content
- Title: "Creative Portfolio" (animated pink/purple gradient)
- Description: "Visual storytelling through photography, videography, and digital media."
- Tabbed interface with two sections:

#### Areas of Focus Tab Content
Organized in two sections:
1. **Photography**
   - Graduation & portrait sessions
   - Dance team documentation
   - Studio lighting and composition

2. **Videography & Motion**
   - Dance performance videos
   - Motion graphics and visual effects
   - Social media content creation

#### Equipment & Tools Tab Content
Organized in four cards:
1. **Camera Equipment**
   - Sony A7IV
   - Godox Lighting
   - DJI Ronin RS

2. **Photo Editing**
   - Adobe Lightroom
   - Adobe Photoshop

3. **Video & Motion**
   - Adobe Premiere Pro
   - Adobe After Effects
   - DaVinci Resolve

#### Creative Projects Content
Organized by category:
1. **Photography & Videography**
   - **Dance Photography Portfolio**
     - Description: Dynamic dance performances and portraits
     - Tools: Sony A7IV, Adobe Lightroom, Photoshop
     - Features: Performance documentation, Studio portraits, Event coverage
     - Year: 2022-Present

   - **KOSMOS Dance Videos**
     - Description: Dance performance videos and promotional content
     - Role: Lead Videographer & Editor
     - Tools: Premiere Pro, After Effects
     - Features: Dynamic performance captures, Marketing materials, Social media content
     - Year: 2022-Present

2. **Leadership & Direction**
   - **AFX Dance - Training Team Director**
     - Description: Led and coordinated 60+ member dance team
     - Role: Director & Choreographer
     - Responsibilities: Choreography development, Performance blocking, Production management, Music selection
     - Year: August 2024-December 2024

   - **KOSMOS @ Cal - Design Lead**
     - Description: Brand identity and content creation
     - Role: Graphic Design Lead & Sr. Filming Lead
     - Deliverables: Marketing flyers, Logo design, Merchandise design, Social media content
     - Year: August 2022-Present

3. **Digital Media**
   - **Motion Graphics Collection**
     - Description: Animated graphics and transitions
     - Tools: After Effects, Premiere Pro
     - Features: Custom animations, Brand motion graphics, Visual effects
     - Year: 2023

### About Page (`/about`)
#### Header Content
- Title: "About Me" (gradient text with animation)
- Recently added extra top padding (`pt-24`) to improve vertical spacing

#### Photo Section
- Circular photo of Adriel Vijuan
- Width: 32-36px (responsive)
- Border: thin white/10 border with hover effect (border-[#7d12ff])
- Hover effect: scale-105 transition

#### Biography Content
Three paragraphs:
1. "Hi, I'm Adriel! I am currently a 4th-year at UC Berkeley majoring in Electrical Engineering and Computer Sciences with a minor in Data Science. My passions lie at the intersection of artificial intelligence, software design, and creativity. I enjoy leveraging technology to solve real-world problems while adding a touch of innovation and artistry to my work."

2. "Over the years, I've done work in AI/ML, front-end development, and computational photography. Whether I'm fine-tuning a diffusion model, leading a team, or capturing moments through photography, I'm constantly seeking to blend logic with creativity."

3. "Above all, I find myself to be a person with a true passion for learning. You'll likely find me teaching myself new skills, capturing moments through my camera, leading dance teams, or actively seeking ways to grow and connect with the community around me."

#### Contact Button
- Text: "Get in Touch"
- Href: "mailto:avijuan@berkeley.edu"
- Variant: creative-primary
- Size: sm

### Experience Page (`/experience`)
#### Timeline Structure
Chronological list of experiences:

1. **Figma**
   - **Role**: User Research Intern
   - **Date**: May 2024 - August 2024
   - **Location**: San Francisco, CA
   - **Description**:
     - Conducted qualitative and quantitative user research to inform product decisions
     - Analyzed user behavior patterns to identify pain points and opportunities
     - Collaborated with product teams to implement research-based improvements
     - Developed and deployed user surveys with a 35% response rate
   - **Skills**: User Research, Data Analysis, Figma, Product Design

2. **UC Berkeley EECS Department**
   - **Role**: Undergraduate Researcher
   - **Date**: January 2023 - Present
   - **Location**: Berkeley, CA
   - **Description**:
     - Researched novel approaches to computer vision problems using deep learning
     - Developed and trained models for real-time object detection and tracking
     - Published findings at undergraduate research symposium
     - Mentored junior researchers in technical implementations
   - **Skills**: PyTorch, TensorFlow, Computer Vision, Research Methods

3. **Apple**
   - **Role**: Software Engineering Intern
   - **Date**: May 2023 - August 2023
   - **Location**: Cupertino, CA
   - **Description**:
     - Developed and optimized internal tools for the Machine Learning team
     - Implemented performance improvements resulting in 40% faster processing
     - Collaborated with cross-functional teams to integrate features
     - Participated in code reviews and technical documentation
   - **Skills**: Python, Swift, CI/CD, Git, Machine Learning

4. **UC Berkeley**
   - **Role**: Teaching Assistant - CS61A
   - **Date**: August 2022 - December 2022
   - **Location**: Berkeley, CA
   - **Description**:
     - Led discussion sections for 30+ students in Structure and Interpretation of Computer Programs
     - Held weekly office hours to provide individualized support
     - Developed supplementary learning materials and practice problems
     - Graded assignments and provided constructive feedback
   - **Skills**: Python, Scheme, SQL, Teaching, Mentorship

## Skills & Technologies Section

### Languages
- **Proficient**: Python, JavaScript/TypeScript, HTML/CSS, C
- **Familiar**: Java, SQL, Scheme, R, MATLAB

### Frameworks & Libraries
- **Web**: React, Next.js, Tailwind CSS, Node.js
- **AI/ML**: PyTorch, TensorFlow, scikit-learn, Hugging Face
- **Computer Vision**: OpenCV, dlib, PIL/Pillow
- **Data Science**: Pandas, NumPy, Matplotlib, Seaborn

### Development Tools
- **Version Control**: Git, GitHub
- **Deployment**: Vercel, Netlify, Docker
- **IDEs/Editors**: VS Code, PyCharm, Jupyter Notebooks
- **Design**: Figma, Adobe XD, Photoshop, Lightroom

### Creative Tools
- **Photography**: Adobe Lightroom, Photoshop, Capture One
- **Video Editing**: Adobe Premiere Pro, After Effects, DaVinci Resolve
- **Motion Graphics**: After Effects, Premiere Pro, Principle

## Data Structures

### Project Interface
```typescript
interface Project {
  title: string;
  category: string;
  description: string[] | string;
  technologies: string[];
  tools?: string[];
  githubUrl?: string;
  imageUrl?: string;
  date?: string;
  year?: string;
}
```

### Experience Interface
```typescript
interface ExperienceItem {
  company: string;
  role: string;
  date: string;
  location: string;
  description: string[];
  skills?: string[];
  icon?: string;
}
```

### Domain Type
```typescript
type Domain = 'creative' | 'software' | 'human';
```

## Content Management

### Project Data Sources
- Software projects stored in: `app/software/projects.md`
- Creative projects stored in: `app/creative/projects.md`
- Consistent project structures for uniform display
- Direct integration of GitHub links for code repositories
- Image assets stored in public directory with optimized formats

### Experience Data Management
- Timeline-based organization 
- Consistent date formatting (Month YYYY - Month YYYY)
- Skill tagging system for easy filtering
- Company icons stored as SVGs when available

### Content Update Process
1. Modify project/experience data files
2. Update corresponding interfaces if schema changes
3. Add/modify images in the public directory
4. Test responsive display across devices
5. Deploy changes through the CI/CD pipeline

## Responsive Behavior

### Mobile Adaptations
- Reduced font sizes (`text-4xl` → `text-2xl`)
- Single column layouts
- Simplified navigation
- Optimized image sizes
- Space-efficient components

### Tablet Adaptations
- Two-column grids where appropriate
- Moderate font sizes
- Balanced component sizing

### Desktop Experience
- Three-column project grids
- Larger typography
- Expanded navigation options
- Full visual effects

## Accessibility Features
- High contrast text
- Semantic HTML structure
- Keyboard navigation support
- Alternative text for images
- Focus states for interactive elements

## Image Optimization
- WebP format support
- Multiple image sizes: 16, 32, 48, 64, 96, 128, 256, 384
- Device size targeting: 640, 750, 828, 1080, 1200, 1920
- Lazy loading for off-screen images
- Placeholder strategies for loading states
- Fallback handling for missing images

## Performance Optimizations
- Client-side rendering for interactive components
- Static rendering where possible
- Optimized image loading
- Lazy-loaded components
- Font optimization with variable fonts
- CSS animations instead of JavaScript where possible

## Copy & Messaging Strategy
- **Tone**: Professional yet personable
- **Voice**: Direct, engaging, technically precise
- **Headers**: Brief and descriptive
- **Body copy**: Concise paragraphs with clear information hierarchy
- **CTAs**: Action-oriented with clear intent ("Get in Touch ↗")
- **Project descriptions**: Technical with focus on implementation details
- **Domain descriptions**:
  - Software: "Building intelligent systems and applications..."
  - Creative: "Visual storytelling through photography..."
  - Human: "Thoughts, philosophy, and reflections..."

## Development Architecture
- Next.js application
- React functional components with hooks
- Tailwind CSS for styling
- TypeScript for type safety
- Domain context provider for global state
- ESLint configuration for code quality

## File Structure
```
app/
├── components/
│   ├── domain/
│   │   ├── CreativeHero.tsx
│   │   ├── SoftwareHero.tsx
│   │   ├── SoftwareSkills.tsx
│   │   ├── SoftwareProjects.tsx
│   │   ├── CreativeSkills.tsx
│   │   ├── CreativeProjects.tsx
│   │   └── ProjectsSection.tsx
│   ├── layout/
│   │   ├── DomainProvider.tsx
│   │   ├── DomainSwitcher.tsx
│   │   ├── Header.tsx
│   ├── shared/
│   │   ├── ProjectsGrid.tsx
│   └── ui/
│       ├── Button.tsx
│       ├── ScrollIndicator.tsx
├── creative/
│   ├── page.tsx
├── software/
│   ├── page.tsx
├── human/
│   ├── page.tsx
│   ├── philosophy/
│   │   └── index.md
├── about/
│   └── page.tsx
├── experience/
│   └── page.tsx
├── globals.css
├── layout.tsx
└── page.tsx
```

## Required Images & Assets

### Images Needed
1. **Profile Image**:
   - `adriel.jpeg` - Personal photo for About page
   - Location: `/public/images/adriel.jpeg`

2. **Project Images**:
   - Software project thumbnails
   - Creative portfolio samples
   - Location: `/public/images/projects/`
   - Naming convention: descriptive names like `project-name.jpg`

3. **Background/Texture Images**:
   - Any background patterns or textures
   - Location: `/public/images/backgrounds/`

4. **Icons**:
   - Skill icons (if not using SVG in-code)
   - Social media icons
   - Location: `/public/images/icons/`

5. **Gallery Images**:
   - Creative portfolio gallery samples
   - Location: `/public/images/gallery/`

6. **Favicon/Logo**:
   - `favicon.ico` - Browser tab icon
   - Various logo sizes for different devices
   - Location: `/public/`

### Documents
- `resume.pdf` - Downloadable resume/CV
- Location: `/public/resume.pdf`

## Recent Fixes & Improvements

1. **DomainSwitcher Update**:
   - Added custom order for mobile view (Creative top, Software middle, Human bottom)
   - Updated Creative icon to use a paintbrush SVG
   - Updated Human icon to use a simplified person silhouette

2. **Human Page Improvements**:
   - Reduced "HUMAN" text size from 10rem to 8rem
   - Increased spacing between heading and subtitle (mb-4 → mb-8/mb-12)
   - Removed "SCROLL DOWN" text
   - Fixed vertical centering issues

3. **Fix for ProjectsGrid Infinite Loop**:
   - Split useEffect hook to prevent dependency cycle
   - Removed visibleProjects from dependency array
   - Improved rendering logic for project visibility

4. **Hydration Mismatch Resolution**:
   - Moved particle generation to client-side only
   - Used DOM manipulation for random elements
   - Created empty containers during SSR to prevent mismatches

5. **About Page Spacing**:
   - Added more top padding (pt-24) to improve vertical alignment

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

