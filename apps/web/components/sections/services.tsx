"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { serviceCategories } from "@/lib/content";
import { SERVICES } from "@/lib/services-data";
import { SectionHeader } from "./section-header";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { useLeadModal } from "@/components/lead/lead-modal";

const popular = SERVICES.filter((s) => s.popular).slice(0, 4);

export function Services() {
  const { open } = useLeadModal();

  return (
    <section id="services" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Our Services"
          title={<>Complete protection, <span className="text-gradient">one partner</span></>}
          subtitle="From a single treatment to year-round programmes — pest control and premium deep cleaning for every kind of space."
        />

        {/* Category cards */}
        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {serviceCategories.map((c, i) => (
            <Reveal key={c.slug} delay={i * 0.06}>
              <button
                onClick={() => open(c.slug === "deep-cleaning" ? "deep-cleaning" : "pest-control")}
                className="group relative h-full w-full overflow-hidden rounded-2xl border border-ink-200 bg-white p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-float"
              >
                <div
                  className="absolute -right-10 -top-10 size-32 rounded-full opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle, rgba(20,168,98,0.25), transparent)" }}
                />
                <span className="relative grid size-13 place-items-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-soft">
                  <c.icon className="size-6" />
                </span>
                <h3 className="relative mt-5 font-display text-xl font-semibold text-navy-900">
                  {c.title}
                </h3>
                <p className="relative mt-2 text-sm leading-relaxed text-ink-600">{c.desc}</p>
                <span className="relative mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
                  Get a quote
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        {/* Popular services */}
        <div className="mt-16">
          <div className="mb-6 flex items-end justify-between">
            <h3 className="font-display text-xl font-bold text-navy-900">Most-booked services</h3>
            <Link
              href="/services"
              className="inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800"
            >
              View all services
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popular.map((s) => (
              <StaggerItem key={s.slug}>
                <Link href={`/services/${s.slug}`} className="block h-full">
                  <Card variant="tinted" interactive className="group flex h-full flex-col p-5">
                    <span className="grid size-11 place-items-center rounded-xl bg-white text-primary-600 shadow-soft">
                      <s.icon className="size-5.5" />
                    </span>
                    <h4 className="mt-4 font-display font-semibold text-navy-900">{s.name}</h4>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-600">{s.shortDesc}</p>
                    <span className="mt-4 inline-flex items-center gap-1 self-start text-sm font-semibold text-primary-700">
                      View &amp; book
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </Card>
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
