// Couleurs des artistes tirées du PDF — overlays colorés sur fond sombre inrealart
const artists = [
  {
    name: "Leloluce",
    description: "Artiste internationale — luxe, mode, matériel artistique",
    accentColor: "#e91e8c",
    bgGrad: "linear-gradient(145deg, #2a0a1e 0%, #131313 100%)",
    emoji: "🌹",
  },
  {
    name: "Ekaterina Aristova",
    description: "Artiste internationale — mannequin, luxe, mode, matériel artistique",
    accentColor: "#ff6f00",
    bgGrad: "linear-gradient(145deg, #2a1200 0%, #131313 100%)",
    emoji: "✨",
  },
  {
    name: "Artialy",
    description: "Artiste émergeante — Mode, produits high-tech, pop culture",
    accentColor: "#d4b800",
    bgGrad: "linear-gradient(145deg, #252100 0%, #131313 100%)",
    emoji: "🎨",
  },
  {
    name: "Rom Av Jc",
    description: "Artiste française émergeante — Luxe, street universe, matériel artistique",
    accentColor: "#00c857",
    bgGrad: "linear-gradient(145deg, #00240e 0%, #131313 100%)",
    emoji: "🔥",
  },
  {
    name: "Ninu",
    description: "Artiste française internationale — Luxe, horlogerie, matériel artistique",
    accentColor: "#00bcd4",
    bgGrad: "linear-gradient(145deg, #00242a 0%, #131313 100%)",
    emoji: "💎",
  },
  {
    name: "Aurel Street",
    description: "Artiste français international — Luxe, horlogerie, matériel artistique",
    accentColor: "#4f8ef7",
    bgGrad: "linear-gradient(145deg, #001a3a 0%, #131313 100%)",
    emoji: "🎭",
  },
  {
    name: "Marine Tassou",
    description: "Artiste française émergeante — Luxe, horlogerie, matériel artistique",
    accentColor: "#6052ff",
    bgGrad: "linear-gradient(145deg, #130e3a 0%, #131313 100%)",
    emoji: "🌊",
  },
  {
    name: "Van Guillemin",
    description: "Artiste internationale — mannequin, luxe, mode, matériel artistique",
    accentColor: "#a855f7",
    bgGrad: "linear-gradient(145deg, #1e0835 0%, #131313 100%)",
    emoji: "🦋",
  },
  {
    name: "Eaudalix",
    description: "Artiste française émergeante — Luxe, horlogerie, matériel artistique",
    accentColor: "#ff6f00",
    bgGrad: "linear-gradient(145deg, #2a1500 0%, #131313 100%)",
    emoji: "⭐",
  },
];

export default function ArtistsGrid() {
  return (
    <section className="py-20 px-6 bg-[#131313]" id="artistes">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-display text-[11px] text-[#9ca3af] uppercase tracking-[0.2em] font-500">
            Notre réseau
          </span>
          <h2 className="font-display font-800 text-3xl sm:text-4xl lg:text-5xl text-white leading-tight tracking-tight mt-3">
            Nos Top artistes{" "}
            <span className="text-[#6052ff]">créateurs</span>{" "}
            du moment
          </h2>
        </div>

        {/* 3-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {artists.map((artist, i) => (
            <div
              key={artist.name}
              className="group relative rounded-xl overflow-hidden cursor-pointer border border-white/6 hover:border-white/15 transition-all duration-300 hover:-translate-y-1"
              style={{ background: artist.bgGrad }}
            >
              {/* Visual area */}
              <div className="aspect-[4/3] relative overflow-hidden">
                {/* Accent glow */}
                <div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full opacity-20 blur-2xl transition-opacity duration-300 group-hover:opacity-40"
                  style={{ background: artist.accentColor }}
                />
                {/* Index badge */}
                <div
                  className="absolute top-4 left-4 w-8 h-8 rounded-lg flex items-center justify-center border border-white/10"
                  style={{ background: `${artist.accentColor}25` }}
                >
                  <span className="font-display font-800 text-sm text-white">{i + 1}</span>
                </div>
                {/* Emoji */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl opacity-30 group-hover:opacity-60 transition-opacity duration-300 select-none">
                  {artist.emoji}
                </div>
                {/* Bottom gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                {/* Accent bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-50"
                  style={{ background: `linear-gradient(to right, transparent, ${artist.accentColor}, transparent)` }}
                />
              </div>

              {/* Info */}
              <div className="p-5">
                <h3 className="font-display font-700 text-sm text-white mb-1.5">
                  {artist.name}
                </h3>
                <p className="font-body text-sm text-[#9ca3af] leading-relaxed">
                  {artist.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a href="#contact" className="btn-primary">
            Voir nos artistes
          </a>
        </div>

        {/* Tagline */}
        <div className="mt-20 text-center">
          <div className="section-divider mb-12" />
          <h2 className="font-display font-800 text-2xl sm:text-3xl lg:text-[2.5rem] text-white leading-tight tracking-tight">
            InRealArt est la{" "}
            <span className="text-[#6052ff]">référence UGC artistique</span>
            <br />
            dont vous avez toujours rêvé.
          </h2>
        </div>
      </div>
    </section>
  );
}
