"use client";

import * as React from "react";
import { adminLogin, getMe, type AdminUser } from "@/lib/admin";

const TOKEN_KEY = "pestosot_admin_token";

interface AuthState {
  token: string | null;
  user: AdminUser | null;
  status: "loading" | "authed" | "guest";
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = React.createContext<AuthState | null>(null);

export function useAdminAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within <AdminAuthProvider>");
  return ctx;
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<AdminUser | null>(null);
  const [status, setStatus] = React.useState<"loading" | "authed" | "guest">("loading");

  // Restore + validate an existing session on mount.
  React.useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (!saved) {
      setStatus("guest");
      return;
    }
    getMe(saved)
      .then((u) => {
        setToken(saved);
        setUser(u);
        setStatus("authed");
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setStatus("guest");
      });
  }, []);

  const login = React.useCallback(async (email: string, password: string) => {
    const { accessToken, user: u } = await adminLogin(email, password);
    localStorage.setItem(TOKEN_KEY, accessToken);
    setToken(accessToken);
    setUser(u);
    setStatus("authed");
  }, []);

  const logout = React.useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
    setStatus("guest");
  }, []);

  return (
    <AuthContext.Provider value={{ token, user, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
