'use client';

import { ReactNode } from 'react';
import { VisitorModeProvider } from './context/VisitorModeContext';
import { ThemeProvider } from './context/ThemeContext';
export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <VisitorModeProvider>
        {children}
      </VisitorModeProvider>
    </ThemeProvider>
  );
}
