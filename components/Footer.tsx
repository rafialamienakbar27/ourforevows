import { Camera } from "lucide-react";

type SiteSettings = {
  whatsapp?: string;
  email?: string;
  instagram?: string;
  tiktok?: string;
  youtube?: string;
};

const footerLinks = {
  Layanan: ["Wedding Film", "Pre-Wedding", "Social Content", "Highlight Reel", "Custom Package"],
  Perusahaan: ["Tentang Kami", "Portfolio", "Testimoni", "Kontak"],
  "Area Liputan": ["Jakarta & Sekitarnya", "Bali", "Yogyakarta", "Surabaya", "Lainnya"],
};

export default function Footer({ settings }: { settings?: SiteSettings }) {
  const ig = settings?.instagram ?? "ourforevows";
  const tt = settings?.tiktok ?? "ourforevows";
  const yt = settings?.youtube ?? "ourforevows";

  return (
    <footer className="bg-[var(--text-dark)] text-white px-[4vw] pt-20 pb-8">
      <div className="max-w-6xl mx-auto">

        {/* Top */}
        <div className="grid md:grid-cols-[1.2fr_2fr] gap-16 pb-16 border-b border-white/10">

          {/* Brand */}
          <div>
            <div className="font-display text-3xl mb-4 flex gap-1">
              <span className="font-medium">Our</span>
              <em className="italic font-light text-[var(--green-light)]">Forevows</em>
            </div>
            <p className="text-[0.85rem] font-light text-white/50 leading-[1.85] mb-6 max-w-[280px]">
              Mengabadikan setiap momen berharga dalam kisah cinta Anda — dengan keindahan, ketulusan, dan cinta.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { label: "Instagram", href: `https://instagram.com/${ig}`, icon: <Camera size={16} /> },
                {
                  label: "TikTok", href: `https://tiktok.com/@${tt}`,
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ),
                },
                {
                  label: "YouTube", href: `https://youtube.com/@${yt}`,
                  icon: (
                    <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
                      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.54C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 001.95-1.96A29 29 0 0023 12a29 29 0 00-.46-5.58z" stroke="currentColor" strokeWidth="1.5"/>
                      <polygon points="9.75,15.02 15.5,12 9.75,8.98" stroke="currentColor" strokeWidth="1.5"/>
                    </svg>
                  ),
                },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/55 hover:border-[var(--green-light)] hover:text-[var(--green-light)] transition-all hover:-translate-y-0.5">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {Object.entries(footerLinks).map(([heading, items]) => (
              <div key={heading}>
                <h5 className="text-[0.68rem] tracking-[0.18em] uppercase text-white/35 mb-5">{heading}</h5>
                <ul className="flex flex-col gap-3">
                  {items.map(item => (
                    <li key={item}>
                      <a href="#" className="text-[0.84rem] font-light text-white/55 hover:text-white transition-colors">
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-wrap justify-between items-center pt-6 gap-3 text-[0.73rem] font-light text-white/28">
          <p>© 2025 Our Forevows. Dibuat dengan ♥ untuk setiap pasangan.</p>
          <p>Privasi · Syarat &amp; Ketentuan</p>
        </div>
      </div>
    </footer>
  );
}
