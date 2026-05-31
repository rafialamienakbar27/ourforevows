import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Our Forevows — Wedding Content Creator",
  description: "Wedding content creator yang mengabadikan momen cinta Anda menjadi karya visual yang timeless, autentik, dan penuh makna.",
  keywords: ["wedding content creator", "wedding film", "pre-wedding", "videografi pernikahan", "ourforevows"],
  openGraph: {
    title: "Our Forevows — Wedding Content Creator",
    description: "Mengabadikan setiap momen berharga dalam kisah cinta Anda.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
