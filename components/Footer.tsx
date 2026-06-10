import { Camera } from "lucide-react";

type SiteSettings = {
  whatsapp?: string;
  email?: string;
  instagram?: string;
  tiktok?: string;
};

const WA_LINK = "https://wa.me/62882001901100";

const footerLinks = {
  Layanan: ["Proposal", "Birthday", "Wedding", "All Event"],
  "Area Liputan": ["Bandung", "KBB", "Cimahi", "Sumedang"],
};

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Schedule", href: "#schedule" },
  { label: "Book Us", href: WA_LINK, external: true },
];

export default function Footer({ settings }: { settings?: SiteSettings }) {
  const ig = settings?.instagram ?? "ourforevows";
  const tt = settings?.tiktok ?? "ourforevows";

  return (
    <footer className="bg-[var(--text-dark)] text-white px-[4vw] pt-20 pb-8">
      <div className="max-w-6xl mx-auto">
        {/* Top */}
        <div className="grid md:grid-cols-[1.2fr_2fr] gap-16 pb-16 border-b border-white/10">
          {/* Brand */}
          <div>
            <div className="font-display text-3xl mb-4 flex gap-1">
              <span className="font-medium">Our</span>
              <em className="italic font-light text-[var(--green-light)]">
                Forevows
              </em>
            </div>
            <p className="text-[0.85rem] font-light text-white/50 leading-[1.85] mb-6 max-w-[280px]">
              Lebih dari sekadar dokumentasi, kami menciptakan cerita visual
              yang menangkap esensi setiap momen, emosi, dan perayaan yang
              berarti.{" "}
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                {
                  label: "Instagram",
                  href: `https://instagram.com/${ig}`,
                  icon: <Camera size={16} />,
                },
                {
                  label: "TikTok",
                  href: `https://tiktok.com/@${tt}`,
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                      <path
                        d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/55 hover:border-[var(--green-light)] hover:text-[var(--green-light)] transition-all hover:-translate-y-0.5"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {/* Nav links column */}
            <div>
              <h5 className="text-[0.68rem] tracking-[0.18em] uppercase text-white/35 mb-5">
                Menu
              </h5>
              <ul className="flex flex-col gap-3">
                {navLinks.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className={`text-[0.84rem] font-light transition-colors ${
                        l.label === "Book Us"
                          ? "text-[var(--green-light)] hover:text-white"
                          : "text-white/55 hover:text-white"
                      }`}
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Layanan & Area Liputan */}
            {Object.entries(footerLinks).map(([heading, items]) => (
              <div key={heading}>
                <h5 className="text-[0.68rem] tracking-[0.18em] uppercase text-white/35 mb-5">
                  {heading}
                </h5>
                <ul className="flex flex-col gap-3">
                  {items.map((item) => (
                    <li key={item}>
                      <span className="text-[0.84rem] font-light text-white/55">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-wrap justify-between items-center pt-6 gap-3 text-[0.73rem] font-light text-white/28">
          <p>© 2026 Our Forevows. Dibuat dengan ♥ untuk setiap pasangan.</p>
          <p>Privasi · Syarat &amp; Ketentuan</p>
        </div>
      </div>
    </footer>
  );
}
