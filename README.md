# Our Forevows — Next.js Website

Wedding content creator website built with Next.js 15 + Tailwind CSS + Framer Motion.

## Tech Stack
- **Next.js 15** (App Router, Static Export)
- **TypeScript**
- **Tailwind CSS v4**
- **Framer Motion** (animations)
- **Lucide React** (icons)

## Getting Started

```bash
npm install
npm run dev      # development at localhost:3000
npm run build    # production build → /out folder
```

## Deploy ke Vercel (Recommended)

1. Push repo ini ke GitHub
2. Buka vercel.com/new → Import repo
3. Framework: Next.js (auto-detect)
4. Deploy → selesai! URL otomatis tersedia

## Deploy ke Netlify

1. Buka app.netlify.com/drop
2. Drag & drop folder `/out`
3. Langsung live!

## Deploy ke GitHub Pages

1. Push ke GitHub
2. Settings → Pages → GitHub Actions
3. Gunakan workflow Next.js bawaan GitHub

## Struktur Project

```
app/
  layout.tsx    → Root layout + metadata SEO
  page.tsx      → Main page (assembly semua sections)
  globals.css   → CSS variables + global styles

components/
  Navbar.tsx       → Navigation sticky + mobile menu
  Hero.tsx         → Hero section dengan animasi
  Marquee.tsx      → Running text ticker
  About.tsx        → About dengan image collage
  Services.tsx     → 6 layanan dalam grid
  Portfolio.tsx    → Gallery dengan filter
  Process.tsx      → 4 langkah cara kerja
  Testimonials.tsx → Testimonial carousel
  CtaBanner.tsx    → Call-to-action banner
  Contact.tsx      → Form kontak
  Footer.tsx       → Footer lengkap
```
