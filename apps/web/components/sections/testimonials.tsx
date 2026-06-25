import { Star, Quote } from "lucide-react";
import { STATS } from "@pestosot/config";
import { testimonials } from "@/lib/content";
import { SectionHeader } from "./section-header";
import { Card } from "@/components/ui/card";

function TestimonialCard({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <Card variant="solid" className="flex w-[340px] shrink-0 flex-col p-6">
      <div className="flex items-center justify-between">
        <div className="flex">
          {Array.from({ length: t.rating }).map((_, i) => (
            <Star key={i} className="size-4 fill-amber-500 text-amber-500" />
          ))}
        </div>
        <Quote className="size-7 text-primary-100" />
      </div>
      <p className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-700">“{t.quote}”</p>
      <div className="mt-5 flex items-center gap-3 border-t border-ink-100 pt-4">
        <span className="grid size-10 place-items-center rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-sm font-bold text-white">
          {t.name.charAt(0)}
        </span>
        <div>
          <p className="text-sm font-semibold text-navy-900">{t.name}</p>
          <p className="text-xs text-ink-500">
            {t.role} · {t.location}
          </p>
        </div>
      </div>
    </Card>
  );
}

export function Testimonials() {
  const rowA = testimonials;
  const rowB = [...testimonials].reverse();

  return (
    <section id="testimonials" className="scroll-mt-24 overflow-hidden py-20 md:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader
          center
          eyebrow="Customer Stories"
          title={
            <>
              Rated {STATS.googleRating}/5 by{" "}
              <span className="text-gradient">{STATS.googleReviews.toLocaleString("en-IN")}+ customers</span>
            </>
          }
          subtitle="Real reviews from homes and businesses across Bangalore who trust us with their spaces."
        />
      </div>

      {/* Marquee rows */}
      <div className="relative mt-12 space-y-5">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-white to-transparent" />

        <div className="flex w-max gap-5 animate-[marquee_42s_linear_infinite] hover:[animation-play-state:paused]">
          {[...rowA, ...rowA].map((t, i) => (
            <TestimonialCard key={`a-${i}`} t={t} />
          ))}
        </div>
        <div className="flex w-max gap-5 [animation:marquee_52s_linear_infinite_reverse] hover:[animation-play-state:paused]">
          {[...rowB, ...rowB].map((t, i) => (
            <TestimonialCard key={`b-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
