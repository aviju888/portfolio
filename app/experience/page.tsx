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
    <div className="min-h-screen pt-32 pb-16">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-100 to-[#7d12ff] bg-clip-text text-transparent">
            Experience
          </h1>
          <p className="text-xl text-white/80 max-w-3xl">
            software, research, creative direction, and leadership roles.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/[0.03] rounded-xl p-6 border border-white/[0.05]">
            <div className="text-3xl font-bold text-[#7d12ff] mb-2">5+ Years</div>
            <div className="text-white/60">Working with Code & Design</div>
          </div>
          <div className="bg-white/[0.03] rounded-xl p-6 border border-white/[0.05]">
            <div className="text-3xl font-bold text-[#7d12ff] mb-2">50+ Projects</div>
            <div className="text-white/60">Across Creative & Technical Domains</div>
          </div>
          <div className="bg-white/[0.03] rounded-xl p-6 border border-white/[0.05]">
            <div className="text-3xl font-bold text-[#7d12ff] mb-2">200+ People</div>
            <div className="text-white/60">Leadership & Client-Work</div>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-4 mb-12">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-2 rounded-full transition-all
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
              className={`px-4 py-2 rounded-full transition-all
                ${activeFilter === type 
                  ? 'bg-[#7d12ff] text-white' 
                  : 'bg-white/[0.03] text-white/60 hover:bg-white/[0.06]'}`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative border-l-2 border-gray-800 pl-8 ml-6">
          {filteredExperiences.map((exp, index) => (
            <div key={index} className="mb-12 relative">
              {/* Timeline dot */}
              <div className="absolute -left-[41px] top-2 w-3 h-3 bg-gradient-to-r from-gray-100 to-[#7d12ff] rounded-full" />
              
              {/* Experience card */}
              <div className="group bg-white/[0.03] hover:bg-white/[0.06] rounded-xl p-8 transition-all duration-500
                border border-white/[0.05] hover:border-white/[0.1]">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {exp.icon && (
                      <Image 
                        src={exp.icon} 
                        alt={`${exp.company} logo`} 
                        width={40} 
                        height={40} 
                        className="opacity-90"
                      />
                    )}
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{exp.company}</h3>
                      <div className="text-lg text-white/80">{exp.role}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/60">{exp.location}</div>
                    <div className="text-white/40 text-sm">{exp.date}</div>
                  </div>
                </div>
                
                {/* Key Achievements */}
                <ul className="space-y-3 mb-6">
                  {exp.description.map((desc, i) => (
                    <li key={i} className="flex items-start gap-3 text-white/80">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#7d12ff] mt-2 flex-shrink-0" />
                      <span>{desc}</span>
                    </li>
                  ))}
                </ul>
                
                {/* Skills */}
                {exp.skills && (
                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.05]">
                    {exp.skills.map((skill, i) => (
                      <span 
                        key={i}
                        className="px-3 py-1 text-sm bg-[#7d12ff]/10 text-[#7d12ff]/90 rounded-full
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