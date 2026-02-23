"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const mediaGridRef = useRef<HTMLDivElement>(null);
  const floatingBadgeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Badge entrance
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6 }
      )
        // Headline words stagger
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" },
          { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.7 },
          "-=0.3"
        )
        // Subtext
        .fromTo(
          subtextRef.current,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4"
        )
        // CTAs
        .fromTo(
          ctasRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.35"
        )
        // Stats — counter-up effect
        .fromTo(
          statsRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.25"
        )
        // Media grid — cascade from right
        .fromTo(
          mediaGridRef.current,
          { opacity: 0, x: 50, scale: 0.95 },
          { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power2.out" },
          "-=0.8"
        );

      // Floating badge — delayed float in
      gsap.fromTo(
        floatingBadgeRef.current,
        { opacity: 0, x: -20, scale: 0.8 },
        { opacity: 1, x: 0, scale: 1, duration: 0.6, delay: 1.2, ease: "back.out(1.5)" }
      );

      // Stat number counter animation
      const statNumbers = statsRef.current?.querySelectorAll("[data-count]");
      statNumbers?.forEach((el) => {
        const target = parseFloat(el.getAttribute("data-count") || "0");
        const isLt = el.getAttribute("data-lt") === "true";
        const suffix = el.getAttribute("data-suffix") || "";
        const obj = { value: 0 };
        gsap.to(obj, {
          value: target, duration: 1.6, delay: 0.9, ease: "power2.out",
          onUpdate() {
            el.textContent = (isLt ? "< " : "") + Math.round(obj.value) + suffix;
          },
          onComplete() {
            el.textContent = (isLt ? "< " : "") + target + suffix;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden mesh-bg"
      style={{ paddingTop: "var(--header-height, 90px)" }}
      id="marques"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-[-8%] w-[500px] h-[500px] rounded-full bg-[#6052ff]/6 blur-[100px]" />
        <div className="absolute bottom-1/4 right-[-5%] w-[400px] h-[400px] rounded-full bg-[#6052ff]/4 blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Left: Text ── */}
          <div className="flex flex-col gap-8">

            {/* Badge */}
            <div ref={badgeRef} style={{ opacity: 0 }} className="inline-flex items-center gap-2.5 w-fit bg-[#6052ff]/10 border border-[#6052ff]/20 rounded-lg px-4 py-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#6052ff] animate-float" />
              <span className="font-display text-[10px] font-700 tracking-[0.18em] text-[#6052ff] uppercase">
                Agence UGC Artistique
              </span>
            </div>

            {/* Headline */}
            <div ref={headlineRef} style={{ opacity: 0 }}>
              <h1 className="font-display font-800 text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] tracking-tight text-white">
                Travaillez avec les{" "}
                <span className="text-[#6052ff]">meilleurs artistes</span>{" "}
                français pour du contenu UGC{" "}
                <span className="text-[#6052ff]">authentique</span>{" "}
                pour votre marque
              </h1>
            </div>

            {/* Subtext */}
            <p ref={subtextRef} style={{ opacity: 0 }} className="font-body text-[#9ca3af] text-lg leading-relaxed max-w-lg">
              Ne tombez plus jamais à court de créa publicitaires et organiques
              avec l&apos;agence influence{" "}
              <span className="text-white font-600">InRealArt.</span>
            </p>

            {/* CTAs */}
            <div ref={ctasRef} style={{ opacity: 0 }} className="flex flex-wrap items-center gap-4">
              <a href="#contact" className="btn-primary btn-primary-pulse">
                Faire ma demande
              </a>
              <a href="#artistes" className="btn-outline">
                Voir nos artistes →
              </a>
            </div>

            {/* Stats */}
            <div ref={statsRef} style={{ opacity: 0 }} className="flex items-center gap-8 pt-2 border-t border-white/6">
              <div className="flex flex-col pt-4">
                <span className="font-display font-800 text-2xl text-white" data-count="50" data-suffix="+">50+</span>
                <span className="font-body text-xs text-[#9ca3af] uppercase tracking-wider mt-1">Artistes vérifiés</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex flex-col pt-4">
                <span className="font-display font-800 text-2xl text-[#6052ff]">0 €</span>
                <span className="font-body text-xs text-[#9ca3af] uppercase tracking-wider mt-1">Frais mensuels</span>
              </div>
              <div className="w-px h-10 bg-white/10" />
              <div className="flex flex-col pt-4">
                <span className="font-display font-800 text-2xl text-white" data-count="1" data-lt="true" data-suffix=" sem.">&lt; 1 sem.</span>
                <span className="font-body text-xs text-[#9ca3af] uppercase tracking-wider mt-1">Livraison UGC</span>
              </div>
            </div>
          </div>

          {/* ── Right: UGC media grid ── */}
          <div ref={mediaGridRef} style={{ opacity: 0 }} className="relative">
            <div className="grid grid-cols-2 gap-3 h-[480px] sm:h-[520px]">

              {/* Col 1 — tall card */}
              <div
                className="relative rounded-xl overflow-hidden group cursor-pointer border border-white/6 hover:border-[#6052ff]/30 transition-all duration-300"
                style={{ background: "linear-gradient(160deg, #1e1540 0%, #131313 100%)" }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-[#6052ff]/20 border border-[#6052ff]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-6 h-6 text-[#6052ff] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/40 backdrop-blur-sm rounded-md px-2.5 py-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span className="font-display text-[9px] text-white/80 font-600 tracking-wider">LIVE</span>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="font-display text-xs font-700 text-white mb-0.5">Aujourd&apos;hui</p>
                  <p className="font-body text-[10px] text-white/50">Aujourd&apos;hui est un grand jour</p>
                </div>
                {/* Purple accent bar */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6052ff]/50" />
              </div>

              {/* Col 2 — two cards stacked */}
              <div className="flex flex-col gap-3">
                <div
                  className="flex-1 relative rounded-xl overflow-hidden group cursor-pointer border border-white/6 hover:border-[#6052ff]/30 transition-all duration-300"
                  style={{ background: "linear-gradient(160deg, #0e2016 0%, #131313 100%)" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-4 h-4 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-md px-2 py-1">
                      <div className="w-4 h-4 rounded-full bg-[#6052ff]" />
                      <span className="font-display text-[9px] text-white/70 font-600">Van Guillemin</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6052ff]/30" />
                </div>

                <div
                  className="flex-1 relative rounded-xl overflow-hidden group cursor-pointer border border-white/6 hover:border-[#6052ff]/30 transition-all duration-300"
                  style={{ background: "linear-gradient(160deg, #201808 0%, #131313 100%)" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-11 h-11 rounded-full bg-[#6052ff]/20 border border-[#6052ff]/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-4 h-4 text-[#6052ff] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3">
                    <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-sm rounded-md px-2 py-1">
                      <div className="w-4 h-4 rounded-full bg-amber-500" />
                      <span className="font-display text-[9px] text-white/70 font-600">Marine Tassou</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="font-display text-[10px] text-white/70 font-700">Aujourd&apos;hui</p>
                    <p className="font-body text-[9px] text-white/40">Aujourd&apos;hui est un grand jour</p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6052ff]/30" />
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div ref={floatingBadgeRef} style={{ opacity: 0 }} className="absolute -left-4 bottom-16 bg-[#1d1c1c] border border-[#6052ff]/25 rounded-xl px-4 py-3 flex items-center gap-3 shadow-2xl animate-float">
              <div className="w-8 h-8 rounded-lg bg-[#6052ff]/15 flex items-center justify-center">
                <svg className="w-4 h-4 text-[#6052ff]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div>
                <p className="font-display text-[10px] font-700 text-white">Artistes vérifiés</p>
                <p className="font-body text-[10px] text-[#9ca3af]">Qualité garantie</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
