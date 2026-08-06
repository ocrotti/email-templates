import { ImageResponse } from "next/og";

export const runtime = "edge";

/**
 * Branded dynamic OG image: /og?title=...&locale=en
 * Referenced by pageMetadata() for every page.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title")?.slice(0, 120) ?? "enable.talent";
  const locale = searchParams.get("locale") === "it" ? "it" : "en";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0B0B0C",
          padding: 72,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", fontSize: 36, fontWeight: 700, color: "#F6F4EF" }}>
            enable<span style={{ color: "#4D67FF" }}>.talent</span>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#9C9CA6",
              border: "1px solid #232329",
              borderRadius: 999,
              padding: "8px 20px",
            }}
          >
            {locale === "it" ? "Pod marketing gestiti" : "Managed marketing pods"}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 700,
            color: "#F6F4EF",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            maxWidth: 980,
          }}
        >
          {title}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", width: 56, height: 8, background: "#2B4BFF", borderRadius: 4 }} />
          <div style={{ display: "flex", width: 24, height: 8, background: "#E8833A", borderRadius: 4 }} />
          <div style={{ display: "flex", fontSize: 24, color: "#9C9CA6", marginLeft: 12 }}>
            {locale === "it" ? "Nairobi → Europa · QA europeo" : "Nairobi → Europe · European QA"}
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
