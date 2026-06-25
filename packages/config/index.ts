/**
 * PESTOSOT — Shared brand & business configuration.
 *
 * ⚠️ PLACEHOLDER CONTACT DETAILS — swap these for the real numbers/email/address
 * before go-live. Everything brand-facing reads from here, so one edit propagates
 * across the whole site (SEO schema, CTAs, footer, WhatsApp deep links).
 */

export const BRAND = {
  name: "PESTOSOT",
  legalName: "Pestosot Facility Hygiene Pvt. Ltd.",
  tagline: "Precision Pest Control & Premium Deep Cleaning",
  domain: "pestosot.com",
  url: "https://pestosot.com",
  description:
    "Bangalore's premium pest control and deep cleaning company. Certified, eco-friendly, child- and pet-safe treatments for homes, offices, and industry — with rapid response and assured results.",
  foundedYear: 2014,
} as const;

export const CONTACT = {
  // PLACEHOLDERS — replace with real values.
  phone: "+91 90000 00000",
  phoneRaw: "+919000000000",
  whatsapp: "+919000000000",
  email: "hello@pestosot.com",
  salesEmail: "bookings@pestosot.com",
  emergencyLine: "+91 90000 00000",
} as const;

export const ADDRESS = {
  street: "4th Floor, Prestige Tech Park, Marathahalli–Sarjapur Outer Ring Road",
  locality: "Bellandur",
  city: "Bangalore",
  state: "Karnataka",
  postalCode: "560103",
  country: "IN",
  countryName: "India",
  // Bellandur, Bangalore — approximate.
  geo: { lat: 12.9304, lng: 77.6784 },
  mapsUrl: "https://maps.google.com/?q=Pestosot+Bangalore",
} as const;

export const HOURS = {
  display: "Mon–Sun, 7:00 AM – 9:00 PM",
  emergency: "24/7 Emergency Response",
  schemaSpec: [
    {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "21:00",
    },
  ],
} as const;

export const SOCIAL = {
  instagram: "https://instagram.com/pestosot",
  facebook: "https://facebook.com/pestosot",
  linkedin: "https://linkedin.com/company/pestosot",
  youtube: "https://youtube.com/@pestosot",
  x: "https://x.com/pestosot",
} as const;

export const STATS = {
  customersServed: 48000,
  yearsExperience: new Date().getFullYear() - BRAND.foundedYear,
  googleRating: 4.9,
  googleReviews: 3200,
  projectsCompleted: 62000,
  citiesServed: 6,
  responseTimeHours: 2,
} as const;

export const PRIMARY_CITY = {
  name: "Bangalore",
  slug: "bangalore",
  localities: [
    "Whitefield",
    "HSR Layout",
    "Koramangala",
    "Electronic City",
    "Indiranagar",
    "Marathahalli",
    "Sarjapur Road",
    "Bellandur",
    "Hebbal",
    "Yelahanka",
    "JP Nagar",
    "Jayanagar",
    "Bannerghatta Road",
    "Rajajinagar",
    "Malleshwaram",
    "Brookefield",
    "KR Puram",
    "CV Raman Nagar",
    "Mahadevapura",
    "Manyata Tech Park",
  ],
} as const;

/** Build a prefilled WhatsApp deep link. */
export function whatsappLink(message = "Hi PESTOSOT, I'd like to book a free inspection.") {
  return `https://wa.me/${CONTACT.whatsapp.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;
}

/** Build a tel: link from the raw phone. */
export function telLink() {
  return `tel:${CONTACT.phoneRaw}`;
}
