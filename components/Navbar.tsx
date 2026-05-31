"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "#about",        label: "About" },
  { href: "#services",     label: "Services" },
  { href: "#portfolio",    label: "Portfolio" },
  { href: "#testimonials", label: "Stories" },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[4vw] transition-all duration-500
          ${scrolled ? "py-4 bg-[#F0EDEA]/90 backdrop-blur-md shadow-sm" : "py-6 bg-transparent"}`}
      >
        {/* Logo */}
        <button onClick={() => handleNav("#hero")} className="font-display text-2xl flex items-baseline gap-1">
          <span className="font-medium text-[var(--text-dark)]">Our</span>
          <span className="italic font-light text-[var(--green-main)]">Forevows</span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleNav(l.href)}
                className="text-[0.75rem] tracking-widest uppercase text-[var(--text-mid)] hover:text-[var(--green-main)] transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--green-main)] transition-all duration-300 group-hover:w-full" />
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => handleNav("#contact")}
              className="text-[0.73rem] tracking-widest uppercase text-white bg-[var(--green-main)] hover:bg-[var(--green-deep)] px-5 py-2.5 rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-green-900/20"
            >
              Book Us
            </button>
          </li>
        </ul>

        {/* Burger */}
        <button
          className="md:hidden text-[var(--text-dark)]"
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
          {[...links, { href: "#contact", label: "Book Us" }].map((l) => (
            <li key={l.href}>
              <button
                onClick={() => handleNav(l.href)}
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
