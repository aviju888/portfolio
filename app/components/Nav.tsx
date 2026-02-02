'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisitorMode } from '../context/VisitorModeContext';
import { getModeConfig } from '@/lib/visitorModeConfig';

export default function Nav() {
  const pathname = usePathname();
  const [isTransparent, setIsTransparent] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { mode, isHydrated } = useVisitorMode();

  // Get nav items based on current mode
  const config = getModeConfig(mode);
  const navItems = config.navItems;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // Show white background as soon as we scroll down from the top
      setIsTransparent(currentScrollY === 0);
    };

    // Check initial state on mount
    handleScroll();
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <motion.nav 
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent ? 'bg-transparent' : 'bg-white/80 supports-[backdrop-filter]:bg-white/70 backdrop-blur-md'} ${!isTransparent ? 'shadow-lg shadow-black/10' : ''}`}
      style={!isTransparent ? {
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        boxShadow: '0 1px 0 0 rgba(0, 0, 0, 0.05), 0 4px 16px 0 rgba(0, 0, 0, 0.1)'
      } : {}}
    >
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-gray-900 text-h3 font-semibold hover:text-gray-700 transition-colors duration-200">
                  AV
                </Link>
              </div>
              
              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-6 md:space-x-8">
                {navItems.map((item) => {
                  const isExternal = item.external || item.path.startsWith('http');
                  // Check if pathname matches exactly or starts with the item path (for nested routes)
                  const isActive = !isExternal && (pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path)));

                  if (isExternal) {
                    return (
                      <a
                        key={item.name}
                        href={item.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative text-small font-medium transition-colors duration-200 text-gray-600 hover:text-gray-900"
                      >
                        {item.name}
                      </a>
                    );
                  }

                  return (
                    <Link
                      key={item.name}
                      href={item.path}
                      className={`relative text-small font-medium transition-colors duration-200 group ${
                        isActive
                          ? 'text-gray-900'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {item.name}
                      <motion.span
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[1px] bg-gray-900 rounded-full"
                        initial={{ width: 0, opacity: 0 }}
                        animate={{
                          width: isActive ? 20 : 0,
                          opacity: isActive ? 1 : 0
                        }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      />
                    </Link>
                  );
                })}
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 border border-gray-200 text-gray-900 hover:bg-gray-200 transition-colors pl-0 pr-0 pt-0 mt-[10px] mb-[10px]"
                aria-label="Toggle mobile menu"
              >
                <svg
                  className={`w-5 h-5 transition-transform duration-200 ${isMobileMenuOpen ? 'rotate-90' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="md:hidden border-t border-gray-200 bg-white/90 backdrop-blur-md"
                >
                  <div className="py-3 md:py-4 space-y-2">
                    {navItems.map((item) => {
                      const isExternal = item.external || item.path.startsWith('http');
                      // Check if pathname matches exactly or starts with the item path (for nested routes)
                      const isActive = !isExternal && (pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path)));

                      if (isExternal) {
                        return (
                          <a
                            key={item.name}
                            href={item.path}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                          >
                            {item.name}
                          </a>
                        );
                      }

                      return (
                        <Link
                          key={item.name}
                          href={item.path}
                          className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                            isActive
                              ? 'text-gray-900 bg-gray-100'
                              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                          }`}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.nav>
  );
}
