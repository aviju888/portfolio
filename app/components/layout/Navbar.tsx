'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 right-0 w-full z-[1000] px-8 py-4 flex items-center justify-end transition-all duration-300 ${
      isScrolled ? 'bg-black/95 shadow-lg' : ''
    }`}>
      <div className={`flex gap-8 transition-all duration-300 ${
        isMenuOpen ? 'flex-col absolute top-[60px] right-8 bg-black/95 p-4 border border-gray-800 rounded-lg' : ''
      }`} id="nav-links">
        <Link href="/" className="text-white hover:text-[#7d12ff] transition-colors">
          Home
        </Link>
        <Link href="/projects" className="text-white hover:text-[#7d12ff] transition-colors">
          Projects
        </Link>
        <Link href="/about" className="text-white hover:text-[#7d12ff] transition-colors">
          About
        </Link>
      </div>
      <button 
        className="text-2xl text-white cursor-pointer md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        ☰
      </button>
    </nav>
  );
}; 