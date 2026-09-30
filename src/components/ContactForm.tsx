import { useState, useEffect, type FormEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageCircle, Send, Check } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

const services = [
  "Weddings & Pre Wedding",
  "Maternity & Motherhood",
  "Newborn & Baby",
  "Model / Fashion Portfolio",
  "Photography Academy Training",
  "Portraits & Special Events",
  "Other Creative Projects",
];

const serviceMap: Record<string, string> = {
  "Wedding": "Weddings & Pre Wedding",
  "Maternity": "Maternity & Motherhood",
  "Newborn": "Newborn & Baby",
  "Models": "Model / Fashion Portfolio",
  "Academy": "Photography Academy Training"
};

export default function ContactForm() {
  const [searchParams] = useSearchParams();
  const serviceParam = searchParams.get("service");
  
  const defaultService = serviceParam && serviceMap[serviceParam] 
    ? serviceMap[serviceParam] 
    : "Weddings & Pre Wedding";

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: defaultService,
    date: "",
    message: "",
  });

  // Update if query param changes after mount
  useEffect(() => {
    if (serviceParam && serviceMap[serviceParam]) {
      setFormData(prev => ({ ...prev, service: serviceMap[serviceParam] }));
    }
  }, [serviceParam]);
  const [targetNumber, setTargetNumber] = useState<"primary" | "secondary">("primary");
  const [submitted, setSubmitted] = useState(false);

  const activeWhatsApp =
    targetNumber === "primary" ? siteConfig.contact.whatsapp : siteConfig.contact.whatsappSecondary;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    let text = `📸 *QUICK INQUIRY STUDIO63#HYDERABAD*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `👤 *Name:* ${formData.name}\n`;
    text += `📱 *Phone:* ${formData.phone}\n`;
    if (formData.email) text += `✉️ *Email:* ${formData.email}\n`;
    text += `✨ *Service:* ${formData.service}\n`;
    if (formData.date) text += `📅 *Preferred Date:* ${formData.date}\n`;
    if (formData.message) text += `💬 *Message:* ${formData.message}\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `_Studio 63 Begumpet, Hyderabad_`;

    const url = `https://wa.me/${activeWhatsApp}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-[var(--color-beige)] bg-white/70 p-8 text-center space-y-4"
      >
        <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
          <Check size={24} />
        </div>
        <p className="font-display text-2xl">WhatsApp Launched!</p>
        <p className="font-sans text-sm text-[var(--color-brown)] max-w-sm mx-auto">
          Your inquiry was formatted and sent to WhatsApp. The Studio63#Hyderabad team will reply shortly.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="text-xs uppercase tracking-wider font-semibold border-b border-[var(--color-charcoal)] pb-0.5 hover:text-[var(--color-gold)]"
        >
          Send another inquiry
        </button>
      </motion.div>
    );
  }

  const inputClass =
    "w-full border-b border-[var(--color-beige)] bg-transparent py-3 font-sans text-sm placeholder:text-[var(--color-brown)]/60 focus:border-[var(--color-gold)] transition-colors outline-none";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white/40 p-6 md:p-8 border border-[var(--color-beige)]">
      <div className="flex items-center justify-between pb-3 border-b border-[var(--color-beige)] text-xs">
        <span className="font-semibold text-[var(--color-charcoal)]">Direct WhatsApp Dispatch</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setTargetNumber("primary")}
            className={`px-2 py-1 text-[11px] ${
              targetNumber === "primary" ? "bg-[var(--color-inverse-surface)] text-white" : "bg-white text-gray-700"
            }`}
          >
            7288969348
          </button>
          <button
            type="button"
            onClick={() => setTargetNumber("secondary")}
            className={`px-2 py-1 text-[11px] ${
              targetNumber === "secondary" ? "bg-[var(--color-inverse-surface)] text-white" : "bg-white text-gray-700"
            }`}
          >
            9398158526
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <input
          required
          name="name"
          placeholder="Your Name *"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className={inputClass}
        />
        <input
          required
          name="phone"
          type="tel"
          placeholder="WhatsApp Phone Number *"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className={inputClass}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <input
          name="email"
          type="email"
          placeholder="Email Address (Optional)"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className={inputClass}
        />
        <select
          required
          name="service"
          value={formData.service}
          onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          className={inputClass}
        >
          {services.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[11px] text-[var(--color-brown)] mb-1">
          Preferred Date (Optional):
        </label>
        <input
          name="date"
          type="date"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
          className={inputClass}
        />
      </div>

      <textarea
        name="message"
        placeholder="Tell us about the occasion, venue, or questions you have..."
        rows={3}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        className={inputClass + " resize-none"}
      />

      <button
        type="submit"
        className="w-full py-3.5 text-white font-sans text-sm tracking-wide transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
        style={{ backgroundColor: "#25D366" }}
      >
        <MessageCircle size={18} fill="#fff" color="#25D366" />
        <span>Open in WhatsApp to Send</span>
        <Send size={15} />
      </button>

      <p className="text-[11px] text-center text-[var(--color-brown)]">
        Direct connection to Studio63#Hyderabad WhatsApp. No spam guaranteed.
      </p>
    </form>
  );
}
