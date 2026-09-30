import { MessageCircle } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

export default function WhatsAppButton() {
  const { whatsapp } = siteConfig.contact;
  return (
    <a
      href={`https://wa.me/${whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Message on WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-13 w-13 items-center justify-center rounded-full shadow-lg transition-transform hover:scale-105"
      style={{ backgroundColor: "#25D366", width: 52, height: 52 }}
    >
      <MessageCircle color="#fff" size={24} strokeWidth={1.75} />
    </a>
  );
}
