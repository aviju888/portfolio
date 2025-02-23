import React from 'react';
import Image from 'next/image';
import { Button } from '../components/ui/Button';

export default function About() {
  return (
    <section className="container mx-auto px-6 py-24">
      <h2 className="text-4xl font-medium mb-16">About Me</h2>
      
      <div className="flex flex-col md:flex-row gap-16 items-start max-w-6xl">
        <div className="w-full md:w-1/3">
          <div className="aspect-square overflow-hidden rounded-full border border-white/30 hover:border-[#7d12ff] transition-colors duration-300">
            <Image 
              src="/images/adriel.jpeg"
              alt="Photo of Adriel Vijuan"
              width={400}
              height={400}
              className="object-cover hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
        
        <div className="w-full md:w-2/3 space-y-8 text-justify text-lg leading-relaxed text-white/90">
          <p>
            Hi! I'm Adriel Vijuan, a senior at UC Berkeley majoring in Electrical Engineering and Computer Sciences with a minor in Data Science. My passions lie at the intersection of artificial intelligence, software design, and creativity. I enjoy leveraging technology to solve real-world problems while adding a touch of innovation and artistry to my work.
          </p>
          <p>
            Over the years, I've done work in AI/ML, front-end development, and computational photography. Whether I'm fine-tuning a diffusion model, leading a team, or capturing moments through photography, I'm constantly seeking to blend logic with creativity.
          </p>
          <p>
            Above all, I truly just have a passion for learning. You'll likely find me deep diving into random GitHub repos, capturing moments through my camera, leading dance teams, or actively seeking ways to grow and connect with the community around me.
          </p>
          
          <div className="flex flex-wrap gap-4 pt-8">
            <Button 
              href="mailto:avijuan@berkeley.edu"
              className="hover:bg-white/5"
            >
              Get in Touch ↗
            </Button>
            <Button 
              href="https://github.com/aviju888" 
              target="_blank"
              className="hover:bg-white/5"
            >
              View My GitHub ↗
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 