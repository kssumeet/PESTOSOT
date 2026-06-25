"use client";

import { MapPin, ArrowRight } from "lucide-react";
import { PRIMARY_CITY, STATS } from "@pestosot/config";
import { SectionHeader } from "./section-header";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/motion/aurora";
import { useLeadModal } from "@/components/lead/lead-modal";

export function Locations() {
  const { open } = useLeadModal();

  return (
    <section id="locations" className="relative scroll-mt-24 overflow-hidden py-20 md:py-28">
      <AuroraBackground intensity="subtle" />
      <div className="container-px relative z-10 mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-5">
            <SectionHeader
              eyebrow="Service Locations"
              title={
                <>
                  Serving all of <span className="text-gradient">{PRIMARY_CITY.name}</span>
                </>
              }
              subtitle={`Local technicians, ${STATS.responseTimeHours}-hour response and area-specific expertise across ${PRIMARY_CITY.localities.length}+ neighbourhoods — with more cities coming soon.`}
            />
            <Button size="lg" className="mt-7" onClick={() => open()}>
              Check availability in your area <ArrowRight className="size-4" />
            </Button>
          </div>

          <Reveal direction="left" className="lg:col-span-7">
            <div className="flex flex-wrap gap-2.5">
              {PRIMARY_CITY.localities.map((loc) => (
                <button
                  key={loc}
                  onClick={() => open()}
                  className="group inline-flex items-center gap-1.5 rounded-full border border-ink-200 bg-white px-3.5 py-2 text-sm font-medium text-ink-700 transition-all hover:border-primary-300 hover:bg-primary-50 hover:text-primary-700"
                >
                  <MapPin className="size-3.5 text-primary-500" />
                  {loc}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
