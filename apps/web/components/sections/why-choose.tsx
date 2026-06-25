import { CheckCircle2 } from "lucide-react";
import { whyChoose } from "@/lib/content";
import { SectionHeader } from "./section-header";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";

export function WhyChoose() {
  return (
    <section className="relative bg-ink-50/60 py-20 md:py-28">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeader
          eyebrow="Why PESTOSOT"
          title="Built on trust, safety and results"
          subtitle="We pair certified expertise with a relentless focus on safety and outcomes — so you can forget about pests and get back to life."
        />

        <Stagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {whyChoose.map((item) => (
            <StaggerItem key={item.title}>
              <Card variant="outline" interactive className="group h-full p-6">
                <div className="flex items-start gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                    <CheckCircle2 className="size-5.5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold text-navy-900">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{item.desc}</p>
                  </div>
                </div>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
