'use client';

import React from 'react';
import Link from 'next/link';
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
  icon?: React.ReactNode;
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
  icon,
}: ButtonProps) => {
  const { activeDomain } = useDomain();

  const getGradientByDomain = () => {
    switch (activeDomain) {
      case 'creative':
        return 'from-pink-500 via-purple-500 to-pink-600';
      case 'software':
        return 'from-blue-500 via-cyan-500 to-blue-600';
      case 'human':
        return 'from-gray-500 via-slate-600 to-gray-700';
      default:
        return 'from-white/20 via-white/10 to-white/5';
    }
  };

  const sizeClasses = {
    sm: 'px-6 py-3 text-sm font-medium',
    md: 'px-8 py-4 text-base font-semibold',
    lg: 'px-12 py-5 text-lg font-semibold',
  };

  const baseClasses = `
    inline-flex items-center justify-center
    transition-all duration-300 ease-out
    rounded-2xl
    ${sizeClasses[size]}
  `;

  const variantClasses = {
    solid: `bg-gradient-to-r ${getGradientByDomain()} text-white 
      hover:scale-105 hover:shadow-xl hover:shadow-black/20`,
    outline: `border-2 border-white/20 hover:border-white/40 
      hover:bg-white/5 text-white hover:scale-105`,
    ghost: `text-white/70 hover:text-white hover:bg-white/5 
      hover:scale-105 rounded-2xl`,
    link: `text-white/70 hover:text-white underline-offset-4 hover:underline`,
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={combinedClasses}
        onClick={onClick}
      >
        {icon && <span className="mr-3">{icon}</span>}
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
    >
      {icon && <span className="mr-3">{icon}</span>}
      {children}
    </button>
  );
}; 