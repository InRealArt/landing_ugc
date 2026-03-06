"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "./LenisContext";

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
  const stickyRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepContentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepNumberBigRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stepCircleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.on("scroll", ScrollTrigger.update);
    return () => lenis.off("scroll", ScrollTrigger.update);
  }, [lenis]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      // ── Header : reveal simple avant le pin ──
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 82%", once: true },
        }
      );

      if (prefersReducedMotion) {
        stepRefs.current.forEach((el) => el && gsap.set(el, { opacity: 1 }));
        stepContentRefs.current.forEach((el) => el && gsap.set(el, { opacity: 1, x: 0, y: 0 }));
        stepNumberBigRefs.current.forEach((el) => el && gsap.set(el, { opacity: 0 }));
        return;
      }

      // ── États initiaux ──
      stepRefs.current.forEach((el) => el && gsap.set(el, { opacity: 0.15 }));
      stepContentRefs.current.forEach((el) => el && gsap.set(el, { opacity: 0, x: 60, y: 0 }));
      stepNumberBigRefs.current.forEach((el) => el && gsap.set(el, { opacity: 0, scale: 2.5, y: 30 }));
      stepCircleRefs.current.forEach((el) => el && gsap.set(el, { scale: 0.7, opacity: 0.3 }));
      gsap.set(progressBarRef.current, { scaleY: 0, transformOrigin: "top center" });

      // ── MASTER PIN timeline : 300vh de scroll pour 3 étapes ──
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: 1.8,
          pin: stickyRef.current,
          anticipatePin: 1,
        },
      });

      // Barre de progression qui se remplit sur toute la durée
      masterTl.to(progressBarRef.current, { scaleY: 1, ease: "none", duration: 1 }, 0);

      steps.forEach((_, i) => {
        const start = i / steps.length;          // 0, 0.33, 0.66
        const mid   = start + 0.08;              // point culminant du gros numéro
        const end   = start + 1 / steps.length; // fin de la fenêtre de l'étape

        // 1. Le gros numéro explose depuis le fond
        masterTl.to(
          stepNumberBigRefs.current[i],
          { opacity: 1, scale: 1, y: 0, ease: "power2.out", duration: 0.08 },
          start
        );
        // 2. Il se rétracte et disparaît
        masterTl.to(
          stepNumberBigRefs.current[i],
          { opacity: 0, scale: 0.3, y: -20, ease: "power2.in", duration: 0.07 },
          mid
        );

        // 3. Le cercle de l'étape active s'illumine
        masterTl.to(
          stepCircleRefs.current[i],
          { scale: 1, opacity: 1, ease: "back.out(1.5)", duration: 0.08 },
          start + 0.04
        );

        // 4. Le contenu glisse depuis la droite
        masterTl.to(
          stepContentRefs.current[i],
          { opacity: 1, x: 0, ease: "power2.out", duration: 0.12 },
          start + 0.06
        );

        // 5. L'item entier passe en "actif"
        masterTl.to(
          stepRefs.current[i],
          { opacity: 1, ease: "none", duration: 0.06 },
          start + 0.04
        );

        // 6. À la fin de sa fenêtre, l'étape s'estompe (sauf la dernière)
        if (i < steps.length - 1) {
          masterTl.to(
            stepRefs.current[i],
            { opacity: 0.2, ease: "none", duration: 0.04 },
            end - 0.02
          );
          masterTl.to(
            stepContentRefs.current[i],
            { opacity: 0.25, x: -20, ease: "power1.in", duration: 0.04 },
            end - 0.02
          );
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#131313]"
      id="comment"
      style={{ height: "420vh" }}
    >
      {/* ── Sticky container ── */}
      <div ref={stickyRef} className="relative w-full h-screen overflow-hidden px-6 flex flex-col justify-center">

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-[#6052ff]/4 blur-[120px] pointer-events-none" />

        <div className="max-w-5xl mx-auto w-full relative z-10">

          {/* Header */}
          <div ref={headerRef} style={{ opacity: 0 }} className="mb-14">
            <span className="font-display text-[11px] text-[#6052ff] uppercase tracking-[0.25em] font-500 block mb-3">
              Process
            </span>
            <h2 className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight">
              Comment ça marche ?
            </h2>
          </div>

          {/* Steps layout : progress bar gauche + étapes droite */}
          <div className="flex gap-8 lg:gap-14">

            {/* Barre de progression verticale */}
            <div className="relative flex-shrink-0 flex flex-col items-center pt-2">
              {/* Track */}
              <div className="w-px bg-white/6 absolute inset-y-0 left-1/2 -translate-x-1/2" />
              {/* Fill animé */}
              <div
                ref={progressBarRef}
                className="w-px absolute top-0 left-1/2 -translate-x-1/2"
                style={{
                  height: "100%",
                  background: "linear-gradient(to bottom, #6052ff, #e91e8c)",
                  transformOrigin: "top center",
                }}
              />

              {/* Cercles de chaque étape sur la track */}
              <div className="flex flex-col justify-between h-full py-2 gap-0" style={{ height: "260px" }}>
                {steps.map((step, i) => (
                  <div
                    key={i}
                    ref={(el) => { stepCircleRefs.current[i] = el; }}
                    className="relative w-10 h-10 rounded-xl flex items-center justify-center border border-[#6052ff]/30 bg-[#131313] z-10"
                    style={{ boxShadow: "0 0 0 4px #131313" }}
                  >
                    <span className="font-display font-900 text-sm text-[#6052ff]">{step.number}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Étapes */}
            <div className="flex flex-col gap-10 flex-1 relative" style={{ minHeight: "260px", justifyContent: "space-between" }}>
              {steps.map((step, i) => (
                <div
                  key={i}
                  ref={(el) => { stepRefs.current[i] = el; }}
                  className="relative flex flex-col gap-0"
                >
                  {/* Gros numéro de fond — effet cinématographique */}
                  <div
                    ref={(el) => { stepNumberBigRefs.current[i] = el; }}
                    aria-hidden="true"
                    className="absolute -left-4 -top-6 font-display font-900 text-[5rem] leading-none text-[#6052ff]/8 select-none pointer-events-none"
                    style={{ willChange: "transform, opacity" }}
                  >
                    {step.number}
                  </div>

                  {/* Contenu de l'étape */}
                  <div
                    ref={(el) => { stepContentRefs.current[i] = el; }}
                    className="relative flex flex-col gap-3"
                    style={{ willChange: "transform, opacity" }}
                  >
                    <span className="font-display text-[10px] text-[#6052ff]/50 uppercase tracking-[0.22em] font-600">
                      Étape {step.number}
                    </span>
                    <h3 className="font-display font-700 text-xl sm:text-2xl text-white leading-snug italic">
                      {step.title}
                    </h3>
                    <p className="font-body text-[#9ca3af] text-base leading-relaxed max-w-lg">
                      {step.description}
                    </p>
                    <a href={step.href} className="btn-primary w-fit mt-1">
                      {step.cta}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
