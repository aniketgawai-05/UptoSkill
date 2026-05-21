import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leftIcon?: ReactNode;
}

export const Input = ({ label, hint, error, leftIcon, className, id, ...rest }: Props) => {
  const inputId = id ?? rest.name;
  return (
    <div className="space-y-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <div className="relative">
        {leftIcon && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">{leftIcon}</span>
        )}
        <input
          id={inputId}
          className={cn(
            "h-11 w-full rounded-xl border border-slate-300 bg-white px-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100",
            leftIcon && "pl-10",
            error && "border-rose-400 focus:border-rose-500 focus:ring-rose-100",
            className,
          )}
          {...rest}
        />
      </div>
      {hint && !error && <p className="text-xs text-slate-500">{hint}</p>}
      {error && <p className="text-xs text-rose-600">{error}</p>}
    </div>
  );
};
