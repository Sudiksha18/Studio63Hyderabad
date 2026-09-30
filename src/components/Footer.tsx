import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { InstagramIcon, YoutubeIcon } from "./icons/SocialIcons";
import { navLinks, siteConfig } from "../data/siteConfig";

export default function Footer() {
  const { phone, phoneSecondary, whatsapp, email, address } = siteConfig.contact;

  return (
    <footer className="bg-[var(--color-offwhite)] dark:bg-[#050403] text-[var(--color-charcoal)] dark:text-[var(--color-ivory)] border-t border-[var(--color-beige)] dark:border-white/5 transition-colors duration-400">
      {/* Philosophy line */}
      <div className="border-b border-[var(--color-beige)] dark:border-white/5 px-6 md:px-10 py-5">
        <p className="font-display font-light italic text-center text-[var(--color-brown)] dark:text-white/25 text-sm">
          "Every frame is a decision. Every story deserves to be told beautifully."
        </p>
      </div>

      {/* Main grid */}
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-14 grid gap-10 md:grid-cols-4">

        {/* Brand */}
        <div className="md:col-span-1">
          <Link to="/" className="inline-block mb-4">
            <span className="font-display text-2xl font-bold text-[var(--color-charcoal)] dark:text-white">Studio63</span>
            <span className="font-sans font-semibold text-lg ml-1" style={{ color: "var(--color-gold)" }}>
              #Hyderabad
            </span>
          </Link>
          <p className="font-sans text-xs text-[var(--color-brown)] leading-relaxed mb-6 max-w-[22ch]">
            {siteConfig.tagline}
          </p>
          <p className="font-sans text-xs text-[var(--color-brown)]/70 leading-relaxed max-w-[26ch]">
            Hyderabad's luxury photography studio, weddings, maternity, newborn, fashion &amp; academy.
          </p>
          <div className="flex items-center gap-4 mt-7">
            <a href={siteConfig.contact.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"
               className="text-[var(--color-brown)] hover:text-[var(--color-gold)] transition-colors">
              <InstagramIcon size={18} />
            </a>
            <a href={siteConfig.contact.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube"
               className="text-[var(--color-brown)] hover:text-[var(--color-gold)] transition-colors">
              <YoutubeIcon size={18} />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <p className="text-editorial-label mb-5" style={{ color: "var(--color-gold)" }}>
            Navigation
          </p>
          <ul className="grid grid-cols-2 gap-2.5">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="font-sans text-xs text-[var(--color-brown)] hover:text-[var(--color-charcoal)] dark:hover:text-white transition-colors"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Studio Address */}
        <div>
          <p className="text-editorial-label mb-5" style={{ color: "var(--color-gold)" }}>
            Studio Location
          </p>
          <div className="font-sans text-xs text-[var(--color-brown)] space-y-3 leading-relaxed">
            <p className="flex items-start gap-2">
              <MapPin size={13} className="shrink-0 mt-0.5" style={{ color: "var(--color-gold)" }} />
              <span>
                Door No. 11, 2nd Floor, Jabbar Apartments, beside Prakash Nagar Metro Station (Pillar 1346),
                Opposite Zudio, Begumpet, Hyderabad, 500016
              </span>
            </p>
            <a
              href={address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs hover:underline transition-colors"
              style={{ color: "var(--color-gold)" }}
            >
              Get Directions →
            </a>
          </div>
        </div>

        {/* Contact */}
        <div>
          <p className="text-editorial-label mb-5" style={{ color: "var(--color-gold)" }}>
            Bookings &amp; Enquiries
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Phone size={13} className="shrink-0" style={{ color: "var(--color-gold)" }} />
              <div className="font-sans text-xs">
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-[var(--color-charcoal)] dark:text-white/60 hover:text-[var(--color-gold)] block transition-colors font-medium">
                  {phone}
                </a>
                <a href={`tel:${phoneSecondary.replace(/\s/g, "")}`} className="text-[var(--color-brown)] hover:text-[var(--color-gold)] block transition-colors">
                  {phoneSecondary}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2.5">
              <MessageCircle size={13} className="shrink-0 text-emerald-500" />
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-xs text-emerald-500 hover:text-emerald-400 transition-colors"
              >
                WhatsApp: {phone}
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail size={13} className="shrink-0" style={{ color: "var(--color-gold)" }} />
              <a
                href={`mailto:${email}`}
                className="font-sans text-xs text-[var(--color-brown)] hover:text-[var(--color-gold)] break-all transition-colors"
              >
                {email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[var(--color-beige)] dark:border-white/5">
        <div className="mx-auto max-w-7xl px-6 md:px-10 py-5 font-sans text-[11px] text-[var(--color-brown)]/60 dark:text-white/25 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {siteConfig.year} {siteConfig.brandFull}. All Rights Reserved.</p>
          <p>Photography · Stories · Academy · Begumpet, Hyderabad</p>
        </div>
      </div>
    </footer>
  );
}
