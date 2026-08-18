/**
 * Giant outlined section numeral (01–08). The scroll-scrubbed drift is
 * applied by <MotionRoot>; this renders as static, decorative markup.
 */
export default function SectionNumber({
  value,
  className = "",
}: {
  value: string;
  className?: string;
}) {
  return (
    <span
      data-section-number=""
      aria-hidden="true"
      className={`section-number block will-change-transform ${className}`}
    >
      {value}
    </span>
  );
}
