"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UserPlus, ShieldCheck } from "lucide-react";
import { CustomerApiError } from "@/lib/customer";
import { useCustomerAuth } from "@/components/account/customer-auth";
import { Button } from "@/components/ui/button";
import { Input, Label, FieldError } from "@/components/ui/field";
import { AuroraBackground } from "@/components/motion/aurora";

export default function CustomerSignupPage() {
  const { register, status } = useCustomerAuth();
  const router = useRouter();
  const [form, setForm] = React.useState({ name: "", email: "", phone: "", password: "" });
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (status === "authed") router.replace("/account");
  }, [status, router]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setSubmitting(true);
    try {
      await register(form);
      router.replace("/account");
    } catch (err) {
      setError(
        err instanceof CustomerApiError
          ? err.status === 409
            ? "An account with this email already exists. Try logging in."
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
      <div className="relative z-10 w-full max-w-md">
        <div className="mb-6 text-center">
          <div className="mx-auto grid size-12 place-items-center rounded-2xl bg-primary-50 text-primary-700">
            <UserPlus className="size-6" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-bold text-navy-900">Create your account</h1>
          <p className="mt-1 text-sm text-ink-500">Track bookings, rebook faster and manage your services.</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-ink-200 bg-white p-6 shadow-card">
          <div>
            <Label htmlFor="name" required>Full name</Label>
            <Input id="name" value={form.name} onChange={set("name")} placeholder="e.g. Ananya Rao" required />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="email" required>Email</Label>
              <Input id="email" type="email" autoComplete="username" value={form.email} onChange={set("email")} placeholder="you@email.com" required />
            </div>
            <div>
              <Label htmlFor="phone" required>Phone</Label>
              <Input id="phone" type="tel" inputMode="tel" value={form.phone} onChange={set("phone")} placeholder="+91 90000 00000" required />
            </div>
          </div>
          <div>
            <Label htmlFor="password" required>Password</Label>
            <Input id="password" type="password" autoComplete="new-password" value={form.password} onChange={set("password")} placeholder="At least 8 characters" required />
          </div>

          {error && <FieldError>{error}</FieldError>}

          <Button type="submit" size="lg" className="w-full" loading={submitting}>
            {submitting ? "Creating account…" : "Create account"}
          </Button>

          <p className="flex items-center justify-center gap-1.5 text-xs text-ink-400">
            <ShieldCheck className="size-3.5 text-primary-500" /> Your details are safe with us.
          </p>
        </form>

        <p className="mt-5 text-center text-sm text-ink-600">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-primary-700 hover:text-primary-800">
            Log in
          </Link>
        </p>
      </div>
    </section>
  );
}
