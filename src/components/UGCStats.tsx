const stats = [
  {
    highlight: "93 %",
    title: "des acheteurs jugent l'avis des autres utile avant d'acheter",
    description:
      "La grande majorité des consommateurs consultent du contenu d'autres utilisateurs pour décider d'un achat : avis, photos ou vidéos.",
    source: "BrightLocal – Consumer Review Survey",
    accentColor: "#6052ff",
  },
  {
    highlight: "10×",
    title: "UGC = plus de vues que le contenu de marque",
    description:
      "Le contenu généré par les utilisateurs est évalué bien plus puissant que celui des influenceurs rémunérés pour influencer les décisions d'achat.",
    source: "Nielsen – Trust in Advertising",
    accentColor: "#e91e8c",
  },
  {
    highlight: "9,8×",
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
  return (
    <section className="py-20 px-6 bg-[#131313] relative overflow-hidden">
      <div className="section-divider mb-16" />

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[#6052ff]/4 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">

        {/* Headline */}
        <div className="text-center mb-14">
          <h2 className="font-display font-800 text-2xl sm:text-3xl lg:text-4xl text-white leading-tight tracking-tight">
            L&apos;UGC est le format de publicité{" "}
            <span className="text-[#6052ff]">incontournable</span> en 2026.
          </h2>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-16">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="card-surface p-8 flex flex-col gap-5"
            >
              <span
                className="font-display font-900 text-5xl leading-none"
                style={{ color: stat.accentColor }}
              >
                {stat.highlight}
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
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10">
          {ugcVideos.map((v, i) => (
            <div
              key={i}
              className="relative aspect-[9/16] rounded-xl overflow-hidden cursor-pointer group border border-white/6 hover:border-[#6052ff]/30 transition-all duration-300"
              style={{ background: v.color }}
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
        <div className="flex flex-col items-center gap-5">
          <a href="#contact" className="btn-primary btn-primary-pulse">
            Faire ma demande
          </a>
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
          <p className="font-body text-xs text-[#9ca3af] text-center">
            Le type de contenu que vous pouvez obtenir dès à présent !
          </p>
        </div>
      </div>

      <div className="section-divider mt-16" />
    </section>
  );
}
