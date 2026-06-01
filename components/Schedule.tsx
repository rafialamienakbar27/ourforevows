"use client";
import { motion } from "framer-motion";
import { MapPin, Calendar } from "lucide-react";

type ScheduleItem = {
  id: number;
  date: string;
  day: number;
  month: string;
  monthShort: string;
  year: number;
  event: string;
  location: string;
  type: "akad" | "wedding" | "reception" | "prewedding" | "package";
};

const schedules: ScheduleItem[] = [
  { id: 1, date: "6 Juni 2026",   day: 6,  month: "Juni",      monthShort: "JUN", year: 2026, event: "Akad Nikah",                    location: "Villa Annisa, Ciparay",    type: "akad" },
  { id: 2, date: "6 Juni 2026",   day: 6,  month: "Juni",      monthShort: "JUN", year: 2026, event: "Intimate Wedding",               location: "Andir, Bandung",           type: "wedding" },
  { id: 3, date: "6 Juni 2026",   day: 6,  month: "Juni",      monthShort: "JUN", year: 2026, event: "Wedding Reception",              location: "Curug Sampireun",          type: "reception" },
  { id: 4, date: "7 Juni 2026",   day: 7,  month: "Juni",      monthShort: "JUN", year: 2026, event: "All Day Wedding",               location: "Cipatat, KBB",             type: "wedding" },
  { id: 5, date: "5 Juli 2026",   day: 5,  month: "Juli",      monthShort: "JUL", year: 2026, event: "Intimate Wedding",               location: "Villa Husna, Soreang",     type: "wedding" },
  { id: 6, date: "13 Sept 2026",  day: 13, month: "September", monthShort: "SEP", year: 2026, event: "Eternity Package",              location: "Batujajar, KBB",           type: "package" },
];

const typeConfig = {
  akad:       { label: "Akad Nikah",    color: "bg-[var(--green-main)] text-white" },
  wedding:    { label: "Wedding",       color: "bg-[var(--green-deep)] text-white" },
  reception:  { label: "Reception",     color: "bg-[var(--green-mid)] text-white" },
  prewedding: { label: "Pre-Wedding",   color: "bg-[var(--sage)] text-[var(--green-deep)]" },
  package:    { label: "Package",       color: "bg-[var(--cream-dark)] text-[var(--green-deep)]" },
};

// Group by month
const grouped = schedules.reduce<Record<string, ScheduleItem[]>>((acc, item) => {
  const key = `${item.month} ${item.year}`;
  if (!acc[key]) acc[key] = [];
  acc[key].push(item);
  return acc;
}, {});

