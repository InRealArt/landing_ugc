"use client";

import { useEffect, useRef, useCallback, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type ArtistCard = {
  slug: string | null;
  name: string;
  artworkStyleTags: string[];
  mediumTags: string[];
  imageUrl: string | null;
  accentColor: string;
  bgGrad: string;
};

type Props = {
  artists: ArtistCard[];
  mobileCarousel?: ReactNode;
};

export default function ArtistsGridAnimated({ artists, mobileCarousel }: Props) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);

  // Magnetic spotlight effect per card
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const spotlight = card.querySelector<HTMLElement>(".artist-spotlight");
    if (spotlight) {
      spotlight.style.setProperty("--sx", `${x}px`);
      spotlight.style.setProperty("--sy", `${y}px`);
      spotlight.style.opacity = "1";
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // ── 1. Header: word-by-word reveal via clip-path ──
      const wordEls = headerRef.current?.querySelectorAll<HTMLElement>(".word-reveal");
      if (wordEls && wordEls.length > 0) {
        gsap.set(wordEls, { opacity: 0, y: 32, rotateX: -45, transformOrigin: "50% 0%" });
        gsap.to(wordEls, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }

      // ── 2. Eyebrow label (le petit texte "Notre réseau") ──
      const eyebrow = headerRef.current?.querySelector<HTMLElement>(".eyebrow-reveal");
      if (eyebrow) {
        gsap.set(eyebrow, { opacity: 0, y: 12 });
        gsap.to(eyebrow, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 88%",
            once: true,
          },
        });
      }

      // ── 3. Cards: 3D card-drop stagger ──
      const cards = gridRef.current?.querySelectorAll<HTMLElement>(".artist-card");
      if (cards && cards.length > 0) {
        gsap.set(cards, {
          opacity: 0,
          y: 60,
          rotateX: 18,
          scale: 0.94,
          transformOrigin: "50% 0%",
          transformPerspective: 800,
        });

        ScrollTrigger.batch(cards, {
          start: "top 88%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              opacity: 1,
              y: 0,
              rotateX: 0,
              scale: 1,
              duration: 0.85,
              ease: "power3.out",
              stagger: 0.1,
            });
          },
        });
      }

      // ── 4. Accent bars: slide in from left ──
      const bars = gridRef.current?.querySelectorAll<HTMLElement>(".accent-bar");
      if (bars && bars.length > 0) {
        gsap.set(bars, { scaleX: 0, transformOrigin: "left center" });
        ScrollTrigger.batch(bars, {
          start: "top 92%",
          once: true,
          onEnter: (batch) => {
            gsap.to(batch, {
              scaleX: 1,
              duration: 0.7,
              ease: "power2.out",
              stagger: 0.08,
              delay: 0.3,
            });
          },
        });
      }

      // ── 5. CTA button ──
      if (ctaRef.current) {
        gsap.set(ctaRef.current, { opacity: 0, y: 20 });
        gsap.to(ctaRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            once: true,
          },
        });
      }

      // ── 6. Tagline reveal ──
      if (taglineRef.current) {
        gsap.set(taglineRef.current, { opacity: 0, y: 24 });
        gsap.to(taglineRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: taglineRef.current,
            start: "top 88%",
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [artists.length]);

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-[#131313]" id="artistes">
      <div className="max-w-7xl mx-auto">

        {/* ── Header ── */}
        <div ref={headerRef} className="text-center mb-14">
          <span className="eyebrow-reveal font-display text-[11px] text-[#9ca3af] uppercase tracking-[0.2em] font-500 block">
            Notre réseau
          </span>
          <h2 className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight mt-3" aria-label="Nos Top artistes créateurs du moment">
            {["Nos", "Top", "artistes"].map((word, i) => (
              <span key={i} className="word-reveal inline-block mr-[0.25em]" aria-hidden="true">
                {word}
              </span>
            ))}
            <span className="word-reveal inline-block mr-[0.25em] text-[#6052ff]" aria-hidden="true">
              créateurs
            </span>
            {["du", "moment"].map((word, i) => (
              <span key={i} className="word-reveal inline-block mr-[0.25em]" aria-hidden="true">
                {word}
              </span>
            ))}
          </h2>
        </div>

        {/* ── Mobile: carousel RSC passé en prop ── */}
        {mobileCarousel && (
          <div className="sm:hidden -mx-6">
            {mobileCarousel}
          </div>
        )}

        {/* ── Desktop grid ── */}
        <div ref={gridRef} className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {artists.map((artist, i) => (
            <Link
              key={i}
              href={artist.slug ? `/artistes/${artist.slug}` : "#artistes"}
              className="artist-card group relative rounded-xl overflow-hidden cursor-pointer block"
              style={{
                background: artist.bgGrad,
                border: "1px solid rgba(255,255,255,0.06)",
                transition: "border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.22,1,0.36,1)",
                // CSS custom props pour le hover dynamique per-card
                ["--accent" as string]: artist.accentColor,
              }}
              onMouseMove={handleMouseMove}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = `${artist.accentColor}44`;
                el.style.boxShadow = `0 20px 60px ${artist.accentColor}20, 0 4px 16px rgba(0,0,0,0.6)`;
                el.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLElement;
                el.style.borderColor = "rgba(255,255,255,0.06)";
                el.style.boxShadow = "";
                el.style.transform = "";
                const spotlight = el.querySelector<HTMLElement>(".artist-spotlight");
                if (spotlight) spotlight.style.opacity = "0";
              }}
            >
              {/* Magnetic spotlight — follows cursor */}
              <div
                className="artist-spotlight pointer-events-none absolute inset-0 z-20 rounded-xl transition-opacity duration-300"
                style={{
                  opacity: 0,
                  background: `radial-gradient(320px circle at var(--sx, 50%) var(--sy, 50%), ${artist.accentColor}18 0%, transparent 70%)`,
                }}
              />

              {/* Visual area */}
              <div className="aspect-[3/4] relative overflow-hidden">
                {/* Ambient glow */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                  style={{ background: artist.accentColor, opacity: 0.18 }}
                />

                {/* Artist image */}
                {artist.imageUrl ? (
                  <Image
                    src={artist.imageUrl}
                    alt={artist.name}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                ) : null}

                {/* Index badge */}
                <div
                  className="absolute top-4 left-4 w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 z-10 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: `${artist.accentColor}25` }}
                >
                  <span className="font-display font-800 text-sm text-white">{i + 1}</span>
                </div>

                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Accent bar — animated in via GSAP scaleX */}
                <div
                  className="accent-bar absolute bottom-0 left-0 right-0 h-0.5"
                  style={{
                    background: `linear-gradient(to right, transparent, ${artist.accentColor}, transparent)`,
                    opacity: 0.6,
                  }}
                />
              </div>

              {/* Info */}
              <div className="p-5 flex items-center justify-between gap-3">
                <div className="flex flex-col gap-1 min-w-0">
                  <h3 className="font-display font-800 text-2xl text-white truncate leading-tight">
                    {artist.name}
                  </h3>
                  {artist.artworkStyleTags.length > 0 && (
                    <p
                      className="font-body text-[17px] font-500 truncate"
                      style={{ color: `${artist.accentColor}cc` }}
                    >
                      {artist.artworkStyleTags.join(" · ")}
                    </p>
                  )}
                </div>
                <div
                  className="shrink-0 flex items-center gap-1.5 font-display font-700 text-[14px] uppercase tracking-[0.1em] px-4 py-2 rounded-lg border transition-all duration-300"
                  style={{
                    color: artist.accentColor,
                    borderColor: `${artist.accentColor}50`,
                    background: `${artist.accentColor}12`,
                  }}
                >
                  Voir
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5">
                    <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* ── CTA ── */}
        <div ref={ctaRef} className="text-center mt-12">
          <a href="#contact" className="btn-primary">
            Voir nos artistes
          </a>
        </div>

        {/* ── Tagline ── */}
        <div ref={taglineRef} className="mt-20 text-center">
          <div className="section-divider mb-12" />
          <h2 className="font-display font-800 text-2xl sm:text-3xl lg:text-[2.5rem] text-white leading-tight tracking-tight">
            InRealArt est la{" "}
            <span className="text-[#6052ff]">référence UGC artistique</span>
            <br />
            dont vous avez toujours rêvé.
          </h2>
        </div>
      </div>
    </section>
  );
}
