'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisitorMode } from '../context/VisitorModeContext';
import { getModeConfig } from '@/lib/visitorModeConfig';
import { useTheme } from '../context/ThemeContext';

export default function Nav() {
  const pathname = usePathname();
  const [isTransparent, setIsTransparent] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { mode, isHydrated } = useVisitorMode();
  const { theme, toggleTheme } = useTheme();

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isTransparent ? 'bg-transparent' : 'bg-white dark:bg-gray-950'}`}
      style={{}}
    >
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link href="/" className="text-gray-900 dark:text-white text-h3 font-semibold hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200">
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
                        className="relative text-small font-medium transition-colors duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
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
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                      }`}
                    >
                      {item.name}
                      <motion.span
                        className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[1px] bg-gray-900 dark:bg-white rounded-full"
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

                {/* Theme toggle */}
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {theme === 'dark' ? (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Mobile: theme toggle + menu button */}
              <div className="md:hidden flex items-center gap-2">
                <button
                  onClick={toggleTheme}
                  className="flex items-center justify-center w-10 h-10 rounded-lg text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {theme === 'dark' ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors pl-0 pr-0 pt-0 mt-[10px] mb-[10px]"
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
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white/90 dark:bg-gray-950/90 backdrop-blur-md"
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
                            className="block px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
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
                              ? 'text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800'
                              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
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
