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
    company: 'Tech Company XYZ',
    role: 'Software Engineering Intern',
    date: 'May 2023 - August 2023',
    location: 'San Francisco, CA',
    description: [
      'Developed and maintained features for a React-based web application used by over 100,000 users',
      'Implemented data visualization components using D3.js, increasing user engagement by 40%',
      'Collaborated with a team of 5 engineers to redesign the authentication system',
      'Optimized database queries, reducing load times by 30%'
    ],
    skills: ['React', 'TypeScript', 'D3.js', 'SQL', 'Git'],
    icon: '/icons/tech-company.png'
  },
  {
    company: 'AI Research Lab',
    role: 'Research Assistant',
    date: 'January 2022 - December 2022',
    location: 'Berkeley, CA',
    description: [
      'Assisted in developing novel computer vision algorithms for object detection',
      'Implemented and trained neural networks using PyTorch on large datasets',
      'Co-authored a research paper accepted at a major conference',
      'Built data processing pipelines that improved training efficiency by 25%'
    ],
    skills: ['Python', 'PyTorch', 'Computer Vision', 'Machine Learning', 'Research'],
    icon: '/icons/ai-lab.png'
  },
  {
    company: 'Student Design Collective',
    role: 'Lead Designer',
    date: 'August 2021 - May 2022',
    location: 'Berkeley, CA',
    description: [
      'Led a team of 10 student designers creating marketing materials for campus organizations',
      'Managed client relationships and project timelines for 15+ simultaneous projects',
      'Designed brand identities and visual systems for student startups and clubs',
      'Organized workshops to teach design principles and software to new members'
    ],
    skills: ['Leadership', 'Adobe Creative Suite', 'Graphic Design', 'Project Management', 'Mentorship'],
    icon: '/icons/design-collective.png'
  },
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
    <section id="experience" className="py-24 bg-black">
      <div className="container mx-auto px-6">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Work Experience</h2>
          <p className="text-white/60 max-w-2xl">
            My professional journey spans software development, research, and creative direction, 
            with a focus on building innovative solutions and leading teams.
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2"></div>

          {/* Experience items */}
          <div className="space-y-12">
            {experiences.map((exp, index) => (
              <div 
                key={`${exp.company}-${exp.role}`}
                className={`relative flex flex-col md:flex-row ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-5 h-5 rounded-full border-4 border-white/10 bg-black transform -translate-x-1/2"></div>

                {/* Content */}
                <div className="md:w-1/2 pl-8 md:pl-0 md:px-8">
                  <div className="bg-white/[0.03] p-6 rounded-lg border border-white/5 hover:border-white/10 transition-all">
                    <div className="flex items-center mb-4">
                      {exp.icon && (
                        <div className="w-10 h-10 mr-4 rounded-full overflow-hidden bg-white/5 flex items-center justify-center">
                          <Image 
                            src={exp.icon} 
                            alt={`${exp.company} logo`} 
                            width={32} 
                            height={32}
                            className="object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <h3 className="text-xl font-semibold text-white">{exp.company}</h3>
                        <p className="text-white/70 text-sm">{exp.role}</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4 text-sm">
                      <span className="text-white/60">{exp.date}</span>
                      <span className="text-white/60">{exp.location}</span>
                    </div>
                    
                    <ul className="space-y-2 mb-4 text-sm text-white/80">
                      {exp.description.map((item, i) => (
                        <li key={i} className="flex">
                          <span className="mr-2 text-white/40">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    
                    {exp.skills && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.skills.map(skill => (
                          <span 
                            key={skill} 
                            className="px-2 py-1 text-xs rounded-full bg-white/5 text-white/70"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}; 