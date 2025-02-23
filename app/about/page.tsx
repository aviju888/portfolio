import React from 'react';
import Image from 'next/image';
import { Button } from '../components/ui/Button';

export default function About() {
  return (
    <div className="min-h-screen">
      <section className="container mx-auto px-6 pt-32 pb-16">
        {/* Header */}
        <h1 className="text-3xl md:text-5xl font-bold mb-16 bg-gradient-to-r from-gray-100 to-[#7d12ff] bg-clip-text text-transparent">
          About Me
        </h1>
        
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-start">
          {/* Image Column */}
          <div className="md:col-span-5 lg:col-span-4">
            <div className="sticky top-32">
              <div className="aspect-square overflow-hidden rounded-2xl border-2 border-white/10 hover:border-[#7d12ff] transition-colors duration-500">
                <Image 
                  src="/images/adriel.jpeg"
                  alt="Photo of Adriel Vijuan"
                  width={500}
                  height={500}
                  className="object-cover hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
              
              {/* Contact Buttons - Mobile Only */}
              <div className="flex flex-col gap-3 mt-6 md:hidden">
                <Button 
                  href="mailto:avijuan@berkeley.edu"
                  variant="solid"
                  className="w-full"
                >
                  Get in Touch ↗
                </Button>
                <Button 
                  href="https://github.com/aviju888" 
                  target="_blank"
                  variant="ghost"
                  className="w-full"
                >
                  View My GitHub ↗
                </Button>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div className="md:col-span-7 lg:col-span-8">
            <div className="space-y-8 text-lg leading-relaxed">
              <p className="text-white/90">
                Hi! I'm Adriel Vijuan, a senior at UC Berkeley majoring in Electrical Engineering and Computer Sciences with a minor in Data Science. My passions lie at the intersection of artificial intelligence, software design, and creativity. I enjoy leveraging technology to solve real-world problems while adding a touch of innovation and artistry to my work.
              </p>
              <p className="text-white/90">
                Over the years, I've done work in AI/ML, front-end development, and computational photography. Whether I'm fine-tuning a diffusion model, leading a team, or capturing moments through photography, I'm constantly seeking to blend logic with creativity.
              </p>
              <p className="text-white/90">
                Above all, I truly just have a passion for learning. You'll likely find me deep diving into random GitHub repos, capturing moments through my camera, leading dance teams, or actively seeking ways to grow and connect with the community around me.
              </p>
              
              {/* Contact Buttons - Desktop Only */}
              <div className="hidden md:flex gap-4 pt-8">
                <Button 
                  href="mailto:avijuan@berkeley.edu"
                  variant="solid"
                >
                  Get in Touch ↗
                </Button>
                <Button 
                  href="https://github.com/aviju888" 
                  target="_blank"
                  variant="ghost"
                >
                  View My GitHub ↗
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 