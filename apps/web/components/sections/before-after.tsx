"use client";

import * as React from "react";
import { SectionHeader } from "./section-header";
import { Reveal } from "@/components/motion/reveal";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";

interface BACase {
  label: string;
  img: string;
  from: string;
  to: string;
}

const cases: BACase[] = [
  { label: "Kitchen Deep Clean", img: "/before-after/kitchen.jpg", from: "Grease, grime & clutter", to: "Spotless & sanitised" },
  { label: "Living Room & Sofa", img: "/before-after/living.jpg", from: "Dust & dull fabric", to: "Fresh & restored" },
  { label: "Full Home Detailing", img: "/before-after/interior.jpg", from: "Neglected & dusty", to: "Move-in ready" },
];

export function BeforeAfter() {
  const [active, setActive] = React.useState(0);
  const c = cases[active];

  return (
    <section className="bg-ink-50/60 py-20 md:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader
          center
          eyebrow="Before & After"
          title="See the PESTOSOT difference"
          subtitle="Drag the slider to wipe away the grime — these are the real transformations our teams deliver every day."
        />

        <Reveal className="mx-auto mt-12 max-w-4xl">
          <BeforeAfterSlider
            key={c.img}
            img={c.img}
            alt={c.label}
            beforeLabel={`Before · ${c.from}`}
            afterLabel={`After · ${c.to}`}
            className="aspect-[16/10] w-full shadow-card sm:aspect-[16/9]"
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </Reveal>

        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {cases.map((cc, i) => (
            <button
              key={cc.label}
              onClick={() => setActive(i)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                active === i
                  ? "bg-navy-900 text-white"
                  : "bg-white text-ink-600 ring-1 ring-ink-200 hover:text-navy-900"
              }`}
            >
              {cc.label}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
