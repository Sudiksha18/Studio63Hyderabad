import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * CustomCursor — ultra-smooth premium cursor.
 * Position: raw motion values (no spring lag — instant tracking).
 * Size:      light spring (smooth expand/shrink only).
 * Blend:     mix-blend-mode difference — always visible on any bg.
 */
export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  // Raw position — NO spring, zero lag
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Only size gets a spring (so expand/shrink feels smooth, not jarring)
  const sizeRaw = useMotionValue(18);
  const size = useSpring(sizeRaw, { stiffness: 500, damping: 30, mass: 0.3 });

  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Only run on mouse (fine pointer) devices
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.body.classList.add("custom-cursor-active");

    const move = (e: MouseEvent) => {
      // Set directly — no spring, perfectly in sync with mouse
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as HTMLElement;
      const isView = target.closest("[data-cursor='view']");
      const isClickable = target.closest("a, button, input, textarea, select, label");

      if (isView) {
        sizeRaw.set(64);
        if (labelRef.current) labelRef.current.style.opacity = "1";
      } else if (isClickable) {
        sizeRaw.set(8);
        if (labelRef.current) labelRef.current.style.opacity = "0";
      } else {
        sizeRaw.set(18);
        if (labelRef.current) labelRef.current.style.opacity = "0";
      }
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      document.body.classList.remove("custom-cursor-active");
    };
  }, [x, y, sizeRaw]);

  return (
    <motion.div
      ref={cursorRef}
      aria-hidden="true"
      className="pointer-events-none fixed z-[10000] top-0 left-0 flex items-center justify-center"
      style={{
        x,
        y,
        width: size,
        height: size,
        translateX: "-50%",
        translateY: "-50%",
        border: "1.5px solid rgba(255,255,255,0.85)",
        borderRadius: "50%",
        mixBlendMode: "difference",
      }}
    >
      <span
        ref={labelRef}
        className="font-sans text-[8px] tracking-widest uppercase text-white opacity-0 transition-opacity duration-150 select-none"
      >
        VIEW
      </span>
    </motion.div>
  );
}
