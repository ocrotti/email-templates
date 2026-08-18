import localFont from "next/font/local";

// Archivo variable. The expanded width axis (font-stretch up to 125%)
// is what gives headlines their editorial voice.
//
// The shipped file is subset to Latin + the punctuation this site uses,
// with the variable axes clamped to the ranges the design actually
// needs (wght 300–800, wdth 100–125): 88KB → 47KB. Only the upright
// face is included — nothing here is ever set in italic. See the README
// for the exact regeneration command if the character set changes.
export const archivo = localFont({
  src: [
    {
      path: "../fonts/Archivo-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-archivo",
  fallback: ["ui-sans-serif", "system-ui", "Helvetica Neue", "Arial"],
});

// IBM Plex Mono: the "regulatory document" accent — section numbers,
// normative references, labels. Also subset to Latin.
export const plexMono = localFont({
  src: [
    {
      path: "../fonts/IBMPlexMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/IBMPlexMono-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  display: "swap",
  variable: "--font-plex-mono",
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});
