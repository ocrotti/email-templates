import type { ReactNode } from "react";

// Minimal inline-link markup for content strings: [testo](/percorso) or
// [testo](https://…). Kept deliberately tiny — no bold/italic/nesting —
// so the content dictionaries stay close to plain prose. External links
// open in a new tab with rel=noopener; internal ones are plain anchors
// (full navigation), which keeps this a server component.
const LINK_RE = /\[([^\]]+)\]\(([^)\s]+)\)/g;

export function renderRichText(text: string): ReactNode {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    const external = /^https?:\/\//.test(href);
    parts.push(
      external ? (
        <a
          key={`${href}-${match.index}`}
          href={href}
          rel="noopener noreferrer"
          target="_blank"
        >
          {label}
        </a>
      ) : (
        <a key={`${href}-${match.index}`} href={href}>
          {label}
        </a>
      ),
    );
    lastIndex = match.index + match[0].length;
  }
  if (parts.length === 0) return text;
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}
