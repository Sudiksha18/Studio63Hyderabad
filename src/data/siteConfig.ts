// Central place for brand + contact details.
// Replace the placeholder values below with real details when available.
// Nothing here is invented "real" contact info — these are explicit placeholders.

export const siteConfig = {
  name: "Studio63#Hyderabad",
  brandShort: "Studio63#Hyderabad",
  brandFull: "Studio63#Hyderabad",
  tagline: "Photography • Stories • Education • Begumpet, Hyderabad",
  role: "Fashion Photographer | Professional Photographer | Photography Trainer",
  founder: "Studio63#Hyderabad",
  year: 2026,

  // Studio & Contact Details
  contact: {
    phone: "+91 72889 69348",
    phoneSecondary: "+91 93981 58526",
    whatsapp: "917288969348",
    whatsappSecondary: "919398158526",
    email: "studio63hyd@gmail.com",
    address: {
      doorNo: "Door No: 11, 2nd Floor",
      building: "Jabbar Apartments",
      landmark: "Beside Prakash Nagar Metro Station (Pillar No: 1346)",
      opposite: "Opposite Zudio",
      area: "Prakash Nagar, Begumpet",
      city: "Hyderabad, Telangana",
      pincode: "500016",
      full: "Door No: 11, 2nd Floor, Jabbar Apartments, Beside Prakash Nagar Metro Station (Pillar No: 1346), Opposite Zudio, Prakash Nagar, Begumpet, Hyderabad, Telangana, 500016",
      mapsUrl: "https://maps.google.com/?q=Jabbar+Apartments+Prakash+Nagar+Begumpet+Hyderabad+500016",
    },
    instagram: "https://instagram.com/studio63hyderabad",
    youtube: "https://youtube.com/",
  },

  stats: [
    { value: "7+", label: "Years of Photography Experience" },
    { value: "4+", label: "Years of Photography Training" },
    { value: "40+", label: "Photography Students Trained" },
    { value: "150+", label: "Internship & Freelance Photographers Guided" },
    { value: "3000+", label: "Photography Shoots" },
  ],
};

export type NavLink = { label: string; to: string };

export const navLinks: NavLink[] = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Weddings", to: "/weddings" },
  { label: "Maternity", to: "/maternity" },
  { label: "Newborn", to: "/newborn" },
  { label: "Models", to: "/models" },
  { label: "Wildlife", to: "/wildlife" },
  { label: "Academy", to: "/academy" },
  { label: "Contact", to: "/contact" },
];
