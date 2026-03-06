"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "./LenisContext";

gsap.registerPlugin(ScrollTrigger);

// Artialy (Victialy Nguyen) — vidéos .mov depuis Firebase
const VIDEOS = [
  "https://firebasestorage.googleapis.com/v0/b/inrealartlanding-3a094.appspot.com/o/artistsUGC%2FVictialy%20Nguyen%2Fmedia-1771974278185-0.mov?alt=media&token=dbbceed7-f003-4c80-a434-e8e030cec238",
  "https://firebasestorage.googleapis.com/v0/b/inrealartlanding-3a094.appspot.com/o/artistsUGC%2FVictialy%20Nguyen%2Fmedia-1771974282079-1.mov?alt=media&token=06dbfa41-b9ac-4bf6-ad2f-308f0f000a38",
  "https://firebasestorage.googleapis.com/v0/b/inrealartlanding-3a094.appspot.com/o/artistsUGC%2FVictialy%20Nguyen%2Fmedia-1771974284282-2.mov?alt=media&token=aca20cfe-6fcc-4b4c-979a-ef895530bea8",
  "https://firebasestorage.googleapis.com/v0/b/inrealartlanding-3a094.appspot.com/o/artistsUGC%2FVictialy%20Nguyen%2Fmedia-1771974288369-3.mov?alt=media&token=df62b6ff-e578-4040-8236-f8202c703d4f",
];

function randomVideo() {
  return VIDEOS[Math.floor(Math.random() * VIDEOS.length)];
}

