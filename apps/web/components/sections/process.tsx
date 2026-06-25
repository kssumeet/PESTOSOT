"use client";

import * as React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { processSteps } from "@/lib/content";
import { SectionHeader } from "./section-header";

export function Process() {
  const root = React.useRef<HTMLDivElement>(null);

  React.useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Scrubbed progress line
      gsap.fromTo(
        ".process-line-fill",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".process-track",
            start: "top 70%",
            end: "bottom 75%",
            scrub: 0.6,
          },
        },
      );

      // Step reveals
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          y: 32,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%" },
        });
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={root} className="scroll-mt-24 py-20 md:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader
          center
          eyebrow="How It Works"
          title="A precise, six-step process"
          subtitle="No guesswork — just a transparent, professional workflow from first call to final follow-up."
        />

        <div className="process-track relative mx-auto mt-16 max-w-3xl">
          {/* Timeline rail */}
          <div className="absolute left-[27px] top-2 h-[calc(100%-1rem)] w-0.5 bg-ink-200 md:left-1/2 md:-translate-x-1/2">
            <div className="process-line-fill h-full w-full origin-top bg-gradient-to-b from-primary-500 to-primary-700" />
          </div>

          <ol className="space-y-8">
            {processSteps.map((s, i) => (
              <li
                key={s.step}
                className={`process-step relative flex items-start gap-5 md:w-1/2 ${
                  i % 2 === 0 ? "md:ml-auto md:flex-row-reverse md:pl-10" : "md:pr-10 md:text-right md:flex-row-reverse"
                }`}
              >
                <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl bg-white font-display text-lg font-bold text-primary-700 shadow-card ring-1 ring-primary-100">
                  {s.step}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-display text-lg font-semibold text-navy-900">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
