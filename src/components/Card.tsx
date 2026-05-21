import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

interface Props extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export const Card = ({ children, hover, className, ...rest }: Props) => (
  <div
    className={cn(
      "rounded-2xl bg-white border border-slate-200/70 shadow-sm",
      hover && "transition hover:shadow-xl hover:-translate-y-1 hover:border-indigo-200",
      className,
    )}
    {...rest}
  >
    {children}
  </div>
);
