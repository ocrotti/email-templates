import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Renders markdown-style inline links `[text](href)` inside a content string.
 *
 * Content strings are per-locale, so Italian strings already carry their own
 * `/it/...` hrefs — nothing here rewrites paths. Absolute hrefs become plain
 * anchors that open in a new tab; everything else routes through `next/link`.
 *
 * `theme` picks the link colour: `dark` for sections on the ink background,
 * `light` for sections on paper, where blue-bright loses contrast.
 */
export function renderInline(text: string, theme: "dark" | "light" = "dark"): ReactNode {
  if (!text.includes("](")) return text;
  const className = `link-underline font-medium ${theme === "dark" ? "text-blue-bright" : "text-blue"}`;
  const nodes: ReactNode[] = [];
  const linkRe = /\[([^\]]+)\]\(([^()\s]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = linkRe.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const [, label, href] = match;
    nodes.push(
      /^https?:\/\//.test(href) ? (
        <a key={`${href}-${match.index}`} href={href} className={className} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      ) : (
        <Link key={`${href}-${match.index}`} href={href} className={className}>
          {label}
        </Link>
      ),
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
