import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import HomePage from "@/components/pages/HomePage";

export const metadata: Metadata = pageMetadata({
  locale: "it",
  path: "/",
  title: "enable.talent — Pod Marketing Gestiti per Agenzie Europee",
  description: "Scala la tua agenzia con pod marketing dedicati e gestiti da Nairobi — QA senior europeo, workflow white-label, trial di 2 settimane e pod da €2.000/mese. Operativi in 10–14 giorni.",
});

export default function Page() {
  return <HomePage locale="it" />;
}
