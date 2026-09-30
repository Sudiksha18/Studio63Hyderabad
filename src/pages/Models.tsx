import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";
import PlaceholderImage from "../components/PlaceholderImage";
import CTASection from "../components/CTASection";
import { portfolioImages } from "../data/portfolio";

const galleryImages = portfolioImages.filter((i) => i.category === "Models");

const steps = [
  { num: "01", title: "Creative Direction", desc: "We discuss your vision, ref images, wardrobe and the mood of the editorial you want to create." },
  { num: "02", title: "The Shoot", desc: "Professional studio setup with controlled lighting, or cinematic outdoor locations, your call." },
  { num: "03", title: "Your Folio", desc: "High resolution, print ready images edited to perfection and ready for your portfolio or agency." },
];

export default function Models() {
  const [selectedImageId, setSelectedImageId] = useState<string | null>(null);
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
            src="/images/portfolio/Models/DSC04441.JPG"
            alt="Fashion & model photography by Studio63"
            label="Models hero editorial portrait"
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
            Models &<br />Fashion.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="font-display font-light italic text-white/60"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)" }}
          >
            Editorial. Bold. Unforgettable.
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
              "A great fashion photograph doesn't just show a garment, it reveals a character."
            </p>
          </div>
          <div className="space-y-4 font-sans text-sm text-[var(--color-brown)] leading-[1.85]">
            <p>
              From portfolio shoots and agency submissions to brand editorials and lookbooks
              we craft images that command attention and define your visual identity.
            </p>
            <p>
              Our studio is equipped for dramatic studio lighting setups, and we have curated
              a selection of cinematic outdoor locations across Hyderabad.
            </p>
            <Link
              to="/contact?service=Models"
              className="inline-flex items-center gap-2 font-sans text-[12px] tracking-widest uppercase mt-4 text-[var(--color-charcoal)] hover:text-[var(--color-gold)] transition-colors group"
            >
              Book Your Fashion Shoot
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
              <motion.button
                key={img.id}
                type="button"
                aria-label={img.title}
                aria-pressed={selectedImageId === img.id}
                onClick={() => setSelectedImageId((current) => current === img.id ? null : img.id)}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative block w-full break-inside-avoid overflow-hidden cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]"
                data-cursor="view"
              >
                <PlaceholderImage
                  src={img.src}
                  alt={img.description ?? img.title}
                  aspect="aspect-auto"
                  className="!h-auto"
                />
                {selectedImageId === img.id && (
                  <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent px-4 pb-4 pt-10 font-display text-lg text-white">
                    {img.title}
                  </span>
                )}
              </motion.button>
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
          <p className="text-editorial-label mb-12 text-center" style={{ color: "var(--color-gold)" }}>The Process</p>
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
