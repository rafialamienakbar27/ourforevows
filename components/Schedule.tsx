"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin } from "lucide-react";

type ScheduleItem = {
  id: number;
  date: string;
  day: number;
  month: string;
  monthShort: string;
  year: number;
  event: string;
  location?: string;
  collab?: string;
  team?: string;
  type:
    | "akad"
    | "wedding"
    | "reception"
    | "prewedding"
    | "package"
    | "lamaran"
    | "maternity";
  status: "booked" | "completed";
};

const schedules: ScheduleItem[] = [
  {
    id: 1,
    date: "28 September 2025",
    day: 28,
    month: "September",
    monthShort: "SEP",
    year: 2025,
    event: "Ratih & Ilyas",
    location: "SMA BPPI Baleendah",
    type: "wedding",
    status: "completed",
  },
  {
    id: 2,
    date: "6 Juni 2026",
    day: 6,
    month: "Juni",
    monthShort: "JUN",
    year: 2026,
    event: "Kania & Aji",
    location: "Villa Annisa, Ciparay",
    type: "wedding",
    status: "completed",
  },
  {
    id: 3,
    date: "6 Juni 2026",
    day: 6,
    month: "Juni",
    monthShort: "JUN",
    year: 2026,
    event: "Aulia & Rifky",
    location: "Andir, Bandung",
    type: "wedding",
    status: "completed",
  },
  {
    id: 4,
    date: "6 Juni 2026",
    day: 6,
    month: "Juni",
    monthShort: "JUN",
    year: 2026,
    event: "Dinda & Rizky",
    location: "Curug Sampireun",
    type: "wedding",
    status: "completed",
  },
  {
    id: 5,
    date: "7 Juni 2026",
    day: 7,
    month: "Juni",
    monthShort: "JUN",
    year: 2026,
    event: "Risa & Aldy",
    location: "Cipatat, Kabupaten Bandung Barat",
    type: "wedding",
    status: "completed",
  },
  {
    id: 6,
    date: "14 Juni 2026",
    day: 14,
    month: "Juni",
    monthShort: "JUN",
    year: 2026,
    event: "Wedding",
    location: "Kopi Setia Jatinangor",
    type: "wedding",
    status: "completed",
  },
  {
    id: 7,
    date: "20 Juni 2026",
    day: 20,
    month: "Juni",
    monthShort: "JUN",
    year: 2026,
    event: "Wedding",
    collab: "Photo by Flow",
    type: "wedding",
    status: "completed",
  },
  {
    id: 8,
    date: "21 Juni 2026",
    day: 21,
    month: "Juni",
    monthShort: "JUN",
    year: 2026,
    event: "Fira",
    location: "Cibiuk Resto",
    type: "lamaran",
    status: "completed",
  },
  {
    id: 9,
    date: "5 Juli 2026",
    day: 5,
    month: "Juli",
    monthShort: "JUL",
    year: 2026,
    event: "Intimate Wedding",
    location: "Villa Husna, Soreang",
    type: "wedding",
    status: "completed",
  },
  {
    id: 10,
    date: "5 Juli 2026",
    day: 5,
    month: "Juli",
    monthShort: "JUL",
    year: 2026,
    event: "Sean & Nadya",
    collab: "MC Bellinda & Renaldy",
    type: "wedding",
    status: "completed",
  },
  {
    id: 11,
    date: "12 Juli 2026",
    day: 12,
    month: "Juli",
    monthShort: "JUL",
    year: 2026,
    event: "Kia & Salim",
    collab: "Amertha Decor",
    type: "lamaran",
    status: "completed",
  },
  {
    id: 12,
    date: "26 Juli 2026",
    day: 26,
    month: "Juli",
    monthShort: "JUL",
    year: 2026,
    event: "Sella & Guruh",
    collab: "Parahyangan Wedding Planner",
    type: "wedding",
    status: "completed",
  },
  {
    id: 13,
    date: "8 Agustus 2026",
    day: 8,
    month: "Agustus",
    monthShort: "AGU",
    year: 2026,
    event: "7 Bulanan Marina",
    location: "Avery de Grand City",
    type: "maternity",
    status: "booked",
  },
  {
    id: 14,
    date: "30 Agustus 2026",
    day: 30,
    month: "Agustus",
    monthShort: "AGU",
    year: 2026,
    event: "Afina & Bagas",
    location: "Bojongsoang",
    type: "wedding",
    status: "booked",
  },
  {
    id: 15,
    date: "2 September 2026",
    day: 2,
    month: "September",
    monthShort: "SEP",
    year: 2026,
    event: "Astri & Rusmana",
    location: "KUA Cililin",
    team: "Rafa",
    type: "wedding",
    status: "booked",
  },
  {
    id: 16,
    date: "3 September 2026",
    day: 3,
    month: "September",
    monthShort: "SEP",
    year: 2026,
    event: "Liah & Yosafat",
    location: "Chapel Abipraya, Bandung Barat",
    type: "wedding",
    status: "booked",
  },
  {
    id: 17,
    date: "13 September 2026",
    day: 13,
    month: "September",
    monthShort: "SEP",
    year: 2026,
    event: "Misa & Dena",
    location: "Batujajar, Kabupaten Bandung Barat",
    type: "wedding",
    status: "booked",
  },
  {
    id: 18,
    date: "18 Oktober 2026",
    day: 18,
    month: "Oktober",
    monthShort: "OKT",
    year: 2026,
    event: "Leni & Dika",
    location: "Kopo",
    type: "lamaran",
    status: "booked",
  },
  {
    id: 19,
    date: "29 November 2026",
    day: 29,
    month: "November",
    monthShort: "NOV",
    year: 2026,
    event: "Sindi & Iman",
    location: "SDN 3 Rancabentang",
    type: "wedding",
    status: "booked",
  },
  {
    id: 20,
    date: "6 Desember 2026",
    day: 6,
    month: "Desember",
    monthShort: "DES",
    year: 2026,
    event: "Riska & Dany",
    location: "Wisma Bungsuna Dewi, Kiaracondong",
    type: "wedding",
    status: "booked",
  },
  {
    id: 21,
    date: "6 Desember 2026",
    day: 6,
    month: "Desember",
    monthShort: "DES",
    year: 2026,
    event: "Nurul & Ozi",
    location: "GOR Perjuangan 09",
    team: "Indah",
    type: "wedding",
    status: "booked",
  },
  {
    id: 22,
    date: "12 Desember 2026",
    day: 12,
    month: "Desember",
    monthShort: "DES",
    year: 2026,
    event: "Intimate Wedding",
    location: "Zest Sukajadi",
    collab: "Amertha",
    type: "wedding",
    status: "booked",
  },
];

