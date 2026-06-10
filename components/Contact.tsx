"use client";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";
import { useInView } from "./useInView";

const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-[15px] h-[15px]">
    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M11.99 0C5.374 0 0 5.373 0 11.99c0 2.12.555 4.107 1.524 5.832L.057 24l6.304-1.654A11.938 11.938 0 0011.99 24c6.617 0 11.99-5.373 11.99-11.99C23.98 5.373 18.607 0 11.99 0zm0 21.818a9.824 9.824 0 01-5.017-1.381l-.36-.214-3.733.979.997-3.645-.235-.374A9.826 9.826 0 012.165 11.99c0-5.42 4.407-9.826 9.826-9.826 5.42 0 9.826 4.407 9.826 9.826 0 5.42-4.406 9.828-9.827 9.828z"/>
  </svg>
);

type SiteSettings = {
  whatsapp?: string;
  email?: string;
  instagram?: string;
};

export default function Contact({ settings }: { settings?: SiteSettings }) {
  const { ref, inView } = useInView();
  const wa = settings?.whatsapp ?? "+62882001901100";
  const email = settings?.email ?? "hello@ourforevows.com";
  const ig = settings?.instagram ?? "ourforevows";
  const waLink = `https://wa.me/${wa.replace(/\D/g, "")}`;

  return (
    <section id="contact" className="py-28 px-[4vw] bg-[var(--cream)]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 28 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.9 }}
        className="max-w-2xl mx-auto text-center"
      >
        <p className="text-[0.72rem] tracking-[0.22em] uppercase text-[var(--green-main)] mb-4">Hubungi Kami</p>
        <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light text-[var(--text-dark)] leading-[1.2] mb-4">
          Ada momen yang mau<br />
          <em className="italic text-[var(--green-main)]">diabadiin?</em>
        </h2>
        <p className="text-[0.88rem] font-light text-[var(--text-mid)] leading-[1.9] mb-10 max-w-sm mx-auto">
          Langsung chat aja, kita ngobrol santai dulu soal momen kamu.
        </p>

        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 py-4 rounded-full text-[0.8rem] tracking-widest uppercase font-medium hover:bg-[#1ebe5d] hover:shadow-xl hover:shadow-[#25D366]/30 hover:-translate-y-0.5 transition-all duration-300"
        >
          <WaIcon />
          Chat WhatsApp
        </a>

        <div className="flex items-center justify-center gap-8 mt-12">
          {[
            { icon: <Phone size={14} />, text: wa, href: waLink },
            { icon: <Mail size={14} />, text: email, href: `mailto:${email}` },
            { icon: <IgIcon />, text: `@${ig.replace("@", "")}`, href: `https://instagram.com/${ig.replace("@", "")}` },
          ].map((item, i) => (
            <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-2 text-[0.78rem] text-[var(--text-light)] hover:text-[var(--green-main)] transition-colors duration-300">
              {item.icon}
              {item.text}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
