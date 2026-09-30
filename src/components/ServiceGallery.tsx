import { motion, useScroll, useVelocity, useTransform, useSpring, useReducedMotion } from "framer-motion";
import PlaceholderImage from "./PlaceholderImage";

type Props = {
  heading: string;
  items: { src: string; label: string; aspect?: string }[];
  highlights?: string[];
};

export default function ServiceGallery({ heading, items, highlights }: Props) {
  const reducedMotion = useReducedMotion();
  // Awwwards-style scroll-velocity skew
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const skewY = useTransform(smoothVelocity, [-800, 800], [-2.5, 2.5]);

  return (
    <section className="px-6 md:px-14 py-20 bg-[var(--color-offwhite)] overflow-hidden">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl md:text-4xl mb-10"
        >
          {heading}
        </motion.h2>

        {highlights && (
          <ul className="flex flex-wrap gap-x-8 gap-y-2 mb-12 font-sans text-sm text-[var(--color-brown)]">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2">
                <span className="w-1 h-1 rounded-full bg-[var(--color-gold)]" /> {h}
              </li>
            ))}
          </ul>
        )}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.label + i}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 24, clipPath: reducedMotion ? "none" : "inset(0 0 18% 0)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: reducedMotion ? "none" : "inset(0 0 0% 0)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: reducedMotion ? 0 : 0.85, delay: reducedMotion ? 0 : (i % 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={i === 0 ? "col-span-2 row-span-2" : ""}
            >
              <motion.div 
                className="group relative overflow-hidden h-full"
                style={{ skewY: reducedMotion ? 0 : skewY }}
              >
                <div className="transition-transform duration-700 ease-out group-hover:scale-105 h-full">
                  <PlaceholderImage
                    src={item.src}
                    alt={item.label}
                    label={item.label}
                    aspect={item.aspect ?? (i === 0 ? "aspect-square" : "aspect-[4/5]")}
                  />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
