"use client";
import { motion } from "framer-motion";
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
  { initials: "P&R", name: "Putri & Reza",  event: "Yogyakarta Wedding, 2024", text: "Profesional, kreatif, dan sangat detail. Tim Our Forevows membuat kami merasa nyaman dari awal hingga akhir. Social content yang mereka buat mendapat ribuan likes!" },
  { initials: "S&A", name: "Sarah & Arief", event: "Lombok Pre-Wedding, 2024", text: "Pre-wedding session kami di Lombok menjadi kenangan yang tak terlupakan. Mereka tahu angle terbaik, cahaya yang sempurna, dan cara membuat kami merasa alami di depan kamera." },
  { initials: "D&H", name: "Dewi & Hendri", event: "Jakarta Wedding, 2023",    text: "Dalam 4 menit, seluruh kebahagiaan hari pernikahan kami terangkum dengan begitu indah. Highlight reel yang dibuat benar-benar luar biasa — ini akan kami simpan untuk selamanya." },
];

const accentColors = [
  { bg: "bg-[var(--sage)]",       border: "border-[var(--green-light)]/30" },
  { bg: "bg-white",               border: "border-[var(--beige)]" },
  { bg: "bg-white",               border: "border-[var(--beige)]" },
  { bg: "bg-[var(--sage-light)]", border: "border-[var(--green-light)]/20" },
];

function TestimonialCard({ t, i }: { t: Testimonial; i: number }) {
  const { ref, inView } = useInView();
  const color = accentColors[i % accentColors.length];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (i % 2) * 0.12 }}
      className={`${color.bg} border ${color.border} rounded-2xl p-8 md:p-10 flex flex-col hover:shadow-xl hover:shadow-black/5 transition-all duration-500 group`}
    >
      {/* Quote mark */}
      <div className="mb-5">
        <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
          <path d="M0 24V14.4C0 10.08 1.12 6.56 3.36 3.84 5.6 1.12 8.96 0 13.44 0v3.84c-2.56 0-4.48.8-5.76 2.4C6.4 7.84 5.76 9.92 5.76 12.48H10.88V24H0ZM18.56 24V14.4c0-4.32 1.12-7.84 3.36-10.56C24.16 1.12 27.52 0 32 0v3.84c-2.56 0-4.48.8-5.76 2.4-1.28 1.6-1.92 3.68-1.92 6.24H29.44V24H18.56Z" fill="#2D6A2D" fillOpacity="0.12"/>
        </svg>
      </div>

      {/* Text */}
      <p className="font-display text-[1.05rem] md:text-[1.12rem] font-light italic text-[var(--text-dark)] leading-[1.85] flex-1 mb-8">
        {t.text}
      </p>

      {/* Author */}
      <div className="flex items-center gap-4 pt-6 border-t border-[var(--beige)]/60">
        <div className="w-11 h-11 rounded-full bg-[var(--green-main)] flex items-center justify-center text-[0.65rem] text-white font-medium tracking-wide flex-shrink-0">
          {t.initials}
        </div>
        <div>
          <strong className="block text-[0.9rem] font-medium text-[var(--text-dark)]">{t.name}</strong>
          <span className="text-[0.72rem] text-[var(--text-light)] font-light">{t.event}</span>
        </div>
        {/* Star rating */}
        <div className="ml-auto flex gap-0.5">
          {[...Array(5)].map((_, s) => (
            <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill="#2D6A2D" className="opacity-70">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Testimonials({ data }: { data?: Testimonial[] }) {
  const testimonials = data && data.length > 0 ? data : defaultTestimonials;
  const { ref, inView } = useInView();

  return (
    <section id="testimonials" className="py-28 px-[4vw] bg-[var(--cream)] relative overflow-hidden">

      {/* Decorative background element */}
      <div className="absolute right-0 top-0 w-1/3 h-full bg-[var(--sage-light)] opacity-50 pointer-events-none" />
      <div className="absolute right-[33%] top-0 bottom-0 w-px bg-[var(--beige)] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <p className="text-[0.72rem] tracking-[0.22em] uppercase text-[var(--green-main)] mb-3">Kata Mereka</p>
            <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.8rem)] font-light text-[var(--text-dark)] leading-[1.2] max-w-sm">
              Kebahagiaan pasangan kami adalah kebanggaan kami
            </h2>
          </div>
          <div className="flex items-center gap-3 md:pb-1">
            <div className="text-right">
              <p className="font-display text-3xl font-light text-[var(--green-main)]">200+</p>
              <p className="text-[0.7rem] tracking-wider uppercase text-[var(--text-light)]">Pasangan Bahagia</p>
            </div>
            <div className="w-px h-10 bg-[var(--beige)]" />
            <div className="text-right">
              <p className="font-display text-3xl font-light text-[var(--green-main)]">5★</p>
              <p className="text-[0.7rem] tracking-wider uppercase text-[var(--text-light)]">Rating Rata-rata</p>
            </div>
          </div>
        </motion.div>

        {/* Testimonial grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t._id ?? i} t={t} i={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
