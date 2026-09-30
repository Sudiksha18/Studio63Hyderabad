import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import PlaceholderImage from "./PlaceholderImage";
import GrainOverlay from "./GrainOverlay";
import AnimatedHeading from "./AnimatedHeading";

export default function CTASection() {
  const ref = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  return (
    <section ref={ref} className="relative py-36 md:py-44 px-6 md:px-14 overflow-hidden">
      {/* Background */}
      <motion.div className="absolute -inset-y-[10%] inset-x-0" style={{ y: reducedMotion ? 0 : y }}>
        <PlaceholderImage
          src="/images/cta/cta-banner.jpg"
          alt="Studio63 book your session"
          label="Full width CTA photograph"
          aspect="aspect-auto"
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-black/60" />
        {/* Subtle grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(var(--color-gold) 1px, transparent 1px), linear-gradient(90deg, var(--color-gold) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>

      <GrainOverlay opacity={0.03} />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        className="relative z-[2] mx-auto max-w-2xl text-center text-white"
      >
        <p className="text-editorial-label mb-6" style={{ color: "var(--color-gold)" }}>
          Let's create together
        </p>
        <h2
          className="font-display mb-2 leading-none"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
        >
          <AnimatedHeading text="Let's Create" />
        </h2>
        <h2
          className="font-display font-light italic text-white/70 mb-4"
          style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.03em" }}
        >
          <AnimatedHeading text="Something Meaningful." />
        </h2>
        <p className="font-sans text-sm text-white/55 leading-relaxed mb-3 max-w-md mx-auto">
          Whether you're celebrating a wedding, welcoming a new beginning, building your
          portfolio or learning photography, we're here.
        </p>
        <p className="text-editorial-label text-white/25 mb-10">
          Door No. 11, Jabbar Apartments, Begumpet, Hyderabad
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/contact"
            className="animated-button font-sans text-[12px] tracking-widest uppercase px-8 py-3.5 transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: "var(--color-gold)", color: "#0A0806" }}
          >
            Book a Session
          </Link>
          <Link
            to="/academy"
            className="animated-button font-sans text-[12px] tracking-widest uppercase border border-white/35 text-white px-8 py-3.5 hover:bg-white/10 transition-all duration-300"
          >
            Join the Academy
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
