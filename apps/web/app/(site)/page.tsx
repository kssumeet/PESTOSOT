import { faqSchema, jsonLd } from "@/lib/schema";
import { Hero } from "@/components/sections/hero";
import { SocialProof } from "@/components/sections/social-proof";
import { WhyChoose } from "@/components/sections/why-choose";
import { Services } from "@/components/sections/services";
import { Industries } from "@/components/sections/industries";
import { Process } from "@/components/sections/process";
import { BeforeAfter } from "@/components/sections/before-after";
import { Testimonials } from "@/components/sections/testimonials";
import { Plans } from "@/components/sections/plans";
import { Locations } from "@/components/sections/locations";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLd(faqSchema())}
      />
      <Hero />
      <SocialProof />
      <WhyChoose />
      <Services />
      <Industries />
      <Process />
      <BeforeAfter />
      <Testimonials />
      <Plans />
      <Locations />
      <Faq />
      <Cta />
    </>
  );
}
