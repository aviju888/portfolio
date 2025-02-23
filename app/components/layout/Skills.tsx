'use client';

import React from 'react';
import Image from 'next/image';

interface Skill {
  name: string;
  icon: string;
}

const skills: Skill[] = [
  { name: 'Python', icon: '/icons/python.svg' },
  { name: 'JavaScript', icon: '/icons/javascript.svg' },
  { name: 'TypeScript', icon: '/icons/typescript.svg' },
  { name: 'C', icon: '/icons/c.png' },
  { name: 'PyTorch', icon: '/icons/pytorch.svg' },
  { name: 'OpenCV', icon: '/icons/opencv.svg' },
  { name: 'HTML', icon: '/icons/html.svg' },
  { name: 'CSS', icon: '/icons/css.svg' },
  { name: 'React', icon: '/icons/react.png' },
  { name: 'Docker', icon: '/icons/docker.png' },
  { name: 'Pandas', icon: '/icons/pandas.svg' },
  { name: 'Tailwind', icon: '/icons/tailwind-css.svg' },
];

export const Skills = () => {
  return (
    <section className="container mx-auto px-6 py-16">
      <h2 className="text-4xl font-medium mb-16">Languages, Frameworks, & Tools</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {skills.map((skill, index) => (
          <div 
            key={index}
            className="flex flex-col items-center group"
          >
            <div className="relative w-10 h-10 mb-2">
              <Image
                src={skill.icon}
                alt={`${skill.name} icon`}
                fill
                className="object-contain invert hover:scale-110 transition-transform"
              />
            </div>
            <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}; 