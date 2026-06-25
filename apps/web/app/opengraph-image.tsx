import { ImageResponse } from "next/og";
import { BRAND, STATS } from "@pestosot/config";

export const alt = `${BRAND.name} — Premium Pest Control & Deep Cleaning in Bangalore`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const stats = [
    `${STATS.googleRating}/5 Google rating`,
    `${STATS.customersServed.toLocaleString("en-IN")}+ customers`,
    `2-hour response`,
  ];

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #0c482f 0%, #0a6e42 55%, #122039 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        {/* wordmark */}
        <div style={{ display: "flex", alignItems: "center", fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>
          <span style={{ display: "flex" }}>PESTO</span>
          <span style={{ display: "flex", color: "#6fe0a4" }}>SOT</span>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 70, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>
            A home that&apos;s pest-free &amp; spotless.
          </div>
          <div style={{ display: "flex", marginTop: 22, fontSize: 32, color: "#a6efc5", fontWeight: 500 }}>
            Premium Pest Control &amp; Deep Cleaning · Bangalore
          </div>
        </div>

        {/* stat chips */}
        <div style={{ display: "flex", gap: 18 }}>
          {stats.map((s) => (
            <div
              key={s}
              style={{
                display: "flex",
                padding: "12px 22px",
                borderRadius: 999,
                background: "rgba(255,255,255,0.12)",
                fontSize: 26,
                color: "#d2f8e1",
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
