import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  PhoneCall,
  Sparkles,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState("");
  const [activeNumber, setActiveNumber] = useState<"primary" | "secondary">("primary");

  const targetPhone =
    activeNumber === "primary" ? siteConfig.contact.whatsapp : siteConfig.contact.whatsappSecondary;

  const quickStarters = [
    {
      label: "💍 Book Wedding Shoot",
      text: "Hi Studio63#Hyderabad! I would like to inquire about booking wedding photography. Could you share package options and date availability?",
      to: "/contact?service=Wedding",
    },
    {
      label: "🤰 Book Maternity Session",
      text: "Hi! I am interested in booking a maternity session at your Begumpet studio / outdoor location. What are the package details?",
      to: "/contact?service=Maternity",
    },
    {
      label: "👶 Book Newborn Shoot",
      text: "Hello Studio63#Hyderabad! We would love to book a newborn baby photoshoot. Could you share details regarding your safety practices and packages?",
      to: "/contact?service=Newborn",
    },
    {
      label: "🎓 Academy & Courses",
      text: "Hello! I am interested in joining your Photography Academy courses at Begumpet. Can you share the syllabus and upcoming batch dates?",
      to: "/academy",
    },
    {
      label: "📍 Studio Visit & Address",
      text: "Hi! I want to visit Studio 63 at Prakash Nagar Begumpet (Opposite Zudio / Pillar 1346). What are your studio timings?",
      to: "/contact",
    },
  ];

  const handleQuickSend = (text: string) => {
    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setIsOpen(false);
  };

  const handleSendCustom = () => {
    const msg = customMsg.trim() || "Hi Studio63#Hyderabad! I would like to inquire about photography session booking.";
    const url = `https://wa.me/${targetPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setCustomMsg("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Interactive Concierge Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="mb-3 w-[340px] sm:w-[380px] bg-[var(--color-ivory)] border border-[var(--color-beige)] shadow-2xl overflow-hidden text-[var(--color-charcoal)] font-sans"
          >
            {/* Header */}
            <div
              className="p-4 text-white flex items-center justify-between"
              style={{ backgroundColor: "#075e54" }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-emerald-700 flex items-center justify-center font-display font-bold text-xs border border-white/20">
                    S63
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#075e54]" />
                </div>
                <div>
                  <h4 className="font-display font-medium text-sm leading-tight text-white">
                    Studio63#Hyderabad
                  </h4>
                  <p className="text-[11px] text-white/80 leading-tight">
                    Prakash Nagar Metro Pillar 1346, Begumpet
                  </p>
                  <p className="text-[10px] text-emerald-300 font-medium mt-0.5">
                    ● Online • Typically replies in 15 mins
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white p-1 rounded hover:bg-white/10 transition-colors"
                aria-label="Close WhatsApp chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Switcher for Numbers */}
            <div className="bg-[#128C7E] px-4 py-2 flex items-center justify-between text-[11px] text-white/90">
              <span>Chatting with:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveNumber("primary")}
                  className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                    activeNumber === "primary" ? "bg-white text-[#075e54] font-semibold" : "bg-black/20 text-white"
                  }`}
                >
                  7288969348
                </button>
                <button
                  type="button"
                  onClick={() => setActiveNumber("secondary")}
                  className={`px-2 py-0.5 rounded text-[10px] transition-colors ${
                    activeNumber === "secondary" ? "bg-white text-[#075e54] font-semibold" : "bg-black/20 text-white"
                  }`}
                >
                  9398158526
                </button>
              </div>
            </div>

            {/* Body */}
            <div className="p-4 space-y-4 max-h-[380px] overflow-y-auto">
              {/* Message Bubble from Studio */}
              <div className="bg-white rounded-lg p-3 text-xs shadow-sm border border-gray-100 text-gray-800 space-y-1.5">
                <p className="font-medium text-[var(--color-charcoal)]">
                  Namaste! 🙏 Welcome to Studio63#Hyderabad.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  How can we help you today? Select a quick inquiry below or plan your custom session in our Interactive Studio.
                </p>
              </div>

              {/* Quick Interactive Inquiry Chips */}
              <div className="space-y-1.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-brown)]">
                  Quick WhatsApp Inquiries:
                </p>
                <div className="flex flex-col gap-1.5">
                  {quickStarters.map((starter) => (
                    <button
                      key={starter.label}
                      type="button"
                      onClick={() => handleQuickSend(starter.text)}
                      className="w-full text-center px-3 py-2 text-xs bg-white border border-[var(--color-beige)] hover:border-[var(--color-gold)] hover:bg-[var(--color-offwhite)] transition-colors flex items-center justify-between group cursor-pointer"
                    >
                      <span className="font-medium text-[var(--color-charcoal)]">
                        {starter.label}
                      </span>
                      <ChevronRight
                        size={14}
                        className="text-gray-400 group-hover:text-[var(--color-charcoal)] transition-transform group-hover:translate-x-0.5"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Full Interactive Booking Studio Link */}
              <div className="p-3 bg-[var(--color-offwhite)] border border-[var(--color-beige)] space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--color-charcoal)]">
                  <Sparkles size={14} className="text-[var(--color-gold)]" />
                  Want a tailored package quote?
                </div>
                <p className="text-[11px] text-[var(--color-brown)]">
                  Use our Interactive Session Planner to customize dates, setting, and add ons.
                </p>
                <Link
                  to="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block text-center py-2 text-xs bg-[var(--color-inverse-surface)] text-[var(--color-ivory)] hover:bg-[var(--color-brown)] transition-colors font-medium tracking-wide"
                >
                  Open Interactive WhatsApp Studio →
                </Link>
              </div>

              {/* Quick Call Direct */}
              <div className="flex items-center justify-between text-xs pt-1 border-t border-[var(--color-beige)] text-[var(--color-brown)]">
                <span className="flex items-center gap-1">
                  <PhoneCall size={12} /> Direct calls:
                </span>
                <div className="flex items-center gap-2 font-medium text-[var(--color-charcoal)]">
                  <a href="tel:7288969348" className="hover:underline">7288969348</a>
                  <span>•</span>
                  <a href="tel:9398158526" className="hover:underline">9398158526</a>
                </div>
              </div>
            </div>

            {/* Bottom Quick Composer */}
            <div className="p-3 bg-white border-t border-[var(--color-beige)] flex items-center gap-2">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSendCustom();
                }}
                placeholder="Type a message to chat on WhatsApp..."
                className="flex-1 text-xs bg-[var(--color-offwhite)]/60 px-3 py-2 border border-[var(--color-beige)] outline-none focus:border-[var(--color-gold)]"
              />
              <button
                type="button"
                onClick={handleSendCustom}
                className="p-2 text-white flex items-center justify-center transition-transform active:scale-95 cursor-pointer shrink-0"
                style={{ backgroundColor: "#25D366" }}
                title="Send message to WhatsApp"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <div className="relative flex items-center gap-3">
        {/* Helper badge when closed */}
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden sm:flex items-center gap-2 bg-[var(--color-inverse-surface)] text-[var(--color-ivory)] px-3.5 py-1.5 shadow-lg border border-[var(--color-gold)]/40 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-sans font-medium">Book via WhatsApp</span>
          </motion.div>
        )}

        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label="Interactive WhatsApp Concierge"
          className="relative flex items-center justify-center rounded-full shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
          style={{
            backgroundColor: isOpen ? "#211E1B" : "#25D366",
            width: 56,
            height: 56,
          }}
        >
          {isOpen ? (
            <X color="#fff" size={24} strokeWidth={2} />
          ) : (
            <>
              <MessageCircle color="#fff" size={28} strokeWidth={2} />
              <span className="absolute top-0 right-0 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75" />
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-300 border-2 border-white" />
              </span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
