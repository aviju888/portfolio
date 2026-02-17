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
    <div className="mb-8 md:mb-16">
      <div className="mb-8">
        {eyebrow && (
          <div className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-3">
            {eyebrow}
          </div>
        )}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end">
          <div>
            <h2 className="text-h1-sm md:text-4xl font-semibold tracking-tight text-gray-900 dark:text-white mb-2">
              {title}
            </h2>
            <div className="w-12 h-[1px] bg-gray-300 dark:bg-gray-700 mb-4" />
            {description && (
              <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl leading-relaxed">
                {description}
              </p>
            )}
          </div>
          {viewAllHref && (
            <a
              href={viewAllHref}
              className="text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-200 flex items-center gap-1 mt-3 md:mt-0"
            >
              View All
              <span className="text-xs">→</span>
            </a>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-12">
        {children}
      </div>
    </div>
  );
}
