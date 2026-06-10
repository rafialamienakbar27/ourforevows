"use client";
import { motion } from "framer-motion";
import { useInView } from "./useInView";

type Service = {
  _id?: string;
  title: string;
  description: string;
  badge?: string;
  iconKey?: string;
};

const icons: Record<string, React.ReactNode> = {
  film: (
    <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
      <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M16 8 C13 11 10 14 11 18 C12 21 14.5 22 16 24"
        stroke="currentColor"
        strokeWidth="1"
      />
      <path
        d="M16 8 C19 11 22 14 21 18 C20 21 17.5 22 16 24"
        stroke="currentColor"
        strokeWidth="1"
      />
      <circle cx="16" cy="8" r="2" fill="currentColor" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
      <rect
        x="4"
        y="10"
        width="24"
        height="16"
        rx="2.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="16" cy="18" r="4.5" stroke="currentColor" strokeWidth="1" />
      <circle cx="16" cy="18" r="1.5" fill="currentColor" />
      <path
        d="M11 10 L13.5 6 L18.5 6 L21 10"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  ),
  social: (
    <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
      <rect
        x="4"
        y="4"
        width="10"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="18"
        y="4"
        width="10"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="4"
        y="18"
        width="10"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <rect
        x="18"
        y="18"
        width="10"
        height="10"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  ),
  highlight: (
    <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
      <path
        d="M8 26 L16 6 L24 26"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M10.5 20 L21.5 20" stroke="currentColor" strokeWidth="1" />
      <circle cx="16" cy="6" r="2.5" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
  intimate: (
    <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
      <path
        d="M16 10 L18.5 15 L24 16 L20 20 L21 26 L16 23 L11 26 L12 20 L8 16 L13.5 15 Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  ),
  custom: (
    <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6">
      <path d="M9 24 L16 8 L23 24" stroke="currentColor" strokeWidth="1.2" />
      <path d="M11.5 19 L20.5 19" stroke="currentColor" strokeWidth="1" />
      <path d="M5 28 L27 28" stroke="currentColor" strokeWidth="1" />
    </svg>
  ),
};

const nums = ["01", "02", "03", "04"];

const defaultServices: Service[] = [
  {
    title: "Proposal",
    description:
      "Abadikan momen lamaran yang tak terlupakan — dari ekspresi pertama hingga kebahagiaan yang meluap, kami pastikan setiap detik terekam dengan indah.",
    iconKey: "intimate",
  },
  {
    title: "Birthday",
    description:
      "Dokumentasi ulang tahun yang hangat dan berkesan — momen kebahagiaan bersama orang-orang tercinta yang layak dikenang selamanya.",
    iconKey: "highlight",
  },
  {
    title: "Wedding",
    description:
      "Dari persiapan sampai resepsi, kami abadikan semua momen candid yang biasanya terlewat — tawa, tangis serta haru, semua jadi konten yang bisa kamu simpan dan posting.",
    iconKey: "film",
  },
  {
    title: "All Event",
    description:
      "Bukan cuma wedding — wisuda, ulang tahun kampus, gathering brand, atau event apapun yang punya momen seru. Kami hadir dan abadikan semuanya jadi konten yang siap posting.",
    iconKey: "custom",
    badge: "Baru",
  },
];

function ServiceCard({ s, i }: { s: Service; i: number }) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.75,
        ease: [0.22, 1, 0.36, 1],
        delay: (i % 3) * 0.08,
      }}
      className="group relative bg-white rounded-2xl p-8 border border-[var(--beige)] hover:border-[var(--green-light)] hover:shadow-xl hover:shadow-[var(--green-main)]/8 transition-all duration-400 flex flex-col overflow-hidden cursor-default"
    >
      {/* Large background number */}
      <span className="absolute -top-3 -right-1 font-display text-[7rem] leading-none font-light text-[var(--green-main)]/[0.06] select-none pointer-events-none transition-colors duration-400 group-hover:text-[var(--green-main)]/[0.1]">
        {nums[i]}
      </span>

      {/* Badge */}
      {s.badge && (
        <span className="absolute top-6 right-6 bg-[var(--green-main)] text-white text-[0.58rem] tracking-[0.15em] uppercase px-2.5 py-1 rounded-full">
          {s.badge}
        </span>
      )}

      {/* Icon */}
      <div className="w-11 h-11 rounded-xl bg-[var(--sage-light)] text-[var(--green-main)] flex items-center justify-center mb-6 group-hover:bg-[var(--green-main)] group-hover:text-white transition-all duration-400">
        {icons[s.iconKey ?? "film"]}
      </div>

      {/* Number label */}
      <p className="text-[0.62rem] tracking-[0.2em] uppercase text-[var(--text-light)] mb-2">
        {nums[i]}
      </p>

      {/* Title */}
      <h3 className="font-display text-[1.45rem] font-light text-[var(--text-dark)] mb-3 leading-snug">
        {s.title}
      </h3>

      {/* Divider */}
      <div className="w-8 h-px bg-[var(--green-light)] mb-4 group-hover:w-16 transition-all duration-500" />

      {/* Description */}
      <p className="text-[0.86rem] font-light text-[var(--text-mid)] leading-[1.85] flex-1">
        {s.description}
      </p>
    </motion.div>
  );
}

export default function Services({ data }: { data?: Service[] }) {
  const services = data && data.length > 0 ? data : defaultServices;

  return (
    <section id="services" className="py-20 px-[4vw] bg-[var(--sage-light)]">
      <div className="max-w-6xl mx-auto">
        <p className="text-[0.72rem] tracking-[0.22em] uppercase text-[var(--green-main)] mb-8">
          Services
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s._id ?? i} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
