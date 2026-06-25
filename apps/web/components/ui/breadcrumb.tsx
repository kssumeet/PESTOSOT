import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-500">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {item.href && !last ? (
                <Link href={item.href} className="transition-colors hover:text-primary-700">
                  {item.label}
                </Link>
              ) : (
                <span className={last ? "font-medium text-navy-900" : ""}>{item.label}</span>
              )}
              {!last && <ChevronRight className="size-3.5 text-ink-300" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
