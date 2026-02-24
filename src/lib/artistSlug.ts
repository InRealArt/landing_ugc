/**
 * Builds a URL-safe slug from an artist profile.
 * Priority: pseudo > name+surname > id fallback.
 *
 * Examples:
 *   { pseudo: "Leloluce" }          → "leloluce"
 *   { name: "Marine", surname: "Tassou" } → "marine-tassou"
 *   { id: 7 }                       → "artiste-7"
 */
export function buildArtistSlug(artist: {
  id: number;
  pseudo?: string | null;
  name?: string | null;
  surname?: string | null;
}): string {
  const raw =
    artist.pseudo ??
    ([artist.name, artist.surname].filter(Boolean).join(" ") || `artiste-${artist.id}`);

  return raw
    .normalize("NFD")                        // decompose accented chars
    .replace(/[\u0300-\u036f]/g, "")         // strip diacritics
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")            // non-alphanum → hyphen
    .replace(/^-+|-+$/g, "");              // trim leading/trailing hyphens
}
