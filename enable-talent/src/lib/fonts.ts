import localFont from "next/font/local";

/**
 * Self-hosted variable fonts (brief §2): Parkinsans for display,
 * Inter for text. Latin subsets cover EN + IT fully.
 */
export const displayFont = localFont({
  src: "../../public/fonts/parkinsans-latin.woff2",
  variable: "--font-display",
  weight: "300 800",
  display: "swap",
});

export const sansFont = localFont({
  src: "../../public/fonts/inter-latin.woff2",
  variable: "--font-sans",
  weight: "100 900",
  display: "swap",
});
