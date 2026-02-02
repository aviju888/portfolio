'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { VisitorMode } from '@/lib/types';
import { defaultMode } from '@/lib/visitorModeConfig';

interface VisitorModeContextType {
  mode: VisitorMode;
  setMode: (mode: VisitorMode) => void;
  hasSelectedMode: boolean;
  showPopup: boolean;
  dismissPopup: () => void;
  isHydrated: boolean;
}

const STORAGE_KEY = 'portfolio-visitor-mode';

export const VisitorModeContext = createContext<VisitorModeContextType | undefined>(undefined);

export function VisitorModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<VisitorMode>(defaultMode);
  const [hasSelectedMode, setHasSelectedMode] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydration-safe initialization from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && ['hiring', 'tech', 'creative'].includes(stored)) {
      setModeState(stored as VisitorMode);
      setHasSelectedMode(true);
    } else {
      // First visit - show popup
      setShowPopup(true);
    }
    setIsHydrated(true);
  }, []);

  const setMode = (newMode: VisitorMode) => {
    setModeState(newMode);
    setHasSelectedMode(true);
    setShowPopup(false);
    localStorage.setItem(STORAGE_KEY, newMode);
  };

  const dismissPopup = () => {
    setShowPopup(false);
    if (!hasSelectedMode) {
      // Default to hiring mode if dismissed without selecting
      setMode(defaultMode);
    }
  };

  return (
    <VisitorModeContext.Provider value={{
      mode,
      setMode,
      hasSelectedMode,
      showPopup,
      dismissPopup,
      isHydrated
    }}>
      {children}
    </VisitorModeContext.Provider>
  );
}

export function useVisitorMode() {
  const context = useContext(VisitorModeContext);
  if (!context) {
    throw new Error('useVisitorMode must be used within VisitorModeProvider');
  }
  return context;
}
