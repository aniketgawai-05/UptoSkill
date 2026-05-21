import { Link } from "react-router-dom";

export const NotFound = () => (
  <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 text-center">
    <p className="text-7xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">404</p>
    <h1 className="mt-3 text-2xl font-bold text-slate-900">Page not found</h1>
    <p className="mt-2 text-slate-600">The page you're looking for has moved or doesn't exist.</p>
    <Link to="/" className="mt-6 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
      Back to home
    </Link>
  </div>
);
