interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

/**
 * KPI figure. The final value is server-rendered, so it is correct for
 * crawlers, print and no-JS; <MotionRoot> animates it up from zero on
 * viewport enter when motion is allowed.
 */
export default function Counter({
  value,
  prefix = "",
  suffix = "",
  className,
}: CounterProps) {
  return (
    <span
      data-counter={value}
      data-counter-prefix={prefix || undefined}
      data-counter-suffix={suffix || undefined}
      className={className}
    >
      {prefix}
      {value}
      {suffix}
    </span>
  );
}
