"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "./LenisContext";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  {
    highlight: "93",
    suffix: " %",
    title: "des acheteurs jugent l'avis des autres utile avant d'acheter",
    description:
      "La grande majorité des consommateurs consultent du contenu d'autres utilisateurs pour décider d'un achat : avis, photos ou vidéos.",
    source: "BrightLocal – Consumer Review Survey",
    accentColor: "#6052ff",
  },
  {
    highlight: "10",
    suffix: "×",
    title: "UGC = plus de vues que le contenu de marque",
    description:
      "Le contenu généré par les utilisateurs est évalué bien plus puissant que celui des influenceurs rémunérés pour influencer les décisions d'achat.",
    source: "Nielsen – Trust in Advertising",
    accentColor: "#e91e8c",
  },
  {
    highlight: "9.8",
    suffix: "×",
    title: "UGC perçu plus impactant que l'influence",
    description:
      "Le contenu UGC attire fortement l'attention et influence le public mieux que le contenu produit par les marques seules.",
    source: "Stackla – Consumer Content Report",
    accentColor: "#6052ff",
  },
];

// 4 smartphones — chaque téléphone a sa vidéo + une phase de flottement décalée
const phones = [
  { src: "/videos/video1.mp4", floatDelay: 0,    floatAmp: 12 },
  { src: "/videos/video2.mp4", floatDelay: 0.6,  floatAmp: 10 },
  { src: "/videos/video3.mp4", floatDelay: 1.1,  floatAmp: 13 },
  { src: "/videos/video4.mp4", floatDelay: 0.3,  floatAmp: 11 },
];

// Dimensions du téléphone
const PHW = 110;
const PHH = 220;
const R   = 18;

