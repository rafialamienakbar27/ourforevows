"use client";
import { motion } from "framer-motion";
import { useInView } from "./useInView";

const services = [
  {
    title: "Wedding Film",
    desc: "Film sinematik penuh emosi yang menceritakan keseluruhan hari istimewa Anda dalam durasi yang memukau — dari persiapan hingga momen terakhir.",
    icon: (
      <svg viewBox="0 0 60 60" fill="none" className="w-12 h-12">
        <circle cx="30" cy="30" r="20" stroke="#2D6A2D" strokeWidth="1.2"/>
        <path d="M30 15 C24 20 18 26 20 33 C22 40 28 42 30 45" stroke="#2D6A2D" strokeWidth="1"/>
        <path d="M30 15 C36 20 42 26 40 33 C38 40 32 42 30 45" stroke="#2D6A2D" strokeWidth="1"/>
        <circle cx="30" cy="15" r="3" fill="#2D6A2D"/>
      </svg>
    ),
  },
  {
    title: "Pre-Wedding Session",
    desc: "Sesi foto dan video pra-nikah yang romantis dan natural — mengabadikan chemistry unik Anda berdua sebelum hari besar tiba.",
    icon: (
      <svg viewBox="0 0 60 60" fill="none" className="w-12 h-12">
        <rect x="12" y="18" width="36" height="26" rx="3" stroke="#2D6A2D" strokeWidth="1.2"/>
        <circle cx="30" cy="31" r="7" stroke="#2D6A2D" strokeWidth="1"/>
        <circle cx="30" cy="31" r="3" fill="#2D6A2D"/>
        <path d="M22 18 L26 12 L34 12 L38 18" stroke="#2D6A2D" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    title: "Social Media Content",
    desc: "Konten pernikahan yang dirancang khusus untuk Instagram, TikTok, dan platform digital — estetis, engaging, dan siap viral.",
    icon: (
      <svg viewBox="0 0 60 60" fill="none" className="w-12 h-12">
        <rect x="10" y="10" width="18" height="18" rx="2" stroke="#2D6A2D" strokeWidth="1.2"/>
        <rect x="32" y="10" width="18" height="18" rx="2" stroke="#2D6A2D" strokeWidth="1.2"/>
        <rect x="10" y="32" width="18" height="18" rx="2" stroke="#2D6A2D" strokeWidth="1.2"/>
        <rect x="32" y="32" width="18" height="18" rx="2" stroke="#2D6A2D" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    title: "Highlight Reel",
    desc: "Video highlight pernikahan berdurasi 3-5 menit yang padat, emosional, dan sempurna untuk dibagikan ke keluarga dan orang-orang tersayang.",
    icon: (
      <svg viewBox="0 0 60 60" fill="none" className="w-12 h-12">
        <path d="M15 45 L30 15 L45 45" stroke="#2D6A2D" strokeWidth="1.2" strokeLinejoin="round"/>
        <path d="M19 38 L41 38" stroke="#2D6A2D" strokeWidth="1"/>
        <circle cx="30" cy="15" r="4" stroke="#2D6A2D" strokeWidth="1"/>
      </svg>
    ),
  },
  {
    title: "Intimate Coverage",
    badge: "Baru",
    desc: "Layanan dokumentasi khusus untuk pernikahan intim dan akad nikah — pendekatan personal yang lebih dekat dan hangat.",
    icon: (
      <svg viewBox="0 0 60 60" fill="none" className="w-12 h-12">
        <path d="M30 20 L35 28 L45 30 L38 38 L40 48 L30 43 L20 48 L22 38 L15 30 L25 28 Z" stroke="#2D6A2D" strokeWidth="1.2"/>
      </svg>
    ),
  },
  {
    title: "Custom Package",
    desc: "Paket yang dirancang sesuai kebutuhan dan impian Anda — karena setiap pernikahan adalah unik dan berhak mendapat perlakuan istimewa.",
    icon: (
      <svg viewBox="0 0 60 60" fill="none" className="w-12 h-12">
        <path d="M18 42 L30 18 L42 42" stroke="#2D6A2D" strokeWidth="1.2"/>
        <path d="M23 35 L37 35" stroke="#2D6A2D" strokeWidth="1"/>
        <path d="M14 48 L46 48" stroke="#2D6A2D" strokeWidth="1"/>
      </svg>
    ),
  },
];

function Card({ s, i }: { s: typeof services[0]; i: number }) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: (i % 3) * 0.1 }}
      className="relative bg-[var(--sage-light)] p-10 hover:bg-white hover:shadow-lg hover:shadow-black/5 transition-all duration-300 group"
    >
      {s.badge && (
        <span className="absolute top-6 right-6 bg-[var(--green-main)] text-white text-[0.62rem] tracking-widest uppercase px-3 py-1 rounded-full">
          {s.badge}
        </span>
      )}
      <div className="mb-6">{s.icon}</div>
      <h3 className="font-display text-2xl font-light text-[var(--text-dark)] mb-3">{s.title}</h3>
      <p className="text-[0.87rem] font-light text-[var(--text-mid)] leading-[1.85] mb-6">{s.desc}</p>
      <span className="text-[0.72rem] tracking-widest uppercase text-[var(--green-main)] group-hover:tracking-[0.18em] transition-all duration-300">
        Pelajari Lebih →
      </span>
    </motion.div>
  );
}

export default function Services() {
  const { ref, inView } = useInView();
  return (
    <section id="services" className="py-28 px-[4vw] bg-[var(--sage-light)]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="max-w-6xl mx-auto mb-16"
      >
        <p className="text-[0.72rem] tracking-[0.22em] uppercase text-[var(--green-main)] mb-3">Layanan Kami</p>
        <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.8rem)] font-light text-[var(--text-dark)] max-w-[520px] leading-[1.2]">
          Setiap momen, diabadikan dengan penuh cinta
        </h2>
      </motion.div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 border border-[var(--beige)] divide-x divide-y divide-[var(--beige)]">
        {services.map((s, i) => <Card key={i} s={s} i={i} />)}
      </div>
    </section>
  );
}
