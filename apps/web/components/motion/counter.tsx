"use client";

import * as React from "react";
import { animate, useInView } from "framer-motion";

/** Counts up to `value` when scrolled into view. */
export function Counter({
  value,
  decimals = 0,
  suffix = "",
  prefix = "",
  duration = 1.8,
}: {
  value: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  React.useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate(latest) {
        node.textContent =
          prefix +
          latest.toLocaleString("en-IN", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }) +
          suffix;
      },
    });
    return () => controls.stop();
  }, [inView, value, decimals, suffix, prefix, duration]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}
