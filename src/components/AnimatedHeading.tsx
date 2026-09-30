import { motion, useReducedMotion } from "framer-motion";

export default function AnimatedHeading({ text }: { text: string }) {
  const reducedMotion = useReducedMotion();
  return (
    <span aria-label={text}>
      {text.split(" ").map((word, index) => (
        <span key={`${word}-${index}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            aria-hidden="true"
            className="inline-block pb-[0.12em]"
            initial={reducedMotion ? false : { y: "110%", rotate: 4 }}
            whileInView={{ y: 0, rotate: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, delay: index * 0.065, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}{"\u00a0"}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
