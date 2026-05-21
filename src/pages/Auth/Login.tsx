import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation() as { state?: { from?: { pathname?: string } } };
  const redirectTo = location.state?.from?.pathname ?? "/dashboard";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-200/70">
      <h1 className="text-2xl font-extrabold text-slate-900">Welcome back</h1>
      

      

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          name="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
            Remember me
          </label>
          <Link to="/forgot-password" className="font-semibold text-indigo-600 hover:text-indigo-700">
            Forgot password?
          </Link>
        </div>

        {error && (
          <div className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>
        )}

        <Button type="submit" fullWidth size="lg" disabled={loading}>
          {loading ? "Logging in…" : "Log in"}
        </Button>
      </form>

      <div className="mt-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-slate-200" />
        <span className="text-xs text-slate-400">OR</span>
        <div className="h-px flex-1 bg-slate-200" />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-semibold hover:bg-slate-50">
          <span></span> Google
        </button>
        <button className="flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 text-sm font-semibold hover:bg-slate-50">
          <span></span> GitHub
        </button>
      </div>

      <p className="mt-6 text-center text-sm text-slate-600">
        New here?{" "}
        <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-700">
          Create an account
        </Link>
      </p>
    </div>
  );
};
