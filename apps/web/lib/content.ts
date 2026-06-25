/**
 * Centralised homepage / SEO content. In later phases this moves behind the
 * CMS + database; for Phase 1 it is the single source of truth for copy.
 */
import {
  Bug,
  Rat,
  Bird,
  ShieldCheck,
  SprayCan,
  Sofa,
  Utensils,
  Building2,
  Hospital,
  Warehouse,
  School,
  Hotel,
  Factory,
  Store,
  Home,
  type LucideIcon,
} from "lucide-react";

export interface ServiceItem {
  slug: string;
  name: string;
  blurb: string;
  icon: LucideIcon;
  popular?: boolean;
}

export const serviceCategories = [
  {
    slug: "residential",
    title: "Residential Pest Control",
    desc: "Discreet, family-safe treatments for apartments, villas and independent homes.",
    icon: Home,
  },
  {
    slug: "commercial",
    title: "Commercial Pest Control",
    desc: "Audit-ready hygiene programmes for offices, retail and hospitality.",
    icon: Building2,
  },
  {
    slug: "industrial",
    title: "Industrial Pest Management",
    desc: "Integrated pest management for warehouses, factories and food processing.",
    icon: Factory,
  },
  {
    slug: "deep-cleaning",
    title: "Premium Deep Cleaning",
    desc: "Detailed home & facility deep cleaning with hospital-grade sanitisation.",
    icon: SprayCan,
  },
  {
    slug: "amc",
    title: "Annual Maintenance",
    desc: "Year-round protection plans with scheduled visits and a service warranty.",
    icon: ShieldCheck,
  },
] as const;

export const popularServices: ServiceItem[] = [
  { slug: "cockroach-control", name: "Cockroach Control", blurb: "Gel + flush-out treatment that targets nests, not just the visible roaches.", icon: Bug, popular: true },
  { slug: "termite-control", name: "Termite Control", blurb: "Anti-termite barrier & drill-fill-seal with up to 5-year warranty.", icon: ShieldCheck, popular: true },
  { slug: "rodent-control", name: "Rodent Control", blurb: "Bait stations, proofing and monitoring to keep rats & mice out for good.", icon: Rat, popular: true },
  { slug: "mosquito-control", name: "Mosquito Control", blurb: "Fogging, larviciding and source reduction for dengue-free spaces.", icon: Bug },
  { slug: "bed-bug-control", name: "Bed Bug Control", blurb: "Heat + targeted treatment that eliminates eggs and adults in cycles.", icon: Bug },
  { slug: "bird-netting", name: "Bird Netting", blurb: "Near-invisible nylon netting for balconies, atriums and facades.", icon: Bird },
  { slug: "sofa-cleaning", name: "Sofa & Upholstery", blurb: "Deep-extraction shampoo that lifts stains, dust mites and odour.", icon: Sofa },
  { slug: "kitchen-deep-cleaning", name: "Kitchen Deep Clean", blurb: "Degreasing, descaling and sanitisation for spotless, hygienic kitchens.", icon: Utensils },
];

export interface Industry {
  slug: string;
  name: string;
  icon: LucideIcon;
}

export const industries: Industry[] = [
  { slug: "restaurants", name: "Restaurants & Cafés", icon: Utensils },
  { slug: "hotels", name: "Hotels & Resorts", icon: Hotel },
  { slug: "hospitals", name: "Hospitals & Clinics", icon: Hospital },
  { slug: "offices", name: "Corporate Offices", icon: Building2 },
  { slug: "warehouses", name: "Warehouses & Logistics", icon: Warehouse },
  { slug: "schools", name: "Schools & Campuses", icon: School },
  { slug: "factories", name: "Factories & Food Processing", icon: Factory },
  { slug: "retail", name: "Retail & Malls", icon: Store },
];

export const whyChoose = [
  { title: "Government Licensed", desc: "Certified technicians and CIB-approved, regulation-compliant chemicals." },
  { title: "Child & Pet Safe", desc: "Odourless, low-toxicity formulations safe around kids and pets." },
  { title: "2-Hour Response", desc: "Rapid dispatch across Bangalore for urgent infestations." },
  { title: "Service Warranty", desc: "Free re-treatment within the warranty window — no questions asked." },
  { title: "Eco-Friendly", desc: "Integrated Pest Management that minimises chemical load." },
  { title: "Transparent Pricing", desc: "Upfront quotes after inspection. No hidden charges, ever." },
];

