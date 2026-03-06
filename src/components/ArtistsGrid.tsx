import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/prisma";
import { buildArtistSlug } from "@/lib/artistSlug";
import ArtistsGridAnimated from "./ArtistsGridAnimated";
import ArtistsCarousel from "./ArtistsCarousel";
import type { ReactNode } from "react";

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
    <ArtistsGridAnimated
      artists={artists}
      mobileCarousel={<ArtistsCarousel artists={artists} />}
    />
  );
}
