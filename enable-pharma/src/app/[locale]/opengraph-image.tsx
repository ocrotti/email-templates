import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Locale } from "@/i18n/routing";

export const alt = "Enable Pharma — disease awareness, compliant by design";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const claims: Record<Locale, string[]> = {
  it: ["Community di", "disease awareness,", "compliant by design."],
  en: ["Disease awareness", "communities,", "compliant by design."],
};

const norms =
  "D.Lgs. 219/2006 · GVP VI · GDPR Art. 9 · Farmindustria · AGCOM";

export default async function OgImage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const lines = claims[(locale as Locale) in claims ? (locale as Locale) : "it"];

  const [bold, medium] = await Promise.all([
    readFile(join(process.cwd(), "src/fonts/og/Archivo-Expanded-Bold.ttf")),
    readFile(join(process.cwd(), "src/fonts/og/Archivo-Medium.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f4f0e6",
          color: "#1a1712",
          padding: "72px 80px",
          fontFamily: "ArchivoMedium",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 30,
          }}
        >
          <div style={{ display: "flex", fontFamily: "ArchivoBold" }}>
            Enable Pharma
            <div style={{ color: "#c73b16" }}>.</div>
          </div>
          <div style={{ display: "flex", fontSize: 22, color: "#57503f" }}>
            enablepharma.it
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "ArchivoBold",
            fontSize: 76,
            lineHeight: 1.04,
            letterSpacing: "-2px",
          }}
        >
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                color: i === lines.length - 1 ? "#c73b16" : "#1a1712",
              }}
            >
              {line}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 24,
            color: "#57503f",
            borderTop: "2px solid #d9d2c0",
            paddingTop: 28,
          }}
        >
          {norms}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "ArchivoBold", data: bold, style: "normal", weight: 700 },
        { name: "ArchivoMedium", data: medium, style: "normal", weight: 500 },
      ],
    },
  );
}
