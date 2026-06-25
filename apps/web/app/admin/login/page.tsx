"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, Loader2 } from "lucide-react";
import { AdminApiError } from "@/lib/admin";
import { useAdminAuth } from "@/components/admin/auth";
import { Logo } from "@/components/layout/logo";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldError } from "@/components/ui/field";

export default function AdminLoginPage() {
  const { login, status } = useAdminAuth();
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  // Already signed in → go to dashboard.
  React.useEffect(() => {
    if (status === "authed") router.replace("/admin");
  }, [status, router]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.replace("/admin");
    } catch (err) {
      setError(
        err instanceof AdminApiError
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
    <div className="grid min-h-dvh place-items-center bg-ink-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <Logo />
          <div className="mt-5 grid size-12 place-items-center rounded-2xl bg-primary-50 text-primary-700">
            <ShieldCheck className="size-6" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-navy-900">Admin sign in</h1>
          <p className="mt-1 text-sm text-ink-500">Manage leads, enquiries and content.</p>
        </div>

        <form
          onSubmit={onSubmit}
          className="space-y-4 rounded-2xl border border-ink-200 bg-white p-6 shadow-card"
        >
          <div>
            <Label htmlFor="email" required>
              Email
            </Label>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@pestosot.com"
              required
            />
          </div>
          <div>
            <Label htmlFor="password" required>
              Password
            </Label>
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
            {submitting ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-ink-400">
          {status === "loading" && <Loader2 className="size-3 animate-spin" />}
          Protected area · authorised staff only
        </p>
      </div>
    </div>
  );
}
