import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "white" | "danger";
type Size = "sm" | "md" | "lg" | "xl" | "icon";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-600 text-white shadow-soft hover:bg-primary-700 hover:shadow-glow active:scale-[0.98]",
  secondary:
    "bg-navy-900 text-white shadow-soft hover:bg-navy-800 active:scale-[0.98]",
  outline:
    "border border-ink-300 bg-white/60 text-ink-900 hover:border-primary-500 hover:text-primary-700 active:scale-[0.98]",
  ghost: "text-ink-700 hover:bg-ink-100 hover:text-ink-900",
  white:
    "bg-white text-navy-900 shadow-card hover:shadow-float active:scale-[0.98]",
  danger: "bg-danger-500 text-white hover:brightness-95 active:scale-[0.98]",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm gap-1.5",
  md: "h-11 px-5 text-sm gap-2",
  lg: "h-12 px-6 text-base gap-2",
  xl: "h-14 px-8 text-base gap-2.5",
  icon: "h-11 w-11",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  loading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-all duration-200 ease-out",
          "disabled:pointer-events-none disabled:opacity-60",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2",
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";
