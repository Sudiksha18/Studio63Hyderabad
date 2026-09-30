import { motion, useInView, useReducedMotion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import { siteConfig } from "../data/siteConfig";

function Counter({ value, index }: { value: string; index: number }) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const numeric = parseInt(value.replace(/\D/g, ""), 10) || 0;
  const suffix = value.replace(/[0-9]/g, "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (inView) {
      const controls = animate(count, numeric, { duration: reducedMotion ? 0 : 1.8, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, numeric, count, reducedMotion]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="stat-counter text-center relative"
    >
      {/* Decorative large number */}
      <div className="flex items-start justify-center leading-none mb-3">
        <span
          className="font-display font-bold gold-shimmer"
          style={{ fontSize: "clamp(3.5rem, 6vw, 5.5rem)", letterSpacing: "-0.04em" }}
        >
          <motion.span>{rounded}</motion.span>
          {suffix}
        </span>
      </div>
      <p className="font-sans text-xs md:text-sm leading-snug max-w-[18ch] mx-auto" style={{ color: "var(--color-brown)" }}>
        {siteConfig.stats[index].label}
      </p>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section className="py-20 px-6 md:px-14" style={{ backgroundColor: "var(--color-offwhite)" }}>
      {/* Section label */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-editorial-label text-center mb-14"
        style={{ color: "var(--color-gold)", opacity: 0.7 }}
      >
        Studio in Numbers
      </motion.p>

      <div className="mx-auto max-w-6xl grid grid-cols-3 md:grid-cols-5 gap-6 md:gap-4">
        {siteConfig.stats.map((_, i) => (
          <div key={i} className="relative">
            {/* Vertical divider (not on first, desktop only) */}
            {i > 0 && (
              <div
                className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 h-12 w-px"
                style={{ backgroundColor: "var(--color-beige)" }}
              />
            )}
            <Counter value={_.value} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
