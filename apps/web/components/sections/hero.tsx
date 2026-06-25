"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Star,
  ShieldCheck,
  Leaf,
  Zap,
  ArrowRight,
  Phone,
  ChevronDown,
  BadgeCheck,
} from "lucide-react";
import { CONTACT, STATS, telLink } from "@pestosot/config";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/motion/magnetic";
import { AuroraBackground } from "@/components/motion/aurora";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { useLeadModal } from "@/components/lead/lead-modal";

const trustPills = [
  { icon: ShieldCheck, label: "Govt. Licensed" },
  { icon: Leaf, label: "Eco-Friendly" },
  { icon: Zap, label: "2-Hr Response" },
];

const float = {
  animate: { y: [0, -10, 0] },
  transition: { duration: 6, repeat: Infinity, ease: "easeInOut" as const },
};

export function Hero() {
  const { open } = useLeadModal();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/70 via-white to-white pt-32 pb-16 md:pt-40 md:pb-24">
      <AuroraBackground intensity="vivid" className="mask-fade-b" />
      <div className="bg-grid animate-grid-pan mask-fade-b pointer-events-none absolute inset-0 opacity-40" />
      {/* floating orbs */}
      <div className="animate-orb pointer-events-none absolute left-[8%] top-[28%] size-3 rounded-full bg-primary-400/60 blur-[1px]" />
      <div className="animate-float-slow pointer-events-none absolute right-[14%] top-[20%] size-2 rounded-full bg-navy-400/50" />
      <div className="animate-orb pointer-events-none absolute bottom-[18%] left-[40%] size-2.5 rounded-full bg-primary-500/40 [animation-delay:3s]" />

      <div className="container-px relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-8">
        {/* Copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-white/80 px-3 py-1.5 text-sm font-medium text-primary-700 shadow-soft backdrop-blur"
          >
            <span className="flex -space-x-1">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="size-5 rounded-full border-2 border-white bg-gradient-to-br from-primary-300 to-primary-600"
                />
              ))}
            </span>
            Trusted by {STATS.customersServed.toLocaleString("en-IN")}+ homes &amp; businesses
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-navy-950 sm:text-5xl lg:text-6xl"
          >
            A home that&apos;s
            <br />
            <span className="text-gradient">pest-free &amp; spotless.</span>
            <br />
            Guaranteed.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="mt-5 max-w-md text-lg leading-relaxed text-ink-600"
          >
            Bangalore&apos;s premium pest control &amp; deep cleaning. Certified, child- &amp;
            pet-safe treatments with assured results — book a free inspection and we&apos;ll
            respond within {STATS.responseTimeHours} hours.
          </motion.p>

          <div className="mt-6 flex flex-wrap gap-2.5">
            {trustPills.map((p) => (
              <span
                key={p.label}
                className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-sm font-medium text-navy-800 shadow-soft ring-1 ring-ink-100"
              >
                <p.icon className="size-4 text-primary-600" /> {p.label}
              </span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Button size="xl" onClick={() => open()}>
                Book Free Inspection <ArrowRight className="size-4" />
              </Button>
            </Magnetic>
            <a href={telLink()}>
              <Button size="xl" variant="outline">
                <Phone className="size-4 text-primary-600" /> {CONTACT.phone}
              </Button>
            </a>
          </div>

          <div className="mt-7 flex items-center gap-3">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4.5 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <p className="text-sm text-ink-600">
              <span className="font-semibold text-navy-900">{STATS.googleRating}/5</span> from{" "}
              {STATS.googleReviews.toLocaleString("en-IN")}+ Google reviews
            </p>
          </div>
        </div>

        {/* Visual: the outcome we deliver */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="relative mx-auto w-full max-w-xl lg:max-w-none"
        >
          {/* soft brand glow behind frame */}
          <div
            className="pointer-events-none absolute -inset-6 -z-10 rounded-[2.5rem] opacity-60 blur-2xl"
            style={{ background: "radial-gradient(circle at 70% 30%, rgba(20,168,98,0.30), transparent 60%)" }}
          />

          <BeforeAfterSlider
            img="/hero/home.jpg"
            alt="A living room transformed by PESTOSOT pest control and deep cleaning"
            beforeLabel="Before · neglected"
            afterLabel="After · spotless & protected"
            className="aspect-[4/3] w-full shadow-float ring-1 ring-black/5"
            rounded="rounded-[2rem]"
            priority
            hint
          />

          {/* Floating proof — rating */}
          <motion.div
            {...float}
            className="pointer-events-none absolute -left-4 top-10 z-10 flex items-center gap-3 rounded-2xl bg-white/90 p-3 pr-4 shadow-float ring-1 ring-ink-100 backdrop-blur sm:-left-6"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-amber-500/10">
              <Star className="size-5 fill-amber-500 text-amber-500" />
            </span>
            <div>
              <p className="text-sm font-bold leading-tight text-navy-900">{STATS.googleRating} / 5</p>
              <p className="text-xs text-ink-500">{STATS.googleReviews.toLocaleString("en-IN")}+ reviews</p>
            </div>
          </motion.div>

          {/* Floating proof — guarantee */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            className="pointer-events-none absolute -bottom-5 -right-2 z-10 flex items-center gap-3 rounded-2xl bg-white/90 p-3 pr-4 shadow-float ring-1 ring-ink-100 backdrop-blur sm:right-4"
          >
            <span className="grid size-10 place-items-center rounded-xl bg-primary-100 text-primary-700">
              <ShieldCheck className="size-5" />
            </span>
            <div>
              <p className="text-sm font-bold leading-tight text-navy-900">Pest-free, guaranteed</p>
              <p className="text-xs text-ink-500">Free re-treatment in warranty</p>
            </div>
          </motion.div>

          {/* Floating proof — certified (desktop only, keeps mobile clean) */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
            className="pointer-events-none absolute -right-5 top-1/2 z-10 hidden items-center gap-2 rounded-full bg-navy-900 px-3.5 py-2 text-xs font-semibold text-white shadow-float lg:inline-flex"
          >
            <BadgeCheck className="size-4 text-primary-400" /> Certified &amp; insured
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#services"
        aria-label="Scroll to services"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-ink-400 lg:flex"
      >
        <span className="text-xs font-medium uppercase tracking-widest">Scroll</span>
        <ChevronDown className="size-4 animate-bounce" />
      </motion.a>
    </section>
  );
}
