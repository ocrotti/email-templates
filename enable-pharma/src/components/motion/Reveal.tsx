import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** Seconds, applied on top of the scroll-triggered start */
  delay?: number;
  /** Vertical travel in px */
  y?: number;
  as?: "div" | "section" | "span" | "li" | "article";
  className?: string;
}

/**
 * Marks an element for the scroll-enter fade+rise wired centrally by
 * <MotionRoot>. Server component: no JS ships per instance, and the
 * content is server-rendered and visible without JavaScript.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 28,
  as: Tag = "div",
  className,
}: RevealProps) {
  return (
    <Tag
      data-reveal=""
      data-reveal-delay={delay || undefined}
      data-reveal-y={y !== 28 ? y : undefined}
      className={className}
    >
      {children}
    </Tag>
  );
}
