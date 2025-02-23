'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DomainSwitcher } from './DomainSwitcher';
import { useDomain } from './DomainProvider';
import { Button } from '../ui/Button';
import { usePathname } from 'next/navigation';

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
      href: '/resume.pdf'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/aviju888'
    },
    {
      name: 'LinkedIn',
      href: 'https://linkedin.com/in/adriel-vijuan'
    },
    {
      name: 'Email',
      href: 'mailto:avijuan@berkeley.edu'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
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
      className="text-white/70 hover:text-white transition-all duration-300"
    >
      {children}
    </Link>
  );

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled ? 'bg-black/80 backdrop-blur-lg' : 'bg-transparent'}
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'}
          ${!isHomePage ? 'duration-[0ms]' : 'duration-[3500ms]'}`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Button 
              href="/"
              variant="ghost"
              className="text-2xl font-medium relative z-50"
            >
              AV
            </Button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <NavLink href="/experience">Experience</NavLink>
              <NavLink href="/about">About</NavLink>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsLinksOpen(!isLinksOpen)}
                  className="text-white/70 hover:text-white transition-all duration-300"
                >
                  Links
                </button>
                {/* Links Dropdown */}
                <div className={`absolute right-0 mt-2 w-64 bg-black/90 backdrop-blur-lg rounded-xl 
                  border border-white/10 overflow-hidden shadow-xl transition-all duration-300
                  ${isLinksOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                  {links.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      target={link.href.startsWith('http') ? '_blank' : undefined}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="flex items-center p-4 hover:bg-white/5 transition-colors group"
                    >
                      <span className="text-white/80 group-hover:text-white">
                        {link.name}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
              {!isHomePage && (
                <DomainSwitcher 
                  activeDomain={activeDomain}
                  className="flex"
                />
              )}
            </nav>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden relative z-50 p-2 text-2xl"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? '×' : '☰'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black z-40 transition-all duration-500 md:hidden
          ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
      >
        <div className="flex flex-col justify-center items-start h-full px-8 pt-20 pb-8">
          <nav className="flex flex-col gap-8 text-2xl">
            <NavLink href="/experience">Experience</NavLink>
            <NavLink href="/about">About</NavLink>
            <div className="h-px w-full bg-white/10" /> {/* Divider */}
            {/* Quick Links */}
            {links.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-white/70 hover:text-white transition-all"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {!isHomePage && (
            <div className="mt-12">
              <DomainSwitcher 
                activeDomain={activeDomain}
                className="flex-col gap-4"
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
}; 