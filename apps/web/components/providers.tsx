"use client";

import { LenisProvider } from "@/components/motion/lenis-provider";
import { LeadModalProvider } from "@/components/lead/lead-modal";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LeadModalProvider>
      <LenisProvider>{children}</LenisProvider>
    </LeadModalProvider>
  );
}
