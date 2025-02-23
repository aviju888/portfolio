'use client';

import React, { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  target?: string;
}

export const Button = ({ children, href, onClick, className = '', target }: ButtonProps) => {
  const baseStyles = 'inline-block px-8 py-4 text-white transition-all duration-200 border border-gray-800 hover:-translate-y-1 relative overflow-hidden';
  
  const combinedStyles = `${baseStyles} ${className}`;

  if (href) {
    return (
      <a href={href} className={combinedStyles} target={target}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={combinedStyles}>
      {children}
    </button>
  );
}; 