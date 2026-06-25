import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  center,
  className,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(center && "mx-auto text-center", "max-w-2xl", className)}>
      <Reveal>
        <Badge tone="primary">{eyebrow}</Badge>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-navy-950 sm:text-4xl lg:text-[2.6rem] lg:leading-[1.1]">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.1}>
          <p className={cn("mt-4 text-lg leading-relaxed text-ink-600", center && "mx-auto")}>
            {subtitle}
          </p>
        </Reveal>
      )}
    </div>
  );
}
