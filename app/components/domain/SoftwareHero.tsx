'use client';

import React from 'react';

export const SoftwareHero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_0%,transparent_100%)]" />
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          {/* Main Title */}
          <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8">
            <div className="text-white/90">Software</div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-transparent bg-clip-text">
              Engineering
            </div>
          </h1>
          
          {/* Description */}
          <p className="text-xl md:text-2xl text-white/70 leading-relaxed mb-12">
            AI/ML, computer vision, web development, and systems.
          </p>

          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">🤖</span>
              <span className="text-white/80">AI/ML</span>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">👁️</span>
              <span className="text-white/80">Computer Vision</span>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">🌐</span>
              <span className="text-white/80">Web Development</span>
            </div>
            <div className="bg-white/5 rounded-xl p-4 flex items-center gap-3">
              <span className="text-2xl">⚙️</span>
              <span className="text-white/80">Systems</span>
            </div>
          </div>

          {/* Languages & Tools */}
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-medium text-white/60 mb-4">Languages</h3>
              <div className="flex flex-wrap gap-3">
                {['Python', 'TypeScript', 'JavaScript', 'C'].map((lang) => (
                  <span key={lang} className="px-4 py-2 bg-blue-500/10 text-blue-400/90 rounded-lg border border-blue-500/20">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white/60 mb-4">Frameworks & Libraries</h3>
              <div className="flex flex-wrap gap-3">
                {['PyTorch', 'React', 'Next.js', 'OpenCV', 'Pandas'].map((framework) => (
                  <span key={framework} className="px-4 py-2 bg-blue-500/10 text-blue-400/90 rounded-lg border border-blue-500/20">
                    {framework}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-white/60 mb-4">Tools & Technologies</h3>
              <div className="flex flex-wrap gap-3">
                {['Docker', 'Git', 'Tailwind CSS', 'Jupyter'].map((tool) => (
                  <span key={tool} className="px-4 py-2 bg-blue-500/10 text-blue-400/90 rounded-lg border border-blue-500/20">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/40 text-sm animate-bounce">
        Scroll to explore
      </div>
    </section>
  );
}; 