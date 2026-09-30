import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

interface Props {
  className?: string;
  showLabel?: boolean;
}

export default function ThemeToggle({ className = "", showLabel = false }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Switch to bright screen" : "Switch to dark screen"}
      title={isDark ? "Switch to Bright Mode" : "Switch to Dark Mode"}
      className={`relative inline-flex items-center justify-center p-2 rounded-full border transition-all duration-300 cursor-pointer ${
        isDark
          ? "bg-[#1E1A16] border-[#3A332C] text-[var(--color-gold)] hover:border-[var(--color-gold)] hover:bg-[#28231E]"
          : "bg-white/80 border-[var(--color-beige)] text-[var(--color-charcoal)] hover:border-[var(--color-gold)] hover:bg-white"
      } ${className}`}
    >
      <div className="relative w-5 h-5 flex items-center justify-center overflow-hidden">
        <motion.div
          key={isDark ? "dark" : "light"}
          initial={{ y: -16, opacity: 0, rotate: -45 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 16, opacity: 0, rotate: 45 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          {isDark ? (
            <Moon size={17} strokeWidth={2} className="text-[var(--color-gold-soft)]" />
          ) : (
            <Sun size={17} strokeWidth={2} className="text-amber-600" />
          )}
        </motion.div>
      </div>

      {showLabel && (
        <span className="ml-2 font-sans text-xs tracking-wide font-medium">
          {isDark ? "Bright Screen" : "Dark Screen"}
        </span>
      )}
    </button>
  );
}
