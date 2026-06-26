"use client";

import { LenisProvider } from "@/components/motion/lenis-provider";
import { LeadModalProvider } from "@/components/lead/lead-modal";
import { CustomerAuthProvider } from "@/components/account/customer-auth";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CustomerAuthProvider>
      <LeadModalProvider>
        <LenisProvider>{children}</LenisProvider>
      </LeadModalProvider>
    </CustomerAuthProvider>
  );
}
