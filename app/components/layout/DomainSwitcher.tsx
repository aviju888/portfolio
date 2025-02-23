'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export type Domain = 'creative' | 'software' | 'ui-ux';

interface DomainSwitcherProps {
  activeDomain?: Domain;
  className?: string;
}

export const DomainSwitcher = ({ activeDomain, className = '' }: DomainSwitcherProps) => {
  const router = useRouter();

  const domains: { id: Domain; name: string; color: string }[] = [
    { id: 'creative', name: 'Creative', color: 'from-pink-500 to-purple-500' },
    { id: 'software', name: 'Software', color: 'from-blue-500 to-cyan-500' },
    { id: 'ui-ux', name: 'UI/UX', color: 'from-orange-500 to-yellow-500' },
  ];

  const handleDomainChange = (domain: Domain) => {
    router.push(`/${domain}`);
  };

  return (
    <div className={`flex gap-4 ${className}`}>
      {domains.map((domain) => (
        <button
          key={domain.id}
          onClick={() => handleDomainChange(domain.id)}
          className={`px-4 py-2 rounded-full transition-all duration-300 
            ${activeDomain === domain.id 
              ? `bg-gradient-to-r ${domain.color} text-white scale-105` 
              : 'bg-white/5 hover:bg-white/10'
            }`}
        >
          {domain.name}
        </button>
      ))}
    </div>
  );
}; 