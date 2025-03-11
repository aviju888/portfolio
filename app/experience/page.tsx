'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useSpring } from 'framer-motion';

interface ExperienceItem {
  company: string;
  role: string;
  date: string;
  location: string;
  description: string[];
  skills?: string[];
  icon?: string;
}

const experiences: ExperienceItem[] = [
  {
    company: 'PASAE',
    role: 'Frontend Developer (Webmaster) & Historian',
    date: 'May 2023 - Present',
    location: 'UC Berkeley',
    description: [
      'Website redesign project lead; collaborated with a small team of interns to revamp the PASAE website for enhanced aesthetic appeal and functionality to simplify user experience',
      'Managed historical records and documented key events within the organization',
    ],
    skills: ['React.js', 'HTML', 'CSS', 'JavaScript'],
    icon: '/icons/pasae.png'
  },
  {
    company: 'KOSMOS @ Cal',
    role: 'Design Lead & Sr. Filming Lead',
    date: 'Mar 2022 - Present',
    location: 'UC Berkeley',
    description: [
      'Lead Designer: Created and maintained brand identity across Instagram (@kosmoskpop) and YouTube platforms',
      'Video Production: Directed and produced dance performance videos garnering 100K+ total views',
      'Social Media Management: Developed content strategy resulting in 2x follower growth',
      'Training & Leadership: Conducted workshops on videography techniques and Adobe Creative Suite'
    ],
    skills: ['Brand Design', 'Social Media Strategy', 'Video Production', 'Adobe Creative Suite', 'Leadership'],
    icon: '/icons/kosmos.png'
  },
  {
    company: 'Freelance Photography',
    role: 'Portrait & Event Photography',
    date: 'Jan 2022 - Present',
    location: 'Bay Area',
    description: [
      'Graduation Photography Portfolio: Captured milestone moments for UC Berkeley graduates including Harmony He (2023), Monica Wang (2024), Grace Luong (2024), Bryan Chen (2024), and Therese Mendoza (2024)',
      'Dance Team Photography: Lead photographer for KOSMOS (Spring/Fall 2023), AFX Dance Camp (Summer 2023), CTRL FX (Spring 2024), and Glamity (Spring 2024)',
      "Event Coverage: Documented performances and special events across UC Berkeley's dance community"
    ],
    skills: ['Photography', 'Adobe Lightroom', 'Adobe Photoshop', 'Event Photography', 'Portrait Photography'],
    icon: '/icons/camera.png'
  },
  {
    company: 'AFX Dance',
    role: 'Training Team Director',
    date: 'Aug 2024 - Dec 2024',
    location: 'UC Berkeley',
    description: [
      'Directed a 52 member dance team',
      'Coordinated weekly choreography and performance practices for beginner/intermediate campus-based dancers',
      'Coordinated production; managed music selection, choreography, and performance scheduling'
    ],
    icon: '/icons/afx.png'
  },
  {
    company: 'dowork.ai',
    role: 'Machine Learning Engineer Intern',
    date: 'May 2023 - Sep 2023',
    location: 'Remote',
    description: [
      'Worked directly under CTO to develop a personalized in-browser chatbot assistant',
      'Created an evaluation framework to test AI agent accuracy across different models'
    ],
    skills: ['Python', 'Large Language Models', 'AI', 'Prompt Engineering', 'Research'],
    icon: '/icons/dowork.png'
  },
  {
    company: 'Tech+Social Impact',
    role: 'Undergraduate ML Research',
    date: 'Jan 2023 - Jul 2023',
    location: 'UC Berkeley',
    description: [
      'Joined an undergraduate research project that utilized Twitter\'s API to scrape and analyze online hate speech related to TERF users'
    ],
    skills: ['Python', 'Twitter API', 'Machine Learning', 'Data Science', 'Research'],
    icon: '/icons/t_si.png'
  },
  {
    company: 'Berkeley Lab',
    role: 'Intern — Experiences in Research (EinR)',
    date: 'Jun 2021 - Jul 2021',
    location: 'Berkeley, CA',
    description: [
      'Modeled a solar water heating system; using LBNL\'s MSWH weather database and algorithms',
      'Worked 1-on-1 under LBNL Principal Scientific Engineering Associate'
    ],
    skills: ['Python', 'Large-scale Data Analysis', 'Anaconda', 'Data Science'],
    icon: '/icons/lbl.png'
  },
  {
    company: 'Berkeley Lab',
    role: 'Data Science Apprentice',
    date: 'Jul 2020 - Aug 2020',
    location: 'Berkeley, CA',
    description: [
      'Developed a gas detection model utilizing an Arduino to analyze toxic gas levels within household environments'
    ],
    skills: ['Python', 'Pandas'],
    icon: '/icons/lbl.png'
  },
];

