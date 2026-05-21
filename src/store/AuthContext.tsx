import { createContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { User } from "./types";
import { api } from "../services/api";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (name: string, email: string, password: string) => Promise<User>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "UptoSkillhub:user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try { setUser(JSON.parse(raw)); } catch { /* ignore */ }
    }
  }, []);

  const persist = (u: User | null) => {
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
    setUser(u);
  };

  const value = useMemo<AuthContextValue>(() => ({
    user,
    loading,
    async login(email, password) {
      setLoading(true);
      try {
        const u = await api.login(email, password);
        persist(u);
        return u;
      } finally { setLoading(false); }
    },
    async register(name, email, _password) {
      setLoading(true);
      try {
        const u = await api.register(name, email);
        persist(u);
        return u;
      } finally { setLoading(false); }
    },
    logout() { persist(null); },
  }), [user, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
