'use client';

import React, { useState } from 'react';
import Image from 'next/image';

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
      'Event Coverage: Documented performances, competitions, and special events across the Bay Area dance community'
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
    icon: '/icons/berkeley-lab.png'
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
    icon: '/icons/berkeley-lab.png'
  },
];

export default function ExperiencePage() {
  const [activeFilter, setActiveFilter] = useState<string>('all');

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

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-950">
      <div className="container max-w-5xl mx-auto px-6 py-24">
        {/* Header Section */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-100 to-[#7d12ff] bg-clip-text text-transparent">
            Experience
          </h1>
          <p className="text-lg text-white/80 max-w-3xl">
            A collection of my professional experience across software, research, creative direction, and leadership roles.
          </p>
        </div>

        {/* Education Section (Moved from About page) */}
        <div className="mb-16 pb-6 border-b border-white/10">
          <h2 className="text-2xl font-semibold mb-6 text-white">Education</h2>
          <div className="bg-white/[0.03] p-6 rounded-lg border border-white/5">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
              <h3 className="text-lg font-medium text-white">University of California, Berkeley</h3>
              <span className="text-white/60 text-sm">2021 - 2025</span>
            </div>
            <p className="text-white/80 mb-2">B.S. Electrical Engineering and Computer Sciences</p>
            <p className="text-white/80 mb-4">Minor in Data Science</p>
            
            <h4 className="text-sm font-medium text-white/70 mb-2">Relevant Coursework:</h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-white/70">
              <li className="flex items-center">
                <span className="mr-2 text-white/40">•</span>
                <span>CS 61A/B/C: Structure and Interpretation of Computer Programs</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-white/40">•</span>
                <span>CS 70: Discrete Mathematics and Probability Theory</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-white/40">•</span>
                <span>CS 170: Efficient Algorithms and Intractable Problems</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-white/40">•</span>
                <span>CS 188: Introduction to Artificial Intelligence</span>
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-white/40">•</span>
                <span>DATA 100: Principles and Techniques of Data Science</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          <div className="bg-white/[0.03] rounded-lg p-5 border border-white/[0.05]">
            <div className="text-2xl font-bold text-[#7d12ff] mb-1">5+ Years</div>
            <div className="text-white/60 text-sm">Working with Code & Design</div>
          </div>
          <div className="bg-white/[0.03] rounded-lg p-5 border border-white/[0.05]">
            <div className="text-2xl font-bold text-[#7d12ff] mb-1">50+ Projects</div>
            <div className="text-white/60 text-sm">Across Creative & Technical Domains</div>
          </div>
          <div className="bg-white/[0.03] rounded-lg p-5 border border-white/[0.05]">
            <div className="text-2xl font-bold text-[#7d12ff] mb-1">200+ People</div>
            <div className="text-white/60 text-sm">Leadership & Client-Work</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-10">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-1.5 rounded-full text-sm transition-all
              ${activeFilter === 'all' 
                ? 'bg-[#7d12ff] text-white' 
                : 'bg-white/[0.03] text-white/60 hover:bg-white/[0.06]'}`}
          >
            All Experiences
          </button>
          {Object.keys(experienceTypes).map(type => (
            <button
              key={type}
              onClick={() => setActiveFilter(type)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all
                ${activeFilter === type 
                  ? 'bg-[#7d12ff] text-white' 
                  : 'bg-white/[0.03] text-white/60 hover:bg-white/[0.06]'}`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative border-l border-gray-800 pl-6 ml-4">
          {filteredExperiences.map((exp, index) => (
            <div key={index} className="mb-10 relative">
              {/* Timeline dot */}
              <div className="absolute -left-[5px] top-2 w-2.5 h-2.5 bg-gradient-to-r from-gray-100 to-[#7d12ff] rounded-full" />
              
              {/* Experience card */}
              <div className="group bg-white/[0.03] hover:bg-white/[0.06] rounded-lg p-6 transition-all duration-300
                border border-white/[0.05] hover:border-white/[0.1]">
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
                      <h3 className="text-xl font-semibold text-white">{exp.company}</h3>
                      <div className="text-white/80 text-sm">{exp.role}</div>
                    </div>
                  </div>
                  <div className="md:text-right">
                    <div className="text-white/60 text-sm">{exp.location}</div>
                    <div className="text-white/50 text-xs">{exp.date}</div>
                  </div>
                </div>
                
                {/* Key Achievements */}
                <ul className="space-y-2 mb-4">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-2 text-white/80 text-sm">
                      <span className="w-1 h-1 rounded-full bg-[#7d12ff] mt-2 flex-shrink-0" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Skills */}
                {exp.skills && (
                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/[0.05]">
                    {exp.skills.map((skill, i) => (
                      <span 
                        key={i}
                        className="px-2 py-0.5 text-xs bg-[#7d12ff]/10 text-[#7d12ff]/90 rounded-full
                          border border-[#7d12ff]/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 