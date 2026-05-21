import { Link } from "react-router-dom";
import { Logo } from "../assets/logo";

export const Footer = () => (
  <footer className="border-t border-slate-200 bg-white">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <Logo />
            <span className="text-lg font-extrabold text-slate-900">
              Uptoskill<span className="text-indigo-600">Hub</span>
            </span>
          </Link>
          <p className="mt-3 text-sm text-slate-600">
            Modern learning platform built for ambitious students and lifelong learners.
          </p>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Learn</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><Link to="/courses" className="hover:text-indigo-600">Browse Courses</Link></li>
            <li><Link to="/dashboard" className="hover:text-indigo-600">My Dashboard</Link></li>
            <li><a href="#" className="hover:text-indigo-600">Categories</a></li>
            <li><a href="#" className="hover:text-indigo-600">Certifications</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li><a href="#" className="hover:text-indigo-600">About</a></li>
            <li><a href="#" className="hover:text-indigo-600">Careers</a></li>
            <li><a href="#" className="hover:text-indigo-600">Press</a></li>
            <li><a href="#" className="hover:text-indigo-600">Contact</a></li>
          </ul>
        </div>
        
      </div>
      <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-slate-100 pt-6 text-xs text-slate-500 md:flex-row">
        <p>© 2026 LearnHub. All rights reserved.</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-indigo-600">Privacy</a>
          <a href="#" className="hover:text-indigo-600">Terms</a>
          <a href="#" className="hover:text-indigo-600">Cookies</a>
        </div>
      </div>
    </div>
  </footer>
);
