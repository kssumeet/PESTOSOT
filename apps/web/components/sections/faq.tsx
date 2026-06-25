import { faqs } from "@/lib/content";
import { SectionHeader } from "./section-header";
import { Reveal } from "@/components/motion/reveal";
import { Accordion } from "@/components/ui/accordion";

export function Faq() {
  return (
    <section id="faq" className="scroll-mt-24 py-20 md:py-28">
      <div className="container-px mx-auto grid max-w-7xl gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <SectionHeader
            eyebrow="FAQ"
            title="Answers, before you ask"
            subtitle="Everything you need to know about our treatments, safety and process. Still unsure? Our team is one call away."
          />
        </div>
        <Reveal direction="left" className="lg:col-span-7">
          <Accordion items={faqs} />
        </Reveal>
      </div>
    </section>
  );
}
