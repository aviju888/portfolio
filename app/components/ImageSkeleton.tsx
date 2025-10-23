export default function ImageSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-gray-100 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
    </div>
  );
}
