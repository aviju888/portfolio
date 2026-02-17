'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useVisitorMode } from '../context/VisitorModeContext';
import { VisitorMode } from '@/lib/types';

const modeIcons: Record<VisitorMode, JSX.Element> = {
  hiring: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  tech: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  ),
  creative: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
};

const modeLabels: Record<VisitorMode, string> = {
  hiring: 'Recruiter',
  tech: 'Developer',
  creative: 'Photo Client',
};

export default function ModeSwitcher() {
  const { mode, setMode, isHydrated } = useVisitorMode();
  const [isExpanded, setIsExpanded] = useState(false);

  // Don't render until hydrated
  if (!isHydrated) return null;

  const otherModes = (['hiring', 'tech', 'creative'] as VisitorMode[]).filter(m => m !== mode);

  return (
    <div className="fixed bottom-6 right-6 z-40">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="absolute bottom-full right-0 mb-2 flex flex-col gap-2"
          >
            {otherModes.map((m) => (
              <motion.button
                key={m}
                onClick={() => {
                  setMode(m);
                  setIsExpanded(false);
                }}
                className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={modeLabels[m]}
              >
                {modeIcons[m]}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main toggle button - shows current mode */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-12 h-12 rounded-full bg-gray-900 dark:bg-white shadow-lg flex items-center justify-center text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title={`Current: ${modeLabels[mode]}`}
      >
        {modeIcons[mode]}
      </motion.button>
    </div>
  );
}
