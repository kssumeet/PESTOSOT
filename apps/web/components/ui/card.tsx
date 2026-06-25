import * as React from "react";
import { cn } from "@/lib/utils";

type CardVariant = "solid" | "glass" | "outline" | "tinted";

const variants: Record<CardVariant, string> = {
  solid: "bg-white shadow-card",
  glass: "glass shadow-card",
  outline: "bg-white border border-ink-200",
  tinted: "bg-ink-50 border border-ink-100",
};

export function Card({
  variant = "solid",
  interactive,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl",
        variants[variant],
        interactive &&
          "transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-float",
        className,
      )}
      {...props}
    />
  );
}
