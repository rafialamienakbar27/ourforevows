"use client";
import { motion } from "framer-motion";
import { useInView } from "./useInView";

const steps = [
  { num: "01", title: "Konsultasi Awal", desc: "Kita ngobrol santai untuk saling mengenal, memahami visi Anda, dan merancang konsep yang sesuai impian." },
  { num: "02", title: "Perencanaan & Konsep", desc: "Tim kami menyusun mood board, timeline, dan detail teknis agar hari H berjalan sempurna tanpa hambatan." },
  { num: "03", title: "Hari Spesial Anda", desc: "Kami hadir dengan penuh dedikasi — mengabadikan setiap momen berharga dengan mata yang tajam dan hati yang hangat." },
  { num: "04", title: "Editing & Delivery", desc: "Konten Anda dikerjakan dengan penuh cinta dan diserahkan tepat waktu — siap untuk dinikmati seumur hidup." },
];

function Step({ s, i }: { s: typeof steps[0]; i: number }) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
      className="grid grid-cols-[56px_1fr] gap-6 py-8 border-b border-white/8 group last:border-none"
    >
      <div className="font-display text-4xl font-light text-white/20 group-hover:text-[var(--green-light)] transition-colors duration-400 leading-none mt-1">
        {s.num}
      </div>
      <div>
        <h4 className="font-display text-xl font-light text-white mb-2">{s.title}</h4>
        <p className="text-[0.87rem] font-light text-white/55 leading-[1.85]">{s.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Process() {
  const { ref, inView } = useInView();
  return (
    <section className="py-28 px-[4vw] bg-[var(--green-deep)]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.3fr] gap-20 items-start">

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <p className="text-[0.72rem] tracking-[0.22em] uppercase text-[var(--green-light)] mb-3">Cara Kerja Kami</p>
          <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.8rem)] font-light text-white leading-[1.2] mb-5">
            Dari mimpi Anda, menjadi realita yang indah
          </h2>
          <p className="text-[0.9rem] font-light text-white/55 leading-[1.9]">
            Setiap pasangan mendapatkan pengalaman yang personal dan menyenangkan — kami ada di setiap langkah perjalanan Anda.
          </p>
        </motion.div>

        <div>
          {steps.map((s, i) => <Step key={i} s={s} i={i} />)}
        </div>

      </div>
    </section>
  );
}
