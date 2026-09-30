import { motion, useReducedMotion, useScroll } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reducedMotion = useReducedMotion();

  if (reducedMotion) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-0 z-[10000] h-[2px] origin-left pointer-events-none bg-[var(--color-gold)]"
      style={{ scaleX: scrollYProgress }}
    />
  );
}
