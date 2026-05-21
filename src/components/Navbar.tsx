import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Logo } from "../assets/logo";
import { Button } from "./Button";
import { useAuth } from "../hooks/useAuth";
import { initials } from "../utils/helpers";
import { cn } from "../utils/cn";

const navItems = [
  { to: "/", label: "Home" },
  { to: "/courses", label: "Courses" },
  { to: "/dashboard", label: "Dashboard" },
];

export const Navbar = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="text-lg font-extrabold tracking-tight text-slate-900">
            UpToSkill<span className="text-orange-600"></span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition",
                  isActive ? "text-blue-600 bg-indigo-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition",
                  isActive ? "text-red-600 bg-violet-50" : "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
                )
              }
            >
              Admin
            </NavLink>
          )}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen((v) => !v)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 hover:bg-slate-50"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white">
                  {initials(user.name)}
                </span>
                <span className="text-sm font-medium text-slate-700">{user.name}</span>
                <svg className="h-4 w-4 text-slate-400" viewBox="0 0 20 20" fill="currentColor"><path d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z" /></svg>
              </button>
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-52 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl">
                  <div className="px-3 py-2 border-b border-slate-100">
                    <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                    <p className="truncate text-xs text-slate-500">{user.email}</p>
                  </div>
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">My Dashboard</Link>
                  {user.role === "admin" && (
                    <Link to="/admin" onClick={() => setMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm text-slate-700 hover:bg-slate-50">Admin Panel</Link>
                  )}
                  <button
                    onClick={() => { logout(); setMenuOpen(false); navigate("/"); }}
                    className="w-full rounded-lg px-3 py-2 text-left text-sm text-rose-600 hover:bg-rose-50"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-slate-900">Log in</Link>
              <Button size="sm" onClick={() => navigate("/register")}>Get started</Button>
            </>
          )}
        </div>

        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          <svg className="h-5 w-5 text-slate-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {open ? <path d="M18 6L6 18M6 6l12 12" /> : <><path d="M3 6h18" /><path d="M3 12h18" /><path d="M3 18h18" /></>}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="space-y-1 px-4 py-3">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "block rounded-lg px-3 py-2 text-sm font-medium",
                    isActive ? "text-indigo-600 bg-indigo-50" : "text-slate-700 hover:bg-slate-50",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
            {user?.role === "admin" && (
              <NavLink to="/admin" onClick={() => setOpen(false)} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">Admin</NavLink>
            )}
            <div className="pt-2 border-t border-slate-100 mt-2">
              {user ? (
                <button onClick={() => { logout(); setOpen(false); }} className="block w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-rose-600 hover:bg-rose-50">Sign out</button>
              ) : (
                <div className="flex gap-2">
                  <Link to="/login" onClick={() => setOpen(false)} className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-center text-sm font-semibold">Log in</Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white">Sign up</Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
