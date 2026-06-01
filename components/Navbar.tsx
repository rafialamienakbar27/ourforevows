"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about",        label: "About",    type: "anchor" },
  { href: "#services",     label: "Services", type: "anchor" },
  { href: "#portfolio",    label: "Portfolio",type: "anchor" },
  { href: "#testimonials", label: "Stories",  type: "anchor" },
  { href: "/schedule",     label: "Schedule", type: "page" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const router = useRouter();
  const pathname = usePathname();

  const handleNav = (href: string, type: string) => {
    setMenuOpen(false);
    if (type === "page") {
      router.push(href);
      return;
    }
    if (pathname !== "/") {
      router.push(`/${href}`);
      return;
    }
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const atTop = !scrolled;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[4vw] transition-all duration-500
          ${scrolled
            ? "py-4 bg-[#F0EDEA]/92 backdrop-blur-md shadow-sm"
            : "py-6 bg-transparent"
          }`}
      >
        {/* Logo */}
        <button onClick={() => handleNav("#hero", "anchor")} className="font-display text-2xl flex items-baseline gap-1">
          <span className={`font-medium transition-colors duration-500 ${atTop ? "text-white" : "text-[var(--text-dark)]"}`}>Our</span>
          <span className={`italic font-light transition-colors duration-500 ${atTop ? "text-[var(--green-light)]" : "text-[var(--green-main)]"}`}>Forevows</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleNav(l.href, l.type)}
                className={`text-[0.75rem] tracking-widest uppercase transition-colors duration-300 relative group
                  ${atTop
                    ? "text-white/80 hover:text-white"
                    : "text-[var(--text-mid)] hover:text-[var(--green-main)]"
                  }`}
              >
                {l.label}
                <span className={`absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full
                  ${atTop ? "bg-white" : "bg-[var(--green-main)]"}`} />
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handleNav("#contact", "anchor")}
              className={`text-[0.73rem] tracking-widest uppercase px-5 py-2.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg
                ${atTop
                  ? "text-[var(--green-deep)] bg-white hover:bg-[var(--green-light)] hover:text-white hover:shadow-black/20"
                  : "text-white bg-[var(--green-main)] hover:bg-[var(--green-deep)] hover:shadow-green-900/20"
                }`}
            >
              Book Us
            </button>
          </li>
        </ul>

        {/* Burger */}
        <button
          className={`md:hidden transition-colors duration-500 ${atTop ? "text-white" : "text-[var(--text-dark)]"}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-[var(--cream)] flex flex-col items-center justify-center transition-opacity duration-400
          ${menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      >
        <ul className="flex flex-col items-center gap-6 text-center">
          {[...links, { href: "#contact", label: "Book Us", type: "anchor" }].map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleNav(l.href, l.type)}
                className="font-display text-4xl font-light text-[var(--text-dark)] hover:text-[var(--green-main)] transition-colors"
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
