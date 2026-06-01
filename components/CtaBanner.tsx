"use client";
import { motion } from "framer-motion";
import { useInView } from "./useInView";

export default function CtaBanner() {
  const { ref, inView } = useInView();
  return (
    <section className="relative py-24 px-[4vw] bg-[var(--green-main)] overflow-hidden text-center">
      {/* Background wave */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 1200 300" preserveAspectRatio="none" fill="none">
        <path d="M0 150 C200 90 400 210 600 150 C800 90 1000 210 1200 150" stroke="white" strokeWidth="1"/>
        <path d="M0 190 C200 130 400 250 600 190 C800 130 1000 250 1200 190" stroke="white" strokeWidth="1"/>
      </svg>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="relative z-10 max-w-2xl mx-auto"
      >
        <p className="text-[0.7rem] tracking-[0.22em] uppercase text-white/60 mb-4">
          Masih ada tanggal tersedia untuk 2026
        </p>
        <h2 className="font-display text-[clamp(2rem,4.5vw,3.2rem)] font-light text-white leading-[1.2] mb-5">
          Siap mengabadikan cerita cinta Anda?
        </h2>
        <p className="text-[0.9rem] font-light text-white/70 leading-[1.9] mb-10">
          Hubungi kami sekarang dan wujudkan impian pernikahan Anda bersama Our Forevows.
        </p>
        <a
          href="#contact"
          onClick={e => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
          className="inline-flex px-9 py-3.5 rounded-full bg-white text-[var(--green-deep)] text-[0.78rem] tracking-widest uppercase hover:bg-transparent hover:text-white border border-white transition-all duration-300 hover:-translate-y-0.5"
        >
          Mulai Perjalanan Anda
        </a>
      </motion.div>
    </section>
  );
}
