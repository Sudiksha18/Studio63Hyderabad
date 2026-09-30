import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Calendar,
  Check,
  Copy,
  Sparkles,
  Camera,
  Heart,
  Baby,
  GraduationCap,
  Users,
  ChevronRight,
  ArrowLeft,
  QrCode,
  ShieldCheck,
  Send,
  PhoneCall,
  Building2
} from "lucide-react";
import { siteConfig } from "../data/siteConfig";

export type ServiceType =
  | "Wedding"
  | "Maternity"
  | "Newborn"
  | "Models"
  | "Academy"
  | "Portraits";

interface Props {
  initialService?: ServiceType;
  onSuccess?: () => void;
}

const servicesList: {
  id: ServiceType;
  title: string;
  subtitle: string;
  icon: typeof Camera;
  popular?: boolean;
}[] = [
  {
    id: "Wedding",
    title: "Weddings & Pre Wedding",
    subtitle: "Candid moments, couple portraits & timeless ceremonies",
    icon: Heart,
    popular: true,
  },
  {
    id: "Maternity",
    title: "Maternity & Motherhood",
    subtitle: "Artistic, intimate portraits celebrating a new beginning",
    icon: Sparkles,
  },
  {
    id: "Newborn",
    title: "Newborn & Baby",
    subtitle: "Patient, safe and heart warming baby captures",
    icon: Baby,
  },
  {
    id: "Models",
    title: "Fashion & Model Portfolio",
    subtitle: "High fashion editorials, casting comp cards & lookbooks",
    icon: Camera,
  },
  {
    id: "Academy",
    title: "Photography Academy",
    subtitle: "Hands on camera workshops, mentorship & lighting masterclasses",
    icon: GraduationCap,
  },
  {
    id: "Portraits",
    title: "Portraits & Special Events",
    subtitle: "Artistic individual portraits, family milestones & celebrations",
    icon: Users,
  },
];

const packageTiers: Record<ServiceType, { name: string; tag: string; description: string }[]> = {
  Wedding: [
    { name: "Essential Ceremony", tag: "Half Day", description: "Up to 4 hours coverage, candid + traditional highlights, 150+ color graded photos" },
    { name: "Signature Wedding Story", tag: "Full Day", description: "Full day coverage, 2 photographers, couple portraits, ceremony & reception, 350+ photos" },
    { name: "Grand Royal Celebration", tag: "Multi Day", description: "Complete multi day coverage (Haldi, Mehendi, Sangeet & Wedding), drone cinematography, heirloom album" },
  ],
  Maternity: [
    { name: "Delicate Studio", tag: "1.5 Hours", description: "Studio session at Begumpet, 2 outfit changes, artistic lighting, 15 retouched images" },
    { name: "Golden Sunset & Studio", tag: "3 Hours", description: "Indoor studio + outdoor golden hour garden shoot, partner & sibling included, 30 retouched images" },
    { name: "Luxury Motherhood Heirloom", tag: "Half Day", description: "Complete styling assistance, hair/makeup coordination, premium photo album, 45 retouched photos" },
  ],
  Newborn: [
    { name: "Sweet Beginnings", tag: "2 Hours", description: "Cozy Begumpet studio wrap session, gentle props & wraps, 12 master retouched photos" },
    { name: "Pure Little Moments", tag: "3 to 4 Hours", description: "Baby + parents + sibling portraits, custom themed sets, safe pacing, 25 fine art photos" },
    { name: "First Year Milestone Plan", tag: "Multi Session", description: "Newborn + 6 month sitting + 1st birthday cake smash collection" },
  ],
  Models: [
    { name: "Portfolio Kickstart", tag: "2 Looks", description: "2 outfit variations, headshots + full body, 10 agency ready retouched photos" },
    { name: "Editorial Lookbook", tag: "4 Looks", description: "Studio + urban location, high fashion lighting, 25 high resolution editorial edits" },
    { name: "Commercial Brand / Campaign", tag: "Full Day", description: "Brand storytelling, creative direction, commercial usage license, full retouching suite" },
  ],
  Academy: [
    { name: "Weekend Photography Bootcamp", tag: "2 Days", description: "Camera controls, composition, natural light mastery, hands on practice" },
    { name: "Studio Lighting & Portrait Masterclass", tag: "1 Week", description: "Strobe lighting, modifiers, model posing, high end Photoshop retouching" },
    { name: "Professional Photographer Mentorship", tag: "1 Month", description: "1 on 1 career mentorship, live shoot shadowing, portfolio building & client handling" },
  ],
  Portraits: [
    { name: "Studio Solo / Executive", tag: "1 Hour", description: "Clean studio backdrop, LinkedIn & editorial portraits, 8 retouched photos" },
    { name: "Creative Artist Portrait", tag: "2 Hours", description: "Moody cinematic lighting, storytelling frames, 20 high res retouched photos" },
    { name: "Family & Celebration", tag: "3 Hours", description: "Family gatherings, birthday or anniversary coverage with candid frames" },
  ],
};

