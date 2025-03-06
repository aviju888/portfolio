'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import type { Domain } from './DomainSwitcher';

interface DomainContextType {
  activeDomain?: Domain;
}

const DomainContext = createContext<DomainContextType>({ activeDomain: undefined });

export const useDomain = () => useContext(DomainContext);

export const DomainProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const [activeDomain, setActiveDomain] = useState<Domain | undefined>();

  useEffect(() => {
    const domain = pathname.split('/')[1] as Domain;
    if (['creative', 'software', 'human'].includes(domain)) {
      setActiveDomain(domain);
    } else {
      setActiveDomain(undefined);
    }
  }, [pathname]);

  return (
    <DomainContext.Provider value={{ activeDomain }}>
      {children}
    </DomainContext.Provider>
  );
}; 