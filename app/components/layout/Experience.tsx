'use client';

import React from 'react';
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
      '30+ Video projects on YouTube and Instagram',
      'Managed and coordinated brand design; designed social media graphics and YouTube and Instagram content',
      'Conducted training workshops; trained members on videography techniques and Adobe Suite to enhance brand-building'
    ],
    skills: ['Leadership', 'Adobe Creative Suite', 'Graphic Design', 'Figma', 'Video Editing'],
    icon: '/icons/kosmos.png'
  },
  {
    company: 'Freelance Photography',
    role: 'Portrait & Client Based Photography',
    date: 'Jan 2022 - Present',
    location: 'Bay Area',
    description: [
      'Photographed dynamic portraits for 200+ individuals; including dance team and graduation shoots',
      'Managed shoot logistics; arranged studio lighting setups, edited/delivered polished images, ensured client satisfaction'
    ],
    skills: ['Photography', 'Adobe Lightroom', 'Adobe Photoshop', 'Artistic Vision'],
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
      'Developed a website parser tool; for a personalized in-browser chatbot assistant',
      'Created an evaluation framework; to test AI agent accuracy across different models'
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
      'Worked 1-on-1 under Milica Grahovac (LBNL Principal Scientific Engineering Associate)'
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
  }
];

export const Experience = () => {
  return (
    <section className="container mx-auto px-6 py-16" id="experience">
      <h2 className="text-4xl font-medium mb-16">Experience</h2>
      <div className="relative border-l-2 border-gray-800 pl-8 ml-6">
        {experiences.map((exp, index) => (
          <div key={index} className="mb-12 relative">
            <div className="absolute -left-[41px] top-2 w-3 h-3 bg-gradient-to-r from-gray-100 to-[#7d12ff] rounded-full" />
            
            <div className="flex items-center gap-3">
              {exp.icon && (
                <Image 
                  src={exp.icon} 
                  alt={`${exp.company} logo`} 
                  width={30} 
                  height={30} 
                  className="opacity-90"
                />
              )}
              <h3 className="text-xl font-bold text-white">{exp.company}</h3>
              <span className="text-gray-400 italic">{exp.role}</span>
            </div>
            
            <div className="text-sm text-gray-400 mt-1">
              {exp.location} | {exp.date}
            </div>
            
            <ul className="mt-4 space-y-2">
              {exp.description.map((desc, i) => (
                <li key={i} className="text-gray-300">{desc}</li>
              ))}
            </ul>
            
            {exp.skills && (
              <div className="flex flex-wrap gap-2 mt-4">
                {exp.skills.map((skill, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 text-sm bg-red-900/10 text-red-500 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}; 