import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import HomePage from "@/components/pages/HomePage";

export const metadata: Metadata = pageMetadata({
  locale: "it",
  path: "/",
  title: "enable.talent — Pod Marketing Gestiti per Agenzie Europee",
  description: "Pod marketing gestiti da Nairobi — QA senior europeo, workflow white-label, trial di 2 settimane, pod da €2.000/mese. Operativi in 10–14 giorni.",
});

export default function Page() {
  return <HomePage locale="it" />;
}
