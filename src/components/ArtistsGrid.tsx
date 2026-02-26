import Image from "next/image";
import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/prisma";
import { buildArtistSlug } from "@/lib/artistSlug";
import ArtistsCarousel from "./ArtistsCarousel";

type TopArtistRow = {
  order: number;
  landingUgcArtistProfile: {
    id: number;
    name: string | null;
    surname: string | null;
    pseudo: string | null;
    profileImageUrl: string | null;
    title: string | null;
    mediaUrls: string[];
  } | null;
};

type ArtistCard = {
  slug: string | null;
  name: string;
  artworkStyleTags: string[];
  mediumTags: string[];
  imageUrl: string | null;
  accentColor: string;
  bgGrad: string;
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
const FALLBACK_ARTISTS: ArtistCard[] = [
  { slug: null, name: "Leloluce",          artworkStyleTags: ["Luxe", "Mode"],                  mediumTags: ["Photo", "Vidéo"],         accentColor: ACCENT_COLORS[0], bgGrad: BG_GRADS[0], imageUrl: null },
  { slug: null, name: "Ekaterina Aristova", artworkStyleTags: ["Mannequin", "Luxe", "Mode"],     mediumTags: ["Photo", "Reel"],          accentColor: ACCENT_COLORS[1], bgGrad: BG_GRADS[1], imageUrl: null },
  { slug: null, name: "Artialy",           artworkStyleTags: ["High-tech", "Pop culture"],       mediumTags: ["Vidéo", "Story"],         accentColor: ACCENT_COLORS[2], bgGrad: BG_GRADS[2], imageUrl: null },
  { slug: null, name: "Rom Av Jc",         artworkStyleTags: ["Luxe", "Street"],                mediumTags: ["Photo", "Reel"],          accentColor: ACCENT_COLORS[3], bgGrad: BG_GRADS[3], imageUrl: null },
  { slug: null, name: "Ninu",              artworkStyleTags: ["Luxe", "Horlogerie"],             mediumTags: ["Photo", "Vidéo"],         accentColor: ACCENT_COLORS[4], bgGrad: BG_GRADS[4], imageUrl: null },
  { slug: null, name: "Aurel Street",      artworkStyleTags: ["Luxe", "Horlogerie"],             mediumTags: ["Reel", "Story"],          accentColor: ACCENT_COLORS[5], bgGrad: BG_GRADS[5], imageUrl: null },
  { slug: null, name: "Marine Tassou",     artworkStyleTags: ["Luxe", "Matériel artistique"],    mediumTags: ["Photo", "Vidéo"],         accentColor: ACCENT_COLORS[6], bgGrad: BG_GRADS[6], imageUrl: null },
  { slug: null, name: "Van Guillemin",     artworkStyleTags: ["Mannequin", "Mode"],              mediumTags: ["Photo", "Reel"],          accentColor: ACCENT_COLORS[7], bgGrad: BG_GRADS[7], imageUrl: null },
  { slug: null, name: "Eaudalix",          artworkStyleTags: ["Luxe", "Horlogerie"],             mediumTags: ["Vidéo", "Story"],         accentColor: ACCENT_COLORS[8], bgGrad: BG_GRADS[8], imageUrl: null },
];

async function getTopArtists() {
  noStore();
  try {
    const rows = await prisma.landingUgcTopArtists.findMany({
      orderBy: { order: "asc" },
      include: {
        landingUgcArtistProfile: true,
      },
    });

    if (rows.length === 0) return null;

    return (rows as TopArtistRow[]).map((row, i) => {
      const profile = row.landingUgcArtistProfile;
      const name = profile
        ? (profile.pseudo ?? ([profile.name, profile.surname].filter(Boolean).join(" ") || "Artiste"))
        : "Artiste";
      const artworkStyleTags = profile?.title
        ? profile.title.split(/\s*[,—\/]\s*/).map(s => s.trim()).filter(Boolean)
        : [];
      const slug = profile ? buildArtistSlug(profile) : null;
      return {
        slug,
        name,
        artworkStyleTags,
        mediumTags: [] as string[],
        imageUrl: profile?.profileImageUrl ?? null,
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
            <Link
              key={i}
              href={artist.slug ? `/artistes/${artist.slug}` : "#artistes"}
              className="group relative rounded-xl overflow-hidden cursor-pointer border border-white/6 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 block"
              style={{ background: artist.bgGrad }}
            >
              {/* Visual area */}
              <div className="aspect-[3/4] relative overflow-hidden">
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
                    className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
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

                {/* Bottom gradient — plus profond pour lisibilité overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* Accent bar */}
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5 opacity-50"
                  style={{ background: `linear-gradient(to right, transparent, ${artist.accentColor}, transparent)` }}
                />
              </div>

              {/* Info */}
              <div className="p-5 flex items-center justify-between gap-3">
                <div className="flex flex-col gap-1 min-w-0">
                  <h3 className="font-display font-800 text-2xl text-white truncate leading-tight">
                    {artist.name}
                  </h3>
                  {artist.artworkStyleTags.length > 0 && (
                    <p
                      className="font-body text-[17px] font-500 truncate"
                      style={{ color: `${artist.accentColor}cc` }}
                    >
                      {artist.artworkStyleTags.join(" · ")}
                    </p>
                  )}
                </div>
                <div
                  className="shrink-0 flex items-center gap-1.5 font-display font-700 text-[14px] uppercase tracking-[0.1em] px-4 py-2 rounded-lg border transition-all duration-300 group-hover:border-opacity-80"
                  style={{
                    color: artist.accentColor,
                    borderColor: `${artist.accentColor}50`,
                    background: `${artist.accentColor}12`,
                  }}
                >
                  Voir
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="transition-transform duration-300 group-hover:translate-x-0.5">
                    <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
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
