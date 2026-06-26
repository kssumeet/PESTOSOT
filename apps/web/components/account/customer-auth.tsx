"use client";

import * as React from "react";
import {
  loginCustomer,
  registerCustomer,
  getCustomerMe,
  type Customer,
} from "@/lib/customer";

const TOKEN_KEY = "pestosot_customer_token";

interface CustomerAuthState {
  token: string | null;
  customer: Customer | null;
  status: "loading" | "authed" | "guest";
  login: (email: string, password: string) => Promise<void>;
  register: (input: { name: string; email: string; phone: string; password: string }) => Promise<void>;
  logout: () => void;
}

const Ctx = React.createContext<CustomerAuthState | null>(null);

export function useCustomerAuth() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useCustomerAuth must be used within <CustomerAuthProvider>");
  return ctx;
}

export function CustomerAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = React.useState<string | null>(null);
  const [customer, setCustomer] = React.useState<Customer | null>(null);
  const [status, setStatus] = React.useState<"loading" | "authed" | "guest">("loading");

  React.useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (!saved) {
      setStatus("guest");
      return;
    }
    getCustomerMe(saved)
      .then((c) => {
        setToken(saved);
        setCustomer(c);
        setStatus("authed");
      })
      .catch(() => {
        localStorage.removeItem(TOKEN_KEY);
        setStatus("guest");
      });
  }, []);

  const apply = React.useCallback((accessToken: string, c: Customer) => {
    localStorage.setItem(TOKEN_KEY, accessToken);
    setToken(accessToken);
    setCustomer(c);
    setStatus("authed");
  }, []);

  const login = React.useCallback(
    async (email: string, password: string) => {
      const res = await loginCustomer(email, password);
      apply(res.accessToken, res.customer);
    },
    [apply],
  );

  const register = React.useCallback(
    async (input: { name: string; email: string; phone: string; password: string }) => {
      const res = await registerCustomer(input);
      apply(res.accessToken, res.customer);
    },
    [apply],
  );

  const logout = React.useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setCustomer(null);
    setStatus("guest");
  }, []);

  return (
    <Ctx.Provider value={{ token, customer, status, login, register, logout }}>
      {children}
    </Ctx.Provider>
  );
}
