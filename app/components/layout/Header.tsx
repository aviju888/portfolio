'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DomainSwitcher } from './DomainSwitcher';
import { useDomain } from './DomainProvider';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLinksOpen, setIsLinksOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { activeDomain } = useDomain();
  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const dropdownRef = React.useRef<HTMLDivElement>(null);

  const links = [
    {
      name: 'Resume',
      href: '/resume.pdf',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14,2 14,8 20,8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10,9 9,9 8,9" />
        </svg>
      )
    },
    {
      name: 'GitHub',
      href: 'https://github.com/aviju888',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/adriel-vijuan',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    {
      name: 'Email',
      href: 'mailto:avijuan@berkeley.edu',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      )
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);

    // Only animate fade-in on homepage
    if (isHomePage) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2500);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsLinksOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link 
      href={href}
      onClick={() => setIsMobileMenuOpen(false)}
      className="group relative text-white/80 hover:text-white transition-all duration-300 font-medium"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/60 transition-all duration-300 group-hover:w-full"></span>
    </Link>
  );

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ 
          duration: isHomePage ? 0.8 : 0.3,
          delay: isHomePage ? 2.5 : 0,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${isScrolled 
            ? 'bg-white/5 backdrop-blur-2xl border border-white/15 shadow-xl mx-6 mt-6 rounded-2xl' 
            : 'bg-transparent'
          }`}
        style={{
          transform: isScrolled ? 'translateY(0)' : 'translateY(0)',
          boxShadow: isScrolled ? '0 20px 40px -12px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1)' : 'none'
        }}
      >
        <div className="container mx-auto px-6">
          <div className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'h-14' : 'h-20'
          }`}>
            {/* Modern Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <Link 
                href="/"
                className={`group relative inline-flex items-center justify-center rounded-2xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm ${
                  isScrolled ? 'w-10 h-10' : 'w-12 h-12'
                }`}
              >
                <span className={`font-bold bg-gradient-to-r from-white to-white/90 bg-clip-text text-transparent group-hover:from-white group-hover:to-white transition-all duration-300 ${
                  isScrolled ? 'text-lg' : 'text-xl'
                }`}>
                  AV
                </span>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className={`hidden md:flex items-center transition-all duration-500 ${
              isScrolled ? 'gap-6' : 'gap-8'
            }`}>
              <NavLink href="/experience">Experience</NavLink>
              <NavLink href="/about">About</NavLink>
              
              {/* Modern Links Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsLinksOpen(!isLinksOpen)}
                  className="group relative text-white/80 hover:text-white transition-all duration-300 font-medium flex items-center gap-2"
                >
                  <span>Links</span>
                  <motion.svg 
                    className="w-4 h-4 transition-transform duration-300"
                    animate={{ rotate: isLinksOpen ? 180 : 0 }}
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </motion.svg>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white/50 transition-all duration-300 group-hover:w-full"></span>
                </button>
                
                <AnimatePresence>
                  {isLinksOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="absolute right-0 mt-3 w-64 bg-white/5 backdrop-blur-2xl rounded-2xl border border-white/15 overflow-hidden shadow-xl"
                    >
                      <div className="p-2">
                        {links.map((link, index) => (
                          <motion.a
                            key={index}
                            href={link.href}
                            target={link.href.startsWith('http') ? '_blank' : undefined}
                            rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                            className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all duration-300 group"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ x: 5 }}
                          >
                            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-white/70 group-hover:text-white group-hover:bg-white/20 transition-all duration-300">
                              {link.icon}
                            </div>
                            <span className="text-white/80 group-hover:text-white font-medium transition-colors duration-300">
                              {link.name}
                            </span>
                          </motion.a>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {!isHomePage && (
                <DomainSwitcher 
                  activeDomain={activeDomain}
                  className="flex"
                  onDomainSelect={() => setIsMobileMenuOpen(false)}
                />
              )}
            </nav>

            {/* Modern Mobile Menu Button */}
            <motion.button
              className={`md:hidden relative z-50 p-3 rounded-xl bg-white/10 border border-white/20 hover:bg-white/20 transition-all duration-300 backdrop-blur-sm ${
                isScrolled ? 'p-2' : 'p-3'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                animate={isMobileMenuOpen ? "open" : "closed"}
                className="flex flex-col gap-1"
              >
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: 45, y: 6 }
                  }}
                  className="w-5 h-0.5 bg-white rounded-full"
                />
                <motion.span
                  variants={{
                    closed: { opacity: 1 },
                    open: { opacity: 0 }
                  }}
                  className="w-5 h-0.5 bg-white rounded-full"
                />
                <motion.span
                  variants={{
                    closed: { rotate: 0, y: 0 },
                    open: { rotate: -45, y: -6 }
                  }}
                  className="w-5 h-0.5 bg-white rounded-full"
                />
              </motion.div>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Modern Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 md:hidden"
          >
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="flex flex-col justify-center items-start h-full px-8 pt-20 pb-8"
            >
              <nav className="flex flex-col gap-6 text-2xl w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <NavLink href="/experience">Experience</NavLink>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <NavLink href="/about">About</NavLink>
                </motion.div>
                
                <motion.div 
                  className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-4"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                />
                
                {/* Quick Links */}
                {links.map((link, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <a
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center gap-4 text-white/70 hover:text-white transition-all duration-300 group"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/60 group-hover:text-white group-hover:bg-white/10 transition-all duration-300">
                        {link.icon}
                      </div>
                      <span className="text-xl font-medium">{link.name}</span>
                    </a>
                  </motion.div>
                ))}
              </nav>

              {!isHomePage && (
                <motion.div 
                  className="mt-12 w-full"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <DomainSwitcher 
                    activeDomain={activeDomain}
                    className="flex-col gap-4 w-full"
                    onDomainSelect={() => setIsMobileMenuOpen(false)}
                  />
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}; 