export default function UGCStats() {
  const sectionRef   = useRef<HTMLElement>(null);
  const headlineRef  = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const phonesRef    = useRef<HTMLDivElement>(null);
  const ctaRef       = useRef<HTMLDivElement>(null);
  // refs individuels pour chaque wrapper de téléphone (float)
  const phoneWrapRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);
    return () => lenis.off("scroll", ScrollTrigger.update);
  }, [lenis]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // ── Headline ──
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 85%", once: true },
        }
      );

      // ── Stat cards stagger ──
      const cards = statsGridRef.current?.querySelectorAll(".stat-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.65, ease: "power3.out", stagger: 0.15,
            scrollTrigger: { trigger: statsGridRef.current, start: "top 80%", once: true },
          }
        );
      }

      // ── Counter-up ──
      const counters = statsGridRef.current?.querySelectorAll("[data-countup]");
      counters?.forEach((el) => {
        const target   = parseFloat(el.getAttribute("data-countup") || "0");
        const suffix   = el.getAttribute("data-suffix") || "";
        const isDecimal = !Number.isInteger(target);
        const obj = { value: 0 };
        gsap.to(obj, {
          value: target,
          duration: 1.8, ease: "power2.out",
          onUpdate() {
            el.textContent = (isDecimal ? obj.value.toFixed(1) : Math.round(obj.value).toString()) + suffix;
          },
          onComplete() {
            el.textContent = (isDecimal ? target.toFixed(1) : target.toString()) + suffix;
          },
          scrollTrigger: { trigger: statsGridRef.current, start: "top 80%", once: true },
        });
      });

      // ── Phones : reveal + SVG draw + float ──
      phones.forEach((phone, i) => {
        const wrap = phoneWrapRefs.current[i];
        if (!wrap) return;

        // État initial : téléphone invisible
        gsap.set(wrap, { opacity: 0, y: 30, scale: 0.94 });

        // Reveal au scroll
        gsap.to(wrap, {
          opacity: 1, y: 0, scale: 1,
          duration: 0.7, ease: "power2.out",
          delay: i * 0.12,
          scrollTrigger: { trigger: phonesRef.current, start: "top 82%", once: true },
        });

        if (prefersReducedMotion) return;

        // Float perpétuel : chaque téléphone flotte indépendamment
        gsap.to(wrap, {
          y: `-${phone.floatAmp}px`,
          duration: 2.8 + i * 0.3,
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          delay: phone.floatDelay,
        });
      });

      // ── CTA entrance ──
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 90%", once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-[#131313] relative overflow-hidden">
      <div className="section-divider mb-16" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#6052ff]/4 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">

        {/* Headline */}
        <div ref={headlineRef} style={{ opacity: 0 }} className="text-center mb-14">
          <h2 className="font-display font-800 text-2xl sm:text-3xl lg:text-4xl text-white leading-tight tracking-tight">
            L&apos;UGC est le format de publicité{" "}
            <span className="text-[#6052ff]">incontournable</span> en 2026.
          </h2>
        </div>

        {/* Stats grid */}
        <div ref={statsGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-20">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card card-surface p-8 flex flex-col gap-5" style={{ opacity: 0 }}>
              <span
                className="font-display font-900 text-5xl leading-none"
                style={{ color: stat.accentColor }}
                data-countup={stat.highlight}
                data-suffix={stat.suffix}
              >
                0{stat.suffix}
              </span>
              <h3 className="font-display font-700 text-sm text-white leading-snug">
                {stat.title}
              </h3>
              <p className="font-body text-sm text-[#9ca3af] leading-relaxed flex-1">
                {stat.description}
              </p>
              <p className="font-body text-xs text-white/20 italic border-t border-white/5 pt-4">
                Source : {stat.source}
              </p>
            </div>
          ))}
        </div>

        {/* ── Phone gallery ── */}
        <div
          ref={phonesRef}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16 items-end"
        >
          {phones.map((phone, i) => (
            <div
              key={i}
              ref={(el) => { phoneWrapRefs.current[i] = el; }}
              className="relative flex flex-col items-center"
              style={{ willChange: "transform" }}
            >
              {/* Corps du téléphone */}
              <div
                className="relative w-full"
                style={{
                  aspectRatio: `${PHW} / ${PHH}`,
                  background: "linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 40%, #111114 100%)",
                  borderRadius: `${R}px`,
                  padding: "6px",
                  boxShadow: `
                    0 0 0 1px rgba(255,255,255,0.07),
                    0 0 0 2px rgba(0,0,0,0.8),
                    0 20px 60px rgba(0,0,0,0.6),
                    inset 0 1px 0 rgba(255,255,255,0.05)
                  `,
                }}
              >
                {/* Dynamic Island */}
                <div
                  className="absolute z-20 bg-black rounded-full"
                  style={{ top: "8px", left: "50%", transform: "translateX(-50%)", width: "36px", height: "10px" }}
                />

                {/* Écran */}
                <div
                  className="relative overflow-hidden w-full h-full"
                  style={{ borderRadius: `${R - 4}px`, background: "#000" }}
                >
                  <video
                    src={phone.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="absolute inset-0 w-full h-full object-cover"
                  />

                  {/* Gradient overlay bas */}
                  <div
                    className="absolute bottom-0 inset-x-0 h-1/3 pointer-events-none"
                    style={{ background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)" }}
                  />

                  {/* Status bar */}
                  <div className="absolute top-0 inset-x-0 flex justify-between items-start px-3 pt-2 pointer-events-none">
                    <span className="font-display text-[7px] text-white/80 font-600">9:41</span>
                    <div className="flex gap-0.5 items-end mt-0.5">
                      {[3, 5, 7, 9].map((h) => (
                        <div key={h} className="w-0.5 bg-white/70 rounded-sm" style={{ height: `${h * 0.6}px` }} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Home indicator */}
                <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-white/20 rounded-full" />
              </div>

              {/* Reflet / glow sous le téléphone */}
              <div
                className="mt-3 w-3/4 h-3 rounded-full pointer-events-none"
                style={{
                  background: i % 2 === 0
                    ? "radial-gradient(ellipse, rgba(96,82,255,0.25) 0%, transparent 70%)"
                    : "radial-gradient(ellipse, rgba(233,30,140,0.2) 0%, transparent 70%)",
                  filter: "blur(6px)",
                }}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div ref={ctaRef} style={{ opacity: 0 }} className="flex flex-col items-center gap-5">
          <p className="font-body text-2xl text-[#9ca3af] text-center">
            Les types de contenu que vous pouvez obtenir dès à présent !
          </p>

          {/* Arrow deco */}
          <div className="flex gap-3">
            {[-1, 0, 1].map((rot) => (
              <svg
                key={rot}
                width="18" height="28"
                viewBox="0 0 18 28"
                fill="none"
                className="text-[#6052ff] opacity-50"
                style={{ transform: `rotate(${rot * 10}deg)` }}
              >
                <path
                  d="M9 2 L9 24 M3 18 L9 24 L15 18"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ))}
          </div>
          <a href="#contact" className="btn-primary btn-primary-pulse">
            Faire ma demande
          </a>
        </div>
      </div>

      <div className="section-divider mt-16" />
    </section>
  );
}
