import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import PlaceholderImage from "./PlaceholderImage";

import AnimatedHeading from "./AnimatedHeading";

type Props = {
  heading: string;
  text: string;
  ctaLabel: string;
  ctaTo?: string;
  imageSrc: string;
  imageLabel: string;
  reverse?: boolean;
};

export default function ServiceHero({ heading, text, ctaLabel, ctaTo = "/contact", imageSrc, imageLabel, reverse }: Props) {
  const reducedMotion = useReducedMotion();
  return (
    <section className="px-6 md:px-14 pt-36 pb-20">
      <div
        className={`mx-auto max-w-6xl grid md:grid-cols-2 gap-12 items-center ${
          reverse ? "md:[&>*:first-child]:order-2" : ""
        }`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="font-display text-4xl md:text-5xl leading-tight mb-6"><AnimatedHeading text={heading} /></h1>
          <p className="font-sans text-[var(--color-brown)] leading-relaxed mb-8 max-w-md">{text}</p>
          <Link
            to={ctaTo}
            className="animated-button inline-block border border-[var(--color-charcoal)] px-7 py-3.5 font-sans text-sm tracking-wide hover:bg-[var(--color-charcoal)] hover:text-[var(--color-ivory)] transition-colors"
          >
            {ctaLabel}
          </Link>
        </motion.div>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0, clipPath: "inset(8% 8% 8% 8%)", y: 35 }}
          whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)", y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="service-photo"
        >
          <PlaceholderImage src={imageSrc} alt={heading} label={imageLabel} aspect="aspect-[4/5]" />
        </motion.div>
      </div>
    </section>
  );
}
