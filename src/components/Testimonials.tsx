const testimonials = [
  {
    quote:
      "Des créateurs très pro et agréable. Communication fluide du début à la fin avec l'équipe super réactive et force de proposition. Le rendu est très qualitatif.",
    author: "Eva Simons",
    role: "avocate et entrepreneuse",
    initial: "E",
  },
  {
    quote:
      "Nous avons lancé notre premier dispositif UGC en compagnie d'InRealArt et 4 de leurs artistes, nos ventes ont augmentées et notre visibilité aussi.",
    author: "YUMÉ",
    role: "Marque de Matcha de Luxe",
    initial: "Y",
  },
  {
    quote:
      "Nous collaborons avec InRealart pour rediriger des internautes directement dans notre boutique, nous en sommes très satisfait.",
    author: "ADAM",
    role: "Boutique prestigieuse de matériel Artistique",
    initial: "A",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20 px-6 bg-[#131313]">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-14">
          <span className="font-display text-[11px] text-[#9ca3af] uppercase tracking-[0.2em] font-500">
            Avis clients
          </span>
          <h2 className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight mt-3">
            Nos clients <span className="text-[#6052ff]">témoignent</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="card-surface p-8 flex flex-col gap-6 relative overflow-hidden">
              {/* Quote decoration */}
              <div className="absolute top-3 right-5 font-display font-900 text-8xl leading-none pointer-events-none select-none text-[#6052ff]/6">
                &ldquo;
              </div>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-lg bg-[#6052ff]/15 border border-[#6052ff]/20 flex items-center justify-center flex-shrink-0">
                  <span className="font-display font-800 text-base text-[#6052ff]">{t.initial}</span>
                </div>
                <div>
                  <p className="font-display font-700 text-sm text-white">{t.author}</p>
                  <p className="font-body text-xs text-[#9ca3af] mt-0.5">{t.role}</p>
                </div>
              </div>

              {/* Quote */}
              <blockquote className="font-body text-white/70 text-base leading-relaxed italic flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Stars */}
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, si) => (
                  <svg key={si} className="w-3.5 h-3.5 text-[#6052ff]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
