import { useEffect, useState } from "react";
import { Link, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navLinks, siteConfig } from "../data/siteConfig";
import ThemeToggle from "./ThemeToggle";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isHome = location.pathname === "/";
  const isTransparent = !scrolled && isHome;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isTransparent
            ? "bg-transparent border-b border-transparent"
            : "bg-[var(--color-ivory)]/95 dark:bg-[#080604]/90 backdrop-blur-md border-b border-[var(--color-beige)] dark:border-white/5"
        }`}
      >
        <nav className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 2xl:gap-8 px-6 py-4 md:py-5 2xl:px-10">
          {/* Logo */}
          <Link
            to="/"
            aria-label="Studio63 Hyderabad home"
            className={`shrink-0 whitespace-nowrap font-display text-xl md:text-2xl tracking-tight flex items-center gap-2 transition-colors duration-300 ${
              isTransparent ? "text-white" : "text-[var(--color-charcoal)]"
            }`}
          >
            <span className="font-bold">Studio63</span>
            <span
              className="font-sans font-semibold text-base md:text-lg"
              style={{ color: "var(--color-gold)" }}
            >
              #Hyderabad
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden xl:flex items-center gap-3 2xl:gap-6 whitespace-nowrap">
            {navLinks.map((link) => (
              <li key={link.to}>
                <RouterNavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `nav-link-hover font-sans text-[11px] 2xl:text-[12px] tracking-widest uppercase transition-all duration-300 ${
                      isTransparent ? "text-white/80 hover:text-white" : "text-[var(--color-charcoal)] hover:text-[var(--color-gold)]"
                    } ${isActive ? (isTransparent ? "text-white" : "text-[var(--color-gold)]") : ""}`
                  }
                >
                  {link.label}
                </RouterNavLink>
              </li>
            ))}
          </ul>

          {/* Right side: theme toggle + CTA + hamburger */}
          <div className="flex shrink-0 items-center gap-3 md:gap-4">
            <ThemeToggle />

            <Magnetic strength={0.2} className="hidden md:inline-block">
              <Link
                to="/contact"
                className={`hidden md:inline-block whitespace-nowrap font-sans text-[11px] tracking-widest uppercase px-5 py-2.5 transition-all duration-300 ${
                  isTransparent
                    ? "border border-white/50 text-white hover:bg-white hover:text-[var(--color-charcoal)]"
                    : "bg-[var(--color-gold)] text-white hover:bg-[var(--color-gold-vivid)]"
                }`}
              >
                Book Session
              </Link>
            </Magnetic>

            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen((v) => !v)}
              className={`xl:hidden p-1 transition-colors ${
                isTransparent ? "text-white" : "text-[var(--color-charcoal)]"
              }`}
            >
              {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
            </button>
          </div>
        </nav>
      </header>

      {/* ===== FULL-SCREEN MOBILE MENU ===== */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            key="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] flex flex-col justify-between xl:hidden"
            style={{ backgroundColor: "#080604" }}
          >
            {/* Top bar inside mobile menu */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-white/5">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                aria-label="Studio63 Hyderabad home"
                className="font-display text-xl text-white font-bold"
              >
                Studio63
                <span className="font-sans font-semibold text-base ml-2" style={{ color: "var(--color-gold)" }}>
                  #Hyderabad
                </span>
              </Link>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={24} strokeWidth={1.2} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 min-h-0 overflow-y-auto flex flex-col px-8 py-4" data-lenis-prevent>
              <ul className="my-auto space-y-0.5">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.to}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.35, delay: 0.1 + i * 0.05 }}
                  >
                    <RouterNavLink
                      to={link.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `block font-display text-2xl sm:text-3xl leading-tight py-1.5 transition-colors duration-200 ${
                          isActive
                            ? "text-[var(--color-gold)]"
                            : "text-white/70 hover:text-white"
                        }`
                      }
                    >
                      {link.label}
                    </RouterNavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Bottom bar inside mobile menu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="px-8 pb-10 border-t border-white/5 pt-6 flex items-center justify-between"
            >
              <div>
                <p className="text-editorial-label text-white/40 mb-1">Contact</p>
                <a
                  href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                  className="font-sans text-sm text-white/70"
                >
                  {siteConfig.contact.phone}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <ThemeToggle showLabel />
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="font-sans text-[11px] tracking-widest uppercase px-4 py-2.5 border border-[var(--color-gold)] text-[var(--color-gold)] hover:bg-[var(--color-gold)] hover:text-black transition-colors"
                >
                  Book Now
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
