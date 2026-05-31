"use client";
import { motion } from "framer-motion";
import { useInView } from "./useInView";

const stats = [
  { num: "200+", label: "Pasangan Bahagia" },
  { num: "5+",   label: "Tahun Pengalaman" },
  { num: "15+",  label: "Kota di Indonesia" },
];

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section id="about" className="py-28 px-[4vw] bg-[var(--cream)]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* Image collage */}
        <Reveal>
          <div className="relative h-[520px] md:h-[580px]">
            {/* Main image */}
            <div className="absolute top-0 left-0 w-3/4 h-[88%] bg-[var(--sage)] rounded overflow-hidden">
              <svg viewBox="0 0 400 500" className="w-full h-full" fill="none">
                <rect width="400" height="500" fill="#D4DFD0"/>
                <path d="M200 400 C160 370 110 350 100 310 C90 270 130 240 150 200 C170 160 180 110 200 80 C220 110 230 160 250 200 C270 240 310 270 300 310 C290 350 240 370 200 400Z" stroke="#2D6A2D" strokeWidth="1.5" fill="#2D6A2D" fillOpacity="0.08"/>
                <path d="M200 350 C175 330 145 315 140 285 C135 255 160 235 175 210" stroke="#2D6A2D" strokeWidth="1"/>
                <path d="M200 350 C225 330 255 315 260 285 C265 255 240 235 225 210" stroke="#2D6A2D" strokeWidth="1"/>
                <circle cx="200" cy="80" r="15" stroke="#2D6A2D" strokeWidth="1.5" fill="none"/>
                <circle cx="140" cy="200" r="10" stroke="#2D6A2D" strokeWidth="1"/>
                <circle cx="260" cy="195" r="12" stroke="#2D6A2D" strokeWidth="1"/>
                <text x="200" y="460" textAnchor="middle" fontFamily="Cormorant Garamond" fontSize="13" fill="#2D6A2D" opacity="0.5">Our Forevows</text>
              </svg>
            </div>
            {/* Accent image */}
            <div className="absolute bottom-0 right-0 w-[47%] h-[54%] bg-[var(--sage-light)] rounded overflow-hidden border-[6px] border-[var(--cream)]">
              <svg viewBox="0 0 250 300" className="w-full h-full" fill="none">
                <rect width="250" height="300" fill="#E0E8DB"/>
                <path d="M125 50 C105 90 70 110 65 145 C60 180 90 200 110 225 C130 250 125 270 125 290" stroke="#2D6A2D" strokeWidth="1.2"/>
                <path d="M125 160 C100 145 78 125 88 100 C98 75 122 88 125 108" stroke="#2D6A2D" strokeWidth="1"/>
                <path d="M125 160 C150 145 172 125 162 100 C152 75 128 88 125 108" stroke="#2D6A2D" strokeWidth="1"/>
                <circle cx="95" cy="210" r="8" stroke="#2D6A2D" strokeWidth="1"/>
                <circle cx="160" cy="205" r="6" stroke="#2D6A2D" strokeWidth="1"/>
              </svg>
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <Reveal delay={0.15}>
          <p className="text-[0.72rem] tracking-[0.22em] uppercase text-[var(--green-main)] mb-3">Tentang Kami</p>
          <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.8rem)] font-light leading-[1.2] text-[var(--text-dark)] mb-6 max-w-[520px]">
            Kami percaya setiap kisah cinta layak diabadikan dengan indah
          </h2>
          <p className="text-[0.93rem] font-light text-[var(--text-mid)] leading-[1.9] mb-4">
            Our Forevows lahir dari kecintaan mendalam terhadap cerita cinta yang otentik. Kami bukan sekadar content creator — kami adalah pencerita visual yang memahami bahwa di balik setiap pernikahan, ada ribuan detail kecil yang membuat hari itu menjadi milik Anda sepenuhnya.
          </p>
          <p className="text-[0.93rem] font-light text-[var(--text-mid)] leading-[1.9] mb-10">
            Dengan pendekatan yang hangat, intim, dan penuh perhatian, kami hadir untuk memastikan setiap tawa, setiap air mata bahagia, dan setiap momen berharga terekam dalam konten yang akan Anda kenang selamanya.
          </p>

          {/* Stats */}
          <div className="flex gap-8 pt-8 border-t border-[var(--beige)] flex-wrap">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="font-display text-4xl font-light text-[var(--green-main)] leading-none mb-1">{s.num}</div>
                <div className="text-[0.68rem] tracking-[0.1em] uppercase text-[var(--text-light)]">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}
