"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogIn } from "lucide-react";
import { CustomerApiError } from "@/lib/customer";
import { useCustomerAuth } from "@/components/account/customer-auth";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldError } from "@/components/ui/field";
import { AuroraBackground } from "@/components/motion/aurora";

export default function CustomerLoginPage() {
  const { login, status } = useCustomerAuth();
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (status === "authed") router.replace("/account");
  }, [status, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.replace("/account");
    } catch (err) {
      setError(
        err instanceof CustomerApiError
          ? err.status === 401
            ? "Invalid email or password."
            : err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="relative grid min-h-dvh place-items-center overflow-hidden bg-gradient-to-b from-primary-50/60 to-white px-4 py-32">
      <AuroraBackground intensity="subtle" />
      <div className="relative z-10 w-full max-w-sm">
        <div className="mb-6 text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary-50 text-primary-700">
            <LogIn className="size-6" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-navy-900">Welcome back</h1>
          <p className="mt-1 text-sm text-ink-500">Log in to view your bookings and service history.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
          <div>
            <Label htmlFor="email" required>Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@email.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="password" required>Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          {error && <FieldError>{error}</FieldError>}

          <Button type="submit" size="lg" className="w-full" loading={submitting}>
            {submitting ? "Logging in…" : "Log in"}
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-ink-600">
          New here?{" "}
          <Link href="/signup" className="font-semibold text-primary-700 hover:text-primary-800">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}
