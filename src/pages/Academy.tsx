import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PlaceholderImage from "../components/PlaceholderImage";
import { courses } from "../data/courses";
import Testimonials from "../components/Testimonials";
import MarqueeStrip from "../components/MarqueeStrip";

const audiences = ["Beginners", "Intermediate Photographers", "Advanced Learners", "Aspiring Professionals", "Freelancers"];

export default function Academy() {
  return (
    <div className="bg-[var(--color-ivory)] dark:bg-[#080604]">

      {/* ── HERO ── */}
      <section className="pt-36 pb-20 px-6 md:px-14 border-b border-[var(--color-beige)] dark:border-white/5">
        <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-14 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-editorial-label mb-4" style={{ color: "var(--color-gold)" }}>
              Photography Academy · Hyderabad
            </p>
            <h1
              className="font-display font-bold text-[var(--color-charcoal)] mb-4 leading-none"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", letterSpacing: "-0.03em" }}
            >
              Learn. Create.{" "}
              <span className="font-light italic">Capture.</span>
            </h1>
            <p
              className="font-display font-light italic mb-6"
              style={{ color: "var(--color-gold)", fontSize: "clamp(1rem, 2vw, 1.25rem)" }}
            >
              Turn your passion for photography into confidence behind the camera.
            </p>
            <p className="font-sans text-sm text-[var(--color-brown)] leading-[1.85] mb-8 max-w-md">
              With over 4 years of experience in photography training, we guide aspiring
              photographers through fundamentals, advanced techniques and practical creative workflows.
            </p>

            {/* Audience tags */}
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-10">
              {audiences.map((a) => (
                <span key={a} className="inline-flex items-center gap-2 font-sans text-xs text-[var(--color-brown)]">
                  <span className="w-1 h-1 rounded-full" style={{ backgroundColor: "var(--color-gold)" }} />
                  {a}
                </span>
              ))}
            </div>

            <Link
              to="/contact?service=Academy"
              className="inline-flex items-center gap-3 font-sans text-[12px] tracking-widest uppercase px-8 py-3.5 text-white transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: "var(--color-gold)" }}
            >
              Inquire via WhatsApp
              <svg width="16" height="10" viewBox="0 0 16 10" fill="none" aria-hidden="true">
                <path d="M1 5H15M15 5L11 1M15 5L11 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative"
          >
            <div
              className="absolute -top-3 -right-3 w-full h-full pointer-events-none"
              style={{ border: "1px solid var(--color-gold)", opacity: 0.2 }}
            />
            <PlaceholderImage
              src="/images/academy/training-session.jpg"
              alt="Photography training session"
              label="Training / classroom photograph"
              aspect="aspect-[4/5]"
            />
          </motion.div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <MarqueeStrip dark items={["PHOTOGRAPHY", "LIGHTING", "COMPOSITION", "POSING", "EDITING", "CAREER", "HYDERABAD"]} />

      {/* ── COURSE CARDS ── */}
      <section className="px-6 md:px-14 py-24 bg-[var(--color-offwhite)] dark:bg-[#0A0806]">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-editorial-label mb-3"
              style={{ color: "var(--color-gold)" }}
            >
              Curriculum
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7 }}
              className="font-display font-bold text-[var(--color-charcoal)]"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.03em" }}
            >
              Course Categories
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {courses.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
                className="p-8 border border-[var(--color-beige)] dark:border-white/8 hover:border-[var(--color-gold)] transition-all duration-300 group"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <h3
                  className="font-display font-semibold text-[var(--color-charcoal)] mb-3 group-hover:text-[var(--color-gold)] transition-colors"
                  style={{ fontSize: "clamp(1.2rem, 2vw, 1.5rem)", letterSpacing: "-0.02em" }}
                >
                  {c.title}
                </h3>
                <p className="font-sans text-sm text-[var(--color-brown)] leading-relaxed">
                  {c.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-24 px-6 md:px-14" style={{ backgroundColor: "var(--color-offwhite)" }}>
        <div className="mx-auto max-w-2xl grid grid-cols-2 gap-10 text-center">
          {[
            { value: "40+", label: "Students Trained" },
            { value: "150+", label: "Interns & Freelancers Guided" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <span
                className="font-display font-bold gold-shimmer block mb-2"
                style={{ fontSize: "clamp(3rem, 7vw, 5.5rem)", letterSpacing: "-0.04em" }}
              >
                {s.value}
              </span>
              <p className="font-sans text-xs max-w-[16ch] mx-auto leading-snug uppercase tracking-wide" style={{ color: "var(--color-brown)" }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <Testimonials />
    </div>
  );
}
