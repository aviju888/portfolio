'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export type Domain = 'creative' | 'software' | 'human';

interface DomainSwitcherProps {
  activeDomain?: Domain;
  className?: string;
  onDomainSelect?: () => void;
}

export const DomainSwitcher = ({ activeDomain, className = '', onDomainSelect }: DomainSwitcherProps) => {
  const router = useRouter();
  
  // Check if this is the mobile version based on the className containing "w-full"
  const isMobile = className.includes('w-full');

  const domains: { id: Domain; name: string; color: string; icon: React.ReactNode }[] = [
    { 
      id: 'creative', 
      name: 'Creative', 
      color: 'from-pink-500 to-purple-500', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 12C2 16.714 4.39 19 7 19s3-2.286 3-7M13 5c0 3.286.77 7 3 7s4-2.286 4-7M2 12h20" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      )
    },
    { 
      id: 'software', 
      name: 'Software', 
      color: 'from-blue-500 to-cyan-500', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M8 9l3 3-3 3M16 9l-3 3 3 3M7 4h10c1.105 0 2 .895 2 2v12c0 1.105-.895 2-2 2H7c-1.105 0-2-.895-2-2V6c0-1.105.895-2 2-2z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) 
    },
    { 
      id: 'human', 
      name: 'Human', 
      color: 'from-gray-500 to-gray-700', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) 
    },
  ];

  const handleDomainChange = (domain: Domain) => {
    router.push(`/${domain}`);
    if (onDomainSelect) {
      onDomainSelect();
    }
  };

  return (
    <div className={`flex ${isMobile ? '' : 'gap-4'} ${className}`}>
      {domains.map((domain) => (
        <button
          key={domain.id}
          onClick={() => handleDomainChange(domain.id)}
          className={`
            ${isMobile ? 'w-full justify-center py-4 mb-2 rounded-lg' : 'px-4 py-2 rounded-full'} 
            transition-all duration-300 flex items-center gap-2
            ${activeDomain === domain.id 
              ? `bg-gradient-to-r ${domain.color} text-white ${isMobile ? '' : 'scale-105'}` 
              : 'bg-white/5 hover:bg-white/10'
            }
          `}
        >
          <span className="text-lg">{domain.icon}</span>
          <span>{domain.name}</span>
        </button>
      ))}
    </div>
  );
}; 