"use client";

import * as React from "react";
import { adminLogin, adminLogout, getMe, type AdminUser } from "@/lib/admin";

interface AuthState {
  user: AdminUser | null;
  status: "loading" | "authed" | "guest";
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = React.createContext<AuthState | null>(null);

export function useAdminAuth() {
  const ctx = React.useContext(AuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within <AdminAuthProvider>");
  return ctx;
}

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<AdminUser | null>(null);
  const [status, setStatus] = React.useState<"loading" | "authed" | "guest">("loading");

  // The session lives in an httpOnly cookie — validate it by calling /me.
  React.useEffect(() => {
    getMe()
      .then((u) => {
        setUser(u);
        setStatus("authed");
      })
      .catch(() => setStatus("guest"));
  }, []);

  const login = React.useCallback(async (email: string, password: string) => {
    const { user: u } = await adminLogin(email, password);
    setUser(u);
    setStatus("authed");
  }, []);

  const logout = React.useCallback(async () => {
    try {
      await adminLogout();
    } finally {
      setUser(null);
      setStatus("guest");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, status, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