const typeConfig = {
  akad: { label: "Akad Nikah", color: "bg-[var(--green-main)] text-white" },
  wedding: { label: "Wedding", color: "bg-[var(--green-deep)] text-white" },
  reception: { label: "Reception", color: "bg-[var(--green-mid)] text-white" },
  prewedding: { label: "Pre-Wedding", color: "bg-white/20 text-white" },
  package: { label: "Package", color: "bg-white/20 text-white" },
  lamaran: { label: "Lamaran", color: "bg-white/20 text-white" },
  maternity: { label: "7 Bulanan", color: "bg-white/20 text-white" },
};

const grouped = schedules.reduce<Record<string, ScheduleItem[]>>(
  (acc, item) => {
    const key = `${item.month} ${item.year}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  },
  {},
);

const months = Object.keys(grouped);

function getDefaultMonth(): string {
  const now = new Date();
  const currentKey = `${now.toLocaleString("id-ID", { month: "long" })} ${now.getFullYear()}`;
  // Capitalize first letter to match month names in data (e.g. "Juni 2026")
  const normalized = currentKey.charAt(0).toUpperCase() + currentKey.slice(1);
  if (months.includes(normalized)) return normalized;
  // Fall back to nearest upcoming month
  const upcoming = months.find((m) => {
    const s = grouped[m]?.[0];
    return s && (s.year > now.getFullYear() || (s.year === now.getFullYear() && new Date(s.date).getMonth() >= now.getMonth()));
  });
  return upcoming ?? months[0];
}

export default function Schedule() {
  const [active, setActive] = useState(getDefaultMonth);
  const items = grouped[active] ?? [];

  return (
    <section
      id="schedule"
      className="relative py-24 px-[4vw] bg-[var(--green-deep)] overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-10 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            backgroundSize: "200px",
          }}
        />
        <div className="absolute -right-40 -top-40 w-[500px] h-[500px] rounded-full border border-white/5" />
        <div className="absolute -left-32 -bottom-32 w-[400px] h-[400px] rounded-full border border-white/5" />
        <svg
          className="absolute right-[4%] top-1/2 -translate-y-1/2 w-40 h-64 opacity-[0.06] hidden lg:block"
          viewBox="0 0 200 300"
          fill="none"
        >
          <path
            d="M100 280 C80 240 40 220 30 180 C20 140 50 100 70 80 C90 60 100 30 100 10"
            stroke="white"
            strokeWidth="1"
          />
          <path
            d="M100 200 C70 180 40 160 50 130 C60 100 90 110 100 130"
            stroke="white"
            strokeWidth="0.8"
          />
          <path
            d="M100 200 C130 180 160 160 150 130 C140 100 110 110 100 130"
            stroke="white"
            strokeWidth="0.8"
          />
          <circle cx="70" cy="60" r="8" stroke="white" strokeWidth="0.8" />
          <circle cx="130" cy="55" r="6" stroke="white" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10"
        >
          <div>
            <p className="text-[0.72rem] tracking-[0.22em] uppercase text-[var(--green-light)] mb-3">
              {" "}
              Schedule
            </p>
            <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.8rem)] font-light text-white leading-[1.2]">
              Tanggal yang sudah{" "}
              <em className="italic text-[var(--green-light)]">terisi</em>
            </h2>
          </div>
          <div className="flex items-center gap-8">
            {[
              {
                num: schedules
                  .filter((s) => s.status === "booked")
                  .length.toString(),
                label: "Mendatang",
              },
              {
                num: schedules
                  .filter((s) => s.status === "completed")
                  .length.toString(),
                label: "Selesai",
              },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-2xl font-light text-white">
                  {s.num}
                </p>
                <p className="text-[0.62rem] tracking-[0.15em] uppercase text-white/40 mt-0.5">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Month tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8"
        >
          {months.map((m) => (
            <button
              key={m}
              onClick={() => setActive(m)}
              className={`px-4 py-2 rounded-full text-[0.7rem] tracking-[0.15em] uppercase transition-all duration-300 ${
                active === m
                  ? "bg-white text-[var(--green-deep)] font-medium"
                  : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-white"
              }`}
            >
              {m}
            </button>
          ))}
        </motion.div>

        {/* Event grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="group flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl p-4 hover:bg-white/10 hover:border-[var(--green-light)]/40 transition-all duration-300"
              >
                {/* Date badge */}
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white/10 flex flex-col items-center justify-center border border-white/10 group-hover:bg-[var(--green-main)] group-hover:border-[var(--green-main)] transition-all duration-300">
                  <span className="font-display text-xl font-light text-white leading-none">
                    {item.day}
                  </span>
                  <span className="text-[0.5rem] tracking-[0.15em] uppercase text-white/50 mt-0.5">
                    {item.monthShort}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="font-display text-[1rem] font-light text-white">
                      {item.event}
                    </h3>
                    <span
                      className={`text-[0.55rem] tracking-[0.1em] uppercase px-2 py-0.5 rounded-full ${typeConfig[item.type].color}`}
                    >
                      {typeConfig[item.type].label}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[0.75rem] text-white/40">
                    {item.location && (
                      <MapPin
                        size={11}
                        className="text-[var(--green-light)] flex-shrink-0"
                      />
                    )}
                    <span className="truncate">
                      {[
                        item.location,
                        item.collab && `Collab ${item.collab}`,
                        item.team && `Team ${item.team}`,
                      ]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </div>
                </div>

                {/* Status dot */}
                <div
                  className={`flex-shrink-0 flex items-center gap-1.5 text-[0.6rem] tracking-wider uppercase ${item.status === "completed" ? "text-white/20" : "text-white/50"}`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${item.status === "completed" ? "bg-white/20" : "bg-[var(--green-light)]"}`}
                  />
                  {item.status === "completed" ? "Completed" : "Booked"}
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Compact CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-2xl px-6 py-5"
        >
          <p className="text-[0.85rem] font-light text-white/60">
            Tanggal kamu belum ada?
          </p>
          <a
            href="https://wa.me/62882001901100"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full bg-white text-[var(--green-deep)] text-[0.7rem] tracking-widest uppercase hover:bg-[var(--green-light)] hover:text-white transition-all duration-300 font-medium flex-shrink-0"
          >
            Book Sekarang
          </a>
        </motion.div>
      </div>
    </section>
  );
}
