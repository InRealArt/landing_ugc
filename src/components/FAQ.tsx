"use client"

import { useState } from "react"

const blocks = [
  {
    id: "comprendre-offre",
    title: "Comprendre l'offre",
    faqs: [
      {
        question:
          "Qu'est-ce qui distingue InRealArt d'une plateforme UGC classique comme Billo ou Insense ?",
        answer:
          "Sur une plateforme, vous gérez vous-même le recrutement, les briefs, les révisions et la relation créateur. InRealArt est une agence : vous soumettez votre brief, nous sélectionnons l'artiste adapté à votre univers de marque, nous gérons la production et vous livrons les contenus finaux. En plus, nos créateurs sont des artistes avec une signature visuelle identifiable — ce qui produit des créas mémorables, pas juste fonctionnelles.",
      },
      {
        question:
          "Pourquoi collaborer avec des artistes plutôt qu'avec des créateurs UGC classiques ?",
        answer:
          "Un créateur UGC classique maîtrise un format. Un artiste a un univers. L'esthétique artistique échappe aux patterns visuels reconnus comme publicitaires par les algorithmes et les utilisateurs, ce qui améliore le thumb-stop rate et réduit le banner blindness. Pour les marques avec un positionnement premium ou un univers fort, c'est aussi un enjeu de cohérence et de brand safety.",
      },
      {
        question: "Quels formats de contenu pouvez-vous produire ?",
        answer:
          "Vidéos courtes (reels, TikTok, YouTube Shorts), photos produit, unboxing, témoignages visuels, contenus lifestyle. Précisez votre format et votre plateforme cible dans le brief — les artistes adaptent leur style et leur format en conséquence.",
      },
    ],
  },
  {
    id: "questions-operationnelles",
    title: "Questions opérationnelles (ads managers et chefs de projet)",
    faqs: [
      {
        question: "Quels droits d'utilisation sont inclus ?",
        answer:
          "Les droits paid media sont inclus dans chaque collaboration. La durée d'utilisation, le territoire et l'exclusivité sectorielle sont définis au moment du brief et confirmés dans le contrat. Si vous avez besoin de droits d'utilisation élargis (diffusion TV, usage international, exclusivité longue durée), mentionnez-le dès la demande initiale.",
      },
      {
        question: "Combien de révisions sont incluses ?",
        answer:
          "Chaque collaboration inclut un cycle de révisions. Si le contenu livré ne correspond pas au brief validé, nous nous engageons à corriger sans surcoût. Pour éviter les allers-retours, nous accompagnons la rédaction du brief en amont — un brief précis est la meilleure garantie d'un rendu conforme.",
      },
      {
        question: "Puis-je commander plusieurs contenus simultanément, avec plusieurs artistes ?",
        answer:
          "Oui. Indiquez le volume souhaité et les formats dans votre demande. Nous constituons une sélection d'artistes adaptée à votre brief et à votre calendrier de production. Pour des volumes importants ou des campagnes récurrentes, nous pouvons mettre en place un cadre contractuel sur mesure.",
      },
      {
        question: "Comment se déroule concrètement la livraison ?",
        answer:
          "Après validation du brief et de l'artiste sélectionné : vous expédiez vos produits si nécessaire, l'artiste produit le contenu, vous recevez les fichiers finaux (formats natifs haute résolution ou vidéo optimisée plateforme) dans les délais convenus, généralement moins d'une semaine. Toutes les étapes sont suivies par un interlocuteur dédié.",
      },
    ],
  },
  {
    id: "questions-business",
    title: "Questions business (directeurs marketing et agences)",
    faqs: [
      {
        question: "Quels sont vos tarifs ?",
        answer:
          "Il n'y a pas de frais mensuels ni d'abonnement. Vous payez à la collaboration, en fonction du nombre de contenus, du format et de l'artiste sélectionné. Pour obtenir une estimation, soumettez votre brief via le formulaire — nous vous revenons avec une proposition chiffrée sous 48h.",
      },
      {
        question: "Comment ça fonctionne pour une agence qui gère plusieurs clients ?",
        answer:
          "Nous proposons un programme partenaire agence. Vous centralisez les briefs pour vos clients, nous gérons la production artiste par artiste. Les conditions tarifaires et contractuelles sont adaptées au volume. Mentionnez que vous êtes une agence dans votre demande initiale.",
      },
      {
        question:
          "Puis-je obtenir des résultats de campagnes précédentes pour évaluer la performance des contenus ?",
        answer:
          "Oui, sur demande et sous NDA. Nous pouvons partager des cas clients avec métriques (CTR, ROAS, engagement rate) pour des secteurs proches du vôtre. C'est le meilleur moyen d'évaluer la pertinence de l'approche avant de lancer.",
      },
      {
        question: "InRealArt est-il adapté à mon secteur ?",
        answer:
          "Nos artistes couvrent une large gamme d'univers : beauté, mode, tech grand public, food, lifestyle, déco, bien-être. Si votre secteur est réglementé (pharmaceutique, finance, alcool), indiquez-le dans le brief — nous vérifierons la compatibilité avec les contraintes légales applicables avant de vous proposer un artiste.",
      },
    ],
  },
]

export default function FAQ() {
  const [openKey, setOpenKey] = useState<string | null>(null)

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

        {/* Navigation par blocs */}
        <nav className="flex flex-wrap justify-center gap-3 mb-12">
          {blocks.map((block) => (
            <a
              key={block.id}
              href={`#${block.id}`}
              className="font-display text-xs font-600 text-[#9ca3af] hover:text-[#6052ff] transition-colors px-3 py-2 rounded-lg border border-white/10 hover:border-[#6052ff]/30"
            >
              {block.title}
            </a>
          ))}
        </nav>

        <div className="flex flex-col gap-10">
          {blocks.map((block) => (
            <div key={block.id} id={block.id} className="scroll-mt-24">
              <h3 className="font-display font-700 text-lg text-white mb-4">
                {block.title}
              </h3>
              <div className="flex flex-col gap-3">
                {block.faqs.map((faq, i) => {
                  const key = `${block.id}-${i}`
                  const isOpen = openKey === key
                  return (
                    <div
                      key={key}
                      className={`card-surface overflow-hidden cursor-pointer transition-all duration-300 ${
                        isOpen ? "border-[#6052ff]/30" : ""
                      }`}
                      onClick={() => setOpenKey(isOpen ? null : key)}
                    >
                      <div className="flex items-center justify-between gap-4 p-6">
                        <h4 className="font-display font-700 text-sm sm:text-base text-white leading-snug">
                          {faq.question}
                        </h4>
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                            isOpen
                              ? "bg-[#6052ff] rotate-45"
                              : "bg-[#6052ff]/10 border border-[#6052ff]/20"
                          }`}
                        >
                          <svg
                            className="w-4 h-4 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2.5}
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 5v14M5 12h14"
                            />
                          </svg>
                        </div>
                      </div>
                      {isOpen && (
                        <div className="px-6 pb-6 border-t border-white/5">
                          <p className="font-body text-[#9ca3af] text-sm leading-relaxed mt-4 whitespace-pre-line">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="#contact" className="btn-primary btn-primary-pulse">
            Faire ma demande
          </a>
        </div>
      </div>
    </section>
  )
}
