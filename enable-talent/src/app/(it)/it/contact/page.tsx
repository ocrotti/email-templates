import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ContactPage from "@/components/pages/ContactPage";

export const metadata: Metadata = pageMetadata({
  locale: "it",
  path: "/contact",
  title: "Prenota una Call | enable.talent",
  description: "Prenota una call di scoping da 15 minuti: dicci quali ruoli stanno strozzando la tua delivery e ricevi una proposta di pod scritta — o un onesto \"il pod non è la tua risposta\".",
});

export default function Page() {
  return <ContactPage locale="it" />;
}
