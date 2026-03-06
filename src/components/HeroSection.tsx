"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useLenis } from "./LenisContext";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLDivElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const mediaGridRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const floatingBadgeRef = useRef<HTMLDivElement>(null);
  const glow1Ref = useRef<HTMLDivElement>(null);
  const glow2Ref = useRef<HTMLDivElement>(null);
  const lenis = useLenis();

  // Parallax glows linked to Lenis scroll
  useEffect(() => {
    if (!lenis) return;
    function onScroll({ scroll }: { scroll: number }) {
      if (glow1Ref.current) glow1Ref.current.style.transform = `translateY(${scroll * 0.12}px)`;
      if (glow2Ref.current) glow2Ref.current.style.transform = `translateY(${scroll * 0.06}px)`;
    }
    lenis.on("scroll", onScroll);
    return () => lenis.off("scroll", onScroll);
  }, [lenis]);

  // Mouse parallax on media grid
  useEffect(() => {
    const section = sectionRef.current;
    const grid = mediaGridRef.current;
    if (!section || !grid) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    function onMouseMove(e: MouseEvent) {
      const rect = section!.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;   // -0.5 → 0.5
      const dy = (e.clientY - cy) / rect.height;  // -0.5 → 0.5

      gsap.to(grid, {
        rotateY: dx * 6,
        rotateX: -dy * 4,
        x: dx * 14,
        duration: 1.2,
        ease: "power1.out",
        transformPerspective: 1200,
      });
    }

    function onMouseLeave() {
      gsap.to(grid, {
        rotateY: 0,
        rotateX: 0,
        x: 0,
        duration: 1.4,
        ease: "power2.out",
        transformPerspective: 1200,
      });
    }

    section.addEventListener("mousemove", onMouseMove);
    section.addEventListener("mouseleave", onMouseLeave);
    return () => {
      section.removeEventListener("mousemove", onMouseMove);
      section.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  // Main cinematic entrance timeline
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Collect all elements to animate
    const els = {
      badge: badgeRef.current,
      line1: line1Ref.current,
      line2: line2Ref.current,
      line3: line3Ref.current,
      subtext: subtextRef.current,
      ctaButtons: ctasRef.current ? Array.from(ctasRef.current.querySelectorAll("a")) : [],
      stats: statsRef.current,
      cards: [card1Ref.current, card2Ref.current, card3Ref.current].filter(Boolean),
      badge2: floatingBadgeRef.current,
      scan: scanLineRef.current,
    };

    if (prefersReducedMotion) {
      gsap.set(
        [els.badge, els.line1, els.line2, els.line3, els.subtext,
         ...els.ctaButtons, els.stats, els.badge2,
         card1Ref.current, card2Ref.current, card3Ref.current],
        { opacity: 1, y: 0, x: 0, scale: 1, clipPath: "inset(0 0 0% 0)" }
      );
      return;
    }

    // Set initial states via gsap.set (overrides inline style, Strict-Mode safe)
    gsap.set(els.scan, { scaleX: 0, opacity: 0, transformOrigin: "left center" });
    gsap.set(els.badge, { opacity: 0, scale: 0.75, y: 10 });
    gsap.set([els.line1, els.line2, els.line3], { opacity: 0, y: 56, clipPath: "inset(0 0 100% 0)" });
    gsap.set(els.subtext, { opacity: 0, y: 20 });
    gsap.set(els.ctaButtons, { opacity: 0, y: 18, scale: 0.94 });
    gsap.set(els.stats, { opacity: 0, y: 14 });
    // card1 = phone shell, card2 = badge gauche, card3 = screen glow
    gsap.set(card1Ref.current, { opacity: 0, y: 60, scale: 0.88, rotateX: 10 });
    gsap.set(card2Ref.current, { opacity: 0, x: -28, scale: 0.78 });
    gsap.set(card3Ref.current, { opacity: 0 });
    gsap.set(els.badge2, { opacity: 0, x: 28, scale: 0.78 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // ── 0. Scan line sweep
      tl.to(els.scan, { scaleX: 1, opacity: 0.6, duration: 0.28, ease: "power2.in" })
        .to(els.scan, { opacity: 0, duration: 0.28, ease: "power2.out" })

      // ── 1. Badge entrance
      .to(els.badge, { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(2)" }, "-=0.1")

      // ── 2-4. H1 lines — clip reveal staggered
      .to(els.line1, { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.72, ease: "power4.out" }, "-=0.15")
      .to(els.line2, { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.72, ease: "power4.out" }, "-=0.58")
      .to(els.line3, { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.72, ease: "power4.out" }, "-=0.58")

      // ── 5. Subtext
      .to(els.subtext, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")

      // ── 6. CTAs staggered
      .to(els.ctaButtons, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1, ease: "back.out(1.4)" }, "-=0.35")

      // ── 7. Stats
      .to(els.stats, { opacity: 1, y: 0, duration: 0.5 }, "-=0.3")

      // ── 8. Phone — depth entrance (translateY + scale + rotateX perspective)
      .to(card1Ref.current, {
        opacity: 1, y: 0, scale: 1, rotateX: 0,
        duration: 0.9,
        ease: "power3.out",
        transformPerspective: 1200,
      }, "-=0.7")

      // ── 9. Screen inner glow fade-in — delayed shimmer feel
      .to(card3Ref.current, { opacity: 1, duration: 0.6, ease: "power2.out" }, "-=0.4")

      // ── 10. Badge gauche — spring from left
      .to(card2Ref.current, { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.55)" }, "-=0.2")

      // ── 11. Badge droite — spring from right
      .to(els.badge2, { opacity: 1, x: 0, scale: 1, duration: 0.7, ease: "elastic.out(1, 0.55)" }, "-=0.5");

      // ── Stat counter-up
      const statNumbers = statsRef.current?.querySelectorAll("[data-count]");
      statNumbers?.forEach((el) => {
        const target = parseFloat(el.getAttribute("data-count") || "0");
        const isLt = el.getAttribute("data-lt") === "true";
        const suffix = el.getAttribute("data-suffix") || "";
        const obj = { value: 0 };
        gsap.to(obj, {
          value: target, duration: 1.6, delay: 1.5, ease: "power2.out",
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
      {/* Scan line — cinematic boot effect, initial state set by gsap.set */}
      <div
        ref={scanLineRef}
        aria-hidden="true"
        className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-px bg-[#6052ff]/60 pointer-events-none z-20"
      />

      {/* Background glows — parallax via Lenis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          ref={glow1Ref}
          className="absolute top-1/3 left-[-8%] w-[600px] h-[600px] rounded-full bg-[#6052ff]/7 blur-[120px]"
          style={{ willChange: "transform" }}
        />
        <div
          ref={glow2Ref}
          className="absolute bottom-1/4 right-[-5%] w-[450px] h-[450px] rounded-full bg-[#6052ff]/4 blur-[90px]"
          style={{ willChange: "transform" }}
        />
        {/* Static accent glow center-right */}
        <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] rounded-full bg-[#6052ff]/3 blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Left: Text ── */}
          <div className="flex flex-col gap-8">

            {/* Badge */}
            <div
              ref={badgeRef}
              className="inline-flex items-center gap-2.5 w-fit bg-[#6052ff]/10 border border-[#6052ff]/20 rounded-lg px-4 py-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#6052ff] animate-float" />
              <span className="font-display text-[10px] font-700 tracking-[0.18em] text-[#6052ff] uppercase">
                Agence UGC Artistique
              </span>
            </div>

            {/* Headline — split in 3 lines for staggered clip reveal */}
            <h1 className="font-display font-800 text-4xl sm:text-5xl lg:text-[3.4rem] leading-[1.08] tracking-tight text-white flex flex-col gap-1">
              <div ref={line1Ref} className="overflow-hidden">
                <span className="block">
                  Du contenu publicitaire{" "}
                  <span className="text-[#6052ff]">qui convertit.</span>
                </span>
              </div>
              <div ref={line2Ref} className="overflow-hidden">
                <span className="block">
                  Produit par de vrais{" "}
                  <span className="text-[#6052ff]">artistes français.</span>
                </span>
              </div>
              <div ref={line3Ref} className="overflow-hidden">
                <span className="block">
                  Livré en{" "}
                  <span className="text-[#6052ff]">moins d&apos;une semaine.</span>
                </span>
              </div>
            </h1>

            {/* Subtext */}
            <p
              ref={subtextRef}
              className="font-body text-[#9ca3af] text-lg leading-relaxed max-w-lg"
            >
              Stoppez la dépendance aux studios créa et aux influenceurs génériques.{" "}
              <span className="text-white font-600">InRealArt</span> connecte votre marque aux meilleurs artistes UGC français — sans frais mensuels, sans minimum d&apos;engagement.
            </p>

            {/* CTAs */}
            <div ref={ctasRef} className="flex flex-wrap items-center gap-4">
              <a
                href="https://calendly.com/inrealart"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary btn-primary-pulse"
              >
                Obtenir un devis en 48h
              </a>
              <a href="#artistes" className="btn-outline">
                Voir nos artistes →
              </a>
            </div>

            {/* Stats */}
            <div
              ref={statsRef}
              className="flex items-center gap-8 pt-2 border-t border-white/6"
            >
              <div className="flex flex-col pt-4">
                <span className="font-display font-800 text-2xl text-white" data-count="50" data-suffix="+">0+</span>
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

          {/* ── Right: Premium smartphone — mouse parallax wrapper ── */}
          <div
            ref={mediaGridRef}
            className="relative flex items-center justify-center"
            style={{ transformStyle: "preserve-3d", minHeight: "560px" }}
          >
            {/* Ambient glow behind the phone */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "420px",
                height: "620px",
                background: "radial-gradient(ellipse at 50% 60%, rgba(96,82,255,0.18) 0%, transparent 70%)",
                filter: "blur(40px)",
              }}
            />

            {/* ── Phone shell ── */}
            <div
              ref={card1Ref}
              className="relative w-[248px] h-[536px] lg:w-[310px] lg:h-[670px]"
            >
              {/* Outer glow ring */}
              <div
                className="absolute pointer-events-none"
                style={{
                  inset: "-12px",
                  borderRadius: "52px",
                  background: "radial-gradient(ellipse at 50% 0%, rgba(96,82,255,0.22) 0%, transparent 65%)",
                  filter: "blur(16px)",
                }}
              />

              {/* Phone frame */}
              <div
                className="absolute inset-0 rounded-[44px] border"
                style={{
                  borderColor: "rgba(255,255,255,0.14)",
                  background: "linear-gradient(160deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)",
                  boxShadow:
                    "0 0 0 1px rgba(255,255,255,0.06) inset, 0 32px 80px rgba(0,0,0,0.7), 0 8px 24px rgba(0,0,0,0.5)",
                }}
              />

              {/* Side buttons — right */}
              <div
                className="absolute right-0 rounded-r-full"
                aria-hidden="true"
                style={{
                  top: "120px",
                  width: "3px",
                  height: "52px",
                  background: "rgba(255,255,255,0.12)",
                  transform: "translateX(2px)",
                }}
              />
              <div
                className="absolute right-0 rounded-r-full"
                aria-hidden="true"
                style={{
                  top: "188px",
                  width: "3px",
                  height: "32px",
                  background: "rgba(255,255,255,0.12)",
                  transform: "translateX(2px)",
                }}
              />
              {/* Side buttons — left */}
              <div
                className="absolute left-0 rounded-l-full"
                aria-hidden="true"
                style={{
                  top: "140px",
                  width: "3px",
                  height: "40px",
                  background: "rgba(255,255,255,0.10)",
                  transform: "translateX(-2px)",
                }}
              />
              <div
                className="absolute left-0 rounded-l-full"
                aria-hidden="true"
                style={{
                  top: "194px",
                  width: "3px",
                  height: "40px",
                  background: "rgba(255,255,255,0.10)",
                  transform: "translateX(-2px)",
                }}
              />

              {/* Screen area */}
              <div
                className="absolute overflow-hidden"
                style={{
                  inset: "8px",
                  borderRadius: "36px",
                  background: "#000",
                }}
              >
                {/* Video */}
                <video
                  src="/videos/video_hero.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Screen inner glow — top edge */}
                <div
                  ref={card3Ref}
                  className="absolute inset-x-0 top-0 pointer-events-none"
                  style={{
                    height: "120px",
                    background:
                      "linear-gradient(to bottom, rgba(96,82,255,0.15) 0%, transparent 100%)",
                  }}
                />

                {/* Dynamic island */}
                <div
                  className="absolute top-[14px] left-1/2 -translate-x-1/2 rounded-full bg-black z-10"
                  style={{ width: "88px", height: "24px" }}
                />

                {/* Bottom gradient overlay */}
                <div
                  className="absolute inset-x-0 bottom-0 pointer-events-none"
                  style={{
                    height: "100px",
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 100%)",
                  }}
                />
              </div>

              {/* Glass specular highlight — top-left diagonal streak */}
              <div
                className="absolute pointer-events-none"
                style={{
                  top: "12px",
                  left: "18px",
                  width: "80px",
                  height: "2px",
                  background:
                    "linear-gradient(to right, transparent, rgba(255,255,255,0.22), transparent)",
                  borderRadius: "2px",
                  transform: "rotate(-8deg)",
                }}
              />
            </div>

            {/* ── Floating badge — "Artiste vérifié" — spring entrance ── */}
            <div
              ref={card2Ref}
              className="absolute animate-float"
              style={{ left: "-20px", bottom: "80px" }}
            >
              <div
                className="flex items-center gap-3 rounded-2xl px-4 py-3 border"
                style={{
                  background: "rgba(18,17,17,0.85)",
                  backdropFilter: "blur(16px)",
                  borderColor: "rgba(96,82,255,0.25)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(96,82,255,0.1) inset",
                }}
              >
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{ width: "32px", height: "32px", background: "rgba(96,82,255,0.15)" }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="#6052ff" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="font-display text-[10px] font-700 text-white leading-tight">Artiste vérifié</p>
                  <p className="font-body text-[10px] text-[#9ca3af] leading-tight mt-0.5">Qualité garantie</p>
                </div>
              </div>
            </div>

            {/* ── Floating badge — livraison — spring entrance ── */}
            <div
              ref={floatingBadgeRef}
              className="absolute animate-float"
              style={{ right: "-16px", top: "110px", animationDelay: "0.8s" }}
            >
              <div
                className="flex items-center gap-3 rounded-2xl px-4 py-3 border"
                style={{
                  background: "rgba(18,17,17,0.85)",
                  backdropFilter: "blur(16px)",
                  borderColor: "rgba(255,255,255,0.1)",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                }}
              >
                <div
                  className="flex items-center justify-center rounded-xl"
                  style={{ width: "32px", height: "32px", background: "rgba(255,255,255,0.06)" }}
                >
                  <svg className="w-4 h-4 text-white/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                  </svg>
                </div>
                <div>
                  <p className="font-display text-[10px] font-700 text-white leading-tight">Livraison express</p>
                  <p className="font-body text-[10px] text-[#9ca3af] leading-tight mt-0.5">En moins d&apos;une semaine</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
