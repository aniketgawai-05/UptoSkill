import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/useAuth";

export const Register = () => {
  const { register, loading } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    try {
      await register(name, email, password);
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    }
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-200/70">
      <h1 className="text-2xl font-extrabold text-slate-900">Create your account</h1>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <Input label="Full name" name="name" placeholder="Manish Malhotra" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input label="Email" type="email" name="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input label="Password" type="password" name="password" placeholder="Min. 6 characters" value={password} onChange={(e) => setPassword(e.target.value)} required />

        <label className="flex items-start gap-2 text-xs text-slate-600">
          <input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-slate-300" />
          I agree to the <a href="#" className="text-indigo-600 hover:underline">Terms</a> &amp; <a href="#" className="text-indigo-600 hover:underline">Privacy Policy</a>.
        </label>

        {error && <div className="rounded-lg bg-rose-50 px-3 py-2 text-sm text-rose-700">{error}</div>}

        <Button type="submit" fullWidth size="lg" disabled={loading}>
          {loading ? "Creating account…" : "Create account"}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
          Log in
        </Link>
      </p>
    </div>
  );
};
