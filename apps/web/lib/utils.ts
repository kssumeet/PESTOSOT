import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a large number compactly, e.g. 48000 -> "48,000". */
export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-IN").format(n);
}
