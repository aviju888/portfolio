'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Skills data organized by categories with icons
const skillsData = {
  photography: [
    { name: 'Event Photography', icon: '📸' },
    { name: 'Portrait Photography', icon: '👤' },
    { name: 'Studio Lighting', icon: '💡' },
    { name: 'Composition', icon: '🖼️' },
    { name: 'Post-Processing', icon: '🖌️' },
    { name: 'Photo Direction', icon: '👉' }
  ],
  videography: [
    { name: 'Cinematography', icon: '🎬' },
    { name: 'Video Editing', icon: '✂️' },
    { name: 'Color Grading', icon: '🎨' },
    { name: 'Motion Graphics', icon: '✨' },
    { name: 'Sound Design', icon: '🔊' },
    { name: 'Storytelling', icon: '📖' }
  ],
  design: [
    { name: 'UI/UX Design', icon: '📱' },
    { name: 'Graphic Design', icon: '🎭' },
    { name: 'Typography', icon: '🔤' },
    { name: 'Brand Identity', icon: '🏷️' },
    { name: 'Adobe Suite', icon: '🅰️' }
  ],
  leadership: [
    { name: 'Team Management', icon: '👥' },
    { name: 'Project Planning', icon: '📋' },
    { name: 'Creative Direction', icon: '🎯' },
    { name: 'Client Relations', icon: '🤝' },
    { name: 'Workshop Facilitation', icon: '🧠' },
    { name: 'Mentorship', icon: '🌱' }
  ]
};

const processSteps = [
  {
    title: "Ideation & Concept",
    description: "Developing creative concepts based on project goals and target audience.",
    icon: "💡"
  },
  {
    title: "Planning & Pre-production",
    description: "Detailed planning of resources, timeline, and technical requirements.",
    icon: "📋"
  },
  {
    title: "Creation & Development",
    description: "Bringing ideas to life with technical expertise and creative execution.",
    icon: "🎨"
  },
  {
    title: "Refinement & Feedback",
    description: "Iterative improvements based on client feedback and creative vision.",
    icon: "🔄"
  },
  {
    title: "Finalization & Delivery",
    description: "Polishing the final product and preparing deliverables for various platforms.",
    icon: "✅"
  }
];

// Category color schemes
const categoryColors = {
  photography: {
    text: "text-pink-400",
    bg: "bg-pink-500",
    border: "border-l-4 border-pink-500",
    icon: "📸"
  },
  videography: {
    text: "text-purple-400",
    bg: "bg-purple-500",
    border: "border-l-4 border-purple-500",
    icon: "🎥"
  },
  design: {
    text: "text-fuchsia-400",
    bg: "bg-fuchsia-500",
    border: "border-l-4 border-fuchsia-500",
    icon: "🎨"
  },
  leadership: {
    text: "text-rose-400",
    bg: "bg-rose-500",
    border: "border-l-4 border-rose-500",
    icon: "👑"
  }
};

export const CreativeSkills = () => {
  const [activeCategory, setActiveCategory] = useState('photography');
  const [animatedSkills, setAnimatedSkills] = useState<string[]>([]);
  const skillsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(skillsRef, { once: false, amount: 0.3 });
  
  // Handle category change and trigger animations
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setAnimatedSkills([]);
    
    // Delay animation of skills to create a staggered effect
    const skills = skillsData[category as keyof typeof skillsData];
    skills.forEach((skill, index) => {
      setTimeout(() => {
        setAnimatedSkills(prev => [...prev, skill.name]);
      }, 100 * index);
    });
  };
  
  // Initialize animations when the component comes into view
  useEffect(() => {
    if (isInView) {
      handleCategoryChange(activeCategory);
    }
  }, [isInView]);
  
  // Function to get the appropriate color scheme based on active category
  const getColorScheme = () => categoryColors[activeCategory as keyof typeof categoryColors];

  // Function to render a skill chip
  const renderSkillChip = (name: string, icon: string, delay: number, isVisible: boolean) => (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={`inline-flex items-center rounded-full px-3 py-1.5 m-1
        ${getColorScheme().bg}/10 ${getColorScheme().text}`}
    >
      <span className="mr-2">{icon}</span>
      {name}
    </motion.div>
  );
  
  return (
    <section id="skills" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
            Creative Skills
          </h2>
          <p className="text-white/70">
            My creative toolkit spans visual storytelling, design, and leadership,
            allowing me to bring ideas to life across multiple mediums.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {/* Category Navigation */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {Object.keys(skillsData).map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2
                  ${activeCategory === category 
                    ? `${categoryColors[category as keyof typeof categoryColors].bg}/20 ${categoryColors[category as keyof typeof categoryColors].text}` 
                    : 'bg-white/5 text-white/60 hover:text-white/80'
                  }`}
              >
                <span>{categoryColors[category as keyof typeof categoryColors].icon}</span>
                <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
              </button>
            ))}
          </div>

          {/* Skills Display */}
          <div ref={skillsRef} className="flex flex-wrap justify-center mb-16">
            {skillsData[activeCategory as keyof typeof skillsData].map((skill, index) => 
              renderSkillChip(skill.name, skill.icon, index, animatedSkills.includes(skill.name))
            )}
          </div>

          {/* Creative Process Section */}
          <div className="mt-16">
            <h3 className="text-2xl font-bold mb-8 text-white text-center">My Creative Process</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/5 rounded-lg p-6 hover:bg-white/10 transition-all"
                >
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h4 className="text-lg font-medium text-white mb-2">{step.title}</h4>
                  <p className="text-white/70 text-sm">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 