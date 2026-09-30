import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "../data/testimonials";

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const item = testimonials[index];

  // Auto-advance every 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearTimeout(timer);
  }, [index]);

  const go = (dir: 1 | -1) => {
    setIndex((prev) => (prev + dir + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-28 px-6 md:px-14 overflow-hidden bg-[var(--color-offwhite)] dark:bg-[#0A0806]">
      {/* Decorative oversized quote mark */}
      <div
        className="absolute top-8 left-6 md:left-14 font-display text-[var(--color-charcoal)] dark:text-white select-none pointer-events-none"
        style={{ fontSize: "clamp(8rem, 18vw, 16rem)", lineHeight: 1, opacity: 0.04, letterSpacing: "-0.05em" }}
        aria-hidden="true"
      >
        "
      </div>

      <div className="mx-auto max-w-3xl relative z-10">
        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-editorial-label mb-10 text-center"
          style={{ color: "var(--color-gold)" }}
        >
          Student Stories
        </motion.p>

        {/* Quote */}
        <div className="relative min-h-[200px] flex flex-col items-center justify-center text-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <p
                className="font-display font-light italic text-[var(--color-charcoal)] leading-relaxed mb-6"
                style={{ fontSize: "clamp(1.2rem, 3vw, 2rem)", letterSpacing: "-0.01em" }}
              >
                "{item.quote}"
              </p>
              <p className="font-sans text-xs tracking-widest uppercase text-[var(--color-brown)]">
                {item.role}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-5 mt-12">
          <button
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
            className="text-[var(--color-charcoal)]/30 dark:text-white/30 hover:text-[var(--color-charcoal)] dark:hover:text-white transition-colors"
          >
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true">
              <path d="M19 6H1M1 6L7 1M1 6L7 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Line segment indicators */}
          <div className="flex gap-2">
            {testimonials.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to testimonial ${i + 1}`}
                onClick={() => setIndex(i)}
                className="h-px w-8 relative overflow-hidden bg-[var(--color-beige)] dark:bg-white/15 transition-all hover:bg-[var(--color-brown)] dark:hover:bg-white/30"
                style={{ width: i === index ? 32 : 20 }}
              >
                {i === index && (
                  <motion.div
                    className="absolute inset-0"
                    style={{ backgroundColor: "var(--color-gold)" }}
                    layoutId="testimonial-indicator"
                  />
                )}
              </button>
            ))}
          </div>

          <button
            aria-label="Next testimonial"
            onClick={() => go(1)}
            className="text-[var(--color-charcoal)]/30 dark:text-white/30 hover:text-[var(--color-charcoal)] dark:hover:text-white transition-colors"
          >
            <svg width="20" height="12" viewBox="0 0 20 12" fill="none" aria-hidden="true">
              <path d="M1 6H19M19 6L13 1M19 6L13 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
