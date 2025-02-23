'use client';

import React from 'react';
import { useDomain } from '../layout/DomainProvider';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
}

export const Button = ({
  children,
  variant = 'solid',
  size = 'md',
  href,
  onClick,
  className = '',
  type = 'button',
  target,
  rel,
}: ButtonProps) => {
  const { activeDomain } = useDomain();

  const getGradientByDomain = () => {
    switch (activeDomain) {
      case 'creative':
        return 'from-pink-500 to-purple-500';
      case 'software':
        return 'from-blue-500 to-cyan-500';
      case 'ui-ux':
        return 'from-orange-500 to-yellow-500';
      default:
        return 'from-white/20 to-white/10';
    }
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const baseClasses = `
    inline-flex items-center justify-center
    font-medium tracking-wide
    transition-all duration-300
    rounded-lg
    ${sizeClasses[size]}
  `;

  const variantClasses = {
    solid: `bg-gradient-to-r ${getGradientByDomain()} text-white 
      hover:opacity-90 hover:-translate-y-0.5`,
    outline: `border-2 border-white/20 hover:border-white/40 
      hover:bg-white/5 text-white hover:-translate-y-0.5`,
    ghost: `text-white/70 hover:text-white hover:bg-white/5 
      hover:-translate-y-0.5`,
    link: `text-white/70 hover:text-white relative overflow-hidden
      after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5
      after:bg-current after:transition-all after:duration-300
      hover:after:w-full`,
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <a 
        href={href}
        className={combinedClasses}
        target={target}
        rel={rel}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={combinedClasses}
    >
      {children}
    </button>
  );
}; 