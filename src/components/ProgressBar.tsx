import { cn } from "../utils/cn";

export const ProgressBar = ({
  value,
  className,
  showLabel,
}: { value: number; className?: string; showLabel?: boolean }) => {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className={cn("w-full", className)}>
      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all"
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <div className="mt-1 text-xs font-medium text-slate-500">{clamped}% complete</div>
      )}
    </div>
  );
};
