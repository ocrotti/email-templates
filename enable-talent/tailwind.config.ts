import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0B0B0C",
          soft: "#131316",
          line: "#232329",
        },
        paper: {
          DEFAULT: "#F6F4EF",
          soft: "#EFECE4",
          line: "#DDD8CC",
        },
        blue: {
          DEFAULT: "#2B4BFF",
          // 5.3:1 on ink — the on-dark accent has to clear WCAG AA for body text.
          bright: "#6178FF",
          deep: "#1E36C7",
        },
        amber: {
          DEFAULT: "#E8833A",
          soft: "#F2A96A",
          deep: "#C96F45",
        },
        mist: "#9C9CA6",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["clamp(2.4rem, 3.9vw, 3.75rem)", { lineHeight: "1.04", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.25rem, 5.5vw, 4.75rem)", { lineHeight: "1.02", letterSpacing: "-0.025em" }],
        "display-md": ["clamp(1.75rem, 4vw, 3.25rem)", { lineHeight: "1.06", letterSpacing: "-0.02em" }],
        "display-sm": ["clamp(1.375rem, 2.5vw, 2rem)", { lineHeight: "1.15", letterSpacing: "-0.015em" }],
      },
      maxWidth: {
        wrap: "80rem",
      },
      boxShadow: {
        "glow-blue": "0 0 0 1px rgba(77,103,255,0.45), 0 0 40px rgba(43,75,255,0.25)",
        "card-dark": "0 24px 60px -20px rgba(0,0,0,0.55)",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 36s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
