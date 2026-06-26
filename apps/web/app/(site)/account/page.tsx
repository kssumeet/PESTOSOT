"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogOut, CalendarPlus, Mail, Phone, User, PackageOpen } from "lucide-react";
import { getCustomerBookings, type Booking } from "@/lib/customer";
import { useCustomerAuth } from "@/components/account/customer-auth";
import { useLeadModal } from "@/components/lead/lead-modal";
import { StatusBadge } from "@/components/admin/status-badge";
import type { LeadStatus } from "@/lib/admin";
import { Button } from "@/components/ui/button";

function humanize(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function AccountPage() {
  const { customer, status, logout } = useCustomerAuth();
  const { open } = useLeadModal();
  const router = useRouter();
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (status === "guest") router.replace("/login");
  }, [status, router]);

  React.useEffect(() => {
    if (status !== "authed") return;
    setLoading(true);
    getCustomerBookings()
      .then(setBookings)
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [status]);

  if (status !== "authed" || !customer) {
    return (
      <div className="grid min-h-dvh place-items-center">
        <Loader2 className="size-7 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <section className="min-h-dvh bg-ink-50/60 px-4 pb-20 pt-28 md:pt-32">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary-400 to-primary-700 text-xl font-bold text-white">
              {customer.name.charAt(0)}
            </span>
            <div>
              <h1 className="font-display text-2xl font-bold text-navy-900">
                Hi, {customer.name.split(" ")[0]}
              </h1>
              <p className="text-sm text-ink-500">Welcome to your PESTOSOT account</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={() => open()}>
              <CalendarPlus className="size-4" /> Book a service
            </Button>
            <Button variant="outline" onClick={logout}>
              <LogOut className="size-4" /> Logout
            </Button>
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-12">
          {/* Profile */}
          <div className="lg:col-span-4">
            <div className="rounded-2xl border border-ink-200 bg-white p-6">
              <h2 className="font-display font-semibold text-navy-900">Your details</h2>
              <ul className="mt-4 space-y-3 text-sm">
                <li className="flex items-center gap-3 text-ink-700">
                  <User className="size-4 text-primary-600" /> {customer.name}
                </li>
                <li className="flex items-center gap-3 text-ink-700">
                  <Mail className="size-4 text-primary-600" /> {customer.email}
                </li>
                <li className="flex items-center gap-3 text-ink-700">
                  <Phone className="size-4 text-primary-600" /> {customer.phone}
                </li>
              </ul>
            </div>
          </div>

          {/* Bookings */}
          <div className="lg:col-span-8">
            <div className="overflow-hidden rounded-2xl border border-ink-200 bg-white">
              <div className="border-b border-ink-100 px-5 py-4">
                <h2 className="font-display font-semibold text-navy-900">Your bookings</h2>
              </div>

              {error && (
                <p className="px-5 py-4 text-sm font-medium text-danger-500">{error}</p>
              )}

              {loading ? (
                <div className="grid place-items-center py-16">
                  <Loader2 className="size-6 animate-spin text-primary-600" />
                </div>
              ) : bookings.length === 0 ? (
                <div className="grid place-items-center px-5 py-16 text-center">
                  <PackageOpen className="size-9 text-ink-300" />
                  <p className="mt-3 font-medium text-navy-900">No bookings yet</p>
                  <p className="mb-5 text-sm text-ink-500">
                    Book your first inspection and it&apos;ll show up here.
                  </p>
                  <Button onClick={() => open()}>
                    <CalendarPlus className="size-4" /> Book a service
                  </Button>
                </div>
              ) : (
                <ul className="divide-y divide-ink-100">
                  {bookings.map((b) => (
                    <li key={b.id} className="flex items-center justify-between gap-4 px-5 py-4">
                      <div>
                        <p className="font-medium text-navy-900">{humanize(b.serviceType)}</p>
                        <p className="text-xs text-ink-500">
                          {b.locality ?? b.city} · Requested {fmtDate(b.createdAt)}
                        </p>
                      </div>
                      <StatusBadge status={b.status as LeadStatus} />
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
