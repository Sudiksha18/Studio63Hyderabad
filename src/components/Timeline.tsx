import { useRef } from "react";
import { motion, useScroll, useReducedMotion } from "framer-motion";
import { timelineEntries } from "../data/timeline";

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 70%"] });
  return (
    <section className="py-28 px-6 md:px-14 bg-[var(--color-ivory)] dark:bg-[#080604]">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-editorial-label mb-3"
            style={{ color: "var(--color-gold)" }}
          >
            Experience
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7 }}
            className="font-display font-bold text-[var(--color-charcoal)]"
            style={{ fontSize: "clamp(2.2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}
          >
            The Journey
          </motion.h2>
        </div>

        {/* Timeline entries */}
        <div ref={ref} className="relative">
          {/* Vertical gold line */}
          <motion.div
            className="absolute left-0 md:left-[7.5rem] top-3 bottom-3 w-px"
            style={{ background: "var(--color-gold)", scaleY: reducedMotion ? 1 : scrollYProgress, transformOrigin: "top" }}
          />

          <div className="space-y-12 pl-8 md:pl-0">
            {timelineEntries.map((entry, i) => (
              <motion.div
                key={entry.title + entry.period}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.07 }}
                className="timeline-entry relative grid md:grid-cols-[120px_1fr] gap-4 md:gap-12"
              >
                {/* Gold dot */}
                <div
                  className="absolute -left-8 md:left-[6.9rem] top-1.5 w-3 h-3 rounded-full border-2 z-10"
                  style={{ borderColor: "var(--color-gold)", backgroundColor: "var(--color-ivory)" }}
                />

                {/* Period */}
                <p className="relative z-20 font-sans text-xs tracking-wide pt-0.5 md:pr-6 md:text-center"
                   style={{ color: "var(--color-gold)" }}>
                  {entry.period}
                </p>

                {/* Content */}
                <div>
                  <h3
                    className="font-display font-semibold text-[var(--color-charcoal)] mb-1"
                    style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)", letterSpacing: "-0.02em" }}
                  >
                    {entry.title}
                  </h3>
                  <p className="font-sans text-sm text-[var(--color-brown)] leading-relaxed">
                    {entry.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
