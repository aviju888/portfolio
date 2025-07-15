'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

export type Domain = 'creative' | 'software' | 'human';

interface DomainSwitcherProps {
  activeDomain?: Domain;
  className?: string;
  onDomainSelect?: () => void;
}

interface DomainItem {
  id: Domain;
  name: string;
  color: string;
  gradient: string;
}

export const DomainSwitcher = ({ activeDomain, className = '', onDomainSelect }: DomainSwitcherProps) => {
  const isMobile = className.includes('w-full');
  const router = useRouter();

  const domains: DomainItem[] = [
    { 
      id: 'creative', 
      name: 'Creative', 
      color: 'from-pink-500 to-purple-500',
      gradient: 'from-pink-500 via-purple-500 to-pink-600'
    },
    { 
      id: 'software', 
      name: 'Software', 
      color: 'from-blue-500 to-cyan-500',
      gradient: 'from-blue-500 via-cyan-500 to-blue-600'
    },
    { 
      id: 'human', 
      name: 'Human', 
      color: 'from-gray-500 to-gray-700',
      gradient: 'from-gray-500 via-slate-600 to-gray-700'
    },
  ];

  const orderedDomains: DomainItem[] = isMobile ? 
    [
      domains.find(d => d.id === 'creative')!, 
      domains.find(d => d.id === 'software')!, 
      domains.find(d => d.id === 'human')!
    ] :
    domains;

  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'gap-3'} ${className}`}>
      {orderedDomains.map((domain) => (
        <button
          key={domain.id}
          onClick={(e) => {
            e.preventDefault();
            router.push(`/${domain.id}`);
            if (onDomainSelect) {
              onDomainSelect();
            }
          }}
          className={`
            ${isMobile ? 'w-full py-4 px-6 rounded-2xl' : 'px-6 py-3 rounded-2xl'} 
            transition-all duration-300 font-semibold
            ${activeDomain === domain.id 
              ? `bg-gradient-to-r ${domain.gradient} text-white shadow-xl shadow-black/20 scale-105` 
              : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 hover:border-white/20 hover:scale-105'
            }
          `}
        >
          {domain.name}
        </button>
      ))}
    </div>
  );
}; 