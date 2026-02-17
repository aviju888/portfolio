'use client';

interface TechBadgeProps {
  name: string;
  category?: 'language' | 'framework' | 'tool' | 'other';
  className?: string;
}

export default function TechBadge({
  name,
  category = 'other',
  className = ''
}: TechBadgeProps) {
  return (
    <div
      className={`
        inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium
        transition-colors duration-200 ease-out
        bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300
        hover:bg-gray-200 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600
        ${className}
      `}
    >
      {name}
    </div>
  );
}
