"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{ height: "var(--header-height, 90px)" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#131313]/95 backdrop-blur-md border-b border-white/5"
          : "bg-[#131313]"
      }`}
    >
      <nav className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo — fond blanc arrondi pour visibilité sur dark bg */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <div className="bg-white rounded-xl px-3 py-1.5">
            <Image
              src="/images/logo/logo_ira.png"
              alt="InRealArt"
              width={140}
              height={60}
              priority
              className="h-14 w-auto object-contain"
            />
          </div>
        </Link>

        {/* Nav Links — Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Pour les Marques", href: "/#marques" },
            { label: "Nos Artistes", href: "/#artistes" },
            { label: "Comment ça marche ?", href: "/#comment" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-display text-xs font-500 text-white/70 hover:text-[#6052ff] transition-colors duration-300 relative group"
            >
              {item.label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-[#6052ff] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a href="/#contact" className="btn-primary btn-primary-pulse hidden sm:inline-flex">
            Faire sa demande
          </a>
          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#131313]/98 backdrop-blur-xl border-t border-white/5 px-6 py-6 flex flex-col gap-5">
          {[
            { label: "Pour les Marques", href: "/#marques" },
            { label: "Nos Artistes", href: "/#artistes" },
            { label: "Comment ça marche ?", href: "/#comment" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-display text-sm text-white/70 hover:text-white transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a href="/#contact" className="btn-primary w-full text-center mt-2">
            Faire sa demande
          </a>
        </div>
      )}
    </header>
  );
}
