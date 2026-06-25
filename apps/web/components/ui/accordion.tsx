"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionItemData {
  q: string;
  a: string;
}

export function Accordion({ items }: { items: AccordionItemData[] }) {
  const [open, setOpen] = React.useState<number | null>(0);

  return (
    <div className="divide-y divide-ink-200 overflow-hidden rounded-2xl border border-ink-200 bg-white">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left md:px-6"
            >
              <span className="font-display text-base font-semibold text-navy-900 md:text-lg">
                {item.q}
              </span>
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-full border border-ink-200 text-ink-600 transition-all duration-300",
                  isOpen && "rotate-45 border-primary-500 bg-primary-600 text-white",
                )}
              >
                <Plus className="size-4" />
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-5 pb-5 text-[15px] leading-relaxed text-ink-600 md:px-6 md:pb-6 md:pr-16">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
