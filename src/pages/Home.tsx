import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Timeline from "../components/Timeline";
import Testimonials from "../components/Testimonials";
import CTASection from "../components/CTASection";
import PlaceholderImage from "../components/PlaceholderImage";
import MarqueeStrip from "../components/MarqueeStrip";
import CategoryCard from "../components/CategoryCard";
import { portfolioImages } from "../data/portfolio";

const categories = [
  {
    title: "Weddings",
    tagline: "Where two stories become one.",
    href: "/weddings",
    imageSrc: "/images/portfolio/1Q6A3062.jpg",
    imageAlt: "Wedding photography",
    imageLabel: "Wedding couple portrait",
  },
  {
    title: "Maternity",
    tagline: "Celebrating new life and grace.",
    href: "/maternity",
    imageSrc: "/images/portfolio/maternity/1.jpg",
    imageAlt: "Maternity photography",
    imageLabel: "Peacock Feather Grace",
  },
  {
    title: "Newborn",
    tagline: "The most tender light.",
    href: "/newborn",
    imageSrc: "/images/portfolio/newborn-02.jpg",
    imageAlt: "Newborn photography",
    imageLabel: "Newborn peaceful sleep",
  },
  {
    title: "Models",
    tagline: "Editorial. Bold. Unforgettable.",
    href: "/models",
    imageSrc: "/images/portfolio/Models/DSC04441.JPG",
    imageAlt: "Fashion & model photography",
    imageLabel: "Models editorial portrait",
  },
  {
    title: "Portraits",
    tagline: "Your authentic self, in light.",
    href: "/portfolio",
    imageSrc: "/images/portfolio/portrait-01.jpg",
    imageAlt: "Portrait photography",
    imageLabel: "Portraits natural light",
  },
];

export default function Home() {
  const preview = portfolioImages.filter((image) => image.category === "Wedding");

  return (
    <div>
      {/* ── HERO ── */}
      <Hero />

      {/* ── MARQUEE ── */}
      <MarqueeStrip dark />

      {/* ── INTRODUCTION ── */}
      <section className="px-6 md:px-14 py-28 bg-[var(--color-ivory)] dark:bg-[#080604]">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-14 items-center">
          {/* Text side */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-editorial-label mb-4" style={{ color: "var(--color-gold)" }}>
              About the Studio
            </p>
            <h2
              className="font-display font-bold text-[var(--color-charcoal)] mb-6"
              style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em", lineHeight: 1.05 }}
            >
              Every Photograph<br />
              <span className="font-light italic">Has a Story.</span>
            </h2>
            <p className="font-sans text-sm text-[var(--color-brown)] leading-[1.85] max-w-md mb-8">
              With over 7 years of experience, Studio63#Hyderabad brings creativity,
              passion and precision to every frame. From weddings and newborns to maternity
              and fashion photography, every session is approached with patience, emotion
              and a strong eye for storytelling.
            </p>
            {/* Decorative stat inline */}
            <div className="flex items-center gap-6 mb-10">
              <div className="gold-line" />
              <span className="font-display font-bold text-[var(--color-charcoal)]" style={{ fontSize: "2rem" }}>7+</span>
              <span className="font-sans text-xs text-[var(--color-brown)] uppercase tracking-wider">Years of Excellence</span>
            </div>
            <Link
              to="/about"
              className="inline-flex items-center gap-3 font-sans text-[12px] tracking-widest uppercase text-[var(--color-charcoal)] hover:text-[var(--color-gold)] transition-colors group"
            >
              Discover Our Story
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                <path d="M1 5H19M19 5L15 1M19 5L15 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>

          {/* Image side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            {/* Gold accent border */}
            <div
              className="absolute -top-3 -right-3 w-full h-full pointer-events-none"
              style={{ border: "1px solid var(--color-gold)", opacity: 0.25 }}
            />
            <div data-cursor="view">
              <PlaceholderImage
                src="/images/about/behind-the-scenes.jpg"
                alt="Studio63#Hyderabad behind the scenes"
                label="Behind the scenes portrait session"
                aspect="aspect-[4/5]"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── STATS (dark band) ── */}
      <Stats />

      {/* ── MARQUEE (reversed) ── */}
      <MarqueeStrip dark={false} reverse />

      {/* ── CATEGORY SHOWCASE ── */}
      <section className="px-6 md:px-14 py-28 bg-[var(--color-ivory)] dark:bg-[#080604]">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-editorial-label mb-3"
                style={{ color: "var(--color-gold)" }}
              >
                What We Capture
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7 }}
                className="font-display font-bold text-[var(--color-charcoal)]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}
              >
                Every Story,<br />
                <span className="font-light italic">Beautifully Told.</span>
              </motion.h2>
            </div>
            <Link
              to="/portfolio"
              className="hidden md:inline-flex items-center gap-2 font-sans text-[12px] tracking-widest uppercase text-[var(--color-brown)] hover:text-[var(--color-gold)] transition-colors group"
            >
              View all
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                <path d="M1 5H15M15 5L11 1M15 5L11 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Category cards grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
            {categories.map((cat, i) => (
              <CategoryCard key={cat.title} {...cat} index={i} />
            ))}
          </div>

          <div className="mt-8 md:hidden">
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 font-sans text-[12px] tracking-widest uppercase text-[var(--color-brown)] hover:text-[var(--color-gold)] transition-colors"
            >
              View full portfolio →
            </Link>
          </div>
        </div>
      </section>

      {/* ── SELECTED WORKS PREVIEW ── */}
      <section className="px-6 md:px-14 py-28 bg-[var(--color-offwhite)] dark:bg-[#0A0806]">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="flex items-end justify-between mb-12">
            <div>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="text-editorial-label mb-3"
                style={{ color: "var(--color-gold)" }}
              >
                01 Selected Works
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7 }}
                className="font-display font-bold text-[var(--color-charcoal)]"
                style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)", letterSpacing: "-0.03em" }}
              >
                The Work.
              </motion.h2>
            </div>
            <Link
              to="/portfolio"
              className="hidden md:inline-flex items-center gap-2 font-sans text-[12px] tracking-widest uppercase text-[var(--color-brown)] hover:text-[var(--color-gold)] transition-colors group"
            >
              Full portfolio
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                <path d="M1 5H15M15 5L11 1M15 5L11 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>

          {/* Mixed-size grid */}
          <div className="columns-2 md:columns-3 gap-3 space-y-3">
            {preview.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.07 }}
                className="break-inside-avoid photo-card block"
                data-cursor="view"
              >
                <Link to="/portfolio">
                  <PlaceholderImage
                    src={img.src}
                    alt={img.title}
                    label={`${img.category} ${img.title}`}
                    aspect={
                      img.orientation === "portrait"
                        ? "aspect-[4/5]"
                        : img.orientation === "square"
                        ? "aspect-square"
                        : "aspect-[3/2]"
                    }
                  />
                  <div className="photo-overlay">
                    <div className="photo-overlay-content">
                      <span className="text-editorial-label text-white/50">{img.category}</span>
                      <p className="font-display text-white text-lg leading-tight">{img.title}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-10 md:hidden"
          >
            <Link
              to="/portfolio"
              className="font-sans text-[12px] tracking-widest uppercase text-[var(--color-brown)] hover:text-[var(--color-gold)] transition-colors"
            >
              View full portfolio →
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <MarqueeStrip dark />

      {/* ── TIMELINE ── */}
      <Timeline />

      {/* ── TESTIMONIALS ── */}
      <Testimonials />

      {/* ── CTA ── */}
      <CTASection />
    </div>
  );
}
