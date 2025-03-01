# Portfolio Site Structure Documentation

## Overview
This document provides comprehensive details about the architecture, design system, and content structure of Adriel Vijuan's portfolio website. The portfolio is a multi-domain showcase highlighting expertise in Software Engineering, Creative work (Photography/Videography), and UI/UX Design.

## Core Architecture

### Domain-Based Structure
The site is organized around three primary domains, each with distinct styling and content:
1. **Software Engineering** (`/software`) - Blue color scheme
2. **Creative** (`/creative`) - Pink/Purple color scheme
3. **UI/UX Design** (`/ui-ux`) - Orange/Yellow color scheme

### Navigation System
- **Header** with conditional styling based on the active domain
- **Domain Switcher** for navigating between primary sections
- **Page Navigation** within each domain
- **Scroll Indicators** for vertical navigation

## Typography & Fonts

### Primary Font
- **Plus Jakarta Sans** (Google Font)
- Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semibold), 700 (Bold)
- Fallbacks: system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif
- Variable font implementation for optimal performance

### Text Sizes
- Headings: 
  - Hero titles: `text-4xl md:text-6xl` (2.25rem/4rem)
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

3. **UI/UX Domain**:
   - Primary: Orange/Yellow (`from-orange-500 to-yellow-500`, `via-amber-400`)
   - Accent: Orange 400 (`text-orange-400`)
   - Highlight: Amber 400 (`text-amber-400`)
   - Background elements: Orange with opacity (`bg-orange-900/30`, `border-orange-500/30`)

### Gradient System
- Linear gradients (predominantly horizontal):
  - Software: `bg-gradient-to-r from-blue-500 via-cyan-400 to-blue-500`
  - Creative: `bg-gradient-to-r from-pink-500 via-purple-400 to-pink-500`
  - UI/UX: `bg-gradient-to-r from-orange-500 via-amber-400 to-orange-500`

- Radial gradients (for background effects):
  - Software: `bg-[radial-gradient(circle_at_center,rgba(0,150,255,0.01)_0%,transparent_70%)]`
  - Creative: `bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.05)_0%,transparent_70%)]`
  - UI/UX: `bg-[radial-gradient(circle_at_center,rgba(234,88,12,0.05)_0%,transparent_70%)]`

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

### Hero Sections
Each domain has a customized hero section:
- `SoftwareHero` - Blue gradient, tabbed interface
- `CreativeHero` - Pink/purple gradient, area of focus and equipment tabs
- `DesignHero` - Orange/yellow gradient, design categories

### Tab Navigation
- Used in domain hero sections
- Underline style for active tab
- Consistent styling across domains

### Tag/Technology Display
- Software: Blue tags (`bg-blue-900/30 border-blue-500/30 text-blue-300`)
- Creative: Pink tags (`bg-pink-900/30 border-pink-500/30 text-pink-300`)
- UI/UX: Orange tags (`bg-orange-900/30 border-orange-500/30 text-orange-300`)

### Scroll Indicator
- Animated indicator for vertical scrolling
- Domain-aware styling
- Appears after initial load
- Hides on scroll
- Reappears when back at top

### Accordion Component
```typescript
interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  titleColor?: string;
  borderColor?: string;
}
```
Features:
- Smooth animations
- Customizable colors
- Toggle functionality

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
- `animate-scrollBounce`: Bounce animation for scroll indicator with y-axis movement
- `animate-float`: Subtle floating movement for particles and decorative elements with random timing
- `hover:scale-105`, `hover:-translate-y-0.5`: Subtle lift effects on hover
- `transition-all`, `transition-colors`, `transition-transform`: Smooth state changes

