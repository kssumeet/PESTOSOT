"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLeadModal } from "./lead-modal";

const STORAGE_KEY = "pestosot_exit_offer_seen";

/** Shows a one-time offer popup when the cursor leaves toward the tab bar. */
export function ExitIntent() {
  const { open } = useLeadModal();
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return;
    let armed = true;
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && armed) {
        armed = false;
        sessionStorage.setItem(STORAGE_KEY, "1");
        setShow(true);
      }
    };
    const timer = window.setTimeout(() => {
      document.addEventListener("mouseout", onLeave);
    }, 6000);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[110] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            aria-label="Close"
            onClick={() => setShow(false)}
            className="absolute inset-0 bg-navy-950/55 backdrop-blur-sm"
          />
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md overflow-hidden rounded-3xl bg-white text-center shadow-float"
          >
            <button
              onClick={() => setShow(false)}
              aria-label="Close"
              className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-ink-500 ring-1 ring-ink-200 hover:bg-ink-100"
            >
              <X className="size-4" />
            </button>
            <div className="bg-gradient-to-br from-primary-600 to-primary-800 px-8 py-8 text-white">
              <Gift className="mx-auto size-10" />
              <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-primary-100">
                Before you go
              </p>
              <p className="mt-1 font-display text-3xl font-bold">Get 15% OFF</p>
              <p className="text-sm text-primary-100">your first pest control or deep clean</p>
            </div>
            <div className="px-8 py-7">
              <p className="text-sm text-ink-600">
                Book a free inspection now and we&apos;ll apply an exclusive first-time
                discount to your treatment.
              </p>
              <Button
                size="lg"
                className="mt-5 w-full"
                onClick={() => {
                  setShow(false);
                  open();
                }}
              >
                Claim my 15% off
              </Button>
              <button
                onClick={() => setShow(false)}
                className="mt-3 text-xs font-medium text-ink-400 hover:text-ink-600"
              >
                No thanks, I&apos;ll pay full price
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