export const processSteps = [
  { step: "01", title: "Book Inspection", desc: "Request a free site visit by phone, WhatsApp or the form — pick a slot that suits you." },
  { step: "02", title: "On-Site Survey", desc: "A certified technician identifies the pest, severity, entry points and risk zones." },
  { step: "03", title: "Custom Treatment Plan", desc: "You receive a transparent plan with scope, safety notes and a fixed quote." },
  { step: "04", title: "Precision Treatment", desc: "We execute with calibrated, targeted application and minimal disruption." },
  { step: "05", title: "Quality Check", desc: "Post-service verification and prevention advice tailored to your space." },
  { step: "06", title: "Follow-Up & Warranty", desc: "Scheduled follow-ups and free re-treatment within your warranty period." },
];

export interface Testimonial {
  name: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  { name: "Ananya Rao", role: "Homeowner", location: "Whitefield", rating: 5, quote: "Booked a termite inspection on Sunday, treated by Monday. The technician explained every step and our furniture has been spotless since." },
  { name: "Rohit Menon", role: "Restaurant Owner", location: "Indiranagar", rating: 5, quote: "Our FSSAI audit needed a documented pest programme. PESTOSOT set up monthly visits with reports — we cleared the audit comfortably." },
  { name: "Priya Sharma", role: "Apartment Resident", location: "HSR Layout", rating: 5, quote: "Cockroaches were a nightmare in our kitchen. One gel treatment and a follow-up — completely gone, and it was safe for my toddler." },
  { name: "Karthik Iyer", role: "Facility Manager", location: "Electronic City", rating: 5, quote: "Managing three office floors, I needed reliability. Their team is punctual, professional and the dashboard reporting is genuinely useful." },
  { name: "Sneha Gupta", role: "Villa Owner", location: "Sarjapur Road", rating: 5, quote: "The deep-cleaning before we moved in was extraordinary. Every corner, the sofas, the kitchen — it felt like a brand-new home." },
];

export interface AmcPlan {
  name: string;
  tagline: string;
  priceNote: string;
  features: string[];
  popular?: boolean;
}

export const amcPlans: AmcPlan[] = [
  {
    name: "Home Shield",
    tagline: "Apartments & independent homes",
    priceNote: "From ₹2,999 / year",
    features: ["4 general pest treatments", "Cockroach, ant & spider cover", "Free re-service on call", "Priority weekend slots"],
  },
  {
    name: "Home Shield Plus",
    tagline: "Villas & large families",
    priceNote: "From ₹5,499 / year",
    popular: true,
    features: ["6 treatments + termite check", "Rodent & mosquito cover", "Unlimited re-services", "Dedicated relationship manager", "Annual deep-clean discount"],
  },
  {
    name: "Business Shield",
    tagline: "Offices, retail & F&B",
    priceNote: "Custom quote",
    features: ["Audit-ready monthly programme", "Pest sighting & action reports", "FSSAI / regulatory documentation", "Multi-site coverage", "SLA-backed response times"],
  },
];

export interface Faq {
  q: string;
  a: string;
}

export const faqs: Faq[] = [
  { q: "Are your treatments safe for children and pets?", a: "Yes. We use odourless, low-toxicity, government-approved formulations and Integrated Pest Management techniques. Your technician will advise any short precautions (such as ventilation time) specific to your treatment." },
  { q: "How quickly can you visit my home or office?", a: "We offer a 2-hour response window for urgent cases across most of Bangalore, and same-day or next-day slots for standard bookings. You can pick a preferred time when you book." },
  { q: "Do you provide a warranty?", a: "Most treatments include a service warranty with free re-treatment if pests return within the covered period. Termite treatments can carry warranties of up to 5 years depending on the package." },
  { q: "How is pricing decided?", a: "After a free inspection we share a transparent, fixed quote based on the pest, property size and severity. There are no hidden charges, and you approve the plan before any work begins." },
  { q: "Which areas in Bangalore do you serve?", a: "We cover Whitefield, HSR Layout, Koramangala, Electronic City, Indiranagar, Marathahalli, Sarjapur Road, Bellandur and most other localities across the city." },
  { q: "Do you handle commercial and industrial contracts?", a: "Absolutely. We run audit-ready annual programmes for restaurants, hotels, hospitals, offices, warehouses and factories — complete with documentation for FSSAI and other compliance needs." },
];
