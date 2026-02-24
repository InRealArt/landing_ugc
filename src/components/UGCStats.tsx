"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

const ugcVideos = [
  { label: "Aujourd\u2019hui", color: "linear-gradient(145deg, #1a0a2e, #131313)" },
  { label: "Aujourd\u2019hui", color: "linear-gradient(145deg, #0e1f2d, #131313)" },
  { label: "Aujourd\u2019hui", color: "linear-gradient(145deg, #1f1a0d, #131313)" },
  { label: "Aujourd\u2019hui", color: "linear-gradient(145deg, #0d2010, #131313)" },
];

export default function UGCStats() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const statsGridRef = useRef<HTMLDivElement>(null);
  const videosRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: headlineRef.current, start: "top 85%", toggleActions: "play none none none" },
        }
      );

      // Stat cards stagger
      const cards = statsGridRef.current?.querySelectorAll(".stat-card");
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 50, scale: 0.96 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.65, ease: "power3.out", stagger: 0.15,
            scrollTrigger: { trigger: statsGridRef.current, start: "top 80%", toggleActions: "play none none none" },
          }
        );
      }

      // Counter-up for each stat number
      const counters = statsGridRef.current?.querySelectorAll("[data-countup]");
      counters?.forEach((el) => {
        const target = parseFloat(el.getAttribute("data-countup") || "0");
        const suffix = el.getAttribute("data-suffix") || "";
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
          scrollTrigger: { trigger: statsGridRef.current, start: "top 80%", toggleActions: "play none none none" },
        });
      });

      // Video cards — cascade reveal
      const videoCards = videosRef.current?.querySelectorAll(".video-card");
      if (videoCards) {
        gsap.fromTo(
          videoCards,
          { opacity: 0, y: 30, scale: 0.92 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.55, ease: "power2.out", stagger: 0.1,
            scrollTrigger: { trigger: videosRef.current, start: "top 85%", toggleActions: "play none none none" },
          }
        );
      }

      // CTA entrance
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: "power3.out",
          scrollTrigger: { trigger: ctaRef.current, start: "top 90%", toggleActions: "play none none none" },
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
        <div ref={statsGridRef} className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
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

        {/* Video gallery */}
        <div ref={videosRef} className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {ugcVideos.map((v, i) => (
            <div
              key={i}
              className="video-card relative aspect-[9/16] rounded-xl overflow-hidden cursor-pointer group border border-white/6 hover:border-[#6052ff]/30 transition-all duration-300"
              style={{ background: v.color, opacity: 0 }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#6052ff]/20 border border-[#6052ff]/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-5 h-5 text-[#6052ff] ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
              <div className="absolute top-3 left-3">
                <span className="font-display text-[9px] font-700 text-white/60 bg-black/40 backdrop-blur-sm rounded px-2 py-1">
                  {v.label}
                </span>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#6052ff]/40" />
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
