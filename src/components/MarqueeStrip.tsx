/**
 * MarqueeStrip — infinite auto-scrolling horizontal text band.
 * Separates sections with editorial motion typography.
 * Theme-aware: light bg in light mode, dark bg in dark mode.
 *
 * NOTE: dark: Tailwind classes must use hardcoded hex values, NOT CSS
 * variables like var(--color-charcoal), because those variables already
 * swap their value in dark mode and would produce the wrong colour.
 */

interface MarqueeStripProps {
  items?: string[];
  dark?: boolean;
  speed?: number;
  reverse?: boolean;
}

const defaultItems = [
  "WEDDING",
  "MATERNITY",
  "NEWBORN",
  "FASHION",
  "PORTRAITS",
  "ACADEMY",
  "HYDERABAD",
];

export default function MarqueeStrip({
  items = defaultItems,
  dark = true,
  speed = 22,
  reverse = false,
}: MarqueeStripProps) {
  const repeated = [...items, ...items];

  /* Light mode bg  → warm beige / ivory
     Dark  mode bg  → hardcoded near-black (CSS vars swap so can't use them here) */
  const wrapperClass = dark
    ? "overflow-hidden py-3.5 select-none bg-[#E7DFD1] dark:bg-[#0A0806]"
    : "overflow-hidden py-3.5 select-none bg-[#FAF7F1] dark:bg-[#151210]";

  /* Light mode text → muted charcoal
     Dark  mode text → soft ivory (hardcoded, not via CSS var) */
  const itemClass = dark
    ? "inline-flex items-center gap-5 px-5 font-sans font-medium uppercase text-[#211E1B]/40 dark:text-[#FAF7F1]/45"
    : "inline-flex items-center gap-5 px-5 font-sans font-medium uppercase text-[#6E5D4C]/60 dark:text-[#FAF7F1]/35";

  return (
    <div className={wrapperClass} aria-hidden="true">
      <div
        className="flex items-center whitespace-nowrap"
        style={{
          animation: `${reverse ? "marquee-reverse" : "marquee"} ${speed}s linear infinite`,
          fontSize: "10px",
          letterSpacing: "0.22em",
        }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = "running")}
      >
        {repeated.map((item, i) => (
          <span key={i} className={itemClass}>
            {item}
            <span
              className="inline-block w-1 h-1 rounded-full flex-shrink-0"
              style={{ backgroundColor: "var(--color-gold)", opacity: 0.65 }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
