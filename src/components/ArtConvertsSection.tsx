"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useLenis } from "./LenisContext"

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    title: "Mémorabilité",
    description:
      "Une esthétique reconnaissable ancre la marque dans la mémoire long terme, pas seulement dans le feed.",
    accentColor: "#6052ff",
    icon: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  },
  {
    title: "Engagement",
    description:
      "Les contenus à forte identité visuelle génèrent plus de partages organiques et de commentaires que les UGC standards.",
    accentColor: "#e91e8c",
    icon: "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  },
  {
    title: "Brand safety",
    description:
      "Vos créas reflètent votre positionnement, pas celui de n'importe quel créateur de contenu.",
    accentColor: "#6052ff",
    icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
]

export default function ArtConvertsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const card0Ref = useRef<HTMLDivElement>(null)
  const card1Ref = useRef<HTMLDivElement>(null)
  const card2Ref = useRef<HTMLDivElement>(null)
  const lenis = useLenis()

  // Lenis → ScrollTrigger sync
  useEffect(() => {
    if (!lenis) return
    lenis.on("scroll", ScrollTrigger.update)
    return () => lenis.off("scroll", ScrollTrigger.update)
  }, [lenis])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const ctx = gsap.context(() => {
      // ── États initiaux ──
      gsap.set(headlineRef.current, { opacity: 0, y: 60, clipPath: "inset(0 0 100% 0)" })
      gsap.set(card0Ref.current, { opacity: 0, x: "-120%", rotateY: 8 })
      gsap.set(card1Ref.current, { opacity: 0, y: 100, rotateX: 12, scale: 0.88 })
      gsap.set(card2Ref.current, { opacity: 0, x: "120%", rotateY: -8 })

      if (prefersReducedMotion) {
        gsap.set(
          [headlineRef.current, card0Ref.current, card1Ref.current, card2Ref.current],
          { opacity: 1, x: 0, y: 0, rotateY: 0, rotateX: 0, scale: 1, clipPath: "inset(0 0 0% 0)" }
        )
        return
      }

      // ── PIN : la section sticky pendant 2.5× sa hauteur ──
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=250%",
          scrub: 1.2,
          pin: stickyRef.current,
          anticipatePin: 1,
        },
      })

      // 0→0.15 : vidéo dézoom (scale 1.1 → 1)
      tl.fromTo(
        videoRef.current,
        { scale: 1.12 },
        { scale: 1, ease: "none" },
        0
      )

      // 0→0.2 : overlay s'éclaircit légèrement pour laisser place aux cards
      tl.fromTo(
        overlayRef.current,
        { opacity: 1 },
        { opacity: 0.55, ease: "none" },
        0
      )

      // 0.05→0.35 : headline clipPath reveal
      tl.to(
        headlineRef.current,
        {
          opacity: 1, y: 0,
          clipPath: "inset(0 0 0% 0)",
          ease: "power3.out",
          duration: 0.3,
        },
        0.05
      )

      // 0.3→0.65 : card gauche entre par la gauche
      tl.to(
        card0Ref.current,
        {
          opacity: 1, x: 0, rotateY: 0,
          ease: "power2.out",
          duration: 0.35,
        },
        0.3
      )

      // 0.35→0.70 : card centrale monte du bas
      tl.to(
        card1Ref.current,
        {
          opacity: 1, y: 0, rotateX: 0, scale: 1,
          ease: "power2.out",
          duration: 0.35,
        },
        0.35
      )

      // 0.4→0.75 : card droite entre par la droite
      tl.to(
        card2Ref.current,
        {
          opacity: 1, x: 0, rotateY: 0,
          ease: "power2.out",
          duration: 0.35,
        },
        0.4
      )

      // 0.8→1 : légère remontée des cards ensemble (polish)
      tl.to(
        [card0Ref.current, card1Ref.current, card2Ref.current],
        {
          y: -12,
          ease: "power1.inOut",
          duration: 0.2,
          stagger: 0.04,
        },
        0.78
      )

    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    // Hauteur 350vh pour donner de la place au pin
    <section ref={sectionRef} className="relative bg-[#0d0d0d]" style={{ height: "350vh" }}>

      {/* ── Sticky container — ce qui reste à l'écran pendant le pin ── */}
      <div ref={stickyRef} className="relative w-full h-screen overflow-hidden">

        {/* Vidéo full-width */}
        <video
          ref={videoRef}
          src="/videos/video_home_page.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ willChange: "transform" }}
        />

        {/* Overlay sombre */}
        <div
          ref={overlayRef}
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, rgba(10,10,10,0.72) 0%, rgba(10,10,10,0.55) 50%, rgba(10,10,10,0.82) 100%)",
          }}
        />

        {/* Grain texture subtil */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
            backgroundSize: "128px",
          }}
        />

        {/* ── Contenu centré ── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-6 gap-14"
          style={{ perspective: "1200px" }}
        >
          {/* Headline */}
          <div ref={headlineRef} className="text-center max-w-4xl">
            <span className="font-display text-[11px] text-[#6052ff] uppercase tracking-[0.25em] font-500 block mb-5">
              Pourquoi ça marche
            </span>
            <h2 className="font-display font-900 text-4xl sm:text-5xl lg:text-[3.8rem] text-white leading-[1.05] tracking-tight">
              L&apos;art,{" "}
              <span className="text-[#6052ff]">ça convertit</span>{" "}
              mieux que vous<br className="hidden lg:block" /> ne le pensez.
            </h2>
          </div>

          {/* Cards row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl">

            {/* Card 0 — entre par la gauche */}
            <div
              ref={card0Ref}
              className="relative rounded-2xl p-7 flex flex-col gap-4 overflow-hidden"
              style={{
                background: "rgba(20,18,35,0.75)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(96,82,255,0.2)",
                willChange: "transform",
              }}
            >
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top left, ${cards[0].accentColor}22 0%, transparent 65%)`,
                }}
              />
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${cards[0].accentColor}18`, border: `1px solid ${cards[0].accentColor}30` }}
              >
                <svg className="w-5 h-5" fill="none" stroke={cards[0].accentColor} strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={cards[0].icon} />
                </svg>
              </div>
              <h3 className="font-display font-800 text-base text-white" style={{ color: cards[0].accentColor }}>
                {cards[0].title}
              </h3>
              <p className="font-body text-sm text-white/55 leading-relaxed flex-1">
                {cards[0].description}
              </p>
              <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${cards[0].accentColor}40, transparent)` }} />
            </div>

            {/* Card 1 — monte du bas */}
            <div
              ref={card1Ref}
              className="relative rounded-2xl p-7 flex flex-col gap-4 overflow-hidden md:translate-y-6"
              style={{
                background: "rgba(25,15,28,0.75)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(233,30,140,0.2)",
                willChange: "transform",
              }}
            >
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top, ${cards[1].accentColor}20 0%, transparent 65%)`,
                }}
              />
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${cards[1].accentColor}18`, border: `1px solid ${cards[1].accentColor}30` }}
              >
                <svg className="w-5 h-5" fill="none" stroke={cards[1].accentColor} strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={cards[1].icon} />
                </svg>
              </div>
              <h3 className="font-display font-800 text-base text-white" style={{ color: cards[1].accentColor }}>
                {cards[1].title}
              </h3>
              <p className="font-body text-sm text-white/55 leading-relaxed flex-1">
                {cards[1].description}
              </p>
              <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${cards[1].accentColor}40, transparent)` }} />
            </div>

            {/* Card 2 — entre par la droite */}
            <div
              ref={card2Ref}
              className="relative rounded-2xl p-7 flex flex-col gap-4 overflow-hidden"
              style={{
                background: "rgba(20,18,35,0.75)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(96,82,255,0.2)",
                willChange: "transform",
              }}
            >
              <div
                className="absolute inset-0 opacity-30 pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse at top right, ${cards[2].accentColor}22 0%, transparent 65%)`,
                }}
              />
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${cards[2].accentColor}18`, border: `1px solid ${cards[2].accentColor}30` }}
              >
                <svg className="w-5 h-5" fill="none" stroke={cards[2].accentColor} strokeWidth={1.8} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d={cards[2].icon} />
                </svg>
              </div>
              <h3 className="font-display font-800 text-base text-white" style={{ color: cards[2].accentColor }}>
                {cards[2].title}
              </h3>
              <p className="font-body text-sm text-white/55 leading-relaxed flex-1">
                {cards[2].description}
              </p>
              <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${cards[2].accentColor}40, transparent)` }} />
            </div>
          </div>
        </div>

        {/* Vignette bas */}
        <div className="absolute bottom-0 inset-x-0 h-32 pointer-events-none"
          style={{ background: "linear-gradient(to top, #0d0d0d 0%, transparent 100%)" }}
        />
      </div>
    </section>
  )
}
