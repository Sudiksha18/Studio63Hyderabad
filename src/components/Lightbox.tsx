import { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, MessageCircle, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import type { PortfolioImage } from "../data/portfolio";
import { siteConfig } from "../data/siteConfig";

type Props = {
  images: PortfolioImage[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
};

export default function Lightbox({ images, index, onClose, onNavigate }: Props) {
  const current = images[index];

  const next = useCallback(() => onNavigate((index + 1) % images.length), [index, images.length, onNavigate]);
  const prev = useCallback(() => onNavigate((index - 1 + images.length) % images.length), [index, images.length, onNavigate]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [next, prev, onClose]);

  if (!current) return null;

  const handleWhatsAppInquiry = () => {
    const msg = `Hi Studio63#Hyderabad! I was admiring "${current.title}" (${current.category}) on your portfolio. I would love to book a similar style shoot with you. Could you share pricing and availability?`;
    const url = `https://wa.me/${siteConfig.contact.whatsapp}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/95 flex flex-col items-center justify-between p-4 md:p-8"
      >
        {/* Top Header Bar */}
        <div className="w-full max-w-6xl flex items-center justify-between text-white/80 z-10">
          <div>
            <span className="text-xs uppercase tracking-widest text-[var(--color-gold-soft)] font-medium">
              {current.category}
            </span>
            <h3 className="font-display text-lg text-white">{current.title}</h3>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-sans text-xs text-white/50">
              {index + 1} of {images.length}
            </span>
            <button
              aria-label="Close"
              onClick={onClose}
              className="p-2 text-white/80 hover:text-white transition-colors cursor-pointer rounded-full hover:bg-white/10"
            >
              <X size={26} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Center Photograph with Nav Arrows */}
        <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-2">
          <button
            aria-label="Previous image"
            onClick={prev}
            className="absolute left-0 md:-left-6 z-20 p-2 text-white/70 hover:text-white bg-black/40 md:bg-transparent rounded-full hover:scale-110 transition-transform cursor-pointer"
          >
            <ChevronLeft size={36} strokeWidth={1.5} />
          </button>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              className="max-h-[68vh] max-w-full flex items-center justify-center overflow-hidden"
            >
              <img
                src={current.src}
                alt={current.title}
                className="max-h-[68vh] max-w-full object-contain rounded-none shadow-2xl border border-white/10"
              />
            </motion.div>
          </AnimatePresence>

          <button
            aria-label="Next image"
            onClick={next}
            className="absolute right-0 md:-right-6 z-20 p-2 text-white/70 hover:text-white bg-black/40 md:bg-transparent rounded-full hover:scale-110 transition-transform cursor-pointer"
          >
            <ChevronRight size={36} strokeWidth={1.5} />
          </button>
        </div>

        {/* Bottom Interactive Action Bar */}
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md border border-white/15 p-4 rounded-none flex flex-wrap items-center justify-between gap-3 text-white z-10">
          <div className="text-xs">
            <p className="font-medium text-white/90">{current.description || current.title}</p>
            <p className="text-white/60 text-[11px]">Studio 63 Begumpet & On-Location</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleWhatsAppInquiry}
              className="flex items-center gap-2 px-4 py-2 text-xs font-sans font-medium tracking-wide text-white transition-opacity hover:opacity-90 cursor-pointer shadow-md"
              style={{ backgroundColor: "#25D366" }}
            >
              <MessageCircle size={15} fill="#fff" color="#25D366" />
              <span>Ask on WhatsApp</span>
            </button>

            <Link
              to={`/contact?service=${current.category}`}
              onClick={onClose}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-sans font-medium tracking-wide bg-[var(--color-ivory)] text-[var(--color-charcoal)] hover:bg-[var(--color-gold-soft)] transition-colors"
            >
              <Calendar size={13} />
              <span>Book This Style</span>
            </Link>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
