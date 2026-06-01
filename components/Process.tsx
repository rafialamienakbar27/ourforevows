"use client";
import { motion } from "framer-motion";
import { useInView } from "./useInView";

const steps = [
  {
    num: "01",
    title: "Konsultasi Awal",
    desc: "Kita ngobrol santai untuk saling mengenal, memahami visi Anda, dan merancang konsep yang sesuai impian.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
  },
  {
    num: "02",
    title: "Perencanaan & Konsep",
    desc: "Tim kami menyusun mood board, timeline, dan detail teknis agar hari H berjalan sempurna tanpa hambatan.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
      </svg>
    ),
  },
  {
    num: "03",
    title: "Hari Spesial Anda",
    desc: "Kami hadir dengan penuh dedikasi — mengabadikan setiap momen berharga dengan mata yang tajam dan hati yang hangat.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>
      </svg>
    ),
  },
  {
    num: "04",
    title: "Editing & Delivery",
    desc: "Konten Anda dikerjakan dengan penuh cinta dan diserahkan tepat waktu — siap untuk dinikmati seumur hidup.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
      </svg>
    ),
  },
];

function StepCard({ s, i }: { s: typeof steps[0]; i: number }) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.12 }}
      className="group relative bg-white/[0.04] border border-white/10 rounded-2xl p-8 flex flex-col hover:bg-white/[0.08] hover:border-[var(--green-light)]/25 transition-all duration-500"
    >
      {/* Top row: number + line */}
      <div className="flex items-center gap-4 mb-7">
        <span className="font-display text-[2.8rem] font-light leading-none text-[var(--green-light)]/25 group-hover:text-[var(--green-light)]/50 transition-colors duration-500">
          {s.num}
        </span>
        <div className="flex-1 h-px bg-white/10" />
        <div className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-[var(--green-light)]/70 group-hover:border-[var(--green-light)]/40 group-hover:text-[var(--green-light)] transition-all duration-500 flex-shrink-0">
          {s.icon}
        </div>
      </div>

      {/* Content */}
      <h3 className="font-display text-xl font-light text-white mb-3 leading-snug">
        {s.title}
      </h3>
      <p className="text-[0.85rem] font-light text-white/50 leading-[1.9] flex-1">
        {s.desc}
      </p>

      {/* Bottom accent */}
      <div className="mt-6 w-0 group-hover:w-8 h-px bg-[var(--green-light)]/50 transition-all duration-500" />
    </motion.div>
  );
}

export default function Process() {
  const { ref, inView } = useInView();
  return (
    <section className="py-28 px-[4vw] bg-[var(--green-deep)] relative overflow-hidden">

      {/* Subtle background photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=50&auto=format&fit=crop"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-luminosity pointer-events-none"
      />

      {/* Decorative circles */}
      <div className="absolute -right-40 -top-40 w-[500px] h-[500px] rounded-full border border-white/[0.04] pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 w-72 h-72 rounded-full border border-white/[0.04] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Centered header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <p className="text-[0.72rem] tracking-[0.22em] uppercase text-[var(--green-light)] mb-4">
            Cara Kerja Kami
          </p>
          <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.8rem)] font-light text-white leading-[1.2] mb-4">
            Dari mimpi Anda, menjadi realita yang indah
          </h2>
          <p className="text-[0.88rem] font-light text-white/45 leading-[1.9]">
            Setiap pasangan mendapatkan pengalaman yang personal dan menyenangkan — kami ada di setiap langkah perjalanan Anda.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((s, i) => <StepCard key={i} s={s} i={i} />)}
        </div>

      </div>
    </section>
  );
}
