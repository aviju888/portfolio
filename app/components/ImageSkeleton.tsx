export default function ImageSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-white/[0.05] ${className}`}>
      <div className="w-full h-full bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />
    </div>
  );
}