### Implementation
- CSS keyframes defined in globals.css:
  ```css
  @keyframes pulse {
    0%, 100% { opacity: 0.7; }
    50% { opacity: 1; }
  }
  
  @keyframes scrollBounce {
    0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
    40% { transform: translateY(8px) translateX(-50%); }
    60% { transform: translateY(4px) translateX(-50%); }
  }
  
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(5px); }
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

3. **UI/UX Domain**:
   - Orange/yellow gradient animations
   - Design tool icon animations
   - Design process visualization animations

## Navigation Pathways

### Primary Navigation
1. **Landing Page** (`/`)
   - Domain selection (Software, Creative, UI/UX)
   - Loading animation

2. **Domain Pages**:
   - Software (`/software`)
   - Creative (`/creative`)
   - UI/UX (`/ui-ux`)

3. **Information Pages**:
   - Projects (`/projects`)
   - About (`/about`)
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
  - "UI/UX" - Orange/Yellow gradient
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

#### Navigation
- Enhanced navigation buttons with improved visibility:
  - **Projects Button**: Blue border with subtle blue background glow (10% opacity), white text for contrast, blue glow effect on hover, increased padding for larger clickable area
  - **Tech Stack Button**: White border (30% opacity) with subtle white background (5% opacity), consistent styling with Projects button
- Smooth scroll functionality to corresponding sections
- Sticky category navigation for projects section with tab-style interface and blur effect

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

#### Animation System
The software page features extensive animations to enhance user experience:
- **Hero Section Animations**:
  - Staggered entrance effects for hero text and buttons
  - Pulsing blue gradient background (using `animate-pulse`)
  - Floating particles with random sizes and animation delays
  - Scroll indicator bounce animation (`animate-scrollBounce`)

- **Project Section Animations**:
  - Fade-in animations for section headers
  - Scroll-triggered animations for project cards (using Intersection Observer)
  - Smooth category filter transitions
  - Hover effects for project images, GitHub links, and technology tags

- **Interactive Elements**:
  - Smooth transitions for hover states on all buttons and interactive elements
  - Tab-style navigation with smooth underline transitions
  - Transform effects for buttons on hover (slight lift effect)

#### Responsive Behavior
- Mobile-first approach with responsive adjustments
- Single column layout on mobile devices
- Two-column grid on medium screens
- Three-column grid on large screens
- Fluid typography adjustments
- Maintained visual hierarchy across device sizes

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

#### Creative Projects Content (separated page)
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

### UI/UX Domain (`/ui-ux`)
#### Hero Section Content
- Title: "UI/UX Design" (animated orange/yellow gradient)
- Description: "Creating intuitive, accessible, and delightful user experiences through thoughtful design."
- Tabbed interface with two sections:

#### Areas of Focus Tab Content
Organized in three sections:
1. **UI Design**
   - Visual design systems and component libraries
   - Responsive web and mobile interfaces
   - Interactive prototypes and animations

2. **UX Research**
   - User interviews and usability testing
   - Information architecture and user flows
   - Heuristic evaluation and accessibility audits

3. **Coming Soon**
   - Full UI/UX portfolio with case studies and process documentation is currently in development. Check back soon to see detailed examples of my design work!

#### Design Tools Tab Content
Organized in four cards:
1. **UI Design Tools**
   - Figma
   - Adobe XD
   - Sketch
   - Illustrator

2. **Prototyping**
   - Figma Prototyping
   - Principle
   - ProtoPie

3. **UX Research**
   - Maze
   - Hotjar
   - UserTesting
   - Optimal Workshop

4. **Design Systems**
   - Figma Libraries
   - Storybook
   - Zeroheight

### Projects Page (`/projects`)
#### Header Content
- Title: "Projects" (text-4xl font-medium mb-16)

#### Category Navigation
Seven categories with counts:
- All
- AI/ML (2)
- Computer Vision (2)
- Computational Photography (1)
- Design (1)
- Photography (0)
- Music (0)

#### Project Content (4 main projects)
1. **Diffusion Models**
   - **Category**: AI/ML
   - **Description**:
     - Implementation and fine-tuning of Stable Diffusion models
     - Experimented with various architectures and training techniques
     - Achieved high-quality image generation results
   - **Technologies**: Python, PyTorch, CUDA, Hugging Face
   - **GitHub URL**: https://github.com/aviju888/diffusion-models

2. **Computer Vision Projects**
   - **Category**: Computer Vision
   - **Description**:
     - Implemented various computer vision algorithms from scratch
     - Built real-time object detection and tracking systems
     - Developed custom image processing pipelines
   - **Technologies**: Python, OpenCV, TensorFlow, NumPy
   - **GitHub URL**: https://github.com/aviju888/cv-projects

3. **Computational Photography**
   - **Category**: Comp-Photo
   - **Description**:
     - Created advanced photo editing and manipulation tools
     - Implemented HDR imaging and panorama stitching
     - Developed neural style transfer applications
   - **Technologies**: Python, OpenCV, PyTorch, Pillow
   - **GitHub URL**: https://github.com/aviju888/comp-photo

4. **UI/UX Design Portfolio**
   - **Category**: Design
   - **Description**:
     - Collection of user interface and experience design projects
     - Focus on modern, minimalist, and accessible design
     - Includes mobile app and web interfaces
   - **Technologies**: Figma, Adobe XD, Sketch, Principle
   - **GitHub URL**: https://github.com/aviju888/design-portfolio

### About Page (`/about`)
#### Header Content
- Title: "About Me" (gradient text with animation)

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
- Text: "Get in Touch ↗"
- Href: "mailto:avijuan@berkeley.edu"
- Variant: solid
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
type Domain = 'creative' | 'software' | 'ui-ux';
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
  - UI/UX: "Creating intuitive, accessible, and delightful user experiences..."

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
│   │   ├── DesignHero.tsx
│   │   ├── SoftwareHero.tsx
│   │   └── ProjectsSection.tsx
│   ├── layout/
│   │   ├── DomainProvider.tsx
│   │   ├── DomainSwitcher.tsx
│   │   ├── Experience.tsx
│   │   ├── Header.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   └── Skills.tsx
│   └── ui/
│       ├── Accordion.tsx
│       ├── Button.tsx
│       ├── ProjectCard.tsx
│       └── ScrollIndicator.tsx
├── creative/
│   ├── page.tsx
│   └── projects.md
├── software/
│   ├── page.tsx
│   └── projects.md
├── ui-ux/
│   └── page.tsx
├── about/
│   └── page.tsx
├── experience/
│   └── page.tsx
├── projects/
│   └── page.tsx
├── globals.css
├── layout.tsx
└── page.tsx
```

## Public Assets Directory
```
public/
├── icons/
│   ├── github.png
│   ├── linkedin.png
│   ├── resume.png
│   ├── python.svg
│   ├── javascript.svg
│   ├── typescript.svg
│   ├── c.png
│   ├── pytorch.svg
│   ├── opencv.svg
│   ├── html.svg
│   ├── css.svg
│   ├── react.png
│   ├── docker.png
│   ├── pandas.svg
│   └── tailwind-css.svg
├── images/
│   ├── adriel.jpeg
│   └── projects/
│       ├── diffusion.jpg
│       ├── neural-style.jpg
│       ├── colorizing.jpg
│       ├── face-recognition.jpg
│       ├── cpu.jpg
│       ├── gitlet.jpg
│       ├── kosmos.jpg
│       └── portfolio.jpg
└── resume.pdf
``` 