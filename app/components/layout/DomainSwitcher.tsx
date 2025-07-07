'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export type Domain = 'creative' | 'software' | 'human';

interface DomainSwitcherProps {
  activeDomain?: Domain;
  className?: string;
  onDomainSelect?: () => void;
}

// Define the domain item type for better TypeScript support
interface DomainItem {
  id: Domain;
  name: string;
  color: string;
  icon: React.ReactNode;
}

export const DomainSwitcher = ({ activeDomain, className = '', onDomainSelect }: DomainSwitcherProps) => {
  // Check if this is the mobile version based on the className containing "w-full"
  const isMobile = className.includes('w-full');
  const router = useRouter();

  const domains: DomainItem[] = [
    { 
      id: 'creative', 
      name: 'Creative', 
      color: 'from-pink-500 to-purple-500', 
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" strokeLinecap="round" strokeLinejoin="round"/>
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
          <path d="M12 4a4 4 0 100 8 4 4 0 000-8z" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ) 
    },
  ];

  // For mobile view, we need to render vertically in the requested order
  const orderedDomains: DomainItem[] = isMobile ? 
    [
      domains.find(d => d.id === 'creative')!, 
      domains.find(d => d.id === 'software')!, 
      domains.find(d => d.id === 'human')!
    ] :
    domains;

  return (
    <div className={`flex ${isMobile ? 'flex-col' : 'gap-2'} ${className}`}>
      {orderedDomains.map((domain, index) => (
        <motion.button
          key={domain.id}
          onClick={(e) => {
            e.preventDefault();
            router.push(`/${domain.id}`);
            if (onDomainSelect) {
              onDomainSelect();
            }
          }}
          className={`
            ${isMobile ? 'w-full justify-center py-4 mb-3 rounded-2xl' : 'px-4 py-2.5 rounded-xl'} 
            transition-all duration-300 flex items-center gap-3 font-medium relative overflow-hidden group
            ${activeDomain === domain.id 
              ? `bg-gradient-to-r ${domain.color} text-white shadow-lg shadow-black/20 ${isMobile ? '' : 'scale-105'}` 
              : 'bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/15 hover:border-white/25 backdrop-blur-sm'
            }
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          {/* Background gradient for active state */}
          {activeDomain === domain.id && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}
          
          {/* Icon with modern styling */}
          <div className={`relative z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
            activeDomain === domain.id 
              ? 'bg-white/20 text-white' 
              : 'bg-white/5 text-white/60 group-hover:bg-white/10 group-hover:text-white'
          }`}>
            {domain.icon}
          </div>
          
          {/* Text */}
          <span className="relative z-10 font-medium">
            {domain.name}
          </span>
          
          {/* Hover effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      ))}
    </div>
  );
}; 