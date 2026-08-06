import type { Metadata } from "next";
import "../globals.css";
import { displayFont, sansFont } from "@/lib/fonts";
import { SITE_URL } from "@/lib/site";
import Cursor from "@/components/Cursor";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "enable.talent — Pod Marketing Gestiti per Agenzie Europee",
    template: "%s",
  },
  description:
    "Scala la tua agenzia con pod marketing dedicati e gestiti da Nairobi — qualità sotto controllo europeo, costi sostenibili, zero rischio di assunzione.",
};

export default function RootLayoutIt({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${displayFont.variable} ${sansFont.variable}`}>
      <body className="font-sans">
        <SmoothScroll />
        <Cursor />
        <Header locale="it" />
        <main>{children}</main>
        <Footer locale="it" />
      </body>
    </html>
  );
}
