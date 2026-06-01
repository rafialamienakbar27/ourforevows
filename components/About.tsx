"use client";
import { motion } from "framer-motion";
import { useInView } from "./useInView";

type AboutData = {
  paragraph1?: string;
  paragraph2?: string;
  stat1Num?: string; stat1Label?: string;
  stat2Num?: string; stat2Label?: string;
  stat3Num?: string; stat3Label?: string;
};

const defaults: AboutData = {
  paragraph1: "Our Forevows lahir dari kecintaan mendalam terhadap cerita cinta yang otentik. Kami bukan sekadar content creator — kami adalah pencerita visual yang memahami bahwa di balik setiap pernikahan, ada ribuan detail kecil yang membuat hari itu menjadi milik Anda sepenuhnya.",
  paragraph2: "Dengan pendekatan yang hangat, intim, dan penuh perhatian, kami hadir untuk memastikan setiap tawa, setiap air mata bahagia, dan setiap momen berharga terekam dalam konten yang akan Anda kenang selamanya.",
  stat1Num: "200+", stat1Label: "Pasangan Bahagia",
  stat2Num: "5+",   stat2Label: "Tahun Pengalaman",
  stat3Num: "15+",  stat3Label: "Kota di Indonesia",
};

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

export default function About({ data }: { data?: AboutData }) {
  const d = { ...defaults, ...data };
  const stats = [
    { num: d.stat1Num!, label: d.stat1Label! },
    { num: d.stat2Num!, label: d.stat2Label! },
    { num: d.stat3Num!, label: d.stat3Label! },
  ];

  return (
    <section id="about" className="py-28 px-[4vw] bg-[var(--cream)]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-20 items-center">

        {/* Image collage */}
        <Reveal>
          <div className="relative h-[520px] md:h-[580px]">
            {/* Main photo */}
            <div className="absolute top-0 left-0 w-3/4 h-[88%] rounded overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=900&q=85&auto=format&fit=crop"
                alt="Wedding couple"
                className="w-full h-full object-cover object-center"
              />
              {/* Subtle green tint overlay */}
              <div className="absolute inset-0 bg-[var(--green-deep)]/10" />
            </div>
            {/* Accent photo */}
            <div className="absolute bottom-0 right-0 w-[47%] h-[54%] rounded overflow-hidden border-[6px] border-[var(--cream)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.unsplash.com/photo-1537907510278-bf0e41e2cc40?w=600&q=85&auto=format&fit=crop"
                alt="Wedding detail"
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        </Reveal>

        {/* Text */}
        <Reveal delay={0.15}>
          <p className="text-[0.72rem] tracking-[0.22em] uppercase text-[var(--green-main)] mb-3">Tentang Kami</p>
          <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.8rem)] font-light leading-[1.2] text-[var(--text-dark)] mb-6 max-w-[520px]">
            Kami percaya setiap kisah cinta layak diabadikan dengan indah
          </h2>
          <p className="text-[0.93rem] font-light text-[var(--text-mid)] leading-[1.9] mb-4">{d.paragraph1}</p>
          <p className="text-[0.93rem] font-light text-[var(--text-mid)] leading-[1.9] mb-10">{d.paragraph2}</p>

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
