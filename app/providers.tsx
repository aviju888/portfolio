'use client';

import { ReactNode } from 'react';
import { VisitorModeProvider } from './context/VisitorModeContext';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <VisitorModeProvider>
      {children}
    </VisitorModeProvider>
  );
}
