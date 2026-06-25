"use client";

import { Check, Sparkles } from "lucide-react";
import { amcPlans } from "@/lib/content";
import { SectionHeader } from "./section-header";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLeadModal } from "@/components/lead/lead-modal";

export function Plans() {
  const { open } = useLeadModal();

  return (
    <section id="plans" className="scroll-mt-24 bg-ink-50/60 py-20 md:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader
          center
          eyebrow="Annual Maintenance"
          title="Year-round protection plans"
          subtitle="Stay covered with scheduled visits, priority response and free re-services — pick the shield that fits your space."
        />

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {amcPlans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.08}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-3xl border p-7 transition-all",
                  plan.popular
                    ? "border-primary-300 bg-white shadow-float lg:-translate-y-3"
                    : "border-ink-200 bg-white shadow-card",
                )}
              >
                {plan.popular && (
                  <span className="absolute -top-3 left-1/2 inline-flex -translate-x-1/2 items-center gap-1 rounded-full bg-primary-600 px-3 py-1 text-xs font-semibold text-white shadow-glow">
                    <Sparkles className="size-3.5" /> Most Popular
                  </span>
                )}
                <h3 className="font-display text-xl font-bold text-navy-900">{plan.name}</h3>
                <p className="mt-1 text-sm text-ink-500">{plan.tagline}</p>
                <p className="mt-5 font-display text-2xl font-extrabold text-navy-950">
                  {plan.priceNote}
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-ink-700">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary-100 text-primary-700">
                        <Check className="size-3.5" />
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Button
                  className="mt-7 w-full"
                  variant={plan.popular ? "primary" : "outline"}
                  size="lg"
                  onClick={() => open("amc")}
                >
                  {plan.priceNote.includes("Custom") ? "Request a quote" : "Get this plan"}
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
