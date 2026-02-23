import Image from "next/image";
import { prisma } from "@/lib/prisma";
import ArtistsCarousel from "./ArtistsCarousel";

type TopArtistRow = {
  order: number;
  landingArtist: {
    imageUrl: string;
    artworkStyle: string | null;
    mediumTags: string[];
    artist: {
      pseudo: string | null;
      name: string | null;
      surname: string | null;
    } | null;
  };
};

// Accent colors cycled when DB artists don't carry one
const ACCENT_COLORS = [
  "#e91e8c",
  "#ff6f00",
  "#d4b800",
  "#00c857",
  "#00bcd4",
  "#4f8ef7",
  "#6052ff",
  "#a855f7",
  "#ff6f00",
];

const BG_GRADS = [
  "linear-gradient(145deg, #2a0a1e 0%, #131313 100%)",
  "linear-gradient(145deg, #2a1200 0%, #131313 100%)",
  "linear-gradient(145deg, #252100 0%, #131313 100%)",
  "linear-gradient(145deg, #00240e 0%, #131313 100%)",
  "linear-gradient(145deg, #00242a 0%, #131313 100%)",
  "linear-gradient(145deg, #001a3a 0%, #131313 100%)",
  "linear-gradient(145deg, #130e3a 0%, #131313 100%)",
  "linear-gradient(145deg, #1e0835 0%, #131313 100%)",
  "linear-gradient(145deg, #2a1500 0%, #131313 100%)",
];

// Fallback static data — used if DB is empty or unavailable
const FALLBACK_ARTISTS = [
  { name: "Leloluce",          artworkStyleTags: ["Luxe", "Mode"],                  mediumTags: ["Photo", "Vidéo"],         accentColor: ACCENT_COLORS[0], bgGrad: BG_GRADS[0], imageUrl: null },
  { name: "Ekaterina Aristova", artworkStyleTags: ["Mannequin", "Luxe", "Mode"],     mediumTags: ["Photo", "Reel"],          accentColor: ACCENT_COLORS[1], bgGrad: BG_GRADS[1], imageUrl: null },
  { name: "Artialy",           artworkStyleTags: ["High-tech", "Pop culture"],       mediumTags: ["Vidéo", "Story"],         accentColor: ACCENT_COLORS[2], bgGrad: BG_GRADS[2], imageUrl: null },
  { name: "Rom Av Jc",         artworkStyleTags: ["Luxe", "Street"],                mediumTags: ["Photo", "Reel"],          accentColor: ACCENT_COLORS[3], bgGrad: BG_GRADS[3], imageUrl: null },
  { name: "Ninu",              artworkStyleTags: ["Luxe", "Horlogerie"],             mediumTags: ["Photo", "Vidéo"],         accentColor: ACCENT_COLORS[4], bgGrad: BG_GRADS[4], imageUrl: null },
  { name: "Aurel Street",      artworkStyleTags: ["Luxe", "Horlogerie"],             mediumTags: ["Reel", "Story"],          accentColor: ACCENT_COLORS[5], bgGrad: BG_GRADS[5], imageUrl: null },
  { name: "Marine Tassou",     artworkStyleTags: ["Luxe", "Matériel artistique"],    mediumTags: ["Photo", "Vidéo"],         accentColor: ACCENT_COLORS[6], bgGrad: BG_GRADS[6], imageUrl: null },
  { name: "Van Guillemin",     artworkStyleTags: ["Mannequin", "Mode"],              mediumTags: ["Photo", "Reel"],          accentColor: ACCENT_COLORS[7], bgGrad: BG_GRADS[7], imageUrl: null },
  { name: "Eaudalix",          artworkStyleTags: ["Luxe", "Horlogerie"],             mediumTags: ["Vidéo", "Story"],         accentColor: ACCENT_COLORS[8], bgGrad: BG_GRADS[8], imageUrl: null },
];

async function getTopArtists() {
  try {
    const rows = await prisma.landingUgcTopArtists.findMany({
      orderBy: { order: "asc" },
      include: {
        landingArtist: {
          include: { artist: true },
        },
      },
    });

    if (rows.length === 0) return null;

    return (rows as TopArtistRow[]).map((row, i) => {
      const la = row.landingArtist;
      const artist = la.artist;
      const name = artist
        ? ((artist.pseudo ?? [artist.name, artist.surname].filter(Boolean).join(" ")) || "Artiste")
        : "Artiste";
      const artworkStyleTags = la.artworkStyle
        ? la.artworkStyle.split(/\s*[,—\/]\s*/).map(s => s.trim()).filter(Boolean)
        : [];
      return {
        name,
        artworkStyleTags,
        mediumTags: la.mediumTags,
        imageUrl: la.imageUrl,
        accentColor: ACCENT_COLORS[i % ACCENT_COLORS.length],
        bgGrad: BG_GRADS[i % BG_GRADS.length],
      };
    });
  } catch {
    return null;
  }
}

export default async function ArtistsGrid() {
  const dbArtists = await getTopArtists();
  const artists = dbArtists ?? FALLBACK_ARTISTS;

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

        {/* Mobile: horizontal snap carousel */}
        <div className="sm:hidden -mx-6">
          <ArtistsCarousel artists={artists} />
        </div>

        {/* Tablet/Desktop: 2→3-col grid */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {artists.map((artist, i) => (
            <div
              key={i}
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

                {/* Artist image */}
                {artist.imageUrl ? (
                  <Image
                    src={artist.imageUrl}
                    alt={artist.name}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 50vw, 33vw"
                  />
                ) : null}

                {/* Index badge */}
                <div
                  className="absolute top-4 left-4 w-8 h-8 rounded-lg flex items-center justify-center border border-white/10 z-10"
                  style={{ background: `${artist.accentColor}25` }}
                >
                  <span className="font-display font-800 text-sm text-white">{i + 1}</span>
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
              <div className="p-5 flex flex-col gap-2.5">
                <h3 className="font-display font-700 text-sm text-white">
                  {artist.name}
                </h3>
                {artist.artworkStyleTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {artist.artworkStyleTags.map((tag, j) => (
                      <span
                        key={j}
                        className="font-body text-[11px] font-600 px-2.5 py-1 rounded-md border"
                        style={{
                          color: artist.accentColor,
                          background: `${artist.accentColor}22`,
                          borderColor: `${artist.accentColor}55`,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                {artist.mediumTags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {artist.mediumTags.map((tag, j) => (
                      <span
                        key={j}
                        className="font-body text-[11px] font-500 px-2.5 py-1 rounded-md border text-[#c9cdd4] bg-white/8 border-white/15"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
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
