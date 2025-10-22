import { ReactNode } from 'react';

interface SpotlightRowProps {
  title: string;
  children: ReactNode;
  viewAllHref?: string;
}

export default function SpotlightRow({ title, children, viewAllHref }: SpotlightRowProps) {
  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-white">
          {title}
        </h3>
        {viewAllHref && (
          <a
            href={viewAllHref}
            className="text-accent hover:text-accent-hover transition-colors duration-200"
          >
            View All →
          </a>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
}
