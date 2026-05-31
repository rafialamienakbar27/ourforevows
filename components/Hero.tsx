"use client";
import { motion } from "framer-motion";

const FadeUp = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-[var(--sage-light)] overflow-hidden px-[4vw] pt-32 pb-24">

      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-[20%] top-0 bottom-0 w-px bg-[var(--green-main)]/8" />
        <div className="absolute left-0 right-0 top-[60%] h-px bg-[var(--green-main)]/8" />
        <div className="absolute -right-48 -top-24 w-[600px] h-[600px] rounded-full border border-[var(--green-main)]/10" />
        <div className="absolute -left-24 -bottom-12 w-[300px] h-[300px] rounded-full border border-[var(--green-main)]/10" />

        {/* Floral SVG left */}
        <svg className="absolute left-[3%] top-1/2 -translate-y-1/2 w-28 h-52 opacity-25 hidden lg:block" viewBox="0 0 200 300" fill="none">
          <path d="M100 280 C80 240 40 220 30 180 C20 140 50 100 70 80 C90 60 100 30 100 10" stroke="#2D6A2D" strokeWidth="1" />
          <path d="M100 200 C70 180 40 160 50 130 C60 100 90 110 100 130" stroke="#2D6A2D" strokeWidth="0.8" />
          <path d="M100 200 C130 180 160 160 150 130 C140 100 110 110 100 130" stroke="#2D6A2D" strokeWidth="0.8" />
          <path d="M100 150 C75 130 55 110 65 85 C75 60 98 75 100 95" stroke="#2D6A2D" strokeWidth="0.8" />
          <path d="M100 150 C125 130 145 110 135 85 C125 60 102 75 100 95" stroke="#2D6A2D" strokeWidth="0.8" />
          <circle cx="70" cy="60" r="8" stroke="#2D6A2D" strokeWidth="0.8" />
          <circle cx="130" cy="55" r="6" stroke="#2D6A2D" strokeWidth="0.8" />
          <circle cx="55" cy="100" r="5" stroke="#2D6A2D" strokeWidth="0.8" />
          <circle cx="150" cy="95" r="7" stroke="#2D6A2D" strokeWidth="0.8" />
        </svg>

        {/* Floral SVG right */}
        <svg className="absolute right-[5%] top-[45%] -translate-y-1/2 w-32 h-56 opacity-30 hidden lg:block" viewBox="0 0 200 300" fill="none">
          <path d="M100 10 C80 50 50 70 45 110 C40 150 70 180 80 210 C90 240 100 270 100 290" stroke="#2D6A2D" strokeWidth="1" />
          <path d="M100 120 C70 100 45 80 55 55 C65 30 95 45 100 65" stroke="#2D6A2D" strokeWidth="0.8" />
          <path d="M100 120 C130 100 155 80 145 55 C135 30 105 45 100 65" stroke="#2D6A2D" strokeWidth="0.8" />
          <circle cx="65" cy="180" r="9" stroke="#2D6A2D" strokeWidth="0.8" />
          <circle cx="140" cy="170" r="6" stroke="#2D6A2D" strokeWidth="0.8" />
          <circle cx="80" cy="220" r="5" stroke="#2D6A2D" strokeWidth="0.8" />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <FadeUp delay={0.2}>
          <p className="text-[0.72rem] tracking-[0.25em] uppercase text-[var(--green-main)] mb-6 font-light">
            Wedding Content Creator
          </p>
        </FadeUp>

        <div className="font-display font-light leading-[1.08] tracking-tight text-[var(--text-dark)] mb-8" style={{ fontSize: "clamp(3rem, 7vw, 6rem)" }}>
          <FadeUp delay={0.4}>
            <span className="block">Every vow,</span>
          </FadeUp>
          <FadeUp delay={0.55}>
            <span className="block italic text-[var(--green-main)]">every glance,</span>
          </FadeUp>
          <FadeUp delay={0.7}>
            <span className="block">forever yours.</span>
          </FadeUp>
        </div>

        <FadeUp delay={0.9}>
          <p className="text-[var(--text-mid)] font-light leading-relaxed max-w-lg mx-auto mb-10" style={{ fontSize: "clamp(0.9rem, 2vw, 1rem)" }}>
            Kami mengabadikan kisah cinta Anda menjadi konten visual yang indah, autentik, dan tak terlupakan — untuk momen yang hanya terjadi satu kali seumur hidup.
          </p>
        </FadeUp>

        <FadeUp delay={1.1}>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#portfolio"
              onClick={(e) => { e.preventDefault(); document.querySelector("#portfolio")?.scrollIntoView({ behavior: "smooth" }); }}
              className="px-8 py-3.5 rounded-full bg-[var(--green-main)] text-white text-[0.78rem] tracking-widest uppercase hover:bg-[var(--green-deep)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-900/25"
            >
              Lihat Portofolio
            </a>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="px-8 py-3.5 rounded-full border border-[var(--green-main)] text-[var(--green-main)] text-[0.78rem] tracking-widest uppercase hover:bg-[var(--green-main)] hover:text-white transition-all duration-300 hover:-translate-y-0.5"
            >
              Hubungi Kami
            </a>
          </div>
        </FadeUp>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[0.62rem] tracking-[0.22em] uppercase text-[var(--text-light)]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-[var(--green-main)] to-transparent animate-scroll-pulse" />
      </motion.div>
    </section>
  );
}
