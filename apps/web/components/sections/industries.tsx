"use client";

import { industries } from "@/lib/content";
import { SectionHeader } from "./section-header";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { useLeadModal } from "@/components/lead/lead-modal";

export function Industries() {
  const { open } = useLeadModal();

  return (
    <section
      id="industries"
      className="scroll-mt-24 overflow-hidden bg-navy-950 py-20 text-white md:py-28"
    >
      <div className="container-px mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-300">
              Industries We Serve
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Compliance-ready hygiene for every sector
            </h2>
            <p className="mt-4 max-w-md text-lg leading-relaxed text-navy-200">
              Audit-ready programmes with documentation for FSSAI, healthcare and corporate
              standards — delivered by trained technicians who understand your environment.
            </p>
            <Button size="lg" variant="white" className="mt-7" onClick={() => open()}>
              Talk to our commercial team
            </Button>
          </div>

          <Stagger className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-7 lg:grid-cols-4">
            {industries.map((ind) => (
              <StaggerItem key={ind.slug}>
                <div className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-primary-400/50 hover:bg-white/[0.08]">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary-500/15 text-primary-300 transition-colors group-hover:bg-primary-500 group-hover:text-white">
                    <ind.icon className="size-5.5" />
                  </span>
                  <p className="text-sm font-semibold leading-snug text-white">{ind.name}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
