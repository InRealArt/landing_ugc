"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const cards = [
  {
    title: "Mémorabilité",
    description:
      "Une esthétique reconnaissable ancre la marque dans la mémoire long terme, pas seulement dans le feed.",
    accentColor: "#6052ff",
  },
  {
    title: "Engagement",
    description:
      "Les contenus à forte identité visuelle génèrent plus de partages organiques et de commentaires que les UGC standards.",
    accentColor: "#e91e8c",
  },
  {
    title: "Brand safety",
    description:
      "Vos créas reflètent votre positionnement, pas celui de n'importe quel créateur de contenu.",
    accentColor: "#6052ff",
  },
]

export default function ArtConvertsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const dividerTopRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const cardsGridRef = useRef<HTMLDivElement>(null)
  const dividerBottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 82%",
          toggleActions: "play none none none",
        },
        defaults: { ease: "power3.out" },
      })

      // Divider top — line draw
      tl.fromTo(
        dividerTopRef.current,
        { scaleX: 0, transformOrigin: "left center" },
        { scaleX: 1, duration: 0.6 }
      )
        // Glow fade in
        .fromTo(
          glowRef.current,
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
          "-=0.3"
        )
        // Headline — clipPath reveal
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 36, clipPath: "inset(0 0 100% 0)" },
          { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)", duration: 0.75 },
          "-=0.5"
        )
        // Cards stagger
        .fromTo(
          cardsGridRef.current?.querySelectorAll(".art-converts-card") ?? [],
          { opacity: 0, y: 48, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.15,
            ease: "power3.out",
          },
          "-=0.4"
        )
        // Divider bottom — line draw
        .fromTo(
          dividerBottomRef.current,
          { scaleX: 0, transformOrigin: "right center" },
          { scaleX: 1, duration: 0.5 },
          "-=0.6"
        )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 bg-[#131313] relative overflow-hidden"
    >
      <div ref={dividerTopRef} className="section-divider mb-16" />

      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#6052ff]/4 blur-[100px] pointer-events-none"
        style={{ opacity: 0 }}
      />

      <div className="max-w-7xl mx-auto relative">
        <div
          ref={headlineRef}
          style={{ opacity: 0 }}
          className="text-center mb-14"
        >
          <h2 className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
            L&apos;art, ça{" "}
            <span className="text-[#6052ff]">convertit</span>{" "}
            mieux que vous ne le pensez.
          </h2>
        </div>

        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {cards.map((card, i) => (
            <div
              key={i}
              className="art-converts-card card-surface p-8 flex flex-col gap-4"
              style={{ opacity: 0 }}
            >
              <h3
                className="font-display font-700 text-lg text-white leading-snug"
                style={{ color: card.accentColor }}
              >
                {card.title}
              </h3>
              <p className="font-body text-sm text-[#9ca3af] leading-relaxed flex-1">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div ref={dividerBottomRef} className="section-divider mt-16" />
    </section>
  )
}
