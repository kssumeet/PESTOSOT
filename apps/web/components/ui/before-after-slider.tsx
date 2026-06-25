"use client";

import * as React from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Drag-to-reveal before/after slider. The "after" layer is the clean original;
 * the "before" layer is the same photo run through a grime filter + dirt overlay,
 * so the transformation is pixel-aligned and unmistakable.
 */
export function BeforeAfterSlider({
  img,
  alt,
  beforeLabel,
  afterLabel,
  className,
  rounded = "rounded-3xl",
  priority,
  sizes = "(max-width: 1024px) 90vw, 600px",
  hint,
  initial = 55,
}: {
  img: string;
  alt: string;
  beforeLabel: string;
  afterLabel: string;
  className?: string;
  rounded?: string;
  priority?: boolean;
  sizes?: string;
  hint?: boolean;
  initial?: number;
}) {
  const [pos, setPos] = React.useState(initial);
  const [touched, setTouched] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);
  const dragging = React.useRef(false);

  const move = React.useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.max(2, Math.min(98, p)));
  }, []);

  React.useEffect(() => {
    const onMove = (e: PointerEvent) => dragging.current && move(e.clientX);
    const onUp = () => (dragging.current = false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [move]);

  return (
    <div
      ref={ref}
      className={cn("relative cursor-ew-resize select-none overflow-hidden", rounded, className)}
      onPointerDown={(e) => {
        dragging.current = true;
        setTouched(true);
        move(e.clientX);
      }}
    >
      {/* AFTER — clean original */}
      <Image src={img} alt={`${alt} — after`} fill priority={priority} sizes={sizes} className="object-cover" />
      <span className="absolute bottom-3 right-3 z-[5] rounded-full bg-primary-600 px-2.5 py-1 text-[11px] font-semibold text-white shadow-soft">
        {afterLabel}
      </span>

      {/* BEFORE — same shot, dirtied (clipped from the left) */}
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image
          src={img}
          alt={`${alt} — before`}
          fill
          sizes={sizes}
          className="object-cover [filter:sepia(0.45)_saturate(0.6)_brightness(0.6)_contrast(1.05)]"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#3a2a12]/55 via-[#2a2418]/35 to-[#1a1d12]/55 mix-blend-multiply" />
        <div className="bg-dots absolute inset-0 opacity-30 mix-blend-overlay" />
        <span className="absolute bottom-3 left-3 z-[5] rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
          {beforeLabel}
        </span>
      </div>

      {/* Handle */}
      <div
        className="absolute inset-y-0 z-[7] w-0.5 bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.12)]"
        style={{ left: `${pos}%` }}
      >
        <span className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-primary-700 shadow-float">
          <MoveHorizontal className="size-4.5" />
        </span>
      </div>

      {/* Drag hint */}
      {hint && !touched && (
        <span className="pointer-events-none absolute left-1/2 top-3 z-[8] -translate-x-1/2 animate-pulse rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-navy-900 shadow-soft backdrop-blur">
          ← Drag to reveal →
        </span>
      )}
    </div>
  );
}
