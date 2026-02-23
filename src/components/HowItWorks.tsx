"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: "01",
    title: "Trouvez le bon artiste",
    description:
      "Naviguez parmi nos artistes internationaux et émergeants et découvrez les profils parfaits pour vos projets.",
    cta: "Voir nos artistes",
    href: "#artistes",
  },
  {
    number: "02",
    title: "Présentez votre projet et négociez",
    description:
      "Proposez-nous une collaboration claire et concise, nous reviendrons vers vous avec une offre personnalisée.",
    cta: "Faire ma demande",
    href: "#contact",
  },
  {
    number: "03",
    title: "Suivez les étapes, et recevez votre contenu !",
    description:
      "Déposez vos instructions (briefs, scripts, contrats, etc.), envoyez vos produits et quelques jours plus tard… les créateurs livrent vos UGC !",
    cta: "Faire ma demande",
    href: "#contact",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header reveal
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Connecting line draw
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleY: 0, transformOrigin: "top center" },
          {
            scaleY: 1, duration: 1.4, ease: "power2.inOut",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Steps stagger reveal
      const stepItems = stepsRef.current?.querySelectorAll(".step-item");
      if (stepItems) {
        gsap.fromTo(
          stepItems,
          { opacity: 0, x: -40 },
          {
            opacity: 1, x: 0,
            duration: 0.7, ease: "power3.out",
            stagger: 0.2,
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Number circles — scale pop
      const circles = stepsRef.current?.querySelectorAll(".step-circle");
      if (circles) {
        gsap.fromTo(
          circles,
          { scale: 0.5, opacity: 0 },
          {
            scale: 1, opacity: 1,
            duration: 0.5, ease: "back.out(1.8)",
            stagger: 0.2,
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 px-6 bg-[#131313] relative" id="comment">
      {/* Vertical line decoration */}
      <div
        ref={lineRef}
        className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#6052ff]/10 to-transparent pointer-events-none hidden lg:block"
      />

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div ref={headerRef} style={{ opacity: 0 }} className="mb-16">
          <span className="font-display text-[11px] text-[#9ca3af] uppercase tracking-[0.2em] font-500">
            Process
          </span>
          <h2 className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-white mt-3 leading-tight tracking-tight">
            Comment ça marche ?
          </h2>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="flex flex-col">
          {steps.map((step, i) => (
            <div key={i} className="step-item relative flex gap-8 group" style={{ opacity: 0 }}>

              {/* Step number + connecting line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="step-circle w-14 h-14 rounded-xl flex items-center justify-center border border-[#6052ff]/30 bg-[#6052ff]/10 transition-all duration-300 group-hover:border-[#6052ff]/60 group-hover:bg-[#6052ff]/15"
                  style={{ opacity: 0 }}
                >
                  <span className="font-display font-900 text-xl text-[#6052ff]">
                    {step.number}
                  </span>
                </div>
                {i < steps.length - 1 && (
                  <div className="w-px flex-1 mt-3 mb-3 bg-gradient-to-b from-[#6052ff]/30 to-transparent min-h-[40px]" />
                )}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4 pb-14 flex-1">
                <span className="font-display text-[10px] text-[#6052ff]/60 uppercase tracking-[0.2em] font-600 mt-1">
                  Étape {step.number}
                </span>
                <h3 className="font-display font-700 text-xl sm:text-2xl text-white leading-snug italic">
                  {step.title}
                </h3>
                <p className="font-body text-[#9ca3af] text-base leading-relaxed max-w-xl">
                  {step.description}
                </p>
                <a href={step.href} className="btn-primary w-fit">
                  {step.cta}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
