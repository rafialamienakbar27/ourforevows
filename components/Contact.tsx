"use client";
import { useActionState, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Mail } from "lucide-react";

const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="w-[15px] h-[15px]">
    <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
  </svg>
);
import { useInView } from "./useInView";
import { submitBooking } from "@/app/actions";

type SiteSettings = {
  whatsapp?: string;
  email?: string;
  instagram?: string;
};

const initialState = { success: false, error: undefined as string | undefined, affiliateName: undefined as string | undefined };

export default function Contact({ settings }: { settings?: SiteSettings }) {
  const [state, action, isPending] = useActionState(submitBooking, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { ref, inView } = useInView();

  const wa = settings?.whatsapp ?? "+62882001901100";
  const email = settings?.email ?? "hello@ourforevows.com";
  const ig = settings?.instagram ?? "ourforevows";
  const waLink = `https://wa.me/${wa.replace(/\D/g, "")}`;

  return (
    <section id="contact" className="bg-[var(--cream)]">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-[2fr_3fr] min-h-[700px]">

        {/* Left — dark photo panel */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9 }}
          className="relative flex flex-col justify-between p-12 lg:p-16 bg-[var(--green-deep)] overflow-hidden"
        >
          {/* Background photo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=900&q=80&auto=format&fit=crop"
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-luminosity"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[var(--green-deep)]/60 via-transparent to-[var(--green-deep)]/80" />

          {/* Decorative circles */}
          <div className="absolute -right-20 -top-20 w-72 h-72 rounded-full border border-white/5 pointer-events-none" />
          <div className="absolute -left-10 -bottom-10 w-48 h-48 rounded-full border border-white/5 pointer-events-none" />

          {/* Top content */}
          <div className="relative z-10">
            <p className="text-[0.68rem] tracking-[0.25em] uppercase text-[var(--green-light)] mb-4">Hubungi Kami</p>
            <h2 className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-light text-white leading-[1.2] mb-4">
              Mari kita mulai kisah indah Anda
            </h2>
            <p className="text-[0.88rem] font-light text-white/55 leading-[1.9] max-w-xs">
              Ceritakan kepada kami tentang pernikahan impian Anda, dan kami akan merancang paket yang sempurna.
            </p>
          </div>

          {/* Contact details */}
          <div className="relative z-10 space-y-4 my-10">
            {[
              { icon: <Phone size={15} />, text: wa, href: waLink },
              { icon: <Mail size={15} />, text: email, href: `mailto:${email}` },
              { icon: <IgIcon />, text: `@${ig.replace("@", "")}`, href: `https://instagram.com/${ig.replace("@","")}` },
            ].map((item, i) => (
              <a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3.5 text-[0.85rem] text-white/60 hover:text-white transition-colors duration-300 group">
                <span className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-[var(--green-light)] group-hover:border-[var(--green-light)]/50 transition-colors flex-shrink-0">
                  {item.icon}
                </span>
                {item.text}
              </a>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <a href={waLink} target="_blank" rel="noopener noreferrer"
            className="relative z-10 inline-flex items-center gap-3 border border-white/20 hover:border-white/40 rounded-full px-6 py-3 text-white/80 hover:text-white text-[0.75rem] tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 w-fit">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[var(--green-light)]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
              <path d="M11.99 0C5.374 0 0 5.373 0 11.99c0 2.12.555 4.107 1.524 5.832L.057 24l6.304-1.654A11.938 11.938 0 0011.99 24c6.617 0 11.99-5.373 11.99-11.99C23.98 5.373 18.607 0 11.99 0zm0 21.818a9.824 9.824 0 01-5.017-1.381l-.36-.214-3.733.979.997-3.645-.235-.374A9.826 9.826 0 012.165 11.99c0-5.42 4.407-9.826 9.826-9.826 5.42 0 9.826 4.407 9.826 9.826 0 5.42-4.406 9.828-9.827 9.828z"/>
            </svg>
            Chat WhatsApp
          </a>
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.12 }}
          className="flex flex-col justify-center p-10 lg:p-16 bg-white"
        >
          {state.success ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[var(--sage-light)] flex items-center justify-center mx-auto mb-6">
                <svg viewBox="0 0 24 24" fill="none" className="w-7 h-7 text-[var(--green-main)]" stroke="currentColor" strokeWidth="1.5">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              </div>
              <p className="font-display text-3xl font-light text-[var(--green-main)] mb-3">Pesan Terkirim! ✦</p>
              <p className="text-[0.9rem] text-[var(--text-mid)] leading-relaxed mb-4">
                Terima kasih telah menghubungi Our Forevows.<br />
                Kami akan segera merespons dalam 1×24 jam.
              </p>
              {state.affiliateName && (
                <div className="inline-flex items-center gap-2 bg-[var(--sage-light)] rounded-full px-5 py-2.5 text-[0.78rem] text-[var(--green-deep)] mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 flex-shrink-0">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                  </svg>
                  Referral dari <strong className="ml-1">{state.affiliateName}</strong> berhasil dicatat ✓
                </div>
              )}
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                className="block text-[0.8rem] text-[var(--green-main)] hover:underline">
                Atau langsung WhatsApp: <strong>{wa}</strong>
              </a>
            </div>
          ) : (
            <>
              <div className="mb-8">
                <h3 className="font-display text-2xl font-light text-[var(--text-dark)] mb-1">Booking Konsultasi</h3>
                <p className="text-[0.82rem] text-[var(--text-light)]">Isi form di bawah dan kami akan menghubungi Anda segera.</p>
              </div>

              {state.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-[0.82rem] rounded-xl px-4 py-3 mb-5">
                  {state.error}
                </div>
              )}

              <form ref={formRef} action={action} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-3">
                  <Field name="namaMempelai" label="Nama Anda *"    type="text"  placeholder="Nama lengkap" required />
                  <Field name="namaPasangan" label="Nama Pasangan"  type="text"  placeholder="Nama lengkap" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field name="email"    label="Email *"        type="email" placeholder="email@contoh.com" required />
                  <Field name="whatsapp" label="WhatsApp *"     type="tel"   placeholder="08 ..." required />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field name="tanggalNikah" label="Tanggal Pernikahan" type="date" />
                  <Field name="lokasi"       label="Kota / Lokasi"      type="text" placeholder="Contoh: Bali" />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.67rem] tracking-[0.15em] uppercase text-[var(--text-light)] font-medium">Layanan yang Diminati</label>
                  <select name="layanan"
                    className="text-[0.88rem] text-[var(--text-dark)] bg-[var(--sage-light)] border border-transparent rounded-xl px-4 py-3 outline-none focus:border-[var(--green-main)] focus:bg-white transition-all appearance-none">
                    <option value="">Pilih layanan...</option>
                    <option>Wedding Film</option>
                    <option>Pre-Wedding Session</option>
                    <option>Social Media Content</option>
                    <option>Highlight Reel</option>
                    <option>Intimate Coverage</option>
                    <option>Custom Package</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[0.67rem] tracking-[0.15em] uppercase text-[var(--text-light)] font-medium">Ceritakan Pernikahan Anda</label>
                  <textarea name="cerita" rows={3}
                    placeholder="Lokasi, tema, jumlah tamu, keinginan khusus..."
                    className="text-[0.88rem] text-[var(--text-dark)] bg-[var(--sage-light)] border border-transparent rounded-xl px-4 py-3 outline-none focus:border-[var(--green-main)] focus:bg-white transition-all resize-none placeholder:text-[var(--text-light)]"
                  />
                </div>

                {/* Referral Code */}
                <div className="flex flex-col gap-1.5 border-t border-[var(--beige)] pt-4">
                  <label className="text-[0.67rem] tracking-[0.15em] uppercase text-[var(--text-light)] font-medium flex items-center gap-1.5">
                    Kode Referral
                    <span className="text-[0.6rem] normal-case tracking-normal text-[var(--text-light)]/60 font-normal">(opsional)</span>
                  </label>
                  <input
                    name="kodeReferral"
                    type="text"
                    placeholder="Masukkan kode referral jika ada..."
                    className="text-[0.88rem] text-[var(--text-dark)] bg-[var(--sage-light)] border border-transparent rounded-xl px-4 py-3 outline-none focus:border-[var(--green-main)] focus:bg-white transition-all placeholder:text-[var(--text-light)] uppercase"
                    style={{ textTransform: 'uppercase' }}
                    maxLength={20}
                  />
                  <p className="text-[0.65rem] text-[var(--text-light)]/70 leading-relaxed">
                    Punya kode dari teman atau partner? Masukkan di sini — mereka akan dapat komisi otomatis.
                  </p>
                </div>

                <button type="submit" disabled={isPending}
                  className="mt-1 w-full py-4 rounded-xl bg-[var(--green-main)] text-white text-[0.78rem] tracking-widest uppercase hover:bg-[var(--green-deep)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-900/20 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0 font-medium">
                  {isPending ? "Mengirim..." : "Kirim Pesan ✦"}
                </button>

                <p className="text-[0.7rem] text-[var(--text-light)] text-center mt-1">
                  Atau langsung chat via{" "}
                  <a href={waLink} target="_blank" rel="noopener noreferrer" className="text-[var(--green-main)] hover:underline font-medium">WhatsApp</a>
                </p>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}

function Field({ name, label, type, placeholder, required }: {
  name: string; label: string; type: string; placeholder?: string; required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.67rem] tracking-[0.15em] uppercase text-[var(--text-light)] font-medium">{label}</label>
      <input name={name} type={type} placeholder={placeholder} required={required}
        className="text-[0.88rem] text-[var(--text-dark)] bg-[var(--sage-light)] border border-transparent rounded-xl px-4 py-3 outline-none focus:border-[var(--green-main)] focus:bg-white transition-all placeholder:text-[var(--text-light)]"
      />
    </div>
  );
}
