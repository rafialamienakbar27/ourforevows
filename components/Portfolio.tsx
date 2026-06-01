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
  featured?: boolean;
  mediaType?: "image" | "video";
  videoUrl?: string;
  coverImageUrl?: string;
};

const defaultItems: PortfolioItem[] = [
  {
    id: 1, cat: "film", featured: true,
    name: "Rina & Dimas", loc: "Bali, 2024", tag: "Wedding Film",
    coverImageUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: 2, cat: "pre",
    name: "Sarah & Arief", loc: "Lombok, 2024", tag: "Pre-Wedding",
    coverImageUrl: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: 3, cat: "social",
    name: "Putri & Reza", loc: "Yogyakarta, 2024", tag: "Social Content",
    coverImageUrl: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: 4, cat: "film",
    name: "Dewi & Hendri", loc: "Jakarta, 2023", tag: "Wedding Film",
    coverImageUrl: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: 5, cat: "pre",
    name: "Nadia & Fajar", loc: "Flores, 2024", tag: "Pre-Wedding",
    coverImageUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=1200&q=85&auto=format&fit=crop",
  },
];

const videoItems: PortfolioItem[] = [
  {
    id: 6, cat: "video", mediaType: "video",
    name: "Calsa & Rafi", loc: "Bali, 2024", tag: "Wedding Film",
    videoUrl: "/videos/contoh-1.mp4",
    coverImageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: 7, cat: "video", mediaType: "video", featured: true,
    name: "Ratih & Ilyas", loc: "Lombok, 2024", tag: "Wedding Film",
    videoUrl: "/videos/contoh-2.mov",
    coverImageUrl: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: 8, cat: "video", mediaType: "video",
    name: "Sri & Gigin", loc: "Yogyakarta, 2024", tag: "Pre-Wedding",
    videoUrl: "/videos/contoh-3.mov",
    coverImageUrl: "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=800&q=85&auto=format&fit=crop",
  },
];

const filters: { label: string; value: Category }[] = [
  { label: "Semua",          value: "all" },
  { label: "Wedding Film",   value: "film" },
  { label: "Pre-Wedding",    value: "pre" },
  { label: "Social Content", value: "social" },
  { label: "Video",          value: "video" },
];

function PortfolioCard({
  item, index, onPlay,
}: {
  item: PortfolioItem; index: number; onPlay?: (item: PortfolioItem) => void;
}) {
  const { ref, inView } = useInView();
  const isVideo = item.mediaType === "video";
  const isFeatured = item.featured;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: (index % 3) * 0.07 }}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer
        ${isFeatured ? "col-span-2" : "col-span-1"}`}
      onClick={() => isVideo && onPlay?.(item)}
    >
      {/* Image */}
      {item.coverImageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.coverImageUrl}
          alt={item.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        <div className="absolute inset-0 bg-[var(--sage)]" />
      )}

      {/* Always-on gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

      {/* Video play button */}
      {isVideo && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm border border-white/40 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-300">
            <Play size={20} className="text-white ml-1" fill="white" />
          </div>
        </div>
      )}

      {/* Bottom info — always visible */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="text-[0.6rem] tracking-[0.18em] uppercase text-white/60 mb-1 block">{item.tag}</span>
        <h4 className="font-display text-xl font-light text-white leading-tight">{item.name}</h4>
        <div className="flex items-center justify-between mt-1">
          <p className="text-[0.7rem] text-white/55">{item.loc}</p>
          {isVideo && (
            <span className="text-[0.6rem] tracking-widest uppercase text-white/50 group-hover:text-white/80 transition-colors">Putar ▶</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function Portfolio({ data }: { data?: PortfolioItem[] }) {
  const [active, setActive] = useState<Category>("all");
  const [playing, setPlaying] = useState<PortfolioItem | null>(null);
  const { ref, inView } = useInView();

  const allItems: PortfolioItem[] =
    data && data.length > 0 ? data : [...defaultItems, ...videoItems];

  const filtered = allItems.filter(i => active === "all" || i.cat === active);

  return (
    <section id="portfolio" className="py-28 px-[4vw] bg-[var(--cream)]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="max-w-6xl mx-auto"
      >
        {/* Header */}
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
              className={`text-[0.7rem] tracking-widest uppercase px-5 py-2 rounded-full border transition-all duration-300
                ${active === f.value
                  ? "bg-[var(--green-main)] border-[var(--green-main)] text-white"
                  : "border-[var(--beige)] text-[var(--text-mid)] hover:border-[var(--green-main)] hover:text-[var(--green-main)]"}`}
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
            transition={{ duration: 0.35 }}
            className="grid grid-cols-2 lg:grid-cols-3 gap-3 auto-rows-[280px] sm:auto-rows-[300px]"
          >
            {filtered.map((item, idx) => (
              <PortfolioCard
                key={item._id ?? item.id}
                item={item}
                index={idx}
                onPlay={setPlaying}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
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

      {playing && (
        <VideoModal src={playing.videoUrl!} title={playing.name} onClose={() => setPlaying(null)} />
      )}
    </section>
  );
}
