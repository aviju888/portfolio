'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DomainSwitcher } from './DomainSwitcher';
import { useDomain } from './DomainProvider';
import { usePathname } from 'next/navigation';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { activeDomain } = useDomain();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link 
      href={href}
      onClick={() => setIsMobileMenuOpen(false)}
      className="text-white/80 hover:text-white transition-all duration-300 font-medium hover:scale-105"
    >
      {children}
    </Link>
  );

  return (
    <>
      <header className="floating-navbar">
        <div className="flex items-center justify-between h-16 gap-8">
          {/* Logo */}
          <Link 
            href="/"
            className="group flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300 hover:scale-105"
          >
            <span className="text-xl font-bold text-white group-hover:text-white/90 transition-colors">
              AV
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <NavLink href="/experience">Experience</NavLink>
            <NavLink href="/about">About</NavLink>
            {!isHomePage && (
              <DomainSwitcher 
                activeDomain={activeDomain}
                className="flex"
                onDomainSelect={() => setIsMobileMenuOpen(false)}
              />
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden group p-3 rounded-2xl bg-white/10 border border-white/20 hover:border-white/40 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center gap-1">
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
              <span className={`w-full h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 md:hidden">
          <div className="flex flex-col justify-center items-start h-full px-8 pt-24 pb-8">
            <nav className="flex flex-col gap-8 text-2xl w-full">
              <NavLink href="/experience">Experience</NavLink>
              <NavLink href="/about">About</NavLink>
              {!isHomePage && (
                <div className="mt-16 w-full">
                  <DomainSwitcher 
                    activeDomain={activeDomain}
                    className="flex-col gap-4 w-full"
                    onDomainSelect={() => setIsMobileMenuOpen(false)}
                  />
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}; 