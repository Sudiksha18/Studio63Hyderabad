import { Link } from "react-router-dom";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";
import PlaceholderImage from "../components/PlaceholderImage";
import CTASection from "../components/CTASection";
import { portfolioImages } from "../data/portfolio";

const galleryImages = portfolioImages.filter((i) => i.category === "Wedding");

const steps = [
  { num: "01", title: "The Consultation", desc: "We begin with a relaxed conversation to understand your vision, style preferences and venue." },
  { num: "02", title: "The Wedding Day", desc: "Our team captures every emotion, ritual and spontaneous moment with precision and artistry." },
  { num: "03", title: "The Delivery", desc: "Beautifully edited images delivered in a private online gallery, ready to be treasured forever." },
];

export default function Weddings() {
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skewY = useTransform(smoothVelocity, [-800, 800], [-1.5, 1.5]);

  return (
    <div className="bg-[var(--color-ivory)] dark:bg-[#080604]">

      {/* ── HERO ── */}
      <section className="relative h-[80vh] min-h-[520px] overflow-hidden">
        <div className="absolute inset-0" data-cursor="view">
          <PlaceholderImage
            src="/images/portfolio/1Q6A3062.jpg"
            alt="Wedding photography by Studio63"
            label="Wedding hero couple portrait at golden hour"
            aspect="aspect-auto"
            className="w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-14 pb-16">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-editorial-label text-white/50 mb-3"
          >
            Studio63 · Hyderabad
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="font-display font-bold text-white mb-3"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
          >
            Weddings.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="font-display font-light italic text-white/60"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)" }}
          >
            Where two stories become one.
          </motion.p>
        </div>
      </section>

      {/* ── INTRO ── */}
      <section className="px-6 md:px-14 py-24">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-14 items-start">
          <div>
            <p
              className="font-display font-light italic text-[var(--color-charcoal)] leading-snug"
              style={{ fontSize: "clamp(1.3rem, 2.8vw, 2rem)", letterSpacing: "-0.02em" }}
            >
              "Every wedding has its own rhythm. We listen, observe, and capture the moments that define your story."
            </p>
          </div>
          <div className="space-y-4 font-sans text-sm text-[var(--color-brown)] leading-[1.85]">
            <p>
              With 7+ years of wedding photography experience in Hyderabad, we specialize in
              authentic storytelling, from the intimate morning rituals to the grand celebration.
            </p>
            <p>
              We work across all wedding formats, South Indian, North Indian, Christian, and
              destination weddings, adapting our style to honour your traditions beautifully.
            </p>
            <Link
              to="/contact?service=Wedding"
              className="inline-flex items-center gap-2 font-sans text-[12px] tracking-widest uppercase mt-4 text-[var(--color-charcoal)] hover:text-[var(--color-gold)] transition-colors group"
            >
              Book Your Wedding Session
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                <path d="M1 5H15M15 5L11 1M15 5L11 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="px-6 md:px-14 py-10 pb-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-editorial-label mb-8" style={{ color: "var(--color-gold)" }}>Gallery</p>
          <motion.div className="columns-2 md:columns-3 gap-3 space-y-3" style={{ skewY }}>
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="break-inside-avoid photo-card"
                data-cursor="view"
              >
                <PlaceholderImage
                  src={img.src}
                  alt={img.title}
                  label={img.title}
                  aspect={img.orientation === "portrait" ? "aspect-[4/5]" : "aspect-[3/2]"}
                />
                <div className="photo-overlay">
                  <div className="photo-overlay-content">
                    <p className="font-display text-white text-lg">{img.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-10">
            <Link to="/portfolio" className="font-sans text-[12px] tracking-widest uppercase text-[var(--color-brown)] hover:text-[var(--color-gold)] transition-colors">
              View full portfolio →
            </Link>
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE STEPS ── */}
      <section className="py-24 px-6 md:px-14 bg-[var(--color-offwhite)] dark:bg-[#0A0806]">
        <div className="mx-auto max-w-5xl">
          <p className="text-editorial-label mb-12 text-center" style={{ color: "var(--color-gold)" }}>The Experience</p>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border-t border-[var(--color-beige)] dark:border-white/8 pt-6"
              >
                <span className="font-display font-bold text-[var(--color-charcoal)]/10 dark:text-white/10 block mb-3" style={{ fontSize: "2.5rem" }}>{step.num}</span>
                <h3 className="font-display text-[var(--color-charcoal)] text-xl mb-3" style={{ letterSpacing: "-0.02em" }}>{step.title}</h3>
                <p className="font-sans text-sm text-[var(--color-brown)] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </div>
  );
}
