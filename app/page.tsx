'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Project interfaces
interface Project {
  title: string;
  category: 'software' | 'creative';
  description: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  year: string;
}

interface ExperienceItem {
  company: string;
  role: string;
  date: string;
  location: string;
  description: string[];
  skills?: string[];
  icon?: string;
}

const featuredProjects: Project[] = [
  {
    title: 'Diffusion Models Implementation',
    category: 'software',
    description: 'Custom diffusion sampling loops with inpainting capabilities and text-conditional image translation using PyTorch and Hugging Face.',
    technologies: ['Python', 'PyTorch', 'Hugging Face', 'CUDA'],
    imageUrl: '/images/projects/diffusion-models.png',
    githubUrl: 'https://github.com/aviju888/diffusion-models',
    year: '2024'
  },
  {
    title: 'KOSMOS Dance Videos',
    category: 'creative',
    description: 'Lead videographer and editor for dance performance videos and promotional content, garnering 100K+ total views.',
    technologies: ['Premiere Pro', 'After Effects', 'Sony A7IV'],
    imageUrl: '/images/creative/kosmos-rpd.jpg',
    liveUrl: 'https://youtube.com/@kosmoskpop',
    year: '2022-Present'
  },
  {
    title: 'RISC-V CPU Implementation',
    category: 'software',
    description: '5-stage pipelined RISC-V CPU with complete datapath implementation, hazard detection, and pipeline optimization.',
    technologies: ['Logisim', 'Assembly', 'Computer Architecture'],
    imageUrl: '/images/projects/cs61cpu.png',
    year: '2023'
  },
  {
    title: 'Colorizing Historical Imagery',
    category: 'software',
    description: 'Automated system for aligning and colorizing the Prokudin-Gorskii collection using advanced computer vision techniques.',
    technologies: ['Python', 'OpenCV', 'NumPy', 'SciPy'],
    imageUrl: '/images/projects/colorizing-imagery.png',
    year: '2024'
  },
  {
    title: 'Dance Photography Portfolio',
    category: 'creative',
    description: 'Dynamic dance performance photography and portrait sessions featuring studio lighting and composition work.',
    technologies: ['Sony A7IV', 'Adobe Lightroom', 'Adobe Photoshop'],
    imageUrl: '/images/creative/kosmos.png',
    year: '2022-Present'
  },
  {
    title: 'Toxic Speech Detection',
    category: 'software',
    description: 'ML model for detecting toxic speech in online forums with 90% accuracy using advanced NLP techniques.',
    technologies: ['Python', 'TensorFlow', 'NLTK', 'scikit-learn'],
    imageUrl: '/images/projects/detect-toxic-speech.png',
    year: '2023'
  }
];

const experiences: ExperienceItem[] = [
  {
    company: 'dowork.ai',
    role: 'Machine Learning Engineer Intern',
    date: 'May 2023 - Sep 2023',
    location: 'Remote',
    description: [
      'Developed personalized in-browser chatbot assistant under CTO guidance',
      'Created evaluation framework for AI agent accuracy testing across models'
    ],
    skills: ['Python', 'LLMs', 'AI', 'Prompt Engineering'],
    icon: '/icons/dowork.png'
  },
  {
    company: 'KOSMOS @ Cal',
    role: 'Design Lead & Sr. Filming Lead',
    date: 'Mar 2022 - Present',
    location: 'UC Berkeley',
    description: [
      'Lead designer maintaining brand identity across Instagram and YouTube',
      'Directed dance performance videos with 100K+ total views',
      'Developed content strategy resulting in 2x follower growth'
    ],
    skills: ['Brand Design', 'Video Production', 'Adobe Creative Suite', 'Leadership'],
    icon: '/icons/kosmos.png'
  },
  {
    company: 'AFX Dance',
    role: 'Training Team Director',
    date: 'Aug 2024 - Dec 2024',
    location: 'UC Berkeley',
    description: [
      'Directed 52-member dance team with weekly choreography sessions',
      'Coordinated production, music selection, and performance scheduling'
    ],
    skills: ['Leadership', 'Choreography', 'Team Management'],
    icon: '/icons/afx.png'
  },
  {
    company: 'Berkeley Lab',
    role: 'Research Intern',
    date: 'Jun 2021 - Jul 2021',
    location: 'Berkeley, CA',
    description: [
      'Modeled solar water heating systems using LBNL weather databases',
      'Worked 1-on-1 under Principal Scientific Engineering Associate'
    ],
    skills: ['Python', 'Data Analysis', 'Research'],
    icon: '/icons/lbl.png'
  }
];

const skills = {
  'Programming': ['Python', 'JavaScript/TypeScript', 'C', 'Java', 'HTML/CSS'],
  'AI/ML': ['PyTorch', 'TensorFlow', 'scikit-learn', 'Hugging Face', 'OpenCV'],
  'Web Development': ['React', 'Next.js', 'Tailwind CSS', 'Node.js'],
  'Creative Tools': ['Adobe Premiere Pro', 'After Effects', 'Lightroom', 'Photoshop'],
  'Tools & Platforms': ['Git', 'Docker', 'Linux/Unix', 'Figma']
};

