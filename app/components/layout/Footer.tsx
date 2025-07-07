'use client';

import React from 'react';
import Link from 'next/link';
import { useDomain } from './DomainProvider';
import { motion } from 'framer-motion';

export const Footer = () => {
  const { activeDomain } = useDomain();
  
  const getGradientByDomain = () => {
    switch (activeDomain) {
      case 'creative':
        return 'from-pink-500 to-purple-500';
      case 'software':
        return 'from-blue-500 to-cyan-500';
      case 'human':
        return 'from-gray-500 to-gray-700';
      default:
        return 'from-white/20 to-white/10';
    }
  };
  
  return (
    <footer className="relative bg-black border-t border-white/5 overflow-hidden">
      {/* Modern gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="py-16">
          {/* Main footer content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="mb-6">
                <Link 
                  href="/"
                  className="group inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/5 border border-white/15 hover:border-white/25 transition-all duration-300 backdrop-blur-sm"
                >
                  <span className="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300">
                    AV
                  </span>
                </Link>
              </div>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Exploring the intersection of creativity and technology through photography, 
                videography, and software development.
              </p>
            </motion.div>
            
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-white/50 to-white/20 rounded-full"></span>
                Contact
              </h3>
              <ul className="space-y-3 text-white/60">
                <li>
                  <a 
                    href="mailto:avijuan@berkeley.edu" 
                    className="group flex items-center gap-2 hover:text-white transition-all duration-300"
                  >
                    <div className="w-5 h-5 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <span className="text-sm">avijuan@berkeley.edu</span>
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-lg bg-white/5 flex items-center justify-center">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <span className="text-sm">Berkeley, CA</span>
                </li>
              </ul>
            </motion.div>
            
            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-white/50 to-white/20 rounded-full"></span>
                Quick Links
              </h3>
              <ul className="space-y-3 text-white/60">
                <li>
                  <Link 
                    href="/software" 
                    className="group flex items-center gap-2 hover:text-white transition-all duration-300"
                  >
                    <div className="w-5 h-5 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M8 9l3 3-3 3M16 9l-3 3 3 3M7 4h10c1.105 0 2 .895 2 2v12c0 1.105-.895 2-2 2H7c-1.105 0-2-.895-2-2V6c0-1.105.895-2 2-2z" />
                      </svg>
                    </div>
                    <span className="text-sm">Software</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/creative" 
                    className="group flex items-center gap-2 hover:text-white transition-all duration-300"
                  >
                    <div className="w-5 h-5 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                      </svg>
                    </div>
                    <span className="text-sm">Creative</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/about" 
                    className="group flex items-center gap-2 hover:text-white transition-all duration-300"
                  >
                    <div className="w-5 h-5 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all duration-300">
                      <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 4a4 4 0 100 8 4 4 0 000-8z" />
                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      </svg>
                    </div>
                    <span className="text-sm">About</span>
                  </Link>
                </li>
              </ul>
            </motion.div>
            
            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-6 text-white flex items-center gap-2">
                <span className="w-1 h-6 bg-gradient-to-b from-white/50 to-white/20 rounded-full"></span>
                Connect
              </h3>
              <div className="flex gap-3">
                <motion.a
                  href="https://github.com/aviju888"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 rounded-xl bg-white/5 border border-white/15 hover:border-white/25 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                  </svg>
                </motion.a>
                
                <motion.a
                  href="https://linkedin.com/in/adriel-vijuan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group w-10 h-10 rounded-xl bg-white/5 border border-white/15 hover:border-white/25 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </motion.a>
                
                <motion.a
                  href="mailto:avijuan@berkeley.edu"
                  className="group w-10 h-10 rounded-xl bg-white/5 border border-white/15 hover:border-white/25 flex items-center justify-center transition-all duration-300 backdrop-blur-sm"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5 text-white/60 group-hover:text-white transition-colors duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </motion.a>
              </div>
            </motion.div>
          </div>
          
          {/* Bottom section */}
          <motion.div 
            className="pt-8 border-t border-white/5"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-white/40 text-sm">
                © 2024 Adriel Vijuan. All rights reserved.
              </p>
              <p className="text-white/40 text-sm">
                Built with Next.js & Tailwind CSS
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}; 