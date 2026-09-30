import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, MapPin, Navigation } from "lucide-react";
import WhatsAppBookingStudio, { type ServiceType } from "../components/WhatsAppBookingStudio";
import ContactForm from "../components/ContactForm";
import { siteConfig } from "../data/siteConfig";


export default function Contact() {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get("service") as ServiceType | null;
  const [activeTab, setActiveTab] = useState<"studio" | "quick">("studio");

  const { phone, phoneSecondary, whatsapp, whatsappSecondary, email, address } = siteConfig.contact;

  const validService: ServiceType =
    serviceParam && ["Wedding", "Maternity", "Newborn", "Models", "Academy", "Portraits"].includes(serviceParam)
      ? serviceParam
      : "Wedding";

  return (
    <div className="px-6 md:px-14 pt-32 pb-28 bg-[var(--color-ivory)] dark:bg-[#080604]">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <p className="text-editorial-label mb-4" style={{ color: "var(--color-gold)" }}>
            Bookings & Enquiries
          </p>
          <h1
            className="font-display font-bold text-[var(--color-charcoal)] mb-5"
            style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
          >
            Plan Your<br />
            <span className="font-light italic">Visual Story.</span>
          </h1>
          <p className="font-sans text-sm text-[var(--color-brown)] leading-[1.85] max-w-xl mx-auto">
            Whether you are celebrating a wedding, a newborn arrival, building your model portfolio,
            or seeking academy mentorship, book directly through WhatsApp for instant confirmation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12"
        >
          {/* Phone Card */}
          <div className="p-5 border border-[var(--color-beige)] dark:border-white/8 flex flex-col justify-between hover:border-[var(--color-gold)] transition-colors" style={{ backgroundColor: "var(--color-surface)" }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 flex items-center justify-center" style={{ color: "var(--color-gold)" }}>
                <Phone size={18} strokeWidth={1.5} />
              </span>
              <div>
                <span className="block text-editorial-label text-[var(--color-brown)]">Direct Calls</span>
                <span className="text-sm font-semibold text-[var(--color-charcoal)]">Studio Contact</span>
              </div>
            </div>
            <div className="space-y-1 text-sm font-sans">
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="block hover:text-[var(--color-gold)] font-medium text-[var(--color-charcoal)] transition-colors">
                {phone}
              </a>
              <a href={`tel:${phoneSecondary.replace(/\s/g, "")}`} className="block hover:text-[var(--color-gold)] text-[var(--color-brown)] transition-colors">
                {phoneSecondary}
              </a>
            </div>
          </div>

          {/* WhatsApp Card */}
          <div className="p-5 border border-[var(--color-beige)] dark:border-white/8 flex flex-col justify-between hover:border-emerald-500/50 transition-colors" style={{ backgroundColor: "var(--color-surface)" }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 flex items-center justify-center text-emerald-500">
                <MessageCircle size={18} strokeWidth={1.5} />
              </span>
              <div>
                <span className="block text-editorial-label text-[var(--color-brown)]">WhatsApp Direct</span>
                <span className="text-sm font-semibold text-[var(--color-charcoal)]">Instant Chat</span>
              </div>
            </div>
            <div className="space-y-1 text-sm font-sans">
              <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="block text-emerald-500 font-medium hover:underline">
                +91 72889 69348 (Main)
              </a>
              <a href={`https://wa.me/${whatsappSecondary}`} target="_blank" rel="noopener noreferrer" className="block text-emerald-500/70 hover:underline text-xs">
                +91 93981 58526 (Studio 63)
              </a>
            </div>
          </div>

          {/* Email Card */}
          <div className="p-5 border border-[var(--color-beige)] dark:border-white/8 flex flex-col justify-between hover:border-[var(--color-gold)] transition-colors" style={{ backgroundColor: "var(--color-surface)" }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 flex items-center justify-center" style={{ color: "var(--color-gold)" }}>
                <Mail size={18} strokeWidth={1.5} />
              </span>
              <div>
                <span className="block text-editorial-label text-[var(--color-brown)]">Email</span>
                <span className="text-sm font-semibold text-[var(--color-charcoal)]">Official Inbox</span>
              </div>
            </div>
            <a href={`mailto:${email}`} className="font-sans text-sm text-[var(--color-charcoal)] hover:text-[var(--color-gold)] break-all transition-colors">
              {email}
            </a>
          </div>

          {/* Location Card */}
          <div className="p-5 border border-[var(--color-beige)] dark:border-white/8 flex flex-col justify-between hover:border-[var(--color-gold)] transition-colors" style={{ backgroundColor: "var(--color-surface)" }}>
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 flex items-center justify-center" style={{ color: "var(--color-gold)" }}>
                <MapPin size={18} strokeWidth={1.5} />
              </span>
              <div>
                <span className="block text-editorial-label text-[var(--color-brown)]">Studio 63 Begumpet</span>
                <span className="text-sm font-semibold text-[var(--color-charcoal)]">Metro Pillar 1346</span>
              </div>
            </div>
            <a href={address.mapsUrl} target="_blank" rel="noopener noreferrer" className="font-sans text-xs text-[var(--color-brown)] hover:text-[var(--color-gold)] flex items-center gap-1 group transition-colors">
              <span>Begumpet, Hyderabad 500016</span>
              <Navigation size={11} className="transition-transform group-hover:translate-x-0.5 shrink-0" />
            </a>
          </div>
        </motion.div>

        {/* Studio Location Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-12 p-6 md:p-8 border border-[var(--color-beige)] dark:border-white/8 grid md:grid-cols-3 gap-6 items-center"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <div className="md:col-span-2 space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold text-white" style={{ backgroundColor: "var(--color-gold)" }}>
                Studio Address &amp; Landmark
              </span>
              <span className="text-xs font-medium" style={{ color: "var(--color-gold)" }}>Opposite Zudio</span>
            </div>
            <h3 className="font-display text-xl md:text-2xl text-[var(--color-charcoal)]">
              Door No: 11, 2nd Floor, Jabbar Apartments
            </h3>
            <p className="font-sans text-sm text-[var(--color-brown)] leading-relaxed">
              Beside Prakash Nagar Metro Station (Pillar No: 1346), Opposite Zudio, Prakash Nagar, Begumpet, Hyderabad, TG, 500016.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row md:flex-col gap-3 justify-center md:items-end">
            <a
              href={address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 font-sans text-xs tracking-wider uppercase text-white text-center transition-opacity hover:opacity-80"
              style={{ backgroundColor: "var(--color-gold)" }}
            >
              <Navigation size={14} />
              Open In Google Maps
            </a>
            <a
              href="tel:7288969348"
              className="inline-flex items-center justify-center gap-2 border border-[var(--color-gold)] px-6 py-2.5 font-sans text-xs tracking-wider uppercase text-[var(--color-charcoal)] hover:bg-[var(--color-gold)] hover:text-white transition-colors text-center"
              style={{ color: "var(--color-gold)" }}
            >
              <Phone size={13} />
              Call Studio Front Desk
            </a>
          </div>
        </motion.div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          <button
            type="button"
            onClick={() => setActiveTab("studio")}
            className={`px-5 py-2.5 font-sans text-sm tracking-wide transition-all cursor-pointer border ${
              activeTab === "studio"
                ? "text-white border-transparent"
                : "text-[var(--color-charcoal)] border-[var(--color-beige)] dark:border-white/10 dark:text-white/60 hover:border-[var(--color-gold)]"
            }`}
            style={activeTab === "studio" ? { backgroundColor: "var(--color-gold)" } : {}}
          >
            ✨ Interactive WhatsApp Session Studio
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("quick")}
            className={`px-5 py-2.5 font-sans text-sm tracking-wide transition-all cursor-pointer border ${
              activeTab === "quick"
                ? "text-white border-transparent"
                : "text-[var(--color-charcoal)] border-[var(--color-beige)] dark:border-white/10 dark:text-white/60 hover:border-[var(--color-gold)]"
            }`}
            style={activeTab === "quick" ? { backgroundColor: "var(--color-gold)" } : {}}
          >
            ⚡ Quick WhatsApp Inquiry
          </button>
        </div>

        {/* Booking Container */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          {activeTab === "studio" ? (
            <WhatsAppBookingStudio initialService={validService} />
          ) : (
            <div className="max-w-2xl mx-auto">
              <ContactForm />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
