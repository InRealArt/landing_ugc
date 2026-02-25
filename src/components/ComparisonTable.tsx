const rows = [
  {
    feature: "Frais mensuels fixes",
    ira: "0 €",
    platforms: "200–500 €/mois",
    agencies: "1 000–3 000 €/mois",
  },
  {
    feature: "Délai de livraison",
    ira: "< 1 semaine",
    platforms: "2–3 semaines",
    agencies: "3–6 semaines",
  },
  {
    feature: "Droits paid media inclus",
    ira: "Oui, à définir au brief",
    platforms: "En option payante",
    agencies: "Selon contrat",
  },
  {
    feature: "Droits d'exclusivité secteur",
    ira: "Négociable",
    platforms: "Non",
    agencies: "Rarement",
  },
  {
    feature: "Révisions incluses",
    ira: "Oui",
    platforms: "1 à 2 max",
    agencies: "Limitées",
  },
  {
    feature: "Interlocuteur dédié",
    ira: "Oui",
    platforms: "Interface self-service",
    agencies: "Account manager",
  },
  {
    feature: "Artistes vérifiés",
    ira: "Oui",
    platforms: "Profils non vérifiés",
    agencies: "Variable",
  },
  {
    feature: "Scalabilité (volume/mois)",
    ira: "À définir selon projet",
    platforms: "Illimitée (plateforme)",
    agencies: "Limitée (équipe)",
  },
  {
    feature: "Secteurs couverts",
    ira: "Tous",
    platforms: "Tous",
    agencies: "Spécialisés ou généralistes",
  },
  {
    feature: "Formats livrables",
    ira: "Vidéo, photo, reel",
    platforms: "Majoritairement vidéo",
    agencies: "Selon agence",
  },
];

function Check() {
  return (
    <svg className="w-5 h-5 text-[#6052ff] mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  );
}

function Cross() {
  return (
    <svg className="w-5 h-5 text-white/20 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

export default function ComparisonTable() {
  return (
    <section className="py-20 px-6 bg-[#131313]" id="pourquoi">
      <div className="section-divider mb-16" />

      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-14">
          <span className="font-display text-[11px] text-[#9ca3af] uppercase tracking-[0.2em] font-500">
            Comparaison
          </span>
          <h2 className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight mt-3">
            Pourquoi <span className="text-[#6052ff]">InRealArt</span> ?
          </h2>
        </div>

        <div className="overflow-x-auto rounded-xl border border-white/8">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="bg-[#1d1c1c] p-5 text-left w-[35%]">
                  <span className="font-display text-[10px] text-[#9ca3af] uppercase tracking-widest">Critère</span>
                </th>
                {/* IRA column — highlighted */}
                <th className="bg-[#6052ff]/10 border-l border-[#6052ff]/20 p-5 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-display font-800 text-sm text-[#6052ff] uppercase tracking-wider">InRealArt</span>
                    <span className="font-body text-[10px] text-[#6052ff]/60 bg-[#6052ff]/10 rounded px-2 py-0.5">Recommandé</span>
                  </div>
                </th>
                <th className="bg-[#1d1c1c] border-l border-white/5 p-5 text-center">
                  <span className="font-display font-600 text-xs text-white/40 uppercase tracking-wider">Plateformes (Billo, Insense…)</span>
                </th>
                <th className="bg-[#1d1c1c] border-l border-white/5 p-5 text-center">
                  <span className="font-display font-600 text-xs text-white/40 uppercase tracking-wider">Agence UGC classique</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} className="border-t border-white/5 hover:bg-white/[0.015] transition-colors">
                  <td className="p-5 bg-[#1d1c1c]/50">
                    <span className="font-body text-sm text-white/60">{row.feature}</span>
                  </td>
                  <td className="p-5 bg-[#6052ff]/5 border-l border-[#6052ff]/15 text-center">
                    {row.ira === "check" ? (
                      <Check />
                    ) : (
                      <span className="font-display font-700 text-sm text-white">{row.ira}</span>
                    )}
                  </td>
                  <td className="p-5 border-l border-white/5 text-center">
                    {row.platforms === "cross" ? (
                      <Cross />
                    ) : (
                      <span className="font-body text-sm text-white/35">{row.platforms}</span>
                    )}
                  </td>
                  <td className="p-5 border-l border-white/5 text-center">
                    {row.agencies === "cross" ? (
                      <Cross />
                    ) : (
                      <span className="font-body text-sm text-white/35">{row.agencies}</span>
                    )}
                  </td>
                </tr>
              ))}
              {/* CTA row */}
              <tr className="border-t border-white/5">
                <td className="p-5 bg-[#1d1c1c]/50" />
                <td className="p-6 bg-[#6052ff]/5 border-l border-[#6052ff]/15 text-center">
                  <a href="#contact" className="btn-primary btn-primary-pulse">
                    Faire ma demande
                  </a>
                </td>
                <td className="bg-[#1d1c1c]/30 border-l border-white/5" />
                <td className="bg-[#1d1c1c]/30 border-l border-white/5" />
              </tr>
            </tbody>
          </table>
        </div>

        <p className="font-display text-sm text-[#9ca3af] mt-4 text-center max-w-2xl mx-auto">
          <span className="text-white/80 font-600">Note :</span> Droits paid media inclus dans chaque collaboration, durée et territoire définis au brief.
        </p>
      </div>
    </section>
  );
}
