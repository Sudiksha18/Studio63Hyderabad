import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PlaceholderImage from "../components/PlaceholderImage";
import Lightbox from "../components/Lightbox";
import { portfolioImages } from "../data/portfolio";

const galleryImages = portfolioImages.filter((image) => image.category === "Wildlife");

export default function Wildlife() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  return (
    <div className="bg-[var(--color-ivory)] dark:bg-[#080604]">
      <section className="relative h-[80vh] min-h-[520px] overflow-hidden">
        <PlaceholderImage
          src={galleryImages[0].src}
          alt="Wildlife photography by Studio63 Hyderabad"
          aspect="aspect-auto"
          className="absolute inset-0 w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-black/30" />
        <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-14 pb-16">
          <p className="text-editorial-label text-white/50 mb-3">Studio63 · Hyderabad</p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display font-bold text-white mb-3"
            style={{ fontSize: "clamp(3rem, 8vw, 7rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
          >
            Wildlife.<br /><span className="font-light italic">Through the Lens.</span>
          </motion.h1>
          <p className="font-display font-light italic text-white/60 text-xl">Life in the wild, captured in light.</p>
        </div>
      </section>

      <section className="px-6 md:px-14 py-24">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-14 items-start">
          <p className="font-display font-light italic text-[var(--color-charcoal)] text-2xl leading-snug">
            Every encounter with the wild tells a story of its own.
          </p>
          <p className="font-sans text-sm text-[var(--color-brown)] leading-[1.85]">
            Explore our wildlife collection: moments of movement, stillness and natural beauty,
            observed with patience and captured through the lens.
          </p>
        </div>
      </section>

      <section className="px-6 md:px-14 pb-24">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-editorial-label mb-8" style={{ color: "var(--color-gold)" }}>Wildlife Gallery</h2>
          <div className="columns-2 md:columns-3 gap-3 space-y-3">
            {galleryImages.map((image, index) => (
              <motion.button
                key={image.id}
                type="button"
                onClick={() => setLightboxIndex(index)}
                aria-label={`View ${image.title}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 6) * 0.06 }}
                className="block w-full break-inside-avoid overflow-hidden cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]"
                data-cursor="view"
              >
                <PlaceholderImage src={image.src} alt={image.title} aspect="aspect-auto" className="!h-auto" />
              </motion.button>
            ))}
          </div>
          <Link to="/portfolio" className="inline-block mt-10 font-sans text-[12px] tracking-widest uppercase text-[var(--color-brown)] hover:text-[var(--color-gold)] transition-colors">
            View full portfolio →
          </Link>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox images={galleryImages} index={lightboxIndex} onClose={() => setLightboxIndex(null)} onNavigate={setLightboxIndex} />
      )}
    </div>
  );
}
