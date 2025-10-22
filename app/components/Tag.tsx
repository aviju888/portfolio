interface TagProps {
  children: string;
  className?: string;
}

export default function Tag({ children, className = '' }: TagProps) {
  return (
    <span className={`inline-block px-3 py-1 text-xs font-medium bg-gray-700 text-gray-300 rounded-full ${className}`}>
      {children}
    </span>
  );
}