export default function PhoneShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const handRef = useRef<HTMLDivElement>(null);
  const handLeftRef = useRef<HTMLDivElement>(null);
  const handRightRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lenis = useLenis();

  // Connect Lenis → ScrollTrigger so scrub works with smooth scroll
  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);
    return () => lenis.off("scroll", ScrollTrigger.update);
  }, [lenis]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // ── Headline + phone : révèle dès l'entrée dans le viewport (avant le pin)
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 85%", once: true },
        }
      );
      gsap.fromTo(
        phoneRef.current,
        { opacity: 0, y: 70, rotateX: 10, scale: 0.92 },
        {
          opacity: 1, y: 0, rotateX: 0, scale: 1,
          duration: 1.1, ease: "power3.out",
          transformPerspective: 1200,
          scrollTrigger: { trigger: phoneRef.current, start: "top 88%", once: true },
        }
      );

      if (prefersReducedMotion) {
        gsap.set(handRef.current, { opacity: 1 });
        gsap.set(handLeftRef.current, { x: "-8%", y: "-4%" });
        gsap.set(handRightRef.current, { x: "8%", y: "-4%" });
        gsap.set(glowRef.current, { opacity: 1, scale: 1.6 });
        return;
      }

      // ── États initiaux des mains (hors champ)
      gsap.set(handRef.current, { opacity: 0 });
      gsap.set(handLeftRef.current,  { x: "-120%", y: "30%" });
      gsap.set(handRightRef.current, { x: "120%",  y: "30%" });
      gsap.set(glowRef.current, { opacity: 0, scale: 0.4 });

      // ── PIN : la section sticky pendant 300% — plus de scroll = mains plus lentes
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          // scrub élevé = inertie forte, le mouvement colle au scroll avec retard physique
          scrub: 3,
          pin: stickyRef.current,
          anticipatePin: 1,
        },
      });

      // 0→0.06 : fade-in rapide du wrapper dès que le pin se déclenche
      tl.to(handRef.current, { opacity: 1, ease: "none", duration: 0.06 }, 0);

      // 0→0.72 : convergence principale — étirée sur 72% de la timeline
      // ease:"none" + scrub:3 = le mouvement EST le scroll, pas d'accélération propre
      tl.to(handLeftRef.current,  { x: "-8%", y: "-4%", ease: "none", duration: 0.72 }, 0);
      tl.to(handRightRef.current, { x: "8%",  y: "-4%", ease: "none", duration: 0.72 }, 0);

      // 0.45→0.72 : le glow apparaît seulement quand les mains sont proches
      tl.fromTo(
        glowRef.current,
        { opacity: 0, scale: 0.4 },
        { opacity: 1, scale: 1.8, ease: "none", duration: 0.27 },
        0.45
      );

      // 0.72→1.0 : mains figées en position finale, glow se stabilise — pas de retrait
      tl.to(glowRef.current, { scale: 1.4, opacity: 0.9, ease: "none", duration: 0.28 }, 0.72);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0d0d0d]"
      style={{ height: "400vh" }}
    >
      {/* ── Sticky container — reste à l'écran pendant le pin ── */}
      <div ref={stickyRef} className="relative w-full h-screen overflow-hidden px-6">

      {/* ── Background noise + gradient ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#131313] via-[#0a0a0a] to-[#131313]" />
        {/* Violet glow center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-[#6052ff]/5 blur-[120px]" />
        {/* Accent top-right */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#6052ff]/3 blur-[100px]" />
      </div>

      {/* ── Michel-Ange — Création d'Adam — parallax split ── */}
      {/*
        Wrapper : positionné pour aligner les doigts avec le bouton CTA.
        mask-image sur le wrapper entier = fondu sur les 4 bords, propre.
      */}
      <div
        ref={handRef}
        aria-hidden="true"
        className="absolute inset-x-0 select-none pointer-events-none"
        style={{
          opacity: 0,
          height: "380px",
          bottom: "-30px",
          overflow: "hidden",
          // mask-image : fondu gauche 20%, plein centre, fondu droit 20%, fondu bas 30%
          maskImage: "linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%), linear-gradient(to top, transparent 0%, black 35%, black 100%)",
          maskComposite: "intersect",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 22%, black 78%, transparent 100%), linear-gradient(to top, transparent 0%, black 35%, black 100%)",
          WebkitMaskComposite: "source-in",
        }}
      >
        {/* Halo de fond violet */}
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-[600px] h-[100px] rounded-full bg-[#6052ff]/10 blur-[70px]" />

        {/* Main GAUCHE — moitié gauche de l'image, converge vers la droite */}
        <div
          ref={handLeftRef}
          className="absolute inset-0"
          style={{ willChange: "transform" }}
        >
          <Image
            src="/images/michelangelo-hand.png"
            alt=""
            fill
            className="object-contain object-center"
            style={{
              mixBlendMode: "multiply",
              filter: "invert(1) brightness(0.52) sepia(0.4) hue-rotate(215deg) saturate(1.7)",
              opacity: 0.9,
              clipPath: "inset(0 50% 0 0)",
            }}
            priority={false}
          />
        </div>

        {/* Main DROITE — moitié droite de l'image, converge vers la gauche */}
        <div
          ref={handRightRef}
          className="absolute inset-0"
          style={{ willChange: "transform" }}
        >
          <Image
            src="/images/michelangelo-hand.png"
            alt=""
            fill
            className="object-contain object-center"
            style={{
              mixBlendMode: "multiply",
              filter: "invert(1) brightness(0.52) sepia(0.4) hue-rotate(215deg) saturate(1.7)",
              opacity: 0.9,
              clipPath: "inset(0 0 0 50%)",
            }}
            priority={false}
          />
        </div>

        {/* Lueur entre les doigts — s'intensifie au scroll */}
        <div
          ref={glowRef}
          className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "140px",
            height: "140px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(96,82,255,0.95) 0%, rgba(96,82,255,0.35) 45%, transparent 70%)",
            filter: "blur(14px)",
            mixBlendMode: "screen",
            opacity: 0,
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="max-w-5xl mx-auto relative z-10 flex flex-col items-center justify-center gap-16 h-full py-24">

        {/* Headline */}
        <div ref={headlineRef} style={{ opacity: 0 }} className="text-center">
          <span className="font-display text-[11px] text-[#6052ff] uppercase tracking-[0.25em] font-500 block mb-4">
            Contenu authentique
          </span>
          <h2 className="font-display font-900 text-4xl sm:text-5xl lg:text-[4rem] leading-[1.05] tracking-tight text-white">
            Du vrai art.{" "}
            <span className="text-[#6052ff]">Dans ton feed.</span>
          </h2>
          <p className="font-body text-[#9ca3af] text-lg mt-6 max-w-xl mx-auto leading-relaxed">
            Artialy crée du contenu UGC qui capte l'attention en 2 secondes.
            Pas un influenceur. Un artiste.
          </p>
        </div>

        {/* Phone mockup */}
        <div ref={phoneRef} style={{ opacity: 0 }} className="relative">

          {/* Outer glow */}
          <div className="absolute inset-[-20px] rounded-[52px] bg-[#6052ff]/8 blur-[40px]" />

          {/* Phone shell */}
          <div
            className="relative w-[280px] sm:w-[300px]"
            style={{
              background: "linear-gradient(145deg, #2a2a2e 0%, #1a1a1e 40%, #111114 100%)",
              borderRadius: "44px",
              padding: "10px",
              boxShadow: `
                0 0 0 1px rgba(255,255,255,0.08),
                0 0 0 2px rgba(0,0,0,0.8),
                0 30px 80px rgba(0,0,0,0.7),
                inset 0 1px 0 rgba(255,255,255,0.06)
              `,
            }}
          >
            {/* Dynamic island */}
            <div className="absolute top-[14px] left-1/2 -translate-x-1/2 z-20 w-[88px] h-[26px] bg-black rounded-full flex items-center justify-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#1a1a1a] border border-white/10" />
              <div className="w-3.5 h-3.5 rounded-full bg-[#1a1a1a] border border-white/10" />
            </div>

            {/* Screen */}
            <div
              className="relative overflow-hidden"
              style={{
                borderRadius: "36px",
                aspectRatio: "9/19.5",
                background: "#000",
              }}
            >
              {/* Video */}
              <video
                ref={videoRef}
                src={randomVideo()}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Screen overlay — UI chrome */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Status bar */}
                <div className="absolute top-0 inset-x-0 h-12 bg-gradient-to-b from-black/60 to-transparent flex items-start justify-between px-5 pt-2.5">
                  <span className="font-display text-[10px] text-white/80 font-600">9:41</span>
                  <div className="flex items-center gap-1 mt-0.5">
                    {/* Signal */}
                    <div className="flex gap-0.5 items-end">
                      {[3,5,7,9].map(h => (
                        <div key={h} className="w-1 bg-white/70 rounded-sm" style={{ height: `${h}px` }} />
                      ))}
                    </div>
                    {/* Wifi */}
                    <svg className="w-3 h-3 text-white/70" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M1.5 8.5a15 15 0 0121 0M5 12a11 11 0 0114 0M8.5 15.5a7 7 0 017 0M12 19h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"/>
                    </svg>
                    {/* Battery */}
                    <div className="flex items-center gap-0.5">
                      <div className="w-5 h-2.5 rounded-sm border border-white/60 flex items-center px-0.5">
                        <div className="h-1.5 bg-white/80 rounded-sm w-3/4" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom overlay — artist info */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent pt-12 pb-5 px-4">
                  <div className="flex items-end justify-between">
                    <div className="flex flex-col gap-1.5">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#6052ff] flex items-center justify-center">
                          <span className="font-display text-[9px] font-800 text-white">A</span>
                        </div>
                        <span className="font-display text-xs font-700 text-white">@artialy</span>
                      </div>
                      <p className="font-body text-[10px] text-white/70 max-w-[160px] leading-snug">
                        Contenu UGC artistique ✨
                      </p>
                    </div>
                    {/* Actions — vrais logos réseaux sociaux */}
                    <div className="flex flex-col items-center gap-3">
                      {/* TikTok */}
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
                          </svg>
                        </div>
                        <span className="font-display text-[9px] text-white/70 font-600">12K</span>
                      </div>
                      {/* Instagram */}
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                          </svg>
                        </div>
                        <span className="font-display text-[9px] text-white/70 font-600">8.4K</span>
                      </div>
                      {/* YouTube */}
                      <div className="flex flex-col items-center gap-0.5">
                        <div className="w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                          </svg>
                        </div>
                        <span className="font-display text-[9px] text-white/70 font-600">2.1K</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Play indicator — subtle pulse */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="w-12 h-12 rounded-full bg-black/20 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Home indicator */}
            <div className="flex justify-center mt-2.5">
              <div className="w-24 h-1 bg-white/20 rounded-full" />
            </div>
          </div>

          {/* Floating stat badge — top left */}
          <div className="absolute -left-16 top-16 bg-[#1d1c1c]/90 backdrop-blur-md border border-[#6052ff]/20 rounded-2xl px-4 py-3 shadow-2xl hidden sm:flex items-center gap-3 animate-float">
            <div className="w-8 h-8 rounded-xl bg-[#6052ff]/15 flex items-center justify-center">
              <svg className="w-4 h-4 text-[#6052ff]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
            </div>
            <div>
              <p className="font-display text-xs font-800 text-white">10× plus engageant</p>
              <p className="font-body text-[10px] text-[#9ca3af]">vs contenu de marque</p>
            </div>
          </div>

          {/* Floating platform badge — bottom right */}
          <div
            className="absolute -right-14 bottom-24 bg-[#1d1c1c]/90 backdrop-blur-md border border-white/8 rounded-2xl px-4 py-3 shadow-2xl hidden sm:flex items-center gap-3"
            style={{ animation: "float 3.5s ease-in-out 0.8s infinite" }}
          >
            <div className="flex gap-1.5">
              {/* TikTok */}
              <div className="w-6 h-6 rounded-lg bg-black flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.75a4.85 4.85 0 01-1.01-.06z"/>
                </svg>
              </div>
              {/* Instagram */}
              <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fd5949 45%, #d6249f 60%, #285AEB 90%)" }}>
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              {/* YouTube */}
              <div className="w-6 h-6 rounded-lg bg-[#FF0000] flex items-center justify-center">
                <svg className="w-3.5 h-3.5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </div>
            </div>
            <div>
              <p className="font-display text-[10px] font-700 text-white">Multi-plateforme</p>
              <p className="font-body text-[9px] text-[#9ca3af]">TikTok · Insta · YouTube</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <a
          href="#artistes"
          className="btn-outline text-sm"
        >
          Voir tous nos artistes →
        </a>
      </div>

      </div> {/* /stickyRef */}
    </section>
  );
}
