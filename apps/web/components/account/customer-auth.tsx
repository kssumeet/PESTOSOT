"use client";

import * as React from "react";
import {
  loginCustomer,
  registerCustomer,
  logoutCustomer,
  getCustomerMe,
  type Customer,
} from "@/lib/customer";

interface CustomerAuthState {
  customer: Customer | null;
  status: "loading" | "authed" | "guest";
  login: (email: string, password: string) => Promise<void>;
  register: (input: { name: string; email: string; phone: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
}

const Ctx = React.createContext<CustomerAuthState | null>(null);

export function useCustomerAuth() {
  const ctx = React.useContext(Ctx);
  if (!ctx) throw new Error("useCustomerAuth must be used within <CustomerAuthProvider>");
  return ctx;
}

export function CustomerAuthProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = React.useState<Customer | null>(null);
  const [status, setStatus] = React.useState<"loading" | "authed" | "guest">("loading");

  // The session lives in an httpOnly cookie — validate it via /me.
  React.useEffect(() => {
    getCustomerMe()
      .then((c) => {
        setCustomer(c);
        setStatus("authed");
      })
      .catch(() => setStatus("guest"));
  }, []);

  const login = React.useCallback(async (email: string, password: string) => {
    const { customer: c } = await loginCustomer(email, password);
    setCustomer(c);
    setStatus("authed");
  }, []);

  const register = React.useCallback(
    async (input: { name: string; email: string; phone: string; password: string }) => {
      const { customer: c } = await registerCustomer(input);
      setCustomer(c);
      setStatus("authed");
    },
    [],
  );

  const logout = React.useCallback(async () => {
    try {
      await logoutCustomer();
    } finally {
      setCustomer(null);
      setStatus("guest");
    }
  }, []);

  return (
    <Ctx.Provider value={{ customer, status, login, register, logout }}>
      {children}
    </Ctx.Provider>
  );
}
