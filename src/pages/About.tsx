import { motion } from "framer-motion";
import PlaceholderImage from "../components/PlaceholderImage";
import Timeline from "../components/Timeline";

const philosophyItems = [
  "Every frame is a decision.",
  "Light is the first ingredient.",
  "Emotion before perfection.",
];

const paragraphs = [
  "Welcome to Studio63#Hyderabad, a premier photography studio and visual academy in Begumpet with over 7 years of professional experience.",
  "Our foundation includes extensive visual storytelling with Deccan Chronicle from 2015 to 2018, mastering professional photography in high-paced media environments.",
  "From 2021 to 2023, our leadership worked with CMOF Global as Lead Photographer and Photography Trainer.",
  "Alongside commercial and portrait shoots, Studio63#Hyderabad is deeply dedicated to mentoring aspiring photographers to develop their creative confidence.",
];

export default function About() {
  return (
    <div className="bg-[var(--color-ivory)] dark:bg-[#080604]">

      {/* ── Full-width typography hero ── */}
      <section className="pt-36 pb-20 px-6 md:px-14 border-b border-[var(--color-beige)] dark:border-white/5">
        <div className="mx-auto max-w-6xl">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-editorial-label mb-4"
            style={{ color: "var(--color-gold)" }}
          >
            About the Studio
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-display font-bold text-[var(--color-charcoal)] max-w-3xl"
            style={{ fontSize: "clamp(2.8rem, 7vw, 6.5rem)", letterSpacing: "-0.04em", lineHeight: 0.95 }}
          >
            Behind<br />
            <span className="font-light italic">the Lens.</span>
          </motion.h1>
        </div>
      </section>

      {/* ── 2-col: photo + story ── */}
      <section className="px-6 md:px-14 py-24">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-14 items-center">
          {/* Image with gold accent border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div
              className="absolute -top-3 -left-3 w-full h-full pointer-events-none"
              style={{ border: "1px solid var(--color-gold)", opacity: 0.2 }}
            />
            <div data-cursor="view">
              <PlaceholderImage
                src="/images/portfolio/Sreenu/_DSC2550.jpg"
                alt="Sreenu of Studio63 Hyderabad"
                label="Behind the lens at Studio63"
                aspect="aspect-[3/2]"
              />
            </div>
          </motion.div>

          {/* Story text */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            {/* Pull quote */}
            <blockquote
              className="font-display font-light italic text-[var(--color-charcoal)] mb-8 border-l-2 pl-5"
              style={{ borderColor: "var(--color-gold)", fontSize: "clamp(1.2rem, 2.5vw, 1.7rem)", letterSpacing: "-0.01em" }}
            >
              "Photography has become more than a craft, it is a way of observing people."
            </blockquote>

            <div className="space-y-4 font-sans text-sm text-[var(--color-brown)] leading-[1.85] max-w-lg">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Philosophy block ── */}
      <section className="py-20 px-6 md:px-14 bg-[var(--color-offwhite)] dark:bg-[#0A0806]">
        <div className="mx-auto max-w-5xl">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-editorial-label mb-12 text-center"
            style={{ color: "var(--color-gold)" }}
          >
            Our Philosophy
          </motion.p>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {philosophyItems.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="border-t border-[var(--color-beige)] dark:border-white/8 pt-6"
              >
                <span
                  className="font-display font-bold text-[var(--color-charcoal)]/10 dark:text-white/10 block mb-3"
                  style={{ fontSize: "3rem", letterSpacing: "-0.04em" }}
                >
                  0{i + 1}
                </span>
                <p
                  className="font-display font-light italic text-[var(--color-charcoal)] leading-snug"
                  style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", letterSpacing: "-0.01em" }}
                >
                  "{item}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <Timeline />
    </div>
  );
}
