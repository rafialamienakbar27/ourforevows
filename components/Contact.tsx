"use client";
import { useActionState, useRef } from "react";
import { motion } from "framer-motion";
import { Phone, Mail, Camera } from "lucide-react";
import { useInView } from "./useInView";
import { submitBooking } from "@/app/actions";

type SiteSettings = {
  whatsapp?: string;
  email?: string;
  instagram?: string;
};

const initialState = { success: false, error: undefined as string | undefined };

export default function Contact({ settings }: { settings?: SiteSettings }) {
  const [state, action, isPending] = useActionState(submitBooking, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const { ref, inView } = useInView();

  const wa = settings?.whatsapp ?? "+62 812 3456 7890";
  const email = settings?.email ?? "hello@ourforevows.com";
  const ig = settings?.instagram ?? "@ourforevows";
  const waLink = `https://wa.me/${wa.replace(/\D/g, "")}`;

  return (
    <section id="contact" className="py-28 px-[4vw] bg-[var(--cream)]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.4fr] gap-20 items-start">

        {/* Left */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <p className="text-[0.72rem] tracking-[0.22em] uppercase text-[var(--green-main)] mb-3">Hubungi Kami</p>
          <h2 className="font-display text-[clamp(1.9rem,3.5vw,2.8rem)] font-light text-[var(--text-dark)] leading-[1.2] mb-5">
            Mari kita mulai kisah indah Anda
          </h2>
          <p className="text-[0.9rem] font-light text-[var(--text-mid)] leading-[1.9] mb-10">
            Ceritakan kepada kami tentang pernikahan impian Anda, dan kami akan merancang paket yang sempurna untuk Anda.
          </p>
          <div className="flex flex-col gap-5">
            {[
              { icon: <Phone size={17} />, text: wa },
              { icon: <Mail size={17} />, text: email },
              { icon: <Camera size={17} />, text: ig.startsWith("@") ? ig : `@${ig}` },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3.5 text-[0.88rem] text-[var(--text-mid)] font-light">
                <span className="text-[var(--green-main)]">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>

          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 px-7 py-3.5 rounded-full border border-[var(--green-main)] text-[var(--green-main)] text-[0.78rem] tracking-widest uppercase hover:bg-[var(--green-main)] hover:text-white transition-all duration-300"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M11.99 0C5.374 0 0 5.373 0 11.99c0 2.12.555 4.107 1.524 5.832L.057 24l6.304-1.654A11.938 11.938 0 0011.99 24c6.617 0 11.99-5.373 11.99-11.99C23.98 5.373 18.607 0 11.99 0zm0 21.818a9.824 9.824 0 01-5.017-1.381l-.36-.214-3.733.979.997-3.645-.235-.374A9.826 9.826 0 012.165 11.99c0-5.42 4.407-9.826 9.826-9.826 5.42 0 9.826 4.407 9.826 9.826 0 5.42-4.406 9.828-9.827 9.828z"/></svg>
            Chat WhatsApp
          </a>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          {state.success ? (
            <div className="bg-[var(--sage-light)] rounded p-14 text-center">
              <div className="font-display text-4xl font-light text-[var(--green-main)] mb-3">Pesan Terkirim! ✦</div>
              <p className="text-[0.9rem] text-[var(--text-mid)] leading-relaxed">
                Terima kasih telah menghubungi Our Forevows.<br />
                Kami akan segera merespons dalam 1×24 jam.
              </p>
              <p className="text-[0.8rem] text-[var(--text-light)] mt-4">
                Atau langsung WhatsApp:{" "}
                <a href={waLink} target="_blank" rel="noopener noreferrer" className="text-[var(--green-main)] font-medium hover:underline">{wa}</a>
              </p>
            </div>
          ) : (
            <form ref={formRef} action={action} className="flex flex-col gap-5">
              {state.error && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-[0.85rem] rounded px-4 py-3">
                  {state.error}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <Field name="namaMempelai" label="Nama Anda *"     type="text"  placeholder="Nama lengkap" required />
                <Field name="namaPasangan" label="Nama Pasangan"   type="text"  placeholder="Nama lengkap" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field name="email"     label="Email *"          type="email" placeholder="email@contoh.com" required />
                <Field name="whatsapp"  label="No. WhatsApp *"   type="tel"   placeholder="+62 ..." required />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field name="tanggalNikah" label="Tanggal Pernikahan" type="date" />
                <Field name="lokasi"       label="Kota / Lokasi"      type="text" placeholder="Contoh: Bali" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.7rem] tracking-widest uppercase text-[var(--text-light)]">Layanan yang Diminati</label>
                <select name="layanan" className="font-body text-[0.9rem] text-[var(--text-dark)] bg-[var(--sage-light)] border border-transparent rounded px-4 py-3 outline-none focus:border-[var(--green-main)] focus:bg-white transition-all appearance-none">
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
                <label className="text-[0.7rem] tracking-widest uppercase text-[var(--text-light)]">Ceritakan Pernikahan Anda</label>
                <textarea
                  name="cerita"
                  rows={4}
                  placeholder="Lokasi, tema, jumlah tamu, keinginan khusus..."
                  className="font-body text-[0.9rem] text-[var(--text-dark)] bg-[var(--sage-light)] border border-transparent rounded px-4 py-3 outline-none focus:border-[var(--green-main)] focus:bg-white transition-all resize-y placeholder:text-[var(--text-light)] placeholder:font-light"
                />
              </div>
              <button
                type="submit"
                disabled={isPending}
                className="w-full py-4 rounded-full bg-[var(--green-main)] text-white text-[0.78rem] tracking-widest uppercase hover:bg-[var(--green-deep)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-900/25 mt-1 disabled:opacity-60 disabled:cursor-not-allowed disabled:translate-y-0"
              >
                {isPending ? "Mengirim..." : "Kirim Pesan ✦"}
              </button>
            </form>
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
      <label className="text-[0.7rem] tracking-widest uppercase text-[var(--text-light)]">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="font-body text-[0.9rem] text-[var(--text-dark)] bg-[var(--sage-light)] border border-transparent rounded px-4 py-3 outline-none focus:border-[var(--green-main)] focus:bg-white transition-all placeholder:text-[var(--text-light)] placeholder:font-light"
      />
    </div>
  );
}
