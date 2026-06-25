import * as React from "react";
import { cn } from "@/lib/utils";

const base =
  "w-full rounded-xl border bg-white px-4 text-sm text-ink-900 placeholder:text-ink-400 transition-colors " +
  "focus:outline-none focus:ring-4 disabled:opacity-60";
const ok = "border-ink-200 focus:border-primary-500 focus:ring-primary-500/15";
const bad = "border-danger-500 focus:border-danger-500 focus:ring-danger-500/15";

export function Label({
  children,
  htmlFor,
  required,
}: {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink-800">
      {children}
      {required && <span className="ml-0.5 text-danger-500">*</span>}
    </label>
  );
}

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null;
  return <p className="mt-1.5 text-xs font-medium text-danger-500">{children}</p>;
}

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }
>(({ className, invalid, ...props }, ref) => (
  <input ref={ref} className={cn(base, "h-12", invalid ? bad : ok, className)} {...props} />
));
Input.displayName = "Input";

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { invalid?: boolean }
>(({ className, invalid, ...props }, ref) => (
  <textarea
    ref={ref}
    className={cn(base, "min-h-[110px] py-3 leading-relaxed", invalid ? bad : ok, className)}
    {...props}
  />
));
Textarea.displayName = "Textarea";

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { invalid?: boolean }
>(({ className, invalid, children, ...props }, ref) => (
  <select
    ref={ref}
    className={cn(
      base,
      "h-12 appearance-none bg-[length:1.1rem] bg-[right_0.9rem_center] bg-no-repeat pr-10",
      "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 fill=%22none%22 viewBox=%220 0 24 24%22 stroke=%22%23757d7a%22 stroke-width=%222%22><path stroke-linecap=%22round%22 stroke-linejoin=%22round%22 d=%22M19 9l-7 7-7-7%22/></svg>')]",
      invalid ? bad : ok,
      className,
    )}
    {...props}
  >
    {children}
  </select>
));
Select.displayName = "Select";
