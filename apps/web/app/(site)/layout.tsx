import { organizationSchema, websiteSchema, jsonLd } from "@/lib/schema";
import { Providers } from "@/components/providers";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { StickyActions } from "@/components/lead/sticky-actions";
import { ExitIntent } from "@/components/lead/exit-intent";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLd(organizationSchema())}
      />
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={jsonLd(websiteSchema())}
      />
      <Providers>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <StickyActions />
        <ExitIntent />
      </Providers>
    </>
  );
}
