import { ReactNode } from 'react';

interface SectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
}

export default function Section({ title, description, children, className = '' }: SectionProps) {
  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {(title || description) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl font-bold text-white mb-4">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-gray-400 max-w-2xl mx-auto">
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
