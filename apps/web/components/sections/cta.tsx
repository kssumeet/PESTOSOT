"use client";

import { CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { CONTACT, telLink, whatsappLink } from "@pestosot/config";
import { Reveal } from "@/components/motion/reveal";
import { AuroraBackground } from "@/components/motion/aurora";
import { LeadForm } from "@/components/lead/lead-form";

const promises = [
  "Free, no-obligation site inspection",
  "Transparent fixed quote — no hidden charges",
  "Child- & pet-safe, certified treatments",
  "Service warranty with free re-treatment",
];

export function Cta() {
  return (
    <section id="book" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[2rem] bg-navy-950 px-6 py-12 md:px-12 md:py-16">
          {/* animated glow */}
          <AuroraBackground intensity="dark" />
          <div className="bg-grid animate-grid-pan pointer-events-none absolute inset-0 opacity-[0.07]" />

          <div className="relative grid gap-10 lg:grid-cols-2 lg:items-center">
            <div className="text-white">
              <Reveal>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary-300">
                  Book in 60 seconds
                </span>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
                  Ready for a pest-free, spotless space?
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-4 max-w-md text-lg text-navy-200">
                  Get your free inspection scheduled today. Our certified team responds fast and
                  treats it right — the first time.
                </p>
              </Reveal>

              <ul className="mt-7 space-y-3">
                {promises.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-navy-100">
                    <CheckCircle2 className="size-5 shrink-0 text-primary-400" />
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={telLink()}
                  className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-navy-900 transition-transform hover:scale-105"
                >
                  <Phone className="size-4 text-primary-600" /> {CONTACT.phone}
                </a>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-transform hover:scale-105"
                >
                  <MessageCircle className="size-4" /> WhatsApp us
                </a>
              </div>
            </div>

            <Reveal direction="left">
              <div className="rounded-3xl bg-white p-2 shadow-float">
                <div className="rounded-[1.25rem] bg-white p-5 sm:p-6">
                  <h3 className="font-display text-xl font-bold text-navy-900">
                    Request your free inspection
                  </h3>
                  <p className="mt-1 text-sm text-ink-500">We&apos;ll call to confirm within 2 hours.</p>
                  <div className="mt-5">
                    <LeadForm compact />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
