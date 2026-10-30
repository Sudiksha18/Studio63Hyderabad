import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface Props {
  children: ReactNode;
  /** How strongly the element pulls towards the cursor (0 to 1) */
  strength?: number;
  /** Optional class for the wrapper */
  className?: string;
}

/**
 * Magnetic — cursor-attracted element using MotionValues only.
 * Zero React re-renders: position is driven by framer-motion's
 * internal animation loop, not useState.
 */
export default function Magnetic({ children, strength = 0.3, className = "inline-block" }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // MotionValues: bypass React reconciler entirely — no re-renders
  const xRaw = useMotionValue(0);
  const yRaw = useMotionValue(0);

  const x = useSpring(xRaw, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(yRaw, { stiffness: 150, damping: 15, mass: 0.1 });

  const handleMouse = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    xRaw.set((clientX - (left + width / 2)) * strength);
    yRaw.set((clientY - (top + height / 2)) * strength);
  };

  const reset = () => {
    xRaw.set(0);
    yRaw.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
