import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const { pathname } = useLocation();
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    setIsFirstMount(false);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(4px)" }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex-1 flex flex-col"
      >
        {children}
      </motion.div>

      {/* Cinematic Curtain Reveal */}
      {!isFirstMount && (
        <motion.div
          key={pathname + "-curtain"}
          initial={{ top: 0 }}
          animate={{ top: "-100vh" }}
          exit={{ top: 0 }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed left-0 w-full h-[100vh] z-[9999] bg-[#080604] flex items-center justify-center pointer-events-none"
          style={{ originY: 0 }}
        >
          <motion.div
            initial={{ opacity: 1, scale: 0.95 }}
            animate={{ opacity: 0, scale: 1 }}
            exit={{ opacity: 1, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-1"
          >
            <span className="font-display font-bold text-4xl text-white">Studio63</span>
            <span className="font-sans font-semibold text-xl" style={{ color: "var(--color-gold)" }}>#Hyd</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
