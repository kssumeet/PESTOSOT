"use client";

import * as React from "react";
import Link from "next/link";
import { Users, Sparkles, CalendarClock, Trophy, ArrowUpRight, Loader2 } from "lucide-react";
import { getLeads, type Lead } from "@/lib/admin";
import { useAdminAuth } from "@/components/admin/auth";
import { StatusBadge } from "@/components/admin/status-badge";

function humanize(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

export default function AdminDashboard() {
  const { token } = useAdminAuth();
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [total, setTotal] = React.useState(0);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!token) return;
    setLoading(true);
    getLeads(token, { limit: 200, page: 1 })
      .then((res) => {
        setLeads(res.data);
        setTotal(res.total);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
  const count = (fn: (l: Lead) => boolean) => leads.filter(fn).length;

  const stats = [
    { label: "Total leads", value: total, icon: Users, tone: "text-navy-700 bg-navy-50" },
    { label: "New / unactioned", value: count((l) => l.status === "NEW"), icon: Sparkles, tone: "text-safety-600 bg-safety-500/10" },
    {
      label: "In progress",
      value: count((l) => ["CONTACTED", "QUALIFIED", "SCHEDULED"].includes(l.status)),
      icon: CalendarClock,
      tone: "text-amber-600 bg-amber-500/10",
    },
    { label: "Won", value: count((l) => l.status === "WON"), icon: Trophy, tone: "text-success-500 bg-primary-50" },
  ];

  const recent = [...leads]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, 8);

  const newThisWeek = count((l) => +new Date(l.createdAt) > weekAgo);

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-900">Dashboard</h1>
          <p className="mt-1 text-sm text-ink-500">
            {loading ? "Loading…" : `${newThisWeek} new lead${newThisWeek === 1 ? "" : "s"} in the last 7 days`}
          </p>
        </div>
        <Link
          href="/admin/leads"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800"
        >
          All leads <ArrowUpRight className="size-4" />
        </Link>
      </div>

      {error && (
        <p className="mt-6 rounded-xl bg-danger-500/10 px-4 py-3 text-sm font-medium text-danger-500">
          {error}
        </p>
      )}

      {/* Stat cards */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-ink-200 bg-white p-5 shadow-soft">
            <span className={`grid size-10 place-items-center rounded-xl ${s.tone}`}>
              <s.icon className="size-5" />
            </span>
            <p className="mt-4 font-display text-3xl font-extrabold text-navy-950">
              {loading ? <span className="inline-block h-7 w-12 animate-pulse rounded bg-ink-100" /> : s.value}
            </p>
            <p className="mt-1 text-sm text-ink-500">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Recent leads */}
      <div className="mt-8 overflow-hidden rounded-2xl border border-ink-200 bg-white">
        <div className="flex items-center justify-between border-b border-ink-100 px-5 py-4">
          <h2 className="font-display font-semibold text-navy-900">Recent leads</h2>
          <Link href="/admin/leads" className="text-sm font-medium text-primary-700 hover:underline">
            View all
          </Link>
        </div>

        {loading ? (
          <div className="grid place-items-center py-16">
            <Loader2 className="size-6 animate-spin text-primary-600" />
          </div>
        ) : recent.length === 0 ? (
          <div className="grid place-items-center px-5 py-16 text-center">
            <Users className="size-8 text-ink-300" />
            <p className="mt-3 font-medium text-navy-900">No leads yet</p>
            <p className="text-sm text-ink-500">New enquiries from the website will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-left text-xs uppercase tracking-wide text-ink-400">
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Service</th>
                  <th className="hidden px-5 py-3 font-semibold md:table-cell">Area</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                  <th className="hidden px-5 py-3 font-semibold sm:table-cell">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {recent.map((l) => (
                  <tr key={l.id} className="hover:bg-ink-50/60">
                    <td className="px-5 py-3">
                      <p className="font-medium text-navy-900">{l.name}</p>
                      <p className="text-xs text-ink-500">{l.phone}</p>
                    </td>
                    <td className="px-5 py-3 text-ink-700">{humanize(l.serviceType)}</td>
                    <td className="hidden px-5 py-3 text-ink-600 md:table-cell">{l.locality ?? l.city}</td>
                    <td className="px-5 py-3">
                      <StatusBadge status={l.status} />
                    </td>
                    <td className="hidden px-5 py-3 text-ink-500 sm:table-cell">{fmtDate(l.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
