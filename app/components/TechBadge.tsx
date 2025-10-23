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
  const categoryColors = {
    language: 'bg-gray-100 border border-gray-200 text-gray-700',
    framework: 'bg-gray-100 border border-gray-200 text-gray-700',
    tool: 'bg-gray-100 border border-gray-200 text-gray-700',
    other: 'bg-gray-100 border border-gray-200 text-gray-700'
  };

  const badgeContent = (
    <div
      className={`
        inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium
        transition-colors duration-200 ease-out
        hover:bg-gray-200 hover:border-gray-300
        ${categoryColors[category]} ${className}
      `}
    >
      {name}
    </div>
  );

  return badgeContent;
}