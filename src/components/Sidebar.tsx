import { NavLink } from "react-router-dom";
import { cn } from "../utils/cn";
import type { ReactNode } from "react";

interface Item {
  to: string;
  label: string;
  icon: ReactNode;
  end?: boolean;
}

export const Sidebar = ({ items, title }: { items: Item[]; title: string }) => (
  <aside className="hidden lg:block w-64 shrink-0">
    <div className="sticky top-24 rounded-2xl border border-slate-200 bg-white p-4">
      <p className="px-3 pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
        {title}
      </p>
      <nav className="space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                isActive
                  ? "bg-indigo-50 text-indigo-700"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              )
            }
          >
            <span className="text-current">{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  </aside>
);
