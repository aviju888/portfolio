import { ReactNode } from 'react';
import Link from 'next/link';

interface CardProps {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  href?: string;
  children?: ReactNode;
  className?: string;
}

export default function Card({ 
  title, 
  subtitle, 
  description, 
  image, 
  href, 
  children, 
  className = '' 
}: CardProps) {
  const cardContent = (
    <div className={`bg-gray-800 rounded-lg border border-gray-700 p-6 hover:border-gray-600 transition-colors duration-200 ${className}`}>
      {image && (
        <div className="mb-4">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
      )}
      
      <div>
        <h3 className="text-xl font-semibold text-white mb-2">
          {title}
        </h3>
        
        {subtitle && (
          <p className="text-accent text-sm mb-2">
            {subtitle}
          </p>
        )}
        
        {description && (
          <p className="text-gray-400 text-sm mb-4">
            {description}
          </p>
        )}
        
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {cardContent}
      </Link>
    );
  }

  return cardContent;
}
