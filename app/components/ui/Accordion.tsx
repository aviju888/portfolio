'use client';

import React, { useState } from 'react';

interface AccordionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
  titleColor?: string;
  borderColor?: string;
}

export const Accordion = ({ 
  title, 
  children, 
  defaultOpen = false,
  titleColor = 'text-white',
  borderColor = 'border-blue-500/20'
}: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`border ${borderColor} rounded-md overflow-hidden bg-white/5 mb-4`}>
      <button
        className={`w-full px-4 py-3 flex justify-between items-center ${titleColor} text-left`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{title}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-4 py-3 border-t border-white/10">
          {children}
        </div>
      </div>
    </div>
  );
}; 