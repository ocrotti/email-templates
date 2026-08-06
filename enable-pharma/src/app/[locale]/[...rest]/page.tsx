import { notFound } from "next/navigation";

// Catch-all for unknown paths inside a valid locale: delegates to the
// locale-aware not-found page.
export default function CatchAllPage() {
  notFound();
}
