import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PlaceholderImage from "./PlaceholderImage";

export interface CategoryCardProps {
  title: string;
  tagline: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  imageLabel: string;
  index?: number;
}

export default function CategoryCard({
  title,
  tagline,
  href,
  imageSrc,
  imageAlt,
  imageLabel,
  index = 0,
}: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative"  /* ← ensures the aspect-ratio + absolute children work */
    >
      <Link
        to={href}
        className="group category-card block relative overflow-hidden"
        style={{ aspectRatio: "3/4" }}
        aria-label={`Explore ${title} photography`}
      >
        {/* Background photo */}
        <div className="absolute inset-0">
          <PlaceholderImage
            src={imageSrc}
            alt={imageAlt}
            label={imageLabel}
            aspect="aspect-auto"
            className="w-full h-full"
          />
        </div>

        {/* Gradient overlay — always present via .category-card::before in CSS */}

        {/* Content */}
        <div className="absolute inset-0 z-[2] flex flex-col justify-end p-5 md:p-6">
          <p className="text-editorial-label text-white/40 mb-2 transition-colors duration-300 group-hover:text-[var(--color-gold-soft)]">
            Studio63
          </p>
          <h3
            className="font-display font-bold text-white leading-none mb-1.5 transition-transform duration-500 group-hover:-translate-y-1"
            style={{ fontSize: "clamp(1.3rem, 2.8vw, 2rem)", letterSpacing: "-0.025em" }}
          >
            {title}
          </h3>
          <p className="font-sans text-[12px] text-white/50 mb-4 leading-snug">
            {tagline}
          </p>

          {/* Arrow — reveals on hover */}
          <span className="category-explore inline-flex items-center gap-2 font-sans text-[10px] tracking-widest uppercase text-[var(--color-gold)] transition-all duration-300">
            Explore
            <svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden="true">
              <path d="M1 4.5H13M13 4.5L9.5 1M13 4.5L9.5 8" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
