import React from 'react';
import Image from 'next/image';
import { Button } from '../components/ui/Button';

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-950 flex flex-col justify-center">
      <section className="container max-w-2xl mx-auto px-6 py-8 md:py-10">
        {/* Header */}
        <h1 className="text-2xl md:text-4xl font-bold mb-8 md:mb-10 bg-gradient-to-r from-gray-100 to-[#7d12ff] bg-clip-text text-transparent text-center pt-12">
          About Me
        </h1>
        
        {/* Image - Centered */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-28 md:w-32">
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
        <div className="space-y-6">
          <div className="space-y-4 text-sm md:text-base leading-relaxed">
            <p className="text-white/90 pl-2 md:pl-4">
              Hi, I&apos;m Adriel! I am currently a 4th-year at UC Berkeley majoring in Electrical Engineering and Computer Sciences with a minor in Data Science. My passions lie at the intersection of artificial intelligence, software design, and creativity. I enjoy leveraging technology to solve real-world problems while adding a touch of innovation and artistry to my work.
            </p>
            <p className="text-white/90 pl-2 md:pl-4">
              Over the years, I&apos;ve done work in AI/ML, front-end development, and computational photography. Whether I&apos;m fine-tuning a diffusion model, leading a team, or capturing moments through photography, I&apos;m constantly seeking to blend logic with creativity.
            </p>
            <p className="text-white/90 pl-2 md:pl-4">
              Above all, I find myself to be a person with a true passion for learning. You&apos;ll likely find me teaching myself new skills, capturing moments through my camera, leading dance teams, or actively seeking ways to grow and connect with the community around me.
            </p>
          </div>
          
          {/* Contact Button */}
          <div className="flex justify-center pt-6">
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