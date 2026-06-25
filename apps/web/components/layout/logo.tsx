import { cn } from "@/lib/utils";

/** PESTOSOT wordmark + shield/leaf glyph. */
export function Logo({ className, light }: { className?: string; light?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative grid size-9 place-items-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-soft">
        <svg viewBox="0 0 24 24" className="size-5 text-white" fill="none" aria-hidden>
          <path
            d="M12 2.5c2.6 1.8 5.2 2.6 8 2.6 0 7.2-2.7 11.6-8 14.4C6.7 16.7 4 12.3 4 5.1c2.8 0 5.4-.8 8-2.6Z"
            fill="currentColor"
            opacity={0.9}
          />
          <path
            d="M8.6 11.4l2.4 2.4 4.4-4.8"
            stroke="#0a6e42"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span
        className={cn(
          "font-display text-xl font-extrabold tracking-tight",
          light ? "text-white" : "text-navy-900",
        )}
      >
        PESTO<span className="text-primary-500">SOT</span>
      </span>
    </span>
  );
}
