"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X, Phone, ChevronDown, LogIn } from "lucide-react";
import { CONTACT, telLink } from "@pestosot/config";
import { serviceCategories, industries } from "@/lib/content";
import { SERVICES } from "@/lib/services-data";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { useLeadModal } from "@/components/lead/lead-modal";
import { useCustomerAuth } from "@/components/account/customer-auth";

const NAV = [
  { label: "Services", href: "/services", mega: "services" as const },
  { label: "Industries", href: "/#industries", mega: "industries" as const },
  { label: "Process", href: "/#process" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "Plans", href: "/#plans" },
  { label: "Contact", href: "/contact" },
];

const megaPopular = SERVICES.filter((s) => s.popular).slice(0, 6);

export function Navbar() {
  const { open } = useLeadModal();
  const { customer, status } = useCustomerAuth();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [mega, setMega] = React.useState<"services" | "industries" | null>(null);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  React.useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[90] transition-all duration-300",
        scrolled ? "py-2.5" : "py-4",
      )}
      onMouseLeave={() => setMega(null)}
    >
      <div className="container-px mx-auto max-w-7xl">
        <nav
          className={cn(
            "flex items-center justify-between gap-4 rounded-2xl px-4 transition-all duration-300",
            scrolled ? "glass py-2 shadow-card" : "bg-transparent py-2.5",
          )}
        >
          <Link href="/" aria-label="PESTOSOT home" onClick={() => setMega(null)}>
            <Logo />
          </Link>

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((item) => (
              <li key={item.label} onMouseEnter={() => setMega(item.mega ?? null)}>
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-100 hover:text-navy-900"
                >
                  {item.label}
                  {item.mega && <ChevronDown className="size-3.5 opacity-60" />}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={telLink()}
              className="hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-navy-900 hover:bg-ink-100 xl:inline-flex"
            >
              <Phone className="size-4 text-primary-600" />
              {CONTACT.phone}
            </a>
            {status === "authed" && customer ? (
              <Link
                href="/account"
                className="hidden items-center gap-2 rounded-full px-2.5 py-1.5 text-sm font-medium text-navy-900 transition-colors hover:bg-ink-100 lg:inline-flex"
              >
                <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-xs font-bold text-white">
                  {customer.name.charAt(0)}
                </span>
                My account
              </Link>
            ) : (
              <Link
                href="/login"
                className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-ink-100 hover:text-navy-900 lg:inline-flex"
              >
                <LogIn className="size-4" /> Log in
              </Link>
            )}
            <Button size="md" className="hidden sm:inline-flex" onClick={() => open()}>
              Book Inspection
            </Button>
            <button
              className="grid size-10 place-items-center rounded-full text-navy-900 hover:bg-ink-100 lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </nav>

        {/* Mega menu */}
        <AnimatePresence>
          {mega && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full hidden px-4 lg:block"
              onMouseEnter={() => setMega(mega)}
            >
              <div className="mx-auto mt-2 max-w-7xl overflow-hidden rounded-2xl border border-ink-200 bg-white p-6 shadow-float">
                {mega === "services" ? (
                  <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-4">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-400">
                        Categories
                      </p>
                      <div className="space-y-1">
                        {serviceCategories.map((c) => (
                          <Link
                            key={c.slug}
                            href="/services"
                            onClick={() => setMega(null)}
                            className="flex items-start gap-3 rounded-xl p-2.5 transition-colors hover:bg-primary-50"
                          >
                            <c.icon className="mt-0.5 size-5 text-primary-600" />
                            <span>
                              <span className="block text-sm font-semibold text-navy-900">
                                {c.title}
                              </span>
                              <span className="block text-xs text-ink-500">{c.desc}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-8">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-ink-400">
                        Popular services
                      </p>
                      <div className="grid grid-cols-2 gap-1">
                        {megaPopular.map((s) => (
                          <Link
                            key={s.slug}
                            href={`/services/${s.slug}`}
                            onClick={() => setMega(null)}
                            className="flex items-center gap-3 rounded-xl p-2.5 transition-colors hover:bg-ink-50"
                          >
                            <span className="grid size-9 place-items-center rounded-lg bg-ink-100 text-primary-600">
                              <s.icon className="size-4.5" />
                            </span>
                            <span className="text-sm font-medium text-ink-800">{s.name}</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-4 gap-2">
                    {industries.map((i) => (
                      <Link
                        key={i.slug}
                        href="/#industries"
                        onClick={() => setMega(null)}
                        className="flex items-center gap-3 rounded-xl p-3 transition-colors hover:bg-primary-50"
                      >
                        <i.icon className="size-5 text-primary-600" />
                        <span className="text-sm font-medium text-navy-900">{i.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] lg:hidden"
          >
            <div
              className="absolute inset-0 bg-navy-950/50 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 flex h-full w-[82%] max-w-sm flex-col bg-white p-6"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="grid size-10 place-items-center rounded-full hover:bg-ink-100"
                >
                  <X className="size-6" />
                </button>
              </div>
              <ul className="mt-8 space-y-1">
                {NAV.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl px-4 py-3 text-lg font-medium text-navy-900 hover:bg-ink-100"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto space-y-3">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={() => {
                    setMobileOpen(false);
                    open();
                  }}
                >
                  Book Free Inspection
                </Button>
                <a
                  href={telLink()}
                  className="flex items-center justify-center gap-2 rounded-full border border-ink-200 py-3 font-semibold text-navy-900"
                >
                  <Phone className="size-4 text-primary-600" /> {CONTACT.phone}
                </a>
                {status === "authed" && customer ? (
                  <Link
                    href="/account"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-full border border-ink-200 py-3 font-semibold text-navy-900"
                  >
                    <LogIn className="size-4 text-primary-600" /> My account
                  </Link>
                ) : (
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="font-medium text-navy-900 hover:text-primary-700"
                    >
                      Log in
                    </Link>
                    <span className="text-ink-300">·</span>
                    <Link
                      href="/signup"
                      onClick={() => setMobileOpen(false)}
                      className="font-medium text-navy-900 hover:text-primary-700"
                    >
                      Sign up
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
