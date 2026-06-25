"use client";

import * as React from "react";
import { Phone, MessageCircle, Loader2, Users, Search, RefreshCw } from "lucide-react";
import {
  getLeads,
  updateLeadStatus,
  LEAD_STATUSES,
  type Lead,
  type LeadStatus,
} from "@/lib/admin";
import { useAdminAuth } from "@/components/admin/auth";
import { STATUS_META } from "@/components/admin/status-badge";
import { Select } from "@/components/ui/field";
import { cn } from "@/lib/utils";

const LIMIT = 15;

function humanize(slug: string) {
  return slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
function fmtDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminLeadsPage() {
  const { token } = useAdminAuth();
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [total, setTotal] = React.useState(0);
  const [page, setPage] = React.useState(1);
  const [status, setStatus] = React.useState("");
  const [city, setCity] = React.useState("");
  const [cityInput, setCityInput] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [updatingId, setUpdatingId] = React.useState<string | null>(null);

  const load = React.useCallback(() => {
    if (!token) return;
    setLoading(true);
    setError(null);
    getLeads(token, { status: status || undefined, city: city || undefined, page, limit: LIMIT })
      .then((res) => {
        setLeads(res.data);
        setTotal(res.total);
      })
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token, status, city, page]);

  React.useEffect(() => {
    load();
  }, [load]);

  async function changeStatus(id: string, next: LeadStatus) {
    if (!token) return;
    setUpdatingId(id);
    const prev = leads;
    setLeads((ls) => ls.map((l) => (l.id === id ? { ...l, status: next } : l)));
    try {
      await updateLeadStatus(token, id, next);
    } catch (e) {
      setLeads(prev); // revert on failure
      setError(e instanceof Error ? e.message : "Failed to update status");
    } finally {
      setUpdatingId(null);
    }
  }

  const pages = Math.max(1, Math.ceil(total / LIMIT));

  return (
    <div className="mx-auto max-w-6xl">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-navy-900">Leads</h1>
          <p className="mt-1 text-sm text-ink-500">
            {loading ? "Loading…" : `${total} total enquir${total === 1 ? "y" : "ies"}`}
          </p>
        </div>
        <button
          onClick={load}
          className="inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3 py-2 text-sm font-medium text-ink-700 hover:border-primary-300 hover:text-primary-700"
        >
          <RefreshCw className={cn("size-4", loading && "animate-spin")} /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <div className="w-44">
          <Select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
          >
            <option value="">All statuses</option>
            {LEAD_STATUSES.map((s) => (
              <option key={s} value={s}>
                {STATUS_META[s].label}
              </option>
            ))}
          </Select>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setCity(cityInput.trim());
            setPage(1);
          }}
          className="relative flex-1 sm:max-w-xs"
        >
          <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-400" />
          <input
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Filter by city / area…"
            className="h-12 w-full rounded-xl border border-ink-200 bg-white pl-10 pr-4 text-sm focus:border-primary-500 focus:outline-none focus:ring-4 focus:ring-primary-500/15"
          />
        </form>
        {(status || city) && (
          <button
            onClick={() => {
              setStatus("");
              setCity("");
              setCityInput("");
              setPage(1);
            }}
            className="text-sm font-medium text-ink-500 hover:text-navy-900"
          >
            Clear
          </button>
        )}
      </div>

      {error && (
        <p className="mt-5 rounded-xl bg-danger-500/10 px-4 py-3 text-sm font-medium text-danger-500">
          {error}
        </p>
      )}

      {/* Table */}
      <div className="mt-5 overflow-hidden rounded-2xl border border-ink-200 bg-white">
        {loading ? (
          <div className="grid place-items-center py-20">
            <Loader2 className="size-6 animate-spin text-primary-600" />
          </div>
        ) : leads.length === 0 ? (
          <div className="grid place-items-center px-5 py-20 text-center">
            <Users className="size-8 text-ink-300" />
            <p className="mt-3 font-medium text-navy-900">No leads found</p>
            <p className="text-sm text-ink-500">Try clearing filters or check back later.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-100 text-left text-xs uppercase tracking-wide text-ink-400">
                  <th className="px-4 py-3 font-semibold">Contact</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="hidden px-4 py-3 font-semibold lg:table-cell">Property / Area</th>
                  <th className="hidden px-4 py-3 font-semibold xl:table-cell">Received</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Reach</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-100">
                {leads.map((l) => (
                  <tr key={l.id} className="align-top hover:bg-ink-50/60">
                    <td className="px-4 py-3">
                      <p className="font-medium text-navy-900">{l.name}</p>
                      <p className="text-xs text-ink-500">{l.phone}</p>
                      {l.email && <p className="text-xs text-ink-400">{l.email}</p>}
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-ink-800">{humanize(l.serviceType)}</p>
                      {l.message && (
                        <p className="mt-0.5 max-w-[220px] truncate text-xs text-ink-400" title={l.message}>
                          “{l.message}”
                        </p>
                      )}
                    </td>
                    <td className="hidden px-4 py-3 lg:table-cell">
                      <p className="capitalize text-ink-700">{l.propertyType}</p>
                      <p className="text-xs text-ink-500">{l.locality ?? l.city}</p>
                    </td>
                    <td className="hidden px-4 py-3 text-ink-500 xl:table-cell">{fmtDate(l.createdAt)}</td>
                    <td className="px-4 py-3">
                      <div className="relative w-36">
                        <Select
                          value={l.status}
                          disabled={updatingId === l.id}
                          onChange={(e) => changeStatus(l.id, e.target.value as LeadStatus)}
                          className="h-9 text-xs"
                        >
                          {LEAD_STATUSES.map((s) => (
                            <option key={s} value={s}>
                              {STATUS_META[s].label}
                            </option>
                          ))}
                        </Select>
                        {updatingId === l.id && (
                          <Loader2 className="absolute -left-5 top-2.5 size-4 animate-spin text-primary-600" />
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`tel:${l.phone.replace(/[^0-9+]/g, "")}`}
                          aria-label="Call"
                          className="grid size-8 place-items-center rounded-lg bg-ink-100 text-navy-700 hover:bg-navy-900 hover:text-white"
                        >
                          <Phone className="size-4" />
                        </a>
                        <a
                          href={`https://wa.me/${l.phone.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="WhatsApp"
                          className="grid size-8 place-items-center rounded-lg bg-ink-100 text-[#1faa52] hover:bg-[#25D366] hover:text-white"
                        >
                          <MessageCircle className="size-4" />
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {!loading && leads.length > 0 && (
        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-ink-500">
            Page {page} of {pages}
          </p>
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 disabled:opacity-40 hover:border-primary-300"
            >
              Previous
            </button>
            <button
              disabled={page >= pages}
              onClick={() => setPage((p) => Math.min(pages, p + 1))}
              className="rounded-full border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-700 disabled:opacity-40 hover:border-primary-300"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
