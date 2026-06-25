import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Phone, MessageCircle, Clock, ArrowLeft } from "lucide-react";
import { CONTACT, STATS, telLink, whatsappLink } from "@pestosot/config";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Thank You — Inspection Requested",
  description: "Your inspection request has been received. Our team will call you shortly.",
  robots: { index: false, follow: false },
};

const steps = [
  { icon: Phone, title: "We call you", desc: `Our team confirms your details within ${STATS.responseTimeHours} hours.` },
  { icon: Clock, title: "We schedule a visit", desc: "Pick a slot that suits you — including weekends." },
  { icon: CheckCircle2, title: "Free inspection", desc: "A certified technician inspects and shares a fixed quote." },
];

export default function ThankYouPage() {
  return (
    <section className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-gradient-to-b from-primary-50/70 to-white px-4 py-28">
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 opacity-50" />
      <div className="relative mx-auto max-w-xl text-center">
        <div className="mx-auto grid size-20 place-items-center rounded-full bg-primary-100 text-primary-700">
          <CheckCircle2 className="size-11" />
        </div>
        <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-navy-950">
          Request received 🎉
        </h1>
        <p className="mt-3 text-lg text-ink-600">
          Thank you for choosing PESTOSOT. Your free inspection request is in — our team will
          reach out shortly to confirm everything.
        </p>

        <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="rounded-2xl border border-ink-200 bg-white p-5 shadow-soft">
              <span className="grid size-10 place-items-center rounded-xl bg-primary-50 text-primary-600">
                <s.icon className="size-5" />
              </span>
              <p className="mt-3 text-xs font-semibold text-primary-700">Step {i + 1}</p>
              <p className="font-display font-semibold text-navy-900">{s.title}</p>
              <p className="mt-1 text-sm text-ink-600">{s.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <a href={telLink()}>
            <Button size="lg" variant="secondary">
              <Phone className="size-4" /> {CONTACT.phone}
            </Button>
          </a>
          <a href={whatsappLink("Hi PESTOSOT, I just requested an inspection.")} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-[#25D366] hover:bg-[#1faa52]">
              <MessageCircle className="size-4" /> WhatsApp us
            </Button>
          </a>
        </div>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-ink-500 hover:text-navy-900"
        >
          <ArrowLeft className="size-4" /> Back to home
        </Link>
      </div>
    </section>
  );
}
