import type { MetadataRoute } from "next";
import { BRAND } from "@pestosot/config";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? BRAND.url;
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/thank-you"] }],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
