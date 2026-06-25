import type { LeadStatus } from "@/lib/admin";
import { cn } from "@/lib/utils";

export const STATUS_META: Record<LeadStatus, { label: string; className: string; dot: string }> = {
  NEW: { label: "New", className: "bg-safety-500/10 text-safety-600 ring-safety-500/20", dot: "bg-safety-500" },
  CONTACTED: { label: "Contacted", className: "bg-amber-500/10 text-amber-600 ring-amber-500/20", dot: "bg-amber-500" },
  QUALIFIED: { label: "Qualified", className: "bg-navy-100 text-navy-700 ring-navy-500/20", dot: "bg-navy-500" },
  SCHEDULED: { label: "Scheduled", className: "bg-primary-50 text-primary-700 ring-primary-500/20", dot: "bg-primary-500" },
  WON: { label: "Won", className: "bg-success-500/10 text-success-500 ring-success-500/25", dot: "bg-success-500" },
  LOST: { label: "Lost", className: "bg-danger-500/10 text-danger-500 ring-danger-500/20", dot: "bg-danger-500" },
  CLOSED: { label: "Closed", className: "bg-ink-100 text-ink-600 ring-ink-300/40", dot: "bg-ink-400" },
};

export function StatusBadge({ status }: { status: LeadStatus }) {
  const meta = STATUS_META[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset",
        meta.className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </span>
  );
}
