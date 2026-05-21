// SVG logo asset used across the app
export const Logo = ({ className = "h-8 w-8" }: { className?: string }) => (
  <svg viewBox="0 0 32 32" className={className} fill="none">
    <defs>
      <linearGradient id="lh-g" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366f1" />
        <stop offset="1" stopColor="#a855f7" />
      </linearGradient>
    </defs>
    <rect width="32" height="32" rx="8" fill="url(#lh-g)" />
    <path
      d="M9 22V11l7-3 7 3v11"
      stroke="white"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12 16h8M12 19h8" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
  </svg>
);
