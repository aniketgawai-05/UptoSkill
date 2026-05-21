import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-200/70">
      <h1 className="text-2xl font-extrabold text-slate-900">Reset your password</h1>
      <p className="mt-1 text-sm text-slate-600">
        Enter your email — we'll send instructions to reset your password.
      </p>

      {sent ? (
        <div className="mt-6 rounded-xl bg-emerald-50 p-4 text-sm text-emerald-700">
           If an account exists for <strong>{email}</strong>, a reset link has been sent.
        </div>
      ) : (
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
          <Button type="submit" fullWidth size="lg">Send reset link</Button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-slate-600">
        Remembered it?{" "}
        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-700">
          Back to login
        </Link>
      </p>
    </div>
  );
};