export default function Home() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="text-xl font-semibold">Adriel Vijuan</div>
            <div className="hidden md:flex space-x-6">
              {['About', 'Projects', 'Experience', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="hover:text-purple-400 transition-colors"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.1)_0%,transparent_70%)]" />
        <div className="text-center z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent"
          >
            ADRIEL VIJUAN
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/80 mb-8"
          >
            UC Berkeley EECS • Software Engineer • Creative Director
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-white/60 max-w-2xl mx-auto mb-8"
          >
            Building intelligent systems and creating visual stories at the intersection of AI, software development, and creative expression.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
            >
              View Projects
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-8 py-3 border border-purple-600 hover:bg-purple-600/10 rounded-lg transition-colors"
            >
              Get in Touch
            </button>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="w-48 h-48 mx-auto mb-8 md:mb-0">
                <Image 
                  src="/images/adriel.jpeg"
                  alt="Adriel Vijuan"
                  width={192}
                  height={192}
                  className="rounded-full object-cover border-4 border-purple-600/30"
                />
              </div>
            </div>
            <div className="space-y-4 text-white/80">
              <p>
                Hi, I'm Adriel! I'm currently a 4th-year at UC Berkeley majoring in Electrical Engineering and Computer Sciences with a minor in Data Science. My passions lie at the intersection of artificial intelligence, software design, and creativity.
              </p>
              <p>
                Over the years, I've worked on AI/ML projects, front-end development, and computational photography. Whether I'm fine-tuning diffusion models, leading creative teams, or capturing moments through photography, I'm constantly seeking to blend logic with creativity.
              </p>
              <p>
                Above all, I'm driven by a passion for learning and creating meaningful connections through technology and art.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-24 px-6 bg-white/[0.02]">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Skills & Technologies</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category} className="bg-white/[0.03] p-6 rounded-lg border border-white/10">
                <h3 className="text-xl font-semibold mb-4 text-purple-400">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skillList.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm border border-purple-600/30"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section id="projects" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/[0.03] rounded-lg overflow-hidden border border-white/10 hover:border-purple-600/30 transition-all duration-300 group cursor-pointer"
                onClick={() => setActiveProject(project)}
              >
                {project.imageUrl && (
                  <div className="aspect-video overflow-hidden">
                    <Image 
                      src={project.imageUrl}
                      alt={project.title}
                      width={400}
                      height={225}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.category === 'software' 
                        ? 'bg-blue-600/20 text-blue-300 border border-blue-600/30' 
                        : 'bg-pink-600/20 text-pink-300 border border-pink-600/30'
                    }`}>
                      {project.category === 'software' ? 'Software' : 'Creative'}
                    </span>
                    <span className="text-white/50 text-sm">{project.year}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-white/70 text-sm mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-white/10 text-white/60 rounded text-xs">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-white/10 text-white/60 rounded text-xs">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-purple-400 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                      </a>
                    )}
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white/60 hover:text-purple-400 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 bg-white/[0.02]">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold mb-12 text-center">Experience</h2>
          
          {/* Education */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold mb-6 text-purple-400">Education</h3>
            <div className="bg-white/[0.03] p-6 rounded-lg border border-white/10">
              <div className="flex items-center gap-4">
                <Image 
                  src="/icons/cal.svg"
                  alt="UC Berkeley"
                  width={48}
                  height={48}
                  className="opacity-90"
                />
                <div>
                  <h4 className="text-xl font-semibold">University of California, Berkeley</h4>
                  <p className="text-white/80">B.S. Electrical Engineering and Computer Sciences</p>
                  <p className="text-white/80">Minor in Data Science</p>
                  <span className="text-purple-400 text-sm">2021 - 2025</span>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Timeline */}
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/[0.03] p-6 rounded-lg border border-white/10 hover:border-purple-600/30 transition-colors duration-300"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <div className="flex items-center gap-3 mb-2 md:mb-0">
                    {exp.icon && (
                      <Image 
                        src={exp.icon}
                        alt={exp.company}
                        width={32}
                        height={32}
                        className="opacity-90"
                      />
                    )}
                    <div>
                      <h4 className="text-xl font-semibold text-purple-400">{exp.company}</h4>
                      <p className="text-white/80">{exp.role}</p>
                    </div>
                  </div>
                  <div className="text-right text-sm text-white/60">
                    <div>{exp.location}</div>
                    <div>{exp.date}</div>
                  </div>
                </div>
                <ul className="space-y-2 mb-4">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2 flex-shrink-0" />
                      <span className="text-sm">{desc}</span>
                    </li>
                  ))}
                </ul>
                {exp.skills && (
                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span 
                        key={skill}
                        className="px-2 py-1 bg-purple-600/20 text-purple-300 rounded text-xs border border-purple-600/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6">
        <div className="container mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
          <p className="text-white/70 mb-12 text-lg">
            I'm always interested in new opportunities and collaborations. 
            Let's discuss how we can work together!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="mailto:avijuan@berkeley.edu"
              className="px-8 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Me
            </a>
            <a 
              href="https://linkedin.com/in/adriel-vijuan"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-purple-600 hover:bg-purple-600/10 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a 
              href="https://github.com/aviju888"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-purple-600 hover:bg-purple-600/10 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="container mx-auto text-center text-white/50">
          <p>&copy; 2025 Adriel Vijuan. All rights reserved.</p>
        </div>
      </footer>

      {/* Project Modal */}
      {activeProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-semibold">{activeProject.title}</h3>
                <button
                  onClick={() => setActiveProject(null)}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {activeProject.imageUrl && (
                <div className="aspect-video mb-6 overflow-hidden rounded-lg">
                  <Image 
                    src={activeProject.imageUrl}
                    alt={activeProject.title}
                    width={600}
                    height={338}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <p className="text-white/80 mb-6">{activeProject.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {activeProject.technologies.map((tech) => (
                  <span key={tech} className="px-3 py-1 bg-purple-600/20 text-purple-300 rounded-full text-sm border border-purple-600/30">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                {activeProject.githubUrl && (
                  <a 
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                    </svg>
                    View Code
                  </a>
                )}
                {activeProject.liveUrl && (
                  <a 
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 border border-purple-600 hover:bg-purple-600/10 rounded-lg transition-colors inline-flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    View Live
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}