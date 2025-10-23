interface OrganicDividerProps {
  className?: string;
  variant?: 'wave' | 'blob';
}

export default function OrganicDivider({ 
  className = '', 
  variant = 'wave' 
}: OrganicDividerProps) {
  if (variant === 'blob') {
    return (
      <div className={`w-full overflow-hidden ${className}`}>
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="w-full h-12 md:h-20"
        >
          <path 
            d="M0,0 C200,60 400,20 600,40 C800,60 1000,30 1200,50 L1200,120 L0,120 Z" 
            fill="currentColor" 
            opacity="0.03"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <svg 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none" 
        className="w-full h-12 md:h-20"
      >
        <path 
          d="M0,0 C300,40 600,0 900,20 C1050,30 1150,15 1200,10 L1200,120 L0,120 Z" 
          fill="currentColor" 
          opacity="0.03"
        />
      </svg>
    </div>
  );
}
