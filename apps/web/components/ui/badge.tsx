import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "primary" | "navy" | "amber" | "neutral" | "success";

const tones: Record<Tone, string> = {
  primary: "bg-primary-50 text-primary-700 ring-primary-600/20",
  navy: "bg-navy-50 text-navy-700 ring-navy-600/20",
  amber: "bg-amber-500/10 text-amber-600 ring-amber-500/25",
  neutral: "bg-ink-100 text-ink-700 ring-ink-300/40",
  success: "bg-primary-50 text-success-500 ring-success-500/20",
};

export function Badge({
  tone = "primary",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
