import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { BRAND } from "@pestosot/config";
import { SERVICES, CATEGORY_LABELS, type ServiceCategory } from "@/lib/services-data";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { AuroraBackground } from "@/components/motion/aurora";
import { BookButton } from "@/components/lead/book-button";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? BRAND.url;

export const metadata: Metadata = {
  title: "Our Services — Pest Control & Deep Cleaning in Bangalore",
  description:
    "Explore PESTOSOT's full range of pest control and premium deep cleaning services in Bangalore — from termite and cockroach control to kitchen and full-home deep cleaning.",
  alternates: { canonical: `${siteUrl}/services` },
};

const order: ServiceCategory[] = ["pest-control", "deep-cleaning"];

export default function ServicesIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", url: siteUrl },
            { name: "Services", url: `${siteUrl}/services` },
          ]),
        )}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/70 to-white pt-32 pb-12 md:pt-40">
        <AuroraBackground intensity="vivid" className="mask-fade-b" />
        <div className="bg-grid animate-grid-pan mask-fade-b pointer-events-none absolute inset-0 opacity-40" />
        <div className="container-px relative z-10 mx-auto max-w-7xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Services" }]} />
          <div className="mt-6 max-w-2xl">
            <Badge tone="primary">Our Services</Badge>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">
              Pest control & deep cleaning, <span className="text-gradient">done right</span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">
              Certified, child- &amp; pet-safe treatments and premium deep cleaning for every
              kind of space. Choose a service to see exactly how we solve it.
            </p>
            <BookButton size="lg" className="mt-7" />
          </div>
        </div>
      </section>

      {/* Service groups */}
      <section className="py-12 md:py-16">
        <div className="container-px mx-auto max-w-7xl space-y-16">
          {order.map((cat) => {
            const items = SERVICES.filter((s) => s.category === cat);
            return (
              <div key={cat}>
                <div className="mb-6 flex items-end justify-between">
                  <h2 className="font-display text-2xl font-bold text-navy-900">
                    {CATEGORY_LABELS[cat]}
                  </h2>
                  <span className="text-sm text-ink-500">{items.length} services</span>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((s, i) => (
                    <Reveal key={s.slug} delay={(i % 3) * 0.06}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group relative flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-float"
                      >
                        {s.popular && (
                          <span className="absolute right-5 top-5 inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-1 text-[11px] font-semibold text-amber-600">
                            <Sparkles className="size-3" /> Popular
                          </span>
                        )}
                        <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-soft">
                          <s.icon className="size-6" />
                        </span>
                        <h3 className="mt-4 font-display text-lg font-semibold text-navy-900">
                          {s.name}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-600">
                          {s.shortDesc}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <span className="text-sm font-semibold text-navy-900">
                            From {s.priceFrom}
                          </span>
                          <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
                            Details
                            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
