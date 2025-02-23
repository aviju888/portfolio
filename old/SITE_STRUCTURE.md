# Personal Portfolio Site Structure

## Overview
A Next.js-based personal portfolio website for Adriel Vijuan, featuring a dark theme and modern design. Built with TypeScript, Tailwind CSS, and modern React patterns.

## Technical Stack
- Framework: Next.js 15.1.7 with App Router
- Language: TypeScript
- Styling: Tailwind CSS with custom CSS variables
- Build Tool: Turbopack
- Font: Montserrat (Google Fonts)
- Image Optimization: next/image
- Deployment: Vercel (recommended)

## File Structure & Component Details

```
/
├── app/                         # Next.js 13+ App Router directory
│   ├── components/             # Shared components
│   │   ├── layout/            # Page structure components
│   │   │   ├── Navbar.tsx     # Navigation with mobile responsive menu
│   │   │   │                  # Props: None
│   │   │   │                  # State: isScrolled, isMenuOpen
│   │   │   │                  # Features: Mobile hamburger, scroll effect
│   │   │   │
│   │   │   ├── Hero.tsx      # Homepage hero section
│   │   │   │                  # Props: None
│   │   │   │                  # Features: Gradient text, social links
│   │   │   │                  # Dependencies: Button component
│   │   │   │
│   │   │   ├── Experience.tsx # Work experience timeline
│   │   │   │                  # Props: None
│   │   │   │                  # Data: experiences[] array
│   │   │   │                  # Features: Timeline, skill tags
│   │   │   │
│   │   │   └── Skills.tsx    # Skills showcase grid
│   │   │                      # Props: None
│   │   │                      # Data: skills[] array
│   │   │                      # Features: Hover animations
│   │   │
│   │   └── ui/               # Reusable UI components
│   │       └── Button.tsx    # Custom button component
│   │                         # Props: {
│   │                         #   children: ReactNode,
│   │                         #   href?: string,
│   │                         #   onClick?: () => void,
│   │                         #   className?: string,
│   │                         #   target?: string
│   │                         # }
│   │
│   ├── about/
│   │   └── page.tsx          # About page component
│   │                         # Features: Responsive layout
│   │                         # Components: Button
│   │
│   ├── projects/
│   │   └── page.tsx          # Projects page component
│   │                         # State: activeCategory
│   │                         # Data: projects[], categories[]
│   │
│   ├── globals.css           # Global styles and Tailwind
│   │                         # Custom properties:
│   │                         # --black: #0a0a0a
│   │                         # --white: #fafafa
│   │                         # --accent: #7d12ff
│   │                         # --gray: #333
│   │                         # --gradient-1: linear-gradient(...)
│   │                         # --gradient-2: linear-gradient(...)
│   │                         # --gradient-3: linear-gradient(...)
│   │
│   ├── layout.tsx            # Root layout with Navbar
│   │                         # Fonts: Montserrat
│   │                         # Meta tags
│   │
│   └── page.tsx              # Homepage component
│                             # Components: Hero, Experience, Skills
│
├── public/                    # Static assets
│   ├── icons/                # SVG/PNG icons (24x24 recommended)
│   └── images/               # Larger images and photos
│
├── next.config.js            # Next.js configuration
│                             # Image domains
│                             # Build settings
│
└── package.json              # Dependencies and scripts

## Component Relationships

### Layout Hierarchy
```
RootLayout (layout.tsx)
├── Navbar
└── PageContent
    ├── HomePage (page.tsx)
    │   ├── Hero
    │   ├── Experience
    │   └── Skills
    ├── ProjectsPage
    │   └── ProjectCard[]
    └── AboutPage
        └── Button[]
```

### State Management
- Navbar: Local state for mobile menu and scroll position
- Projects: Local state for category filtering
- Experience: Static data array
- Skills: Static data array

### CSS Structure
```
globals.css
├── @tailwind base
├── @tailwind components
├── @tailwind utilities
├── :root
│   └── CSS Variables
├── @layer base
│   └── Global elements
├── @layer components
│   ├── .container
│   ├── .navbar
│   ├── .hero
│   ├── .timeline
│   └── .project-card
└── Media queries
```

## Page Content Details

### Homepage (/)
Entry point: app/page.tsx
Components:
- Hero
  - Gradient text animation
  - Social links with hover effects
  - Contact button with gradient hover
- Experience Timeline
  - Left border with dots
  - Company logos
  - Skill tags
- Skills Grid
  - Icon hover animations
  - Responsive grid layout

### Projects (/projects)
Entry point: app/projects/page.tsx
Features:
- Category filtering system
- Project cards with:
  - GitHub link
  - Tech stack tags
  - Hover animations
  - Gradient overlay effect

Categories and Filters:
```typescript
interface Category {
  id: string;
  name: string;
}

const categories = [
  { id: 'all', name: 'All' },
  { id: 'ai-ml', name: 'AI/ML' },
  { id: 'computer-vision', name: 'Computer Vision' },
  { id: 'comp-photo', name: 'Computational Photography' },
  { id: 'design', name: 'Design' },
  { id: 'photography', name: 'Photography' },
  { id: 'music', name: 'Music' }
];
```

Project Structure:
```typescript
interface Project {
  title: string;
  category: string;
  description: string[];
  technologies: string[];
  githubUrl?: string;
}
```

### Experience Timeline
Data Structure:
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

### Styling System

#### Color Scheme
- Primary Background: #0a0a0a
- Text: #fafafa
- Accent: #7d12ff
- Gray: #333
- Gradients:
  - gradient-1: 45deg, #f0f0f0 → #7d12ff
  - gradient-2: 135deg, #4d0a56 → #0a0a0a
  - gradient-3: 45deg, #000000 → #14002d

#### Animations
```css
@keyframes textGlow {
  0% { text-shadow: 0 0 10px rgba(125, 18, 255, 0.3); }
  100% { text-shadow: 0 0 20px rgba(125, 18, 255, 0.1); }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
```

#### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Common Patterns

### Button Styles
```tsx
<Button 
  href="mailto:example@email.com"
  className="hover:bg-white/5"
>
  Get in Touch ↗
</Button>
```

### Image Usage
```tsx
<Image 
  src="/icons/example.png"
  alt="Description"
  width={30}
  height={30}
  className="opacity-90 hover:scale-105 transition-transform"
/>
```

### Container Pattern
```tsx
<section className="container mx-auto px-6 py-24">
  {/* Content */}
</section>
```

This enhanced documentation should make it much easier to understand the site's structure and make modifications. Each component's purpose, relationships, and styling patterns are now clearly documented. 