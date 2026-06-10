"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";
import { useInView } from "./useInView";
import VideoModal from "./VideoModal";

type Category = "all" | "proposal" | "birthday" | "wedding" | "allevent";

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

const videoItems: PortfolioItem[] = [
  {
    id: 6,
    cat: "wedding",
    mediaType: "video",
    name: "Calsa & Rafi",
    loc: "Bali, 2024",
    tag: "Wedding",
    videoUrl: "/videos/contoh-1.mp4",
    coverImageUrl:
      "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=85&auto=format&fit=crop",
  },
  {
    id: 7,
    cat: "wedding",
    mediaType: "video",
    featured: true,
    name: "Ratih & Ilyas",
    loc: "Lombok, 2024",
    tag: "Wedding",
    videoUrl: "/videos/contoh-2.mov",
    coverImageUrl:
      "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=1200&q=85&auto=format&fit=crop",
  },
  {
    id: 8,
    cat: "proposal",
    mediaType: "video",
    name: "Sri & Gigin",
    loc: "Yogyakarta, 2024",
    tag: "Proposal",
    videoUrl: "/videos/contoh-3.mov",
    coverImageUrl:
      "https://images.unsplash.com/photo-1502635385003-ee1e6a1a742d?w=800&q=85&auto=format&fit=crop",
  },
];

const filters: { label: string; value: Category }[] = [
  { label: "Semua", value: "all" },
  { label: "Proposal", value: "proposal" },
  { label: "Birthday", value: "birthday" },
  { label: "Wedding", value: "wedding" },
  { label: "All Event", value: "allevent" },
];

function PortfolioCard({
  item,
  index,
  onPlay,
}: {
  item: PortfolioItem;
  index: number;
  onPlay?: (item: PortfolioItem) => void;
}) {
  const { ref, inView } = useInView();
  const isVideo = item.mediaType === "video";
  const isFeatured = item.featured;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: (index % 3) * 0.07,
      }}
      className="group relative rounded-2xl overflow-hidden cursor-pointer col-span-1"
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
        <span className="text-[0.6rem] tracking-[0.18em] uppercase text-white/60 mb-1 block">
          {item.tag}
        </span>
        <h4 className="font-display text-xl font-light text-white leading-tight">
          {item.name}
        </h4>
        <div className="flex items-center justify-between mt-1">
          <p className="text-[0.7rem] text-white/55">{item.loc}</p>
          {isVideo && (
            <span className="text-[0.6rem] tracking-widest uppercase text-white/50 group-hover:text-white/80 transition-colors">
              Putar ▶
            </span>
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

  const allItems: PortfolioItem[] = data && data.length > 0 ? data : videoItems;

  const filtered = allItems.filter((i) => active === "all" || i.cat === active);

  return (
    <section id="portfolio" className="py-28 px-[4vw] bg-[var(--cream)]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="max-w-6xl mx-auto"
      >
        <p className="text-[0.72rem] tracking-[0.22em] uppercase text-[var(--green-main)] mb-6">
          PORTFOLIO
        </p>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={`text-[0.7rem] tracking-widest uppercase px-5 py-2 rounded-full border transition-all duration-300
                ${
                  active === f.value
                    ? "bg-[var(--green-main)] border-[var(--green-main)] text-white"
                    : "border-[var(--beige)] text-[var(--text-mid)] hover:border-[var(--green-main)] hover:text-[var(--green-main)]"
                }`}
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
      </motion.div>

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
