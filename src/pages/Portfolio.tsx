import { useMemo, useState } from "react";
import { motion, AnimatePresence, useScroll, useVelocity, useTransform, useSpring } from "framer-motion";
import PlaceholderImage from "../components/PlaceholderImage";
import Lightbox from "../components/Lightbox";
import { portfolioCategories, portfolioImages, type PortfolioCategory } from "../data/portfolio";

export default function Portfolio() {
  const [active, setActive] = useState<PortfolioCategory | "All">("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => (active === "All" ? portfolioImages : portfolioImages.filter((i) => i.category === active)),
    [active]
  );

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skewY = useTransform(smoothVelocity, [-800, 800], [-1.5, 1.5]);

  return (
    <div className="pt-32 pb-28 px-6 md:px-14 bg-[var(--color-ivory)] dark:bg-[#080604] min-h-screen">
      <div className="mx-auto max-w-6xl">

        {/* Page header */}
        <div className="mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-editorial-label mb-3"
            style={{ color: "var(--color-gold)" }}
          >
            Studio63 Visual Archive
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display font-bold text-[var(--color-charcoal)]"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
          >
            Selected<br />
            <span className="font-light italic">Works.</span>
          </motion.h1>
        </div>

        {/* Category filter — line style */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center gap-x-8 gap-y-3 mb-14 border-b border-[var(--color-beige)] dark:border-white/8 pb-5"
        >
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-sans text-[12px] tracking-widest uppercase pb-1 transition-all duration-300 relative ${
                active === cat
                  ? "text-[var(--color-gold)]"
                  : "text-[var(--color-brown)] dark:text-white/35 hover:text-[var(--color-charcoal)] dark:hover:text-white/60"
              }`}
            >
              {cat}
              {active === cat && (
                <motion.div
                  layoutId="filter-underline"
                  className="absolute bottom-0 left-0 right-0 h-px"
                  style={{ backgroundColor: "var(--color-gold)" }}
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Mixed masonry grid with Velocity Skew */}
        <motion.div className="columns-2 md:columns-3 gap-3 space-y-3" style={{ skewY }}>
          <AnimatePresence>
            {filtered.map((img, i) => {
              const globalIndex = filtered.indexOf(img);
              return (
                <motion.button
                  key={img.id}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4, delay: (i % 9) * 0.04 }}
                  onClick={() => setLightboxIndex(globalIndex)}
                  className="break-inside-avoid photo-card block w-full text-center"
                  data-cursor="view"
                >
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
                      <p className="font-display text-white text-xl leading-tight">{img.title}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={filtered}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}
