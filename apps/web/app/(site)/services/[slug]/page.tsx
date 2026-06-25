import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowUpRight,
  Check,
  Phone,
  ShieldCheck,
  AlertTriangle,
  SearchCheck,
} from "lucide-react";
import { BRAND, CONTACT, telLink } from "@pestosot/config";
import {
  SERVICES,
  getService,
  getRelated,
  CATEGORY_LABELS,
} from "@/lib/services-data";
import {
  serviceSchema,
  breadcrumbSchema,
  jsonLd,
} from "@/lib/schema";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Accordion } from "@/components/ui/accordion";
import { Reveal } from "@/components/motion/reveal";
import { BookButton } from "@/components/lead/book-button";
import { Button } from "@/components/ui/button";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? BRAND.url;

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) return { title: "Service not found" };
  const url = `${siteUrl}/services/${svc.slug}`;
  return {
    title: svc.metaTitle,
    description: svc.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: svc.metaTitle,
      description: svc.metaDescription,
      url,
      type: "website",
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const svc = getService(slug);
  if (!svc) notFound();

  const url = `${siteUrl}/services/${svc.slug}`;
  const related = getRelated(svc.slug);
  const catLabel = CATEGORY_LABELS[svc.category];

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLd(
          serviceSchema({
            name: svc.name,
            description: svc.metaDescription,
            url,
            category: catLabel,
            faqs: svc.faqs,
          }),
        )}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLd(
          breadcrumbSchema([
            { name: "Home", url: siteUrl },
            { name: "Services", url: `${siteUrl}/services` },
            { name: svc.name, url },
          ]),
        )}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/70 to-white pt-32 pb-14 md:pt-40">
        <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-50" />
        <div
          className="pointer-events-none absolute -right-32 top-10 h-[420px] w-[420px] rounded-full opacity-50 blur-3xl"
          style={{ background: "radial-gradient(circle, rgba(20,168,98,0.22), transparent 65%)" }}
        />
        <div className="container-px relative mx-auto max-w-7xl">
          <Breadcrumb
            items={[
              { label: "Home", href: "/" },
              { label: "Services", href: "/services" },
              { label: svc.name },
            ]}
          />
          <div className="mt-6 grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2">
                <Badge tone="primary">{catLabel}</Badge>
                {svc.popular && <Badge tone="amber">Popular</Badge>}
              </div>
              <h1 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-navy-950 sm:text-5xl">
                {svc.name} <span className="text-gradient">in Bangalore</span>
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-600">{svc.tagline}</p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <BookButton size="xl" presetService={svc.slug} />
                <a href={telLink()}>
                  <Button size="xl" variant="outline">
                    <Phone className="size-4 text-primary-600" /> {CONTACT.phone}
                  </Button>
                </a>
              </div>
              <p className="mt-4 text-sm text-ink-500">
                Starting from <span className="font-semibold text-navy-900">{svc.priceFrom}</span> ·
                Free inspection · Service warranty
              </p>
            </div>

            {/* Quick facts card */}
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-card">
                <span className="grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-soft">
                  <svc.icon className="size-7" />
                </span>
                <p className="mt-4 text-sm font-semibold text-ink-500">Why choose PESTOSOT for this</p>
                <ul className="mt-3 space-y-2.5">
                  {svc.benefits.slice(0, 4).map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-ink-700">
                      <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-primary-100 text-primary-700">
                        <Check className="size-3.5" />
                      </span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-14 md:py-20">
        <div className="container-px mx-auto max-w-3xl">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              The problem we solve
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-600">{svc.problem}</p>
          </Reveal>
        </div>
      </section>

      {/* Causes + Signs */}
      <section className="bg-ink-50/60 py-14 md:py-20">
        <div className="container-px mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-2xl border border-ink-200 bg-white p-7">
              <span className="grid size-11 place-items-center rounded-xl bg-amber-500/10 text-amber-600">
                <AlertTriangle className="size-5.5" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-navy-900">
                Common causes
              </h3>
              <ul className="mt-4 space-y-3">
                {svc.causes.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-700">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-amber-500" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-2xl border border-ink-200 bg-white p-7">
              <span className="grid size-11 place-items-center rounded-xl bg-safety-500/10 text-safety-500">
                <SearchCheck className="size-5.5" />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-navy-900">
                Signs to watch for
              </h3>
              <ul className="mt-4 space-y-3">
                {svc.signs.map((c) => (
                  <li key={c} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-700">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-safety-500" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="py-14 md:py-20">
        <div className="container-px mx-auto max-w-5xl">
          <Reveal>
            <h2 className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              Our {svc.name.toLowerCase()} process
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {svc.process.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-ink-200 bg-white p-6">
                  <span className="font-display text-3xl font-extrabold text-primary-200">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 font-display font-semibold text-navy-900">{step.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-600">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits + Safety */}
      <section className="bg-navy-950 py-14 text-white md:py-20">
        <div className="container-px mx-auto grid max-w-5xl gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-display text-2xl font-bold sm:text-3xl">What you get</h2>
            <ul className="mt-6 space-y-3.5">
              {svc.benefits.map((b) => (
                <li key={b} className="flex items-start gap-3 text-navy-100">
                  <Check className="mt-0.5 size-5 shrink-0 text-primary-400" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7">
            <span className="grid size-11 place-items-center rounded-xl bg-primary-500/15 text-primary-300">
              <ShieldCheck className="size-5.5" />
            </span>
            <h3 className="mt-4 font-display text-xl font-semibold">Safety first</h3>
            <p className="mt-3 leading-relaxed text-navy-200">{svc.safety}</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 md:py-20">
        <div className="container-px mx-auto grid max-w-5xl gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Badge tone="primary">FAQ</Badge>
            <h2 className="mt-4 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
              {svc.name} questions
            </h2>
            <p className="mt-3 text-ink-600">
              Still unsure? Our team is one call away — book a free inspection any time.
            </p>
            <BookButton size="lg" className="mt-6" presetService={svc.slug} />
          </div>
          <div className="lg:col-span-8">
            <Accordion items={svc.faqs} />
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-ink-50/60 py-14 md:py-20">
          <div className="container-px mx-auto max-w-7xl">
            <h2 className="font-display text-2xl font-bold text-navy-900">Related services</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/services/${r.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-ink-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary-300 hover:shadow-float"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-ink-100 text-primary-600">
                    <r.icon className="size-5.5" />
                  </span>
                  <h3 className="mt-4 font-display font-semibold text-navy-900">{r.name}</h3>
                  <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-600">{r.shortDesc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
                    View service
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="py-16 md:py-24">
        <div className="container-px mx-auto max-w-5xl">
          <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-600 to-primary-800 px-6 py-12 text-center text-white md:px-12">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.08]" />
            <h2 className="relative font-display text-3xl font-bold sm:text-4xl">
              Ready to book {svc.name.toLowerCase()}?
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-primary-50">
              Free inspection, transparent pricing and a service warranty — get started in under
              a minute.
            </p>
            <div className="relative mt-7 flex flex-wrap justify-center gap-3">
              <BookButton size="xl" variant="white" presetService={svc.slug} />
              <a href={telLink()}>
                <Button size="xl" variant="secondary" className="bg-navy-900/40 hover:bg-navy-900/60">
                  <Phone className="size-4" /> {CONTACT.phone}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
