import type { ReactNode } from "react";
import { cn } from "../utils/cn";

type Tone = "indigo" | "emerald" | "amber" | "rose" | "slate" | "violet" | "sky";

const tones: Record<Tone, string> = {
  indigo: "bg-indigo-50 text-indigo-700 ring-indigo-100",
  emerald: "bg-emerald-50 text-emerald-700 ring-emerald-100",
  amber: "bg-amber-50 text-amber-700 ring-amber-100",
  rose: "bg-rose-50 text-rose-700 ring-rose-100",
  slate: "bg-slate-100 text-slate-700 ring-slate-200",
  violet: "bg-violet-50 text-violet-700 ring-violet-100",
  sky: "bg-sky-50 text-sky-700 ring-sky-100",
};

export const Badge = ({
  children,
  tone = "indigo",
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset",
      tones[tone],
      className,
    )}
  >
    {children}
  </span>
);