export default function ExperiencePage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const mouseX = useSpring(0, { stiffness: 100, damping: 30 });
  const mouseY = useSpring(0, { stiffness: 100, damping: 30 });
  const particlesContainerRef = useRef<HTMLDivElement>(null);

  // Group experiences by type
  const experienceTypes = {
    'Software & AI': ['dowork.ai', 'Tech+Social Impact', 'Berkeley Lab', 'PASAE'],
    'Creative & Design': ['KOSMOS @ Cal', 'Freelance Photography', 'Creative Portfolio'],
    'Leadership': ['AFX Dance', 'KOSMOS @ Cal']
  };

  const filteredExperiences = experiences.filter(exp => 
    activeFilter === 'all' || 
    Object.entries(experienceTypes).find(([type, companies]) => 
      type === activeFilter && companies.includes(exp.company)
    )
  );

  // Add these animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3
      }
    }
  };

  // Animation effect on mount
  useEffect(() => {
    // Set state immediately to trigger animations
    setIsPageVisible(true);
    setIsMounted(true);
    
    // Force a re-render when the component mounts
    const timer = setTimeout(() => {
      setIsPageVisible(state => state);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Mouse movement effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const x = (clientX / innerWidth) - 0.5;
      const y = (clientY / innerHeight) - 0.5;
      
      mouseX.set(x);
      mouseY.set(y);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Generate particles only on client-side after component mounts
  useEffect(() => {
    if (!isMounted || !particlesContainerRef.current) return;
    
    // Clear any existing particles first
    particlesContainerRef.current.innerHTML = '';
    
    // Create the particles
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute rounded-full bg-purple-500/20';
      
      const width = Math.random() * 5 + 2;
      const height = Math.random() * 5 + 2;
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const duration = Math.random() * 15 + 10;
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

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Gradient overlay with animation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(125,18,255,0.05)_0%,transparent_70%)] opacity-0 animate-pulse" 
           style={{ 
             animation: 'pulse 8s infinite alternate', 
             opacity: isPageVisible ? 1 : 0, 
             transition: 'opacity 1.5s ease-out'
           }} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black to-zinc-950" />
      
      {/* Animated particles container */}
      <div 
        ref={particlesContainerRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />

      <div className="container max-w-5xl mx-auto px-6 py-24 relative z-10">
        {/* Header Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isPageVisible ? 0 : 20, opacity: isPageVisible ? 1 : 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-100 to-[#7d12ff] bg-clip-text text-transparent">
            Experience
          </h1>
          <p className="text-lg text-white/80 max-w-3xl">
            A collection of my professional experience across software, research, creative direction, and leadership roles.
          </p>
        </motion.div>

        {/* Education Section */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isPageVisible ? 0 : 20, opacity: isPageVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 pb-6 border-b border-white/10"
        >
          <h2 className="text-2xl font-semibold mb-6 text-white">Education</h2>
          <div className="bg-white/[0.03] p-6 rounded-lg border border-white/5 hover:border-purple-500/30 transition-colors duration-300">
            <div className="flex flex-col items-center text-center">
              <Image 
                src="/icons/cal.svg" 
                alt="UC Berkeley Logo" 
                width={64} 
                height={64} 
                className="mb-4 opacity-90"
              />
              <h3 className="text-xl font-medium text-white mb-1">University of California, Berkeley</h3>
              <p className="text-white/80">B.S. Electrical Engineering and Computer Sciences</p>
              <p className="text-white/80 mb-2">Minor in Data Science</p>
              <span className="text-purple-500/90 text-sm font-medium">2021 - 2025</span>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate={isPageVisible ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          <motion.div variants={item} className="bg-white/[0.03] rounded-lg p-5 border border-white/[0.05] hover:border-purple-500/30 transition-colors duration-300">
            <div className="text-2xl font-bold text-purple-500 mb-1">5+ Years</div>
            <div className="text-white/60 text-sm">Working with Code & Design</div>
          </motion.div>
          <motion.div variants={item} className="bg-white/[0.03] rounded-lg p-5 border border-white/[0.05] hover:border-purple-500/30 transition-colors duration-300">
            <div className="text-2xl font-bold text-purple-500 mb-1">50+ Projects</div>
            <div className="text-white/60 text-sm">Across Creative & Technical Domains</div>
          </motion.div>
          <motion.div variants={item} className="bg-white/[0.03] rounded-lg p-5 border border-white/[0.05] hover:border-purple-500/30 transition-colors duration-300">
            <div className="text-2xl font-bold text-purple-500 mb-1">200+ People</div>
            <div className="text-white/60 text-sm">Led in Creative & Technical Teams</div>
          </motion.div>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isPageVisible ? 0 : 20, opacity: isPageVisible ? 1 : 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-3 mb-10"
        >
          <motion.button
            onClick={() => setActiveFilter('all')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-4 py-1.5 rounded-full text-sm transition-all
              ${activeFilter === 'all' 
                ? 'bg-purple-500 text-white' 
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300'}`}
          >
            All Experiences
          </motion.button>
          {Object.keys(experienceTypes).map((type, index) => (
            <motion.button
              key={type}
              onClick={() => setActiveFilter(type)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.5 + (index * 0.1) }}
              className={`px-4 py-1.5 rounded-full text-sm transition-all
                ${activeFilter === type 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300'}`}
            >
              {type}
            </motion.button>
          ))}
        </motion.div>

        {/* Timeline */}
        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="relative"
        >
          {/* Timeline bar - simplified and more subtle */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-zinc-800"></div>

          {filteredExperiences.map((exp, index) => (
            <motion.div 
              key={index} 
              variants={item}
              className="mb-10 relative pl-10"
            >
              {/* Simplified timeline dot */}
              <div 
                className="absolute left-[14px] top-2 w-2 h-2 bg-purple-500 rounded-full z-10"
                style={{ marginLeft: '-4px' }}
              >
                {/* Inner glow effect */}
                <div className="absolute inset-0 rounded-full bg-purple-500/20 animate-pulse" 
                  style={{ transform: 'scale(1.5)' }} 
                />
              </div>

              {/* Experience card */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="bg-zinc-900/50 rounded-lg p-6 transition-all duration-300
                  border border-zinc-800 hover:border-purple-500/20"
              >
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div className="flex items-center gap-3 mb-2 md:mb-0">
                    {exp.icon && (
                      <Image 
                        src={exp.icon} 
                        alt={`${exp.company} logo`} 
                        width={32} 
                        height={32} 
                        className="opacity-90"
                      />
                    )}
                    <div>
                      <h3 className="text-xl font-semibold text-purple-500">{exp.company}</h3>
                      <div className="text-purple-500/90 text-sm">{exp.role}</div>
                    </div>
                  </div>
                  <div className="md:text-right">
                    <div className="text-purple-500/80 text-sm">{exp.location}</div>
                    <div className="text-purple-500/50 text-xs">{exp.date}</div>
                  </div>
                </div>
                
                {/* Key Achievements */}
                <ul className="space-y-2 mb-4">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/90 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500/80 mt-1.5 flex-shrink-0" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Skills */}
                {exp.skills && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-purple-500/20">
                    {exp.skills.map((skill, i) => (
                      <span 
                        key={i}
                        className="px-2 py-0.5 text-xs bg-purple-500/10 text-purple-400 rounded-full
                          border border-purple-500/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 