export default function Schedule() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-40 pb-24 px-[4vw] bg-[var(--green-deep)] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=50&auto=format&fit=crop"
          alt="" aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-luminosity pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--green-deep)] via-[var(--green-deep)]/90 to-[var(--green-deep)] pointer-events-none" />
        <div className="absolute -right-32 top-0 w-96 h-96 rounded-full border border-white/5 pointer-events-none" />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <p className="text-[0.7rem] tracking-[0.28em] uppercase text-[var(--green-light)] mb-4">Our Forevows</p>
            <h1 className="font-display text-[clamp(2.8rem,6vw,5rem)] font-light text-white leading-[1.1] mb-5">
              Jadwal <em className="italic text-[var(--green-light)]">Kami</em>
            </h1>
            <p className="text-[0.92rem] font-light text-white/55 leading-[1.9] max-w-lg mx-auto">
              Berikut adalah jadwal yang sudah terisi. Untuk tanggal lainnya, kami siap hadir di hari spesial Anda.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex items-center justify-center gap-8 mt-12"
          >
            {[
              { num: schedules.length.toString(), label: "Jadwal Mendatang" },
              { num: "200+", label: "Pasangan Bahagia" },
              { num: "Terbuka", label: "Untuk Booking Baru" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <p className="font-display text-2xl font-light text-white">{s.num}</p>
                <p className="text-[0.65rem] tracking-[0.15em] uppercase text-white/40 mt-0.5">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Schedule */}
      <section className="py-24 px-[4vw] bg-[var(--cream)] min-h-screen">
        <div className="max-w-3xl mx-auto">

          {Object.entries(grouped).map(([monthYear, items], groupIdx) => (
            <div key={monthYear} className="mb-16 last:mb-0">
              {/* Month header */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="flex items-center gap-4 mb-8"
              >
                <div className="w-10 h-10 rounded-full bg-[var(--green-main)] flex items-center justify-center flex-shrink-0">
                  <Calendar size={16} className="text-white" />
                </div>
                <h2 className="font-display text-2xl font-light text-[var(--text-dark)]">{monthYear}</h2>
                <div className="flex-1 h-px bg-[var(--beige)]" />
                <span className="text-[0.65rem] tracking-widest uppercase text-[var(--text-light)]">
                  {items.length} event
                </span>
              </motion.div>

              {/* Items */}
              <div className="space-y-4">
                {items.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    className="group flex items-center gap-5 bg-white border border-[var(--beige)] rounded-2xl p-5 hover:border-[var(--green-light)]/50 hover:shadow-lg hover:shadow-black/5 transition-all duration-400"
                  >
                    {/* Date badge */}
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl bg-[var(--sage-light)] flex flex-col items-center justify-center border border-[var(--beige)] group-hover:bg-[var(--green-main)] group-hover:border-[var(--green-main)] transition-all duration-400">
                      <span className="font-display text-2xl font-light text-[var(--green-main)] leading-none group-hover:text-white transition-colors duration-400">
                        {item.day}
                      </span>
                      <span className="text-[0.55rem] tracking-[0.15em] uppercase text-[var(--text-light)] group-hover:text-white/70 transition-colors duration-400 mt-0.5">
                        {item.monthShort}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <h3 className="font-display text-lg font-light text-[var(--text-dark)]">{item.event}</h3>
                        <span className={`text-[0.58rem] tracking-[0.12em] uppercase px-2.5 py-0.5 rounded-full ${typeConfig[item.type].color}`}>
                          {typeConfig[item.type].label}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[0.8rem] text-[var(--text-light)]">
                        <MapPin size={12} className="text-[var(--green-main)] flex-shrink-0" />
                        <span>{item.location}</span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex-shrink-0 flex items-center gap-1.5 text-[0.65rem] tracking-wider uppercase text-[var(--text-light)]">
                      <span className="w-2 h-2 rounded-full bg-[var(--green-main)] opacity-60" />
                      Booked
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mt-16 bg-[var(--green-deep)] rounded-3xl p-10 md:p-14 text-center relative overflow-hidden"
          >
            <div className="absolute -right-16 -top-16 w-64 h-64 rounded-full border border-white/5 pointer-events-none" />
            <div className="absolute -left-10 -bottom-10 w-40 h-40 rounded-full border border-white/5 pointer-events-none" />

            <p className="text-[0.68rem] tracking-[0.22em] uppercase text-[var(--green-light)] mb-4 relative z-10">Masih Ada Slot Tersedia</p>
            <h3 className="font-display text-[clamp(1.6rem,3vw,2.4rem)] font-light text-white leading-[1.2] mb-4 relative z-10">
              Tanggal Anda belum ada di sini?
            </h3>
            <p className="text-[0.88rem] text-white/55 font-light leading-[1.9] max-w-sm mx-auto mb-8 relative z-10">
              Kami masih menerima booking untuk berbagai tanggal. Hubungi kami sekarang untuk cek ketersediaan.
            </p>
            <div className="flex flex-wrap gap-3 justify-center relative z-10">
              <a
                href="/#contact"
                className="px-8 py-3.5 rounded-full bg-white text-[var(--green-deep)] text-[0.75rem] tracking-widest uppercase hover:bg-[var(--green-light)] hover:text-white transition-all duration-300 hover:-translate-y-0.5 font-medium"
              >
                Book Sekarang
              </a>
              <a
                href={`https://wa.me/6282200190100`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3.5 rounded-full border border-white/25 text-white text-[0.75rem] tracking-widest uppercase hover:border-white/50 transition-all duration-300 hover:-translate-y-0.5"
              >
                Chat WhatsApp
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
