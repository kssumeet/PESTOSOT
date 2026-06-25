import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Linkedin, Youtube, Clock } from "lucide-react";
import { ADDRESS, BRAND, CONTACT, HOURS, SOCIAL, telLink } from "@pestosot/config";
import { industries } from "@/lib/content";
import { SERVICES } from "@/lib/services-data";
import { Logo } from "./logo";

const social = [
  { href: SOCIAL.instagram, icon: Instagram, label: "Instagram" },
  { href: SOCIAL.facebook, icon: Facebook, label: "Facebook" },
  { href: SOCIAL.linkedin, icon: Linkedin, label: "LinkedIn" },
  { href: SOCIAL.youtube, icon: Youtube, label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Logo light />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-navy-300">
              {BRAND.description}
            </p>
            <div className="mt-6 space-y-3 text-sm">
              <a href={telLink()} className="flex items-center gap-3 text-navy-200 hover:text-white">
                <Phone className="size-4 text-primary-400" /> {CONTACT.phone}
              </a>
              <a
                href={`mailto:${CONTACT.email}`}
                className="flex items-center gap-3 text-navy-200 hover:text-white"
              >
                <Mail className="size-4 text-primary-400" /> {CONTACT.email}
              </a>
              <p className="flex items-start gap-3 text-navy-300">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary-400" />
                {ADDRESS.street}, {ADDRESS.locality}, {ADDRESS.city} {ADDRESS.postalCode}
              </p>
              <p className="flex items-center gap-3 text-navy-300">
                <Clock className="size-4 text-primary-400" /> {HOURS.display} · {HOURS.emergency}
              </p>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-8">
            <FooterCol
              title="Pest Control"
              links={SERVICES.filter((s) => s.category === "pest-control").map((s) => ({
                label: s.name,
                href: `/services/${s.slug}`,
              }))}
            />
            <FooterCol
              title="Deep Cleaning"
              links={SERVICES.filter((s) => s.category === "deep-cleaning").map((s) => ({
                label: s.name,
                href: `/services/${s.slug}`,
              }))}
            />
            <FooterCol
              title="Industries"
              links={industries.map((i) => ({ label: i.name, href: "/#industries" }))}
            />
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-navy-400">
            © {new Date().getFullYear()} {BRAND.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid size-9 place-items-center rounded-full bg-white/5 text-navy-200 transition-colors hover:bg-primary-600 hover:text-white"
              >
                <s.icon className="size-4" />
              </a>
            ))}
          </div>
          <div className="flex gap-5 text-xs text-navy-400">
            <Link href="/contact" className="hover:text-white">Contact</Link>
            <Link href="#" className="hover:text-white">Privacy</Link>
            <Link href="#" className="hover:text-white">Terms</Link>
            <Link href="/admin/login" className="hover:text-white">Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h4 className="font-display text-sm font-semibold text-white">{title}</h4>
      <ul className="mt-4 space-y-2.5">
        {links.slice(0, 6).map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-sm text-navy-300 transition-colors hover:text-primary-400"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
