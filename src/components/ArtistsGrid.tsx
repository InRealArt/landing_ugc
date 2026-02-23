import Image from "next/image";
import { prisma } from "@/lib/prisma";

type TopArtistRow = {
  order: number;
  landingArtist: {
    imageUrl: string;
    intro: string | null;
    artworkStyle: string | null;
    description: string | null;
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
  {
    name: "Leloluce",
    description: "Artiste internationale — luxe, mode, matériel artistique",
    accentColor: ACCENT_COLORS[0],
    bgGrad: BG_GRADS[0],
    imageUrl: null,
  },
  {
    name: "Ekaterina Aristova",
    description: "Artiste internationale — mannequin, luxe, mode, matériel artistique",
    accentColor: ACCENT_COLORS[1],
    bgGrad: BG_GRADS[1],
    imageUrl: null,
  },
  {
    name: "Artialy",
    description: "Artiste émergeante — Mode, produits high-tech, pop culture",
    accentColor: ACCENT_COLORS[2],
    bgGrad: BG_GRADS[2],
    imageUrl: null,
  },
  {
    name: "Rom Av Jc",
    description: "Artiste française émergeante — Luxe, street universe, matériel artistique",
    accentColor: ACCENT_COLORS[3],
    bgGrad: BG_GRADS[3],
    imageUrl: null,
  },
  {
    name: "Ninu",
    description: "Artiste française internationale — Luxe, horlogerie, matériel artistique",
    accentColor: ACCENT_COLORS[4],
    bgGrad: BG_GRADS[4],
    imageUrl: null,
  },
  {
    name: "Aurel Street",
    description: "Artiste français international — Luxe, horlogerie, matériel artistique",
    accentColor: ACCENT_COLORS[5],
    bgGrad: BG_GRADS[5],
    imageUrl: null,
  },
  {
    name: "Marine Tassou",
    description: "Artiste française émergeante — Luxe, horlogerie, matériel artistique",
    accentColor: ACCENT_COLORS[6],
    bgGrad: BG_GRADS[6],
    imageUrl: null,
  },
  {
    name: "Van Guillemin",
    description: "Artiste internationale — mannequin, luxe, mode, matériel artistique",
    accentColor: ACCENT_COLORS[7],
    bgGrad: BG_GRADS[7],
    imageUrl: null,
  },
  {
    name: "Eaudalix",
    description: "Artiste française émergeante — Luxe, horlogerie, matériel artistique",
    accentColor: ACCENT_COLORS[8],
    bgGrad: BG_GRADS[8],
    imageUrl: null,
  },
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
      const description = la.intro ?? la.artworkStyle ?? la.description ?? "";
      return {
        name,
        description,
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

        {/* 3-col grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