const shootSettings = [
  "Studio 63 (Begumpet, Hyderabad)",
  "Outdoor / Golden Hour Location",
  "Event Venue / Destination",
  "Client Home / In House",
];

const quickDateChips = [
  "This Weekend",
  "Within 2 Weeks",
  "Next Month",
  "Dates are Flexible",
];

const addOnOptions = [
  { id: "drone", label: "🚁 4K Aerial Drone", desc: "Cinematic drone angles" },
  { id: "album", label: "📖 Handcrafted Flushmount Album", desc: "Italian leather archival album" },
  { id: "teaser", label: "⚡ Express 48h Preview", desc: "Get 25 highlights in 48 hours" },
  { id: "video", label: "🎬 Cinematic Video Reel", desc: "9:16 viral vertical video highlights" },
  { id: "makeup", label: "💄 Hair & Makeup Artist", desc: "Professional on-set artist" },
  { id: "secondShooter", label: "📸 Second Photographer", desc: "Multi-angle candid coverage" },
];

export default function WhatsAppBookingStudio({
  initialService = "Wedding",
  onSuccess,
}: Props) {
  // Step State (1: Service, 2: Session Customizer, 3: Details & WhatsApp Preview)
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [selectedService, setSelectedService] = useState<ServiceType>(initialService);
  const [selectedTier, setSelectedTier] = useState<string>("");
  const [setting, setSetting] = useState<string>("Studio 63 (Begumpet, Hyderabad)");
  const [dateType, setDateType] = useState<string>("Dates are Flexible");
  const [customDate, setCustomDate] = useState<string>("");
  const [locationCity, setLocationCity] = useState<string>("Hyderabad");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);

  // Client Details
  const [clientName, setClientName] = useState<string>("");
  const [clientPhone, setClientPhone] = useState<string>("");
  const [clientEmail, setClientEmail] = useState<string>("");
  const [clientNotes, setClientNotes] = useState<string>("");

  // Target WhatsApp Contact: primary (7288969348) or secondary (9398158526)
  const [targetNumber, setTargetNumber] = useState<"primary" | "secondary">("primary");
  const [copied, setCopied] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // Update selectedService if prop changes
  useEffect(() => {
    if (initialService) {
      setSelectedService(initialService);
    }
  }, [initialService]);

  // Set default package tier when service changes
  useEffect(() => {
    const tiers = packageTiers[selectedService];
    if (tiers && tiers.length > 0) {
      setSelectedTier(tiers[1]?.name || tiers[0].name);
    }
  }, [selectedService]);

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const chosenDate = dateType === "Custom Date" ? customDate || "Not chosen yet" : dateType;

  // Generate WhatsApp formatted message
  const whatsappMessage = useMemo(() => {
    const activeServiceTitle = servicesList.find((s) => s.id === selectedService)?.title || selectedService;
    const addOnLabels = selectedAddOns
      .map((id) => addOnOptions.find((a) => a.id === id)?.label.replaceAll("-", " "))
      .filter(Boolean);

    let text = `📸 *NEW BOOKING INQUIRY — STUDIO63#HYDERABAD*\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    if (clientName) text += `👤 *Client Name:* ${clientName}\n`;
    if (clientPhone) text += `📱 *Phone / WhatsApp:* ${clientPhone}\n`;
    if (clientEmail) text += `✉️ *Email:* ${clientEmail}\n`;

    text += `\n✨ *Service Requested:* ${activeServiceTitle}\n`;
    if (selectedTier) text += `📦 *Package Tier:* ${selectedTier}\n`;
    text += `📍 *Shoot Setting:* ${setting}\n`;
    text += `🏙️ *City / Location:* ${locationCity}\n`;
    text += `📅 *Preferred Date:* ${chosenDate}\n`;

    if (addOnLabels.length > 0) {
      text += `\n🎁 *Add-on Requests:*\n`;
      addOnLabels.forEach((addon) => {
        text += `  • ${addon}\n`;
      });
    }

    if (clientNotes.trim()) {
      text += `\n💬 *Vision & Details:*\n"${clientNotes.trim()}"\n`;
    }

    text += `\n📍 *Studio Location:* Door No: 11, 2nd Floor, Jabbar Apartments, beside Prakash Nagar Metro Station (Pillar 1346), Opp. Zudio, Begumpet, Hyderabad\n`;
    text += `━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    text += `_Sent via SR Photography Interactive Studio Booking_`;

    return text.replaceAll("—", "").replaceAll("-", " ");
  }, [
    selectedService,
    selectedTier,
    setting,
    locationCity,
    chosenDate,
    selectedAddOns,
    clientName,
    clientPhone,
    clientEmail,
    clientNotes,
  ]);

  const activeWhatsAppNumber =
    targetNumber === "primary" ? siteConfig.contact.whatsapp : siteConfig.contact.whatsappSecondary;

  const whatsappUrl = `https://wa.me/${activeWhatsAppNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleOpenWhatsApp = () => {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    if (onSuccess) onSuccess();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(whatsappMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className="w-full bg-[#FAF7F1] dark:bg-[#100E0B] border border-[#E7DFD1] dark:border-white/8 shadow-sm rounded-none">
      {/* Studio Header Bar */}
      <div className="bg-[var(--color-inverse-surface)] text-[var(--color-ivory)] px-6 py-5 flex flex-wrap items-center justify-between gap-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs uppercase tracking-widest text-[var(--color-gold-soft)] font-medium">
              Interactive WhatsApp Booking Studio
            </span>
          </div>
          <h2 className="font-display text-xl md:text-2xl mt-1">
            Book With Studio63#Hyderabad
          </h2>
        </div>

        {/* Target Number Switcher */}
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 p-1 text-xs">
          <button
            type="button"
            onClick={() => setTargetNumber("primary")}
            className={`px-3 py-1.5 transition-colors ${
              targetNumber === "primary"
                ? "bg-[var(--color-gold)] text-[var(--color-charcoal)] font-medium"
                : "text-white/70 hover:text-white"
            }`}
          >
            WhatsApp 1: +91 72889 69348
          </button>
          <button
            type="button"
            onClick={() => setTargetNumber("secondary")}
            className={`px-3 py-1.5 transition-colors ${
              targetNumber === "secondary"
                ? "bg-[var(--color-gold)] text-[var(--color-charcoal)] font-medium"
                : "text-white/70 hover:text-white"
            }`}
          >
            WhatsApp 2: +91 93981 58526
          </button>
        </div>
      </div>

      {/* Progress Steps Header */}
      <div className="grid grid-cols-3 border-b border-[#E7DFD1] dark:border-white/8 text-center text-xs tracking-wider uppercase font-sans">
        <button
          type="button"
          onClick={() => setStep(1)}
          className={`py-3.5 px-2 transition-colors flex items-center justify-center gap-2 ${
            step === 1
              ? "bg-[#F3EFE7] dark:bg-[#1E1A15] font-semibold border-b-2 border-[#211E1B] dark:border-[#F5F1EB] text-[#211E1B] dark:text-[#F5F1EB]"
              : "text-[#6E5D4C] dark:text-[#B0A598] hover:bg-[#F3EFE7]/50 dark:hover:bg-[#1E1A15]/50"
          }`}
        >
          <span className="w-5 h-5 rounded-full flex items-center justify-center border border-current text-[11px]">
            1
          </span>
          <span className="hidden sm:inline">Select Service</span>
          <span className="sm:hidden">Service</span>
        </button>

        <button
          type="button"
          onClick={() => setStep(2)}
          className={`py-3.5 px-2 transition-colors flex items-center justify-center gap-2 ${
            step === 2
              ? "bg-[#F3EFE7] dark:bg-[#1E1A15] font-semibold border-b-2 border-[#211E1B] dark:border-[#F5F1EB] text-[#211E1B] dark:text-[#F5F1EB]"
              : "text-[#6E5D4C] dark:text-[#B0A598] hover:bg-[#F3EFE7]/50 dark:hover:bg-[#1E1A15]/50"
          }`}
        >
          <span className="w-5 h-5 rounded-full flex items-center justify-center border border-current text-[11px]">
            2
          </span>
          <span className="hidden sm:inline">Customize Session</span>
          <span className="sm:hidden">Customizer</span>
        </button>

        <button
          type="button"
          onClick={() => setStep(3)}
          className={`py-3.5 px-2 transition-colors flex items-center justify-center gap-2 ${
            step === 3
              ? "bg-[#F3EFE7] dark:bg-[#1E1A15] font-semibold border-b-2 border-[#211E1B] dark:border-[#F5F1EB] text-[#211E1B] dark:text-[#F5F1EB]"
              : "text-[#6E5D4C] dark:text-[#B0A598] hover:bg-[#F3EFE7]/50 dark:hover:bg-[#1E1A15]/50"
          }`}
        >
          <span className="w-5 h-5 rounded-full flex items-center justify-center border border-current text-[11px]">
            3
          </span>
          <span className="hidden sm:inline">WhatsApp Preview & Book</span>
          <span className="sm:hidden">Book</span>
        </button>
      </div>

      <div className="p-6 md:p-8">
        <AnimatePresence mode="wait">
          {/* STEP 1: CHOOSE SERVICE */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div>
                <h3 className="font-display text-2xl text-[#211E1B] dark:text-[#F5F1EB]">
                  Step 1: Which story would you like to capture?
                </h3>
                <p className="font-sans text-sm text-[#6E5D4C] dark:text-[#B0A598] mt-1">
                  Choose a category below to configure your tailored WhatsApp booking inquiry.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {servicesList.map((service) => {
                  const Icon = service.icon;
                  const isSelected = selectedService === service.id;
                  return (
                    <div
                      key={service.id}
                      onClick={() => setSelectedService(service.id)}
                      className={`relative p-5 border text-center cursor-pointer transition-all duration-200 group ${
                        isSelected
                          ? "border-[#211E1B] dark:border-[#F5F1EB] bg-[#F3EFE7] dark:bg-[#1E1A15] ring-2 ring-[var(--color-gold)] shadow-sm"
                          : "border-[#E7DFD1] dark:border-white/10 bg-white/60 dark:bg-white/5 hover:border-[var(--color-gold)] hover:bg-[#F3EFE7]/40 dark:hover:bg-white/10"
                      }`}
                    >
                      {service.popular && (
                        <span className="absolute top-3 right-3 text-[10px] tracking-wider font-semibold uppercase bg-[var(--color-gold)] text-[var(--color-charcoal)] px-2 py-0.5">
                          Most Booked
                        </span>
                      )}

                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className={`w-10 h-10 flex items-center justify-center transition-colors ${
                            isSelected
                              ? "bg-[#211E1B] dark:bg-[#F5F1EB] text-[#FAF7F1] dark:text-[#211E1B]"
                              : "bg-[#E7DFD1]/50 dark:bg-white/10 text-[#211E1B] dark:text-[#F5F1EB] group-hover:bg-[var(--color-gold)] group-hover:text-[#211E1B]"
                          }`}
                        >
                          <Icon size={20} strokeWidth={1.5} />
                        </div>
                        <h4 className="font-display text-lg font-semibold text-[#211E1B] dark:text-[#F5F1EB]">
                          {service.title}
                        </h4>
                      </div>

                      <p className="font-sans text-xs text-[var(--color-brown)] leading-relaxed">
                        {service.subtitle}
                      </p>

                      <div className="mt-4 flex items-center justify-between pt-3 border-t border-[#E7DFD1]/60 dark:border-white/10 text-xs">
                        <span
                          className={`font-medium ${
                            isSelected
                              ? "text-[var(--color-gold)]"
                              : "text-[#6E5D4C] dark:text-[#B0A598] group-hover:text-[#211E1B] dark:group-hover:text-[#F5F1EB]"
                          }`}
                        >
                          {isSelected ? "Selected ✓" : "Choose this service"}
                        </span>
                        <ChevronRight
                          size={14}
                          className={`transition-transform ${
                            isSelected ? "translate-x-1 text-[var(--color-charcoal)]" : "opacity-40 group-hover:opacity-100"
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Bar */}
              <div className="pt-4 flex items-center justify-between border-t border-[#E7DFD1] dark:border-white/8">
                <div className="font-sans text-xs text-[#6E5D4C] dark:text-[#B0A598] flex items-center gap-2">
                  <ShieldCheck size={16} className="text-emerald-600" />
                  Instant connection to Studio63#Hyderabad WhatsApp
                </div>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-[#211E1B] dark:bg-[#F5F1EB] text-[#FAF7F1] dark:text-[#211E1B] px-7 py-3 font-sans text-sm tracking-wide hover:opacity-85 transition-opacity flex items-center gap-2 cursor-pointer"
                >
                  Continue to Customize
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 2: CUSTOMIZE SESSION */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div>
                <div className="flex items-center gap-2 text-xs text-[var(--color-gold)] uppercase tracking-wider font-semibold">
                  <span>Customizing:</span>
                  <span className="underline">
                    {servicesList.find((s) => s.id === selectedService)?.title}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-[#211E1B] dark:text-[#F5F1EB] mt-1">
                  Step 2: Tailor your session preferences
                </h3>
              </div>

              {/* Package Tier Selection */}
              <div className="space-y-3">
                <label className="block font-sans text-xs uppercase tracking-wider font-semibold text-[#211E1B] dark:text-[#F5F1EB]">
                  Select Desired Package Level:
                </label>
                <div className="grid md:grid-cols-3 gap-3">
                  {packageTiers[selectedService]?.map((tier) => {
                    const isSelected = selectedTier === tier.name;
                    return (
                      <div
                        key={tier.name}
                        onClick={() => setSelectedTier(tier.name)}
                        className={`p-4 border text-center cursor-pointer transition-all ${
                          isSelected
                            ? "border-[#211E1B] dark:border-[#F5F1EB] bg-[#F3EFE7] dark:bg-[#1E1A15] ring-2 ring-[var(--color-gold)]"
                            : "border-[#E7DFD1] dark:border-white/10 bg-white/40 dark:bg-white/5 hover:bg-[#F3EFE7]/30 dark:hover:bg-white/10"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-display font-medium text-sm text-[#211E1B] dark:text-[#F5F1EB]">
                            {tier.name}
                          </span>
                          <span className="text-[10px] font-sans px-2 py-0.5 bg-[#E7DFD1] dark:bg-white/15 text-[#211E1B] dark:text-[#F5F1EB] font-semibold">
                            {tier.tag}
                          </span>
                        </div>
                        <p className="font-sans text-xs text-[#6E5D4C] dark:text-[#B0A598] leading-relaxed">
                          {tier.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Setting / Location & City */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block font-sans text-xs uppercase tracking-wider font-semibold text-[#211E1B] dark:text-[#F5F1EB]">
                    Shoot Setting / Studio:
                  </label>
                  <select
                    value={setting}
                    onChange={(e) => setSetting(e.target.value)}
                    className="w-full border border-[#E7DFD1] dark:border-white/15 bg-white dark:bg-[#1E1A15] text-[#211E1B] dark:text-[#F5F1EB] px-3.5 py-2.5 font-sans text-sm focus:border-[var(--color-gold)] outline-none"
                  >
                    {shootSettings.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-[var(--color-brown)] flex items-center gap-1.5 mt-1">
                    <Building2 size={13} />
                    Studio address: Jabbar Apts, beside Prakash Nagar Metro Pillar 1346, Begumpet
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="block font-sans text-xs uppercase tracking-wider font-semibold text-[#211E1B] dark:text-[#F5F1EB]">
                    City / Shoot Destination:
                  </label>
                  <div className="flex gap-2">
                    {["Hyderabad", "Bengaluru", "Chennai", "Other"].map((city) => (
                      <button
                        key={city}
                        type="button"
                        onClick={() => setLocationCity(city)}
                        className={`flex-1 py-2 px-2 text-xs border transition-colors ${
                          locationCity === city
                            ? "bg-[#211E1B] dark:bg-[#F5F1EB] text-[#FAF7F1] dark:text-[#211E1B] border-[#211E1B] dark:border-[#F5F1EB] font-medium"
                            : "border-[#E7DFD1] dark:border-white/15 bg-white dark:bg-white/5 text-[#211E1B] dark:text-[#F5F1EB] hover:border-[var(--color-gold)]"
                        }`}
                      >
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preferred Date Selector */}
              <div className="space-y-3">
                <label className="block font-sans text-xs uppercase tracking-wider font-semibold text-[#211E1B] dark:text-[#F5F1EB]">
                  Preferred Date / Timeline:
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickDateChips.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setDateType(chip)}
                      className={`px-3.5 py-2 text-xs border transition-colors ${
                        dateType === chip
                          ? "bg-[var(--color-gold)] text-[#211E1B] font-medium border-[var(--color-gold)]"
                          : "border-[#E7DFD1] dark:border-white/15 bg-white dark:bg-white/5 text-[#211E1B] dark:text-[#F5F1EB] hover:border-[var(--color-gold)]"
                      }`}
                    >
                      {chip}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => setDateType("Custom Date")}
                    className={`px-3.5 py-2 text-xs border transition-colors flex items-center gap-1.5 ${
                      dateType === "Custom Date"
                        ? "bg-[var(--color-gold)] text-[#211E1B] font-medium border-[var(--color-gold)]"
                        : "border-[#E7DFD1] dark:border-white/15 bg-white dark:bg-white/5 text-[#211E1B] dark:text-[#F5F1EB] hover:border-[var(--color-gold)]"
                    }`}
                  >
                    <Calendar size={13} />
                    Pick Specific Calendar Date
                  </button>
                </div>

                {dateType === "Custom Date" && (
                  <div className="pt-2 max-w-xs">
                    <input
                      type="date"
                      value={customDate}
                      onChange={(e) => setCustomDate(e.target.value)}
                      className="w-full border border-[#E7DFD1] dark:border-white/15 bg-white dark:bg-[#1E1A15] text-[#211E1B] dark:text-[#F5F1EB] px-3 py-2 font-sans text-sm focus:border-[var(--color-gold)] outline-none"
                    />
                  </div>
                )}
              </div>

              {/* Interactive add ons */}
              <div className="space-y-3">
                <label className="block font-sans text-xs uppercase tracking-wider font-semibold text-[#211E1B] dark:text-[#F5F1EB]">
                  Session Enhancements & Add ons (Optional):
                </label>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {addOnOptions.map((addon) => {
                    const isChecked = selectedAddOns.includes(addon.id);
                    return (
                      <div
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`p-3 border text-center cursor-pointer transition-colors flex items-start gap-2.5 ${
                          isChecked
                            ? "border-[#211E1B] dark:border-[#F5F1EB] bg-[#F3EFE7] dark:bg-[#1E1A15]"
                            : "border-[#E7DFD1] dark:border-white/10 bg-white dark:bg-white/5 hover:bg-[#F3EFE7]/40 dark:hover:bg-white/10"
                        }`}
                      >
                        <div
                          className={`mt-0.5 w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 ${
                            isChecked
                              ? "bg-[var(--color-inverse-surface)] text-white border-[var(--color-inverse-surface)]"
                              : "border-[var(--color-brown)]/40"
                          }`}
                        >
                          {isChecked && <Check size={11} strokeWidth={3} />}
                        </div>
                        <div>
                          <p className="font-sans text-xs font-medium text-[#211E1B] dark:text-[#F5F1EB]">
                            {addon.label.replaceAll("-", " ")}
                          </p>
                          <p className="font-sans text-[11px] text-[#6E5D4C] dark:text-[#B0A598]">
                            {addon.desc.replaceAll("-", " ")}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Navigation buttons */}
              <div className="pt-4 flex items-center justify-between border-t border-[#E7DFD1] dark:border-white/8">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="border border-[#E7DFD1] dark:border-white/15 text-[#211E1B] dark:text-[#F5F1EB] px-5 py-2.5 font-sans text-sm hover:bg-[#F3EFE7] dark:hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-[#211E1B] dark:bg-[#F5F1EB] text-[#FAF7F1] dark:text-[#211E1B] px-7 py-3 font-sans text-sm tracking-wide hover:opacity-85 transition-opacity flex items-center gap-2 cursor-pointer"
                >
                  Next: Client Details & WhatsApp Preview
                  <ChevronRight size={16} />
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 3: DETAILS & WHATSAPP PREVIEW */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.25 }}
              className="space-y-8"
            >
              <div>
                <h3 className="font-display text-2xl text-[#211E1B] dark:text-[#F5F1EB]">
                  Step 3: Your details & live WhatsApp preview
                </h3>
                <p className="font-sans text-sm text-[#6E5D4C] dark:text-[#B0A598] mt-1">
                  Fill in your contact info below. Your structured WhatsApp booking message updates live in real time!
                </p>
              </div>

              <div className="grid lg:grid-cols-12 gap-8 items-start">
                {/* Left Column: Form Details */}
                <div className="lg:col-span-6 space-y-4">
                  <div className="space-y-1">
                    <label className="font-sans text-xs uppercase tracking-wider font-semibold text-[#211E1B] dark:text-[#F5F1EB]">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh & Sneha"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full border border-[#E7DFD1] dark:border-white/15 bg-white dark:bg-[#1E1A15] text-[#211E1B] dark:text-[#F5F1EB] px-3.5 py-2.5 font-sans text-sm focus:border-[var(--color-gold)] outline-none"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-sans text-xs uppercase tracking-wider font-semibold text-[#211E1B] dark:text-[#F5F1EB]">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        className="w-full border border-[#E7DFD1] dark:border-white/15 bg-white dark:bg-[#1E1A15] text-[#211E1B] dark:text-[#F5F1EB] px-3.5 py-2.5 font-sans text-sm focus:border-[var(--color-gold)] outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="font-sans text-xs uppercase tracking-wider font-semibold text-[#211E1B] dark:text-[#F5F1EB]">
                        Email Address (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="you@example.com"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full border border-[#E7DFD1] dark:border-white/15 bg-white dark:bg-[#1E1A15] text-[#211E1B] dark:text-[#F5F1EB] px-3.5 py-2.5 font-sans text-sm focus:border-[var(--color-gold)] outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-sans text-xs uppercase tracking-wider font-semibold text-[#211E1B] dark:text-[#F5F1EB]">
                      Your Vision / Any Special Notes
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share details about the ceremony rituals, desired outfits, mood, or specific requirements..."
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      className="w-full border border-[#E7DFD1] dark:border-white/15 bg-white dark:bg-[#1E1A15] text-[#211E1B] dark:text-[#F5F1EB] p-3 font-sans text-sm focus:border-[var(--color-gold)] outline-none resize-none"
                    />
                  </div>

                  {/* Studio Quick Info Box */}
                  <div className="p-4 bg-[#F3EFE7] dark:bg-[#1E1A15] border border-[#E7DFD1] dark:border-white/10 text-xs font-sans space-y-1.5 text-[#6E5D4C] dark:text-[#B0A598]">
                    <p className="font-semibold text-[#211E1B] dark:text-[#F5F1EB] flex items-center gap-1.5">
                      <Building2 size={14} className="text-[var(--color-gold)]" />
                      Studio 63 Begumpet Office:
                    </p>
                    <p>
                      Door No: 11, 2nd Floor, Jabbar Apartments, beside Prakash Nagar Metro Station (Pillar No: 1346), Opp. Zudio, Prakash Nagar, Begumpet, Hyderabad, 500016
                    </p>
                    <div className="flex flex-wrap items-center gap-4 pt-1 font-medium text-[#211E1B] dark:text-[#F5F1EB]">
                      <a
                        href="tel:7288969348"
                        className="hover:text-[var(--color-gold)] flex items-center gap-1"
                      >
                        <PhoneCall size={12} /> Call: 72889 69348
                      </a>
                      <a
                        href="tel:9398158526"
                        className="hover:text-[var(--color-gold)] flex items-center gap-1"
                      >
                        <PhoneCall size={12} /> Call: 93981 58526
                      </a>
                    </div>
                  </div>
                </div>

                {/* Right Column: Live WhatsApp Chat Simulator */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-xs uppercase tracking-wider font-semibold text-[#211E1B] dark:text-[#F5F1EB] flex items-center gap-1.5">
                      <MessageCircle size={15} className="text-emerald-600" />
                      Live WhatsApp Message Simulator
                    </span>
                    <button
                      type="button"
                      onClick={handleCopy}
                      className="text-xs text-[#6E5D4C] dark:text-[#B0A598] hover:text-[#211E1B] dark:hover:text-[#F5F1EB] flex items-center gap-1 font-sans cursor-pointer transition-colors"
                    >
                      {copied ? (
                        <>
                          <Check size={13} className="text-emerald-600" />
                          <span className="text-emerald-600 font-medium">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy size={13} />
                          <span>Copy Text</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* WhatsApp Chat Bubble Mockup */}
                  <div
                    className="border border-[#d1d7db] rounded-lg overflow-hidden shadow-md"
                    style={{ backgroundColor: "#efeae2" }}
                  >
                    {/* Chat Header */}
                    <div
                      className="px-4 py-3 text-white flex items-center justify-between"
                      style={{ backgroundColor: "#075e54" }}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-700 flex items-center justify-center font-display font-bold text-xs border border-white/20">
                          SR
                        </div>
                        <div>
                          <p className="font-sans text-xs font-semibold leading-tight">
                            Studio63#Hyderabad
                          </p>
                          <p className="text-[10px] text-white/80 leading-tight flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 inline-block" />
                            Active now • Typically replies in 15 mins
                          </p>
                        </div>
                      </div>

                      <span className="text-[10px] bg-emerald-800/80 px-2 py-0.5 rounded text-white/90">
                        {targetNumber === "primary" ? "+91 72889 69348" : "+91 93981 58526"}
                      </span>
                    </div>

                    {/* Chat Body */}
                    <div className="p-4 space-y-3 font-sans max-h-80 overflow-y-auto">
                      {/* Greeting from Studio */}
                      <div className="flex justify-start">
                        <div className="bg-white rounded-lg px-3.5 py-2 max-w-[85%] text-xs shadow-sm text-gray-800 border border-gray-100">
                          <p>
                            Namaste! 🙏 Thank you for reaching out to Studio63#Hyderabad (Prakash Nagar Metro Pillar 1346, Begumpet). Please review your session details below and send them across to reserve your date.
                          </p>
                          <span className="text-[9px] text-gray-400 block text-center mt-1">11:00 AM</span>
                        </div>
                      </div>

                      {/* Client's outgoing message preview */}
                      <div className="flex justify-end">
                        <div
                          className="rounded-lg px-3.5 py-2.5 max-w-[92%] text-xs shadow-sm text-gray-900 border border-[#d9fdd3] whitespace-pre-wrap leading-relaxed"
                          style={{ backgroundColor: "#d9fdd3" }}
                        >
                          {whatsappMessage}
                          <div className="flex items-center justify-end gap-1 text-[9px] text-gray-500 mt-1.5">
                            <span>Just now</span>
                            <span className="text-sky-500 font-bold">✓✓</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat Footer Bar */}
                    <div className="bg-[#f0f2f5] p-3 border-t border-[#e9edef] flex items-center justify-between gap-3">
                      <span className="text-[11px] text-gray-500 truncate">
                        Pressing the button below instantly launches WhatsApp
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowQrModal(true)}
                        className="p-1.5 rounded hover:bg-gray-200 text-gray-600 transition-colors"
                        title="Scan QR Code to continue on mobile"
                      >
                        <QrCode size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Primary WhatsApp Dispatch Action */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={handleOpenWhatsApp}
                      className="w-full py-4 px-6 text-white font-sans text-sm font-semibold tracking-wide shadow-lg hover:opacity-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer rounded-none transform active:scale-[0.99]"
                      style={{ backgroundColor: "#25D366" }}
                    >
                      <MessageCircle size={20} fill="#fff" color="#25D366" />
                      <span>Send Booking Details via WhatsApp</span>
                      <Send size={16} />
                    </button>

                    <div className="flex items-center justify-between gap-2 text-xs font-sans text-[#6E5D4C] dark:text-[#B0A598]">
                      <button
                        type="button"
                        onClick={() => setShowQrModal(true)}
                        className="underline hover:text-[#211E1B] dark:hover:text-[#F5F1EB] flex items-center gap-1 cursor-pointer"
                      >
                        <QrCode size={13} />
                        Scan QR code on mobile
                      </button>

                      <span>
                        Prefer phone call?{" "}
                        <a href="tel:7288969348" className="font-semibold underline text-[var(--color-charcoal)]">
                          72889 69348
                        </a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Back */}
              <div className="pt-4 flex items-center justify-start border-t border-[#E7DFD1] dark:border-white/8">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="border border-[#E7DFD1] dark:border-white/15 text-[#211E1B] dark:text-[#F5F1EB] px-5 py-2.5 font-sans text-sm hover:bg-[#F3EFE7] dark:hover:bg-white/10 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <ArrowLeft size={16} />
                  Adjust Session Customizations
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* QR Code Modal for desktop users */}
      <AnimatePresence>
        {showQrModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-[var(--color-ivory)] border border-[var(--color-beige)] max-w-sm w-full p-6 text-center space-y-4 shadow-2xl relative"
            >
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="absolute top-4 right-4 text-[var(--color-charcoal)] hover:opacity-70 text-lg cursor-pointer"
              >
                ✕
              </button>

              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <QrCode size={24} />
              </div>

              <h4 className="font-display text-xl text-[var(--color-charcoal)]">
                Scan with Your Phone Camera
              </h4>
              <p className="font-sans text-xs text-[var(--color-brown)]">
                Point your mobile camera at this QR code to instantly open WhatsApp with your booking details ready to send.
              </p>

              <div className="p-3 bg-white border border-[var(--color-beige)] inline-block shadow-inner">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
                    whatsappUrl
                  )}`}
                  alt="WhatsApp QR Code"
                  className="w-48 h-48 mx-auto"
                />
              </div>

              <p className="text-[11px] font-sans text-[var(--color-brown)]">
                Recipient: Studio63#Hyderabad ({targetNumber === "primary" ? "+91 72889 69348" : "+91 93981 58526"})
              </p>

              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="w-full bg-[var(--color-inverse-surface)] text-[var(--color-ivory)] py-2.5 font-sans text-xs uppercase tracking-wider"
              >
                Close QR Code
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
