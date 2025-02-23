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
              Hi, I'm Adriel! I am currently a 4th-year at UC Berkeley majoring in Electrical Engineering and Computer Sciences with a minor in Data Science. My passions lie at the intersection of artificial intelligence, software design, and creativity. I enjoy leveraging technology to solve real-world problems while adding a touch of innovation and artistry to my work.
            </p>
            <p className="text-white/80 pl-8">
              Over the years, I've done work in AI/ML, front-end development, and computational photography. Whether I'm fine-tuning a diffusion model, leading a team, or capturing moments through photography, I'm constantly seeking to blend logic with creativity.
            </p>
            <p className="text-white/80 pl-8">
              Above all, I find myself to be a person with a true passion for learning. You'll likely find me teaching myself new skills, capturing moments through my camera, leading dance teams, or actively seeking ways to grow and connect with the community around me.
            </p>
          </div>
          
          {/* Contact Button */}
          <div className="flex justify-center pt-4">
            <Button 
              href="mailto:avijuan@berkeley.edu"
              variant="solid"
              className="text-sm"
            >
              Get in Touch ↗
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
} 