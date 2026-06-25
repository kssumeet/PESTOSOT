import type { Metadata } from "next";
import { Phone, MessageCircle, Mail, MapPin, Clock, Zap } from "lucide-react";
import {
  ADDRESS,
  BRAND,
  CONTACT,
  HOURS,
  telLink,
  whatsappLink,
} from "@pestosot/config";
import { breadcrumbSchema, jsonLd } from "@/lib/schema";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/motion/reveal";
import { LeadForm } from "@/components/lead/lead-form";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? BRAND.url;

export const metadata: Metadata = {
  title: "Contact Us — Book Pest Control & Deep Cleaning in Bangalore",
  description:
    "Get in touch with PESTOSOT. Call, WhatsApp or request a free inspection for pest control and deep cleaning anywhere in Bangalore. We respond within 2 hours.",
  alternates: { canonical: `${siteUrl}/contact` },
};

const mapQuery = encodeURIComponent(
  `${ADDRESS.street}, ${ADDRESS.locality}, ${ADDRESS.city}, ${ADDRESS.state} ${ADDRESS.postalCode}`,
);
const mapEmbed = `https://maps.google.com/maps?q=${mapQuery}&z=14&output=embed`;

const methods = [
  {
    icon: Phone,
    title: "Call us",
    value: CONTACT.phone,
    href: telLink(),
    note: "Mon–Sun, 7 AM – 9 PM",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    value: "Chat with our team",
    href: whatsappLink(),
    note: "Fastest replies",
    external: true,
  },
  {
    icon: Mail,
    title: "Email",
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    note: "We reply within a day",
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", url: siteUrl },
            { name: "Contact", url: `${siteUrl}/contact` },
          ]),
        )}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/70 to-white pt-32 pb-12 md:pt-40">
        <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-50" />
        <div className="container-px relative mx-auto max-w-7xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <div className="mt-6 max-w-2xl">
            <Badge tone="primary">Contact Us</Badge>
            <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-navy-950 sm:text-5xl">
              Let&apos;s make your space <span className="text-gradient">pest-free</span>
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">
              Call, WhatsApp or request a free inspection — our certified team responds within{" "}
              <span className="font-semibold text-navy-900">2 hours</span> across Bangalore.
            </p>
          </div>
        </div>
      </section>

      {/* Methods + Form */}
      <section className="py-12 md:py-16">
        <div className="container-px mx-auto grid max-w-7xl gap-10 lg:grid-cols-12">
          {/* Left: contact details */}
          <div className="lg:col-span-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {methods.map((m) => (
                <a
                  key={m.title}
                  href={m.href}
                  {...(m.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex items-center gap-4 rounded-2xl border border-ink-200 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-primary-300 hover:shadow-card"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-primary-50 text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                    <m.icon className="size-5.5" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium text-ink-500">{m.title}</span>
                    <span className="block font-display font-semibold text-navy-900">{m.value}</span>
                    <span className="block text-xs text-ink-400">{m.note}</span>
                  </span>
                </a>
              ))}
            </div>

            {/* Address + hours */}
            <div className="mt-4 rounded-2xl border border-ink-200 bg-white p-5">
              <div className="flex items-start gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-navy-50 text-navy-700">
                  <MapPin className="size-5.5" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink-500">Visit us</p>
                  <p className="font-display font-semibold text-navy-900">
                    {ADDRESS.street}
                  </p>
                  <p className="text-sm text-ink-600">
                    {ADDRESS.locality}, {ADDRESS.city}, {ADDRESS.state} {ADDRESS.postalCode}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 border-t border-ink-100 pt-4 text-sm text-ink-600">
                <span className="inline-flex items-center gap-2">
                  <Clock className="size-4 text-primary-600" /> {HOURS.display}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Zap className="size-4 text-amber-500" /> {HOURS.emergency}
                </span>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <Reveal direction="left" className="lg:col-span-7">
            <div className="overflow-hidden rounded-3xl border border-ink-200 bg-white shadow-card">
              <LeadForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Map */}
      <section className="pb-16 md:pb-24">
        <div className="container-px mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-ink-200 shadow-card">
            <iframe
              title={`${BRAND.name} location map`}
              src={mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[360px] w-full md:h-[420px]"
            />
          </div>
        </div>
      </section>
    </>
  );
}
