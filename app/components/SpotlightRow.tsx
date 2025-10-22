import { ReactNode } from 'react';

interface SpotlightRowProps {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  viewAllHref?: string;
}

export default function SpotlightRow({ eyebrow, title, description, children, viewAllHref }: SpotlightRowProps) {
  return (
    <div className="mb-16">
      <div className="mb-8">
        {eyebrow && (
          <div className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">
            {eyebrow}
          </div>
        )}
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white">
              {title}
            </h2>
            {description && (
              <p className="mt-3 text-white/70 max-w-2xl">
                {description}
              </p>
            )}
          </div>
          {viewAllHref && (
            <a
              href={viewAllHref}
              className="text-sm text-accent hover:text-accent-hover transition-colors"
            >
              View All →
            </a>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 lg:gap-12">
        {children}
      </div>
    </div>
  );
}
