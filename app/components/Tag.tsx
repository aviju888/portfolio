import TechBadge from './TechBadge';

interface TagProps {
  children: string;
  className?: string;
  category?: 'language' | 'framework' | 'tool' | 'other';
}

export default function Tag({ children, className = '', category = 'other' }: TagProps) {
  return (
    <TechBadge name={children} category={category} className={className} />
  );
}
