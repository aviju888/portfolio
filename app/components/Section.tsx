import { ReactNode } from 'react';

interface SectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ eyebrow, title, description, children, className = '' }: SectionProps) {
  return (
    <section className={`py-24 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {(eyebrow || title || description) && (
          <div className="text-center mb-12">
            {eyebrow && (
              <div className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-3">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="text-h1-sm md:text-h1 font-bold text-gray-900 tracking-tight mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-body text-gray-600 max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
