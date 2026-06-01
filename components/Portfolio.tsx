"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { useInView } from "./useInView";
import VideoModal from "./VideoModal";

type Category = "all" | "film" | "pre" | "social" | "video";

type PortfolioItem = {
  _id?: string;
  id?: number;
  cat: Category;
  name: string;
  loc: string;
  tag: string;
  span?: string;
  bg?: string;
  accent?: string;
  mediaType?: "image" | "video";
  videoUrl?: string;
  coverImageUrl?: string;
};

const defaultItems: PortfolioItem[] = [
  { id: 1, cat: "film",   name: "Rina & Dimas",  loc: "Bali, 2024",       tag: "Wedding Film",    span: "",           bg: "#D4DFD0", accent: "#2D6A2D", coverImageUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80&auto=format&fit=crop" },
  { id: 2, cat: "pre",    name: "Sarah & Arief", loc: "Lombok, 2024",     tag: "Pre-Wedding",     span: "row-span-2", bg: "#E0E8DB", accent: "#2D6A2D", coverImageUrl: "https://images.unsplash.com/photo-1591604021695-0c69b7c05981?w=800&q=80&auto=format&fit=crop" },
  { id: 3, cat: "social", name: "Putri & Reza",  loc: "Yogyakarta, 2024", tag: "Social Content",  span: "",           bg: "#C8D8C2", accent: "#1A4A1A", coverImageUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80&auto=format&fit=crop" },
  { id: 4, cat: "film",   name: "Dewi & Hendri", loc: "Jakarta, 2023",    tag: "Wedding Film",    span: "",           bg: "#BFD0B8", accent: "#2D6A2D", coverImageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80&auto=format&fit=crop" },
  { id: 5, cat: "pre",    name: "Nadia & Fajar", loc: "Flores, 2024",     tag: "Pre-Wedding",     span: "col-span-2", bg: "#D4DFD0", accent: "#1A4A1A", coverImageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80&auto=format&fit=crop" },
];

const videoItems: PortfolioItem[] = [
  { id: 6, cat: "video", name: "Contoh Film 1",  loc: "Our Forevows",  tag: "Wedding Film",   span: "",           bg: "#1A4A1A", accent: "#7AB87A", mediaType: "video", videoUrl: "/videos/contoh-1.mp4", coverImageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80&auto=format&fit=crop" },
  { id: 7, cat: "video", name: "Contoh Film 2",  loc: "Our Forevows",  tag: "Wedding Film",   span: "row-span-2", bg: "#2D6A2D", accent: "#C8D8C2", mediaType: "video", videoUrl: "/videos/contoh-2.mov", coverImageUrl: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=800&q=80&auto=format&fit=crop" },
  { id: 8, cat: "video", name: "Contoh Film 3",  loc: "Our Forevows",  tag: "Pre-Wedding",    span: "",           bg: "#1A4A1A", accent: "#7AB87A", mediaType: "video", videoUrl: "/videos/contoh-3.mov", coverImageUrl: "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=800&q=80&auto=format&fit=crop" },
];

const filters: { label: string; value: Category }[] = [
  { label: "Semua",        value: "all" },
  { label: "Wedding Film", value: "film" },
  { label: "Pre-Wedding",  value: "pre" },
  { label: "Social Content", value: "social" },
  { label: "Video",        value: "video" },
];

function PlaceholderSvg({ id, bg, accent, span }: { id: number; bg: string; accent: string; span?: string }) {
  const wide = span === "col-span-2";
  const viewBox = wide ? "0 0 800 300" : "0 0 400 300";
  return (
    <svg viewBox={viewBox} className="w-full h-full absolute inset-0" style={{ background: bg }} fill="none">
      {id === 1 && <path d="M200 150 C180 120 150 105 145 80 C140 55 165 35 180 50 C190 58 195 75 200 80 C205 75 210 58 220 50 C235 35 260 55 255 80 C250 105 220 120 200 150Z" stroke={accent} strokeWidth="1.5" fill={accent} fillOpacity="0.12"/>}
      {id === 2 && <><circle cx="200" cy="200" r="80" stroke={accent} strokeWidth="1.2" fill="none"/><path d="M160 150 C160 120 185 100 200 105 C215 100 240 120 240 150" stroke={accent} strokeWidth="1"/></>}
      {id === 3 && <path d="M120 150 C120 110 150 85 185 90 C205 93 215 108 200 120 C215 108 235 103 248 115 C265 130 260 155 245 165" stroke={accent} strokeWidth="1.2" fill={accent} fillOpacity="0.1"/>}
      {id === 4 && <><path d="M200 80 C170 95 140 120 135 150 C130 180 150 200 165 215" stroke={accent} strokeWidth="1.5"/><path d="M200 130 C178 115 160 100 168 78 C176 56 198 65 200 83" stroke={accent} strokeWidth="1"/><path d="M200 130 C222 115 240 100 232 78 C224 56 202 65 200 83" stroke={accent} strokeWidth="1"/></>}
      {id === 5 && <><path d="M300 150 C280 120 250 105 240 80 C230 55 255 35 275 50 C285 58 290 75 300 80 C310 75 315 58 325 50 C345 35 370 55 360 80 C350 105 320 120 300 150Z" stroke={accent} strokeWidth="1.5" fill={accent} fillOpacity="0.12"/><path d="M500 150 C480 120 450 105 440 80 C430 55 455 35 475 50 C485 58 490 75 500 80 C510 75 515 58 525 50 C545 35 570 55 560 80 C550 105 520 120 500 150Z" stroke={accent} strokeWidth="1.5" fill={accent} fillOpacity="0.12"/><path d="M300 150 L500 150" stroke={accent} strokeWidth="0.8" strokeDasharray="5 5"/></>}
    </svg>
  );
}

function PortfolioCard({ item, onPlay }: { item: PortfolioItem; onPlay?: (item: PortfolioItem) => void }) {
  const { ref, inView } = useInView();
  const isVideo = item.mediaType === "video";
  const bg = item.bg ?? "#D4DFD0";
  const accent = item.accent ?? "#2D6A2D";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative overflow-hidden rounded cursor-pointer ${item.span ?? ""}`}
      style={{ minHeight: 240 }}
      onClick={() => isVideo && onPlay?.(item)}
    >
      {/* Cover or placeholder */}
      {item.coverImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.coverImageUrl} alt={item.name} className="w-full h-full absolute inset-0 object-cover" />
      ) : (
        <PlaceholderSvg id={item.id ?? 1} bg={bg} accent={accent} span={item.span} />
      )}

      {/* Video play button */}
      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Play size={24} className="text-white ml-1" fill="white" />
          </div>
        </div>
      )}

      {/* Hover overlay */}
      <div className={`absolute inset-0 bg-gradient-to-t from-[#1A4A1A]/75 to-transparent transition-opacity duration-400 flex flex-col justify-end p-6 ${isVideo ? "opacity-60 group-hover:opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
        <span className="text-[0.62rem] tracking-[0.15em] uppercase text-white/70 mb-1">{item.tag}</span>
        <h4 className="font-display text-2xl font-light text-white leading-tight">{item.name}</h4>
        <p className="text-[0.72rem] text-white/65 mt-1">{item.loc}</p>
        {isVideo && <p className="text-[0.65rem] text-white/50 mt-2 tracking-wider uppercase">Klik untuk putar ▶</p>}
      </div>
    </motion.div>
  );
}

export default function Portfolio({ data }: { data?: PortfolioItem[] }) {
  const [active, setActive] = useState<Category>("all");
  const [playing, setPlaying] = useState<PortfolioItem | null>(null);
  const { ref, inView } = useInView();

  const allItems: PortfolioItem[] = data && data.length > 0
    ? data
    : [...defaultItems, ...videoItems];

  const filtered = allItems.filter(i => active === "all" || i.cat === active);

  return (
    <section id="portfolio" className="py-28 px-[4vw] bg-[var(--cream)]">
      <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.9 }} className="max-w-6xl mx-auto">
        <div className="mb-10">
          <p className="text-[0.72rem] tracking-[0.22em] uppercase text-[var(--green-main)] mb-3">Karya Kami</p>
          <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.8rem)] font-light text-[var(--text-dark)] leading-[1.2]">
            Kisah-kisah yang kami abadikan
          </h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`text-[0.72rem] tracking-widest uppercase px-5 py-2 rounded-full border transition-all duration-300
                ${active === f.value ? "bg-[var(--green-main)] border-[var(--green-main)] text-white" : "border-[var(--beige)] text-[var(--text-mid)] hover:border-[var(--green-main)] hover:text-[var(--green-main)]"}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[260px] gap-3"
          >
            {filtered.map(item => (
              <PortfolioCard
                key={item._id ?? item.id}
                item={item}
                onPlay={setPlaying}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-12">
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
            className="inline-flex px-9 py-3.5 rounded-full bg-[var(--green-main)] text-white text-[0.78rem] tracking-widest uppercase hover:bg-[var(--green-deep)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-900/25"
          >
            Lihat Semua Karya
          </a>
        </div>
      </motion.div>

      {/* Video Modal */}
      {playing && (
        <VideoModal
          src={playing.videoUrl!}
          title={playing.name}
          onClose={() => setPlaying(null)}
        />
      )}
    </section>
  );
}
