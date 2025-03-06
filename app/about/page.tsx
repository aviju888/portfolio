import React from 'react';
import Image from 'next/image';
import { Button } from '../components/ui/Button';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-950">
      <section className="container max-w-2xl mx-auto px-6 py-24">
        {/* Header */}
        <h1 className="text-xl md:text-3xl font-medium mb-16 bg-gradient-to-r from-gray-100 to-[#7d12ff] bg-clip-text text-transparent text-center">
          About Me
        </h1>
        
        {/* Image - Centered */}
        <div className="flex flex-col items-center mb-16">
          <div className="w-32 md:w-36">
            <div className="aspect-square overflow-hidden rounded-full border border-white/10 hover:border-[#7d12ff] transition-colors duration-500 bg-zinc-900">
              <Image 
                src="/images/adriel.jpeg"
                alt="Photo of Adriel Vijuan"
                width={160}
                height={160}
                className="object-cover hover:scale-105 transition-transform duration-500"
                priority
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div className="space-y-4 text-sm leading-relaxed">
            <p className="text-white/80 pl-8">
              Hi, I&apos;m Adriel! I am currently a 4th-year at UC Berkeley majoring in Electrical Engineering and Computer Sciences with a minor in Data Science. My passions lie at the intersection of artificial intelligence, software design, and creativity. I enjoy leveraging technology to solve real-world problems while adding a touch of innovation and artistry to my work.
            </p>
            <p className="text-white/80 pl-8">
              Over the years, I&apos;ve done work in AI/ML, front-end development, and computational photography. Whether I&apos;m fine-tuning a diffusion model, leading a team, or capturing moments through photography, I&apos;m constantly seeking to blend logic with creativity.
            </p>
            <p className="text-white/80 pl-8">
              Above all, I find myself to be a person with a true passion for learning. You&apos;ll likely find me teaching myself new skills, capturing moments through my camera, leading dance teams, or actively seeking ways to grow and connect with the community around me.
            </p>
          </div>
          
          {/* Education Section */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <h2 className="text-xl font-semibold mb-6 text-white">Education</h2>
            <div className="bg-white/[0.03] p-6 rounded-lg border border-white/5">
              <div className="flex items-center justify-between mb-2">
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
          
          {/* Contact Button */}
          <div className="flex justify-center pt-8">
            <Button 
              href="mailto:avijuan@berkeley.edu"
              variant="creative-primary"
              className="text-sm"
              icon={<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>}
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 