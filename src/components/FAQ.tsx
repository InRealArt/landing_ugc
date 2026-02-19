"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Qu'est ce qu'un UGC ?",
    answer:
      "L'UGC (User Generated Content ou contenu généré par les utilisateurs) est un contenu centré sur la marque, créé par des consommateurs ou créateurs, puis partagé sur les réseaux sociaux. Contrairement au marketing d'influence, l'UGC met le produit et l'expérience au cœur du message plutôt que la notoriété de la personne qui le présente.",
  },
  {
    question: "Quelle est la différence entre un créateur UGC et un artiste InRealArt ?",
    answer:
      "Un créateur UGC présente un produit. Un artiste le met en scène.\n\nNos artistes ne se contentent pas de montrer un produit : ils transmettent une émotion, racontent une histoire et créent une connexion forte avec le public. Leur approche artistique permet au spectateur de s'identifier, de se projeter et de ressentir le produit avant même de l'acheter. C'est une expérience narrative, pas une simple démonstration.",
  },
  {
    question: "Pourquoi collaborer avec des artistes plutôt qu'avec des influenceurs traditionnels ?",
    answer:
      "Les influenceurs vendent souvent leur image. Les artistes transmettent une vision.\n\nUn artiste crée un message universel, émotionnel et intemporel. Le public se reconnaît dans son expression sans ressentir la pression commerciale directe. Cela génère une confiance plus naturelle, un attachement plus durable et une perception premium de la marque.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 bg-[#131313]" id="faq">
      <div className="section-divider mb-16" />

      <div className="max-w-3xl mx-auto">

        <div className="text-center mb-14">
          <span className="font-display text-[11px] text-[#9ca3af] uppercase tracking-[0.2em] font-500">
            FAQ
          </span>
          <h2 className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight mt-3">
            Vous avez des questions ?
            <br />
            <span className="text-[#6052ff]">On a les réponses !</span>
          </h2>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`card-surface overflow-hidden cursor-pointer transition-all duration-300 ${
                  isOpen ? "border-[#6052ff]/30" : ""
                }`}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                {/* Question header */}
                <div className="flex items-center justify-between gap-4 p-6">
                  <h3 className="font-display font-700 text-sm sm:text-base text-white leading-snug">
                    {faq.question}
                  </h3>
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                      isOpen
                        ? "bg-[#6052ff] rotate-45"
                        : "bg-[#6052ff]/10 border border-[#6052ff]/20"
                    }`}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
                    </svg>
                  </div>
                </div>

                {/* Answer */}
                {isOpen && (
                  <div className="px-6 pb-6 border-t border-white/5">
                    <p className="font-body text-[#9ca3af] text-sm leading-relaxed mt-4 whitespace-pre-line">
                      {faq.answer}
                    </p>
                    <a href="#contact" className="btn-primary mt-5 w-fit">
                      Faire ma demande
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
