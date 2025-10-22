interface TagProps {
  children: string;
  className?: string;
}

export default function Tag({ children, className = '' }: TagProps) {
  return (
    <span className={`inline-block px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/[0.1] text-white/80 rounded-full ${className}`}>
      {children}
    </span>
  );
}
