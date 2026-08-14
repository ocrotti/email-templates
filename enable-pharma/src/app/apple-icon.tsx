import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// iOS asks for /apple-touch-icon.png on every add-to-home-screen and on
// most link previews; without this the request 404s and the tile falls
// back to a screenshot. Generated rather than committed as a binary so
// it stays in step with icon.svg.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const bold = await readFile(
    join(process.cwd(), "src/fonts/og/Archivo-Expanded-Bold.ttf"),
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          background: "#1a1712",
          color: "#f4f0e6",
          fontFamily: "ArchivoBold",
          fontSize: 104,
          letterSpacing: "-4px",
        }}
      >
        E
        <div
          style={{
            position: "absolute",
            right: 28,
            bottom: 28,
            width: 34,
            height: 34,
            borderRadius: 17,
            background: "#c73b16",
          }}
        />
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "ArchivoBold", data: bold, style: "normal", weight: 700 },
      ],
    },
  );
}
