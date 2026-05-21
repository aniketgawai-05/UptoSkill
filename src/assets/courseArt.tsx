// Generated SVG cover art for each course (keeps build single-file friendly)
type Variant = "react" | "python" | "design" | "ml" | "marketing" | "cloud" | string;

const palettes: Record<string, [string, string, string]> = {
  react: ["#0ea5e9", "#6366f1", "#1e293b"],
  python: ["#facc15", "#3b82f6", "#0f172a"],
  design: ["#ec4899", "#f97316", "#fef3c7"],
  ml: ["#10b981", "#0ea5e9", "#0f172a"],
  marketing: ["#f97316", "#ef4444", "#fff7ed"],
  cloud: ["#a855f7", "#3b82f6", "#1e1b4b"],
};

export const CourseArt = ({ variant = "react", className = "" }: { variant?: Variant; className?: string }) => {
  const [a, b, c] = palettes[variant] ?? palettes.react;
  return (
    <svg viewBox="0 0 400 220" className={className} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`g-${variant}`} x1="0" y1="0" x2="400" y2="220" gradientUnits="userSpaceOnUse">
          <stop stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="400" height="220" fill={`url(#g-${variant})`} />
      <circle cx="320" cy="60" r="90" fill={c} opacity="0.25" />
      <circle cx="80" cy="180" r="60" fill="white" opacity="0.15" />
      <g opacity="0.85" transform="translate(160 80)">
        <rect x="0" y="0" width="80" height="60" rx="8" fill="white" opacity="0.9" />
        <rect x="10" y="12" width="60" height="6" rx="3" fill={a} />
        <rect x="10" y="24" width="40" height="4" rx="2" fill={b} />
        <rect x="10" y="34" width="50" height="4" rx="2" fill={b} opacity="0.6" />
        <rect x="10" y="44" width="30" height="4" rx="2" fill={b} opacity="0.6" />
      </g>
    </svg>
  );
};
