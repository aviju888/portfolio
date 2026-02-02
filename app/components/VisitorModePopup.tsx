'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useVisitorMode } from '../context/VisitorModeContext';
import { VisitorMode } from '@/lib/types';

const modes: { id: VisitorMode; label: string; icon: JSX.Element }[] = [
  {
    id: 'hiring',
    label: 'Hiring',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: 'tech',
    label: 'Tech',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
  },
  {
    id: 'creative',
    label: 'Creative',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
];

export default function VisitorModePopup() {
  const { showPopup, setMode, dismissPopup, isHydrated } = useVisitorMode();

  // Don't render until hydrated to prevent flash
  if (!isHydrated) return null;

  const handleSelect = (mode: VisitorMode) => {
    setMode(mode);
  };

  return (
    <AnimatePresence>
      {showPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-white rounded-2xl p-8 shadow-2xl relative"
          >
            {/* Dismiss button */}
            <button
              onClick={dismissPopup}
              className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Dismiss"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Mode options */}
            <div className="flex gap-6 md:gap-8">
              {modes.map((mode) => (
                <button
                  key={mode.id}
                  onClick={() => handleSelect(mode.id)}
                  className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className="w-14 h-14 flex items-center justify-center text-gray-500 group-hover:text-gray-900 transition-colors">
                    {mode.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-500 group-hover:text-gray-900 transition-colors">
                    {mode.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
