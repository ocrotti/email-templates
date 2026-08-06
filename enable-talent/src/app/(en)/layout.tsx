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
    default: "enable.talent — Managed Marketing Pods for European Agencies",
    template: "%s",
  },
  description:
    "Scale your agency with dedicated, managed marketing pods from Nairobi — quality under European control, sustainable costs, zero hiring risk.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable}`}>
      <body className="font-sans">
        <SmoothScroll />
        <Cursor />
        <Header locale="en" />
        <main>{children}</main>
        <Footer locale="en" />
      </body>
    </html>
  );
}
