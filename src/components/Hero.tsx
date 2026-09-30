import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import PlaceholderImage from "./PlaceholderImage";
import GrainOverlay from "./GrainOverlay";
import Magnetic from "./Magnetic";

// Staggered word-by-word clip-path reveal
const wordVariants = {
  hidden: { clipPath: "inset(100% 0 0 0)", y: 20, opacity: 0 },
  visible: (i: number) => ({
    clipPath: "inset(0% 0 0 0)",
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.9,
      delay: 0.5 + i * 0.12,
      ease: "easeOut" as const,
    },
  }),
};

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  
  // Background moves at 40% scroll speed for parallax, scales slightly down, and blurs
  const reducedMotion = useReducedMotion();
  const bgY = useTransform(scrollY, [0, 800], [0, 320]);
  const bgScale = useTransform(scrollY, [0, 800], [1.05, 1.15]);
  const bgBlur = useTransform(scrollY, [0, 600], ["blur(0px)", "blur(12px)"]);

  return (
    <section
      ref={containerRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100svh", minHeight: 640 }}
    >
      {/* ── Parallax Background (Image Fallback / Video) ── */}
      <motion.div
        className="absolute inset-[-10%] top-[-5%]"
        style={{ y: reducedMotion ? 0 : bgY, scale: reducedMotion ? 1 : bgScale, filter: reducedMotion ? "none" : bgBlur }}
      >
        <div data-cursor="view" className="w-full h-full relative bg-[#111]">
          {/* Main Video Background */}
          {/* Note: In production, point this to your actual high-quality cinematic video */}
          <video
            autoPlay={!reducedMotion}
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-80"
            poster="/images/hero/hero-main.jpg"
          >
            {/* Provide a real URL when available. A placeholder video is omitted here for stability, using poster fallback */}
            <source src="/videos/hero-cinematic.mp4" type="video/mp4" />
          </video>
          
          {/* Fallback image is inherently loaded via poster above, but we can also layer the PlaceholderImage if video fails completely */}
          <div className="absolute inset-0 -z-10">
            <PlaceholderImage
              src="/images/hero/hero-main.jpg"
              alt="Cinematic photograph by Studio63#Hyderabad"
              label="Hero Video or Photo full bleed"
              className="w-full h-full"
              aspect="aspect-auto"
            />
          </div>
        </div>
      </motion.div>

      {/* ── Gradient layers ── */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/0 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

      {/* ── Film grain ── */}
      <GrainOverlay opacity={0.05} />
      <div className="hero-light" aria-hidden="true" />
      <div className="hero-frame" aria-hidden="true" />

      {/* ── Content ── */}
      <div className="relative z-[2] flex h-full flex-col justify-between px-6 pt-8 pb-12 md:px-14 md:pb-20 max-w-7xl mx-auto pointer-events-none">

        {/* Top label */}
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-editorial-label text-white/60 pt-28 tracking-widest uppercase pointer-events-auto"
        >
          Studio63 · Hyderabad · Since 2017
        </motion.p>

        {/* Main content — vertically centered-bottom */}
        <div className="flex flex-col justify-end flex-1 mt-auto">

          {/* Headline — clip-path word reveal */}
          <div className="overflow-hidden mb-1">
            <h1 className="font-display font-bold text-white leading-none drop-shadow-2xl" style={{ fontSize: "clamp(3.4rem, 9vw, 9rem)", letterSpacing: "-0.04em" }}>
              <motion.span
                className="inline-block mr-[0.15em]"
                custom={0}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
              >
                Stories.
              </motion.span>
              <motion.span
                className="inline-block mr-[0.15em]"
                custom={1}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
              >
                Emotions.
              </motion.span>
            </h1>
          </div>
          <div className="overflow-hidden mb-8">
            <h1
              className="font-display font-light italic text-white/90 leading-none drop-shadow-xl"
              style={{ fontSize: "clamp(3.4rem, 9vw, 9rem)", letterSpacing: "-0.04em" }}
            >
              <motion.span
                className="inline-block"
                custom={2}
                variants={wordVariants}
                initial="hidden"
                animate="visible"
              >
                Moments.
              </motion.span>
            </h1>
          </div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.0 }}
            className="font-sans text-sm text-white/70 mb-10 max-w-sm leading-relaxed"
          >
            Photography &amp; Visual Stories · Begumpet, Hyderabad
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.15 }}
            className="flex flex-wrap gap-4 pointer-events-auto"
          >
            <Magnetic strength={0.3}>
              <Link
                to="/portfolio"
                className="animated-button block font-sans text-[12px] tracking-widest uppercase bg-white dark:bg-black text-[var(--color-charcoal)] px-8 py-4 hover:bg-[var(--color-gold)] hover:text-white transition-all duration-300 shadow-xl"
              >
                Explore Portfolio
              </Link>
            </Magnetic>
            <Magnetic strength={0.3}>
              <Link
                to="/contact"
                className="animated-button block font-sans text-[12px] tracking-widest uppercase border border-white/40 bg-black/20 backdrop-blur-sm text-white px-8 py-4 hover:bg-white hover:text-black transition-all duration-300 shadow-xl"
              >
                Book a Session
              </Link>
            </Magnetic>
          </motion.div>
        </div>

        {/* Scroll indicator — bottom right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="absolute bottom-10 right-6 md:right-14 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          <span className="text-editorial-label text-white/40 [writing-mode:vertical-rl]">Scroll</span>
          <motion.div
            animate={reducedMotion ? { y: 0 } : { y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-white/0 to-white/50"
          />
        </motion.div>

        {/* Category pill — bottom left accent */}
        <motion.div
          initial={{ opacity: 0, x: -14 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="absolute bottom-10 left-6 md:left-14 flex items-center gap-3"
        >
          {["Wedding", "Newborn", "Maternity", "Fashion"].map((cat, i) => (
            <span
              key={cat}
              className="text-editorial-label text-white/40 hidden md:inline"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {cat}{i < 3 ? " ·" : ""}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
