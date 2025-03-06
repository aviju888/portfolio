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

  const domains: { id: Domain; name: string; color: string; icon: string }[] = [
    { id: 'creative', name: 'Creative', color: 'from-pink-500 to-purple-500', icon: '🎨' },
    { id: 'software', name: 'Software', color: 'from-blue-500 to-cyan-500', icon: '💻' },
    { id: 'human', name: 'Human', color: 'from-gray-500 to-gray-700', icon: '🧠' },
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