"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "./useInView";
import { Phone, Mail, Camera } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const { ref, inView } = useInView();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

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
              { icon: <Phone size={17} />, text: "+62 812 3456 7890" },
              { icon: <Mail size={17} />, text: "hello@ourforevows.com" },
              { icon: <Camera size={17} />, text: "@ourforevows" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3.5 text-[0.88rem] text-[var(--text-mid)] font-light">
                <span className="text-[var(--green-main)]">{item.icon}</span>
                {item.text}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right — Form */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.15 }}
        >
          {sent ? (
            <div className="bg-[var(--sage-light)] rounded p-14 text-center">
              <div className="font-display text-4xl font-light text-[var(--green-main)] mb-3">Pesan Terkirim! ✦</div>
              <p className="text-[0.9rem] text-[var(--text-mid)] leading-relaxed">
                Terima kasih telah menghubungi Our Forevows.<br />
                Kami akan segera merespons dalam 1×24 jam.
              </p>
              <p className="text-[0.8rem] text-[var(--text-light)] mt-4">
                Atau langsung WhatsApp: <strong className="text-[var(--green-main)]">+62 812 3456 7890</strong>
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Nama Anda"      type="text"  placeholder="Nama lengkap" />
                <Field label="Nama Pasangan"  type="text"  placeholder="Nama lengkap" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Email"         type="email" placeholder="email@contoh.com" />
                <Field label="No. WhatsApp"  type="tel"   placeholder="+62 ..." />
              </div>
              <Field label="Tanggal Pernikahan" type="date" />
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.7rem] tracking-widest uppercase text-[var(--text-light)]">Layanan yang Diminati</label>
                <select className="font-body text-[0.9rem] text-[var(--text-dark)] bg-[var(--sage-light)] border border-transparent rounded px-4 py-3 outline-none focus:border-[var(--green-main)] focus:bg-white transition-all appearance-none">
                  <option value="">Pilih layanan...</option>
                  <option>Wedding Film</option>
                  <option>Pre-Wedding Session</option>
                  <option>Social Media Content</option>
                  <option>Highlight Reel</option>
                  <option>Custom Package</option>
                </select>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-[0.7rem] tracking-widest uppercase text-[var(--text-light)]">Ceritakan Pernikahan Anda</label>
                <textarea
                  rows={4}
                  placeholder="Lokasi, tema, jumlah tamu, keinginan khusus..."
                  className="font-body text-[0.9rem] text-[var(--text-dark)] bg-[var(--sage-light)] border border-transparent rounded px-4 py-3 outline-none focus:border-[var(--green-main)] focus:bg-white transition-all resize-y placeholder:text-[var(--text-light)] placeholder:font-light"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[var(--green-main)] text-white text-[0.78rem] tracking-widest uppercase hover:bg-[var(--green-deep)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-900/25 mt-1"
              >
                Kirim Pesan ✦
              </button>
            </form>
          )}
        </motion.div>

      </div>
    </section>
  );
}

function Field({ label, type, placeholder }: { label: string; type: string; placeholder?: string }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[0.7rem] tracking-widest uppercase text-[var(--text-light)]">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="font-body text-[0.9rem] text-[var(--text-dark)] bg-[var(--sage-light)] border border-transparent rounded px-4 py-3 outline-none focus:border-[var(--green-main)] focus:bg-white transition-all placeholder:text-[var(--text-light)] placeholder:font-light"
      />
    </div>
  );
}
