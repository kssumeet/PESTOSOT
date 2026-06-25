"use client";

import * as React from "react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { useLeadModal } from "./lead-modal";

/**
 * Opens the global lead modal. Lets Server Components (e.g. service pages)
 * trigger the inspection form without becoming client components themselves.
 */
export function BookButton({
  presetService,
  children = "Book Free Inspection",
  ...props
}: ButtonProps & { presetService?: string }) {
  const { open } = useLeadModal();
  return (
    <Button onClick={() => open(presetService)} {...props}>
      {children}
    </Button>
  );
}
