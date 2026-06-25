"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { LeadForm } from "./lead-form";

interface LeadModalContextValue {
  open: (presetService?: string) => void;
  close: () => void;
}

const LeadModalContext = React.createContext<LeadModalContextValue | null>(null);

export function useLeadModal() {
  const ctx = React.useContext(LeadModalContext);
  if (!ctx) throw new Error("useLeadModal must be used within <LeadModalProvider>");
  return ctx;
}

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [preset, setPreset] = React.useState<string | undefined>();

  const open = React.useCallback((presetService?: string) => {
    setPreset(presetService);
    setIsOpen(true);
  }, []);
  const close = React.useCallback(() => setIsOpen(false), []);

  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  return (
    <LeadModalContext.Provider value={{ open, close }}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              aria-label="Close"
              onClick={close}
              className="absolute inset-0 bg-navy-950/55 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Book a free inspection"
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 30, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-lg overflow-hidden rounded-t-3xl bg-white shadow-float sm:rounded-3xl"
            >
              <button
                onClick={close}
                aria-label="Close"
                className="absolute right-4 top-4 z-20 grid size-9 place-items-center rounded-full bg-white/80 text-ink-600 ring-1 ring-ink-200 transition hover:bg-ink-100 hover:text-ink-900"
              >
                <X className="size-4" />
              </button>
              <LeadForm presetService={preset} onSuccess={close} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LeadModalContext.Provider>
  );
}
