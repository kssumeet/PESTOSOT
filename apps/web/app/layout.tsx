import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { ADDRESS, BRAND } from "@pestosot/config";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? BRAND.url;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${BRAND.name} — Premium Pest Control & Deep Cleaning in Bangalore`,
    template: `%s · ${BRAND.name}`,
  },
  description: BRAND.description,
  keywords: [
    "pest control Bangalore",
    "deep cleaning Bangalore",
    "termite control",
    "cockroach control",
    "AMC pest control",
    "commercial pest management",
  ],
  applicationName: BRAND.name,
  authors: [{ name: BRAND.name }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: BRAND.name,
    title: `${BRAND.name} — Premium Pest Control & Deep Cleaning`,
    description: BRAND.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.name} — Premium Pest Control & Deep Cleaning`,
    description: BRAND.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  alternates: { canonical: siteUrl },
  category: "Pest Control & Cleaning Services",
  formatDetection: { telephone: true, address: true, email: true },
  // GEO targeting — helps local/geo search and map surfaces.
  other: {
    "geo.region": `${ADDRESS.country}-KA`,
    "geo.placename": ADDRESS.city,
    "geo.position": `${ADDRESS.geo.lat};${ADDRESS.geo.lng}`,
    ICBM: `${ADDRESS.geo.lat}, ${ADDRESS.geo.lng}`,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a6e42",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body className="min-h-dvh bg-white antialiased">{children}</body>
    </html>
  );
}
