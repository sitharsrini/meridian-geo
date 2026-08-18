import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#111111",
          padding: 64,
        }}
      >
        <div style={{ fontSize: 28, letterSpacing: 4 }}>MERIDIAN</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 72, lineHeight: 1.05, maxWidth: 900 }}>{site.tagline}</div>
          <div style={{ fontSize: 28, color: "#4d5550" }}>SEO, AEO, and GEO. Every field. 200 markets.</div>
        </div>
      </div>
    ),
    size,
  );
}
