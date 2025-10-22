import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
    <div className={`group relative bg-white/[0.02] rounded-2xl border border-white/[0.1] p-6 
                    transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]
                    hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,.35)] hover:border-white/[0.15]
                    hover:ring-1 hover:ring-white/[0.1]
                    ${className}`}>
      
      {/* Highlight overlay - top-right shimmer on hover */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300
                      bg-[radial-gradient(120px_120px_at_85%_15%,rgba(255,255,255,0.06),transparent_60%)]" />
      
      {/* Image with glass frame */}
      {image && (
        <div className="relative overflow-hidden rounded-xl border border-white/[0.1] bg-black aspect-[16/9] mb-5">
          <Image
            src={image}
            alt={title}
            width={800}
            height={450}
            className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
            priority={false}
          />
        </div>
      )}
      
      <div className="relative">
        <h3 className="text-xl md:text-2xl font-semibold tracking-tighter text-white mb-2">
          {title}
        </h3>
        
        {subtitle && (
          <p className="text-sm text-sky-400 mb-2">
            {subtitle}
          </p>
        )}
        
        {description && (
          <p className="text-sm text-white/60 mb-4 leading-relaxed">
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
