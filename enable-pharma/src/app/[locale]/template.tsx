import type { ReactNode } from "react";

/**
 * Soft page transition. Next re-mounts this template on every route
 * change, so a CSS entrance animation on the wrapper replays each
 * time — no JS, no animation library. Disabled under reduced motion
 * in globals.css.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
