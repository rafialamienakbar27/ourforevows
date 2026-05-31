"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "./useInView";

type Testimonial = {
  _id?: string;
  initials: string;
  name: string;
  event: string;
  text: string;
};

const defaultTestimonials: Testimonial[] = [
  { initials: "R&D", name: "Rina & Dimas",  event: "Bali Wedding, 2024",       text: "Our Forevows benar-benar memahami apa yang kami inginkan. Hasilnya jauh melebihi ekspektasi — setiap frame terasa seperti sebuah lukisan. Kami menangis bahagia saat menonton film pernikahan kami untuk pertama kali." },
  { initials: "P&R", name: "Putri & Reza",  event: "Yogyakarta Wedding, 2024", text: "Profesional, kreatif, dan sangat detail. Tim Our Forevows membuat kami merasa nyaman dari awal hingga akhir. Social content yang mereka buat untuk pernikahan kami mendapat ribuan likes!" },
  { initials: "S&A", name: "Sarah & Arief", event: "Lombok Pre-Wedding, 2024", text: "Pre-wedding session kami di Lombok menjadi kenangan yang tak terlupakan berkat Our Forevows. Mereka tahu angle terbaik, cahaya yang sempurna, dan cara membuat kami merasa alami di depan kamera." },
  { initials: "D&H", name: "Dewi & Hendri", event: "Jakarta Wedding, 2023",    text: "Kami sangat terkesan dengan highlight reel yang dibuat. Dalam 4 menit, seluruh kebahagiaan hari pernikahan kami terangkum dengan begitu indah. Ini akan kami simpan untuk selamanya." },
];

export default function Testimonials({ data }: { data?: Testimonial[] }) {
  const testimonials = data && data.length > 0 ? data : defaultTestimonials;
  const [cur, setCur] = useState(0);
  const { ref, inView } = useInView();

  const next = useCallback(() => setCur(c => (c + 1) % testimonials.length), [testimonials.length]);

  useEffect(() => {
    setCur(0);
  }, [testimonials]);

  useEffect(() => {
    const t = setInterval(next, 5000);
    return () => clearInterval(t);
  }, [next]);

  const t = testimonials[cur];

  return (
    <section id="testimonials" className="py-28 px-[4vw] bg-[var(--sage-light)] overflow-hidden">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="max-w-6xl mx-auto"
      >
        <div className="mb-14">
          <p className="text-[0.72rem] tracking-[0.22em] uppercase text-[var(--green-main)] mb-3">Kata Mereka</p>
          <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.8rem)] font-light text-[var(--text-dark)] leading-[1.2] max-w-lg">
            Kebahagiaan pasangan kami adalah kebanggaan kami
          </h2>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={cur}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="bg-white rounded p-10 md:p-14 max-w-3xl"
          >
            <div className="font-display text-[5rem] leading-[0.8] text-[var(--green-main)] opacity-20 mb-3 select-none">"</div>
            <p className="font-display text-xl md:text-2xl font-light italic text-[var(--text-dark)] leading-[1.75] mb-10">
              {t.text}
            </p>
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-full bg-[var(--sage)] flex items-center justify-center text-[0.7rem] text-[var(--green-main)] font-medium tracking-wide flex-shrink-0">
                {t.initials}
              </div>
              <div>
                <strong className="block text-[0.9rem] text-[var(--text-dark)]">{t.name}</strong>
                <span className="text-[0.75rem] text-[var(--text-light)]">{t.event}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-2.5 mt-8">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setCur(i)}
              className={`h-2 rounded-full transition-all duration-400 ${i === cur ? "bg-[var(--green-main)] w-7" : "bg-[var(--beige)] w-2 hover:bg-[var(--green-light)]"}`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
