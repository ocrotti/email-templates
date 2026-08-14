import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = pageMetadata({
  locale: "it",
  path: "/contact",
  title: "Prenota una Call | enable.talent",
  description: "Call di scoping da 15 minuti: se il pod non è la tua risposta te lo diciamo. Altrimenti ricevi una proposta scritta sui ruoli che strozzano la delivery.",
});

export default function Page() {
  return <ContactPage locale="it" />;
}
