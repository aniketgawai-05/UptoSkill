import { Link, Outlet } from "react-router-dom";
import { Logo } from "../assets/logo";

export const AuthLayout = () => (
  <div className="relative min-h-screen overflow-hidden bg-slate-50">
    <div className="absolute inset-0 bg-grid opacity-60" />
    <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" />
    <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-violet-300/30 blur-3xl" />

    <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-6 sm:px-6 lg:px-8">
      <Link to="/" className="inline-flex items-center gap-2">
        <Logo />
        <span className="text-lg font-extrabold text-slate-900">
          UptoSkill<span className="text-indigo-600">Hub</span>
        </span>
      </Link>

      <div className="flex flex-1 items-center justify-center py-10">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>

      <p className="text-center text-xs text-slate-500">© 2026 UpToSkill. All rights reserved.</p>
    </div>
  </div>
);
