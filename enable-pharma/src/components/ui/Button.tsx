import { Link } from "@/i18n/navigation";
import type { ComponentProps, ReactNode } from "react";
import MagneticButton from "@/components/motion/MagneticButton";

type AppHref = ComponentProps<typeof Link>["href"];

const base =
  "inline-flex items-center justify-center gap-3 px-7 py-4 text-[0.95rem] font-medium tracking-wide transition-colors duration-300 rounded-full";

const variants = {
  primary:
    "bg-accent text-paper hover:bg-accent-deep",
  primaryOnDark:
    "bg-accent-ondark text-ink hover:bg-accent hover:text-paper",
  outline:
    "border border-ink/25 text-ink hover:border-accent-deep hover:text-accent-deep",
  outlineOnDark:
    "border border-paper/30 text-paper hover:border-accent-ondark hover:text-accent-ondark",
} as const;

interface ButtonLinkProps {
  href: AppHref;
  children: ReactNode;
  variant?: keyof typeof variants;
  magnetic?: boolean;
  className?: string;
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  magnetic = false,
  className = "",
}: ButtonLinkProps) {
  const link = (
    <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
      {children}
      <span aria-hidden="true">→</span>
    </Link>
  );
  return magnetic ? <MagneticButton>{link}</MagneticButton> : link;
}

export function ArrowLink({
  href,
  children,
  className = "",
  onDark = false,
}: {
  href: AppHref;
  children: ReactNode;
  className?: string;
  onDark?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 font-medium underline-offset-4 transition-colors ${
        onDark
          ? "text-paper hover:text-accent-ondark"
          : "text-ink hover:text-accent-deep"
      } ${className}`}
    >
      <span className="underline decoration-accent decoration-2">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="transition-transform duration-300 group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
