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
  return (
    <section className="py-20 px-6 bg-[#131313] relative" id="comment">
      {/* Vertical line decoration */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#6052ff]/10 to-transparent pointer-events-none hidden lg:block" />

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <span className="font-display text-[11px] text-[#9ca3af] uppercase tracking-[0.2em] font-500">
            Process
          </span>
          <h2 className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-white mt-3 leading-tight tracking-tight">
            Comment ça marche ?
          </h2>
        </div>

        {/* Steps */}
        <div className="flex flex-col">
          {steps.map((step, i) => (
            <div key={i} className="relative flex gap-8 group">

              {/* Step number + connecting line */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center border border-[#6052ff]/30 bg-[#6052ff]/10 transition-all duration-300 group-hover:border-[#6052ff]/60 group-hover:bg-[#6052ff]/15"
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
