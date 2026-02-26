import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { unstable_noStore as noStore } from "next/cache";
import { prisma } from "@/lib/prisma";
import { buildArtistSlug } from "@/lib/artistSlug";
import Navbar from "@/components/Navbar";

type Props = {
  params: Promise<{ slug: string }>;
};

async function getArtistBySlug(slug: string) {
  noStore();
  try {
    const all = await prisma.landingUgcArtistProfile.findMany();
    return all.find((a) => buildArtistSlug(a) === slug) ?? null;
  } catch {
    return null;
  }
}

function isVideo(url: string) {
  return /\.(mp4|webm|mov|avi)(\?|$)/i.test(url);
}

export default async function ArtistPage({ params }: Props) {
  const { slug } = await params;

  const artist = await getArtistBySlug(slug);
  if (!artist) notFound();

  const name =
    artist.pseudo ??
    ([artist.name, artist.surname].filter(Boolean).join(" ") || "Artiste");

  const firstName = name.split(/\s+/)[0];

  /* title — affiché tel quel comme sous-titre sous le nom */
  const artistTitle = artist.title?.trim() ?? null;

  /* tags (champ dédié) */
  const tags: string[] = artist.tags ?? [];

  const medias = artist.mediaUrls ?? [];
  const reels = medias.filter(isVideo);
  const photos = medias.filter((url) => !isVideo(url));

  return (
    <div className="min-h-screen bg-[#131313] text-white overflow-x-hidden">
      <Navbar />

      {/* ── Breadcrumb ── */}
      <div
        className="border-b border-white/5 bg-[#131313]"
        style={{ marginTop: "var(--header-height, 90px)", height: "40px" }}
      >
        <div className="max-w-6xl mx-auto px-6 h-full flex items-center gap-2">
          <Link
            href="/#artistes"
            className="font-body text-[11px] text-[#9ca3af] hover:text-white transition-colors duration-200"
          >
            Artistes
          </Link>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="shrink-0" style={{ color: "rgba(156,163,175,0.4)" }}>
            <path d="M3.5 2L6.5 5L3.5 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="font-body text-[11px] text-white/60 truncate">{name}</span>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          HERO — Magazine split layout
      ══════════════════════════════════════════ */}
      <section className="relative">
        {/* Atmospheric background */}
        {artist.profileImageUrl && (
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <Image
              src={artist.profileImageUrl}
              alt=""
              fill
              className="object-cover object-top scale-110"
              style={{ filter: "blur(60px)", opacity: 0.07 }}
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0" style={{
              background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(96,82,255,0.06) 0%, transparent 70%), linear-gradient(180deg, #131313 0%, #131313 100%)"
            }} />
          </div>
        )}

        <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-0">

          {/* ── Top row: index label ── */}
          <div className="flex items-start justify-between mb-12 animate-fade-in-up">
            <div className="flex items-center gap-4">
              <span
                className="font-display text-[10px] tracking-[0.25em] uppercase"
                style={{ color: "#6052ff" }}
              >
                Artiste UGC
              </span>
              <span style={{ width: "32px", height: "1px", background: "rgba(96,82,255,0.4)", display: "block" }} />
              <span className="font-display text-[10px] tracking-[0.25em] uppercase text-white/30">
                InRealArt
              </span>
            </div>
            <span
              className="font-display text-[80px] leading-none font-900 select-none"
              style={{ color: "rgba(255,255,255,0.02)", letterSpacing: "-0.04em" }}
              aria-hidden="true"
            >
              UGC
            </span>
          </div>

          {/* ── Main grid: photo left / content right ── */}
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-10 lg:gap-16 items-start">

            {/* — Photo column — */}
            <div className="animate-fade-in-up" style={{ animationDelay: "0.05s" }}>
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  width: "clamp(200px, 30vw, 300px)",
                  aspectRatio: "3/4",
                  boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(96,82,255,0.15), inset 0 1px 0 rgba(255,255,255,0.06)",
                }}
              >
                {artist.profileImageUrl ? (
                  <Image
                    src={artist.profileImageUrl}
                    alt={name}
                    fill
                    className="object-cover object-top"
                    sizes="300px"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-[#1d1c1c] flex items-center justify-center">
                    <span className="font-display font-800 text-6xl" style={{ color: "rgba(96,82,255,0.3)" }}>
                      {name[0]}
                    </span>
                  </div>
                )}
                <div
                  className="absolute bottom-0 left-0 right-0"
                  style={{
                    height: "40%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)"
                  }}
                />
              </div>

              {/* Tags below photo */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-4" style={{ maxWidth: "clamp(200px, 30vw, 300px)" }}>
                  {tags.map((tag, i) => (
                    <span
                      key={i}
                      className="font-body text-[10px] font-600 px-2.5 py-1 rounded-md"
                      style={{
                        color: "rgba(255,255,255,0.5)",
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        letterSpacing: "0.03em",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* — Content column — */}
            <div className="flex flex-col justify-between min-w-0">

              {/* Name — editorial large */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
                <h1
                  className="font-display font-800 text-white leading-none tracking-tight"
                  style={{
                    fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                    letterSpacing: "-0.03em",
                  }}
                >
                  {name}
                </h1>

                {/* Title — sous-titre élégant sous le nom */}
                {artistTitle && (
                  <p
                    className="font-body mt-3"
                    style={{
                      fontSize: "clamp(0.9rem, 1.4vw, 1.05rem)",
                      color: "rgba(255,255,255,0.45)",
                      fontStyle: "italic",
                      letterSpacing: "0.01em",
                      lineHeight: 1.4,
                    }}
                  >
                    {artistTitle}
                  </p>
                )}

                {/* Accent underline */}
                <div className="mt-5 mb-7" style={{ position: "relative", height: "2px", maxWidth: "220px" }}>
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to right, #6052ff, rgba(168,85,247,0.4), transparent)",
                    borderRadius: "2px",
                  }} />
                </div>
              </div>

              {/* ── Description ── */}
              {artist.description && (
                <div className="animate-fade-in-up mb-8" style={{ animationDelay: "0.2s" }}>
                  <p
                    className="font-body leading-relaxed"
                    style={{
                      fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
                      color: "#c9cdd4",
                      maxWidth: "560px",
                    }}
                  >
                    {artist.description}
                  </p>
                </div>
              )}

              {/* CTA */}
              <div className="animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
                <a href="/#contact" className="btn-primary">
                  Travailler avec {firstName}
                </a>
              </div>
            </div>
          </div>

          {/* ── Presentation section — full width below the grid ── */}
          {artist.presentation && (
            <div
              className="mt-20 animate-fade-in-up"
              style={{ animationDelay: "0.35s" }}
            >
              <div className="section-divider mb-10" />

              <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 lg:gap-16 items-start pb-20">
                <div className="flex flex-col gap-3 md:sticky md:top-32">
                  <div className="flex items-center gap-3">
                    <span
                      className="font-display text-[10px] tracking-[0.2em] uppercase"
                      style={{ color: "#6052ff" }}
                    >
                      01
                    </span>
                    <span style={{ flex: 1, height: "1px", background: "rgba(96,82,255,0.3)" }} />
                  </div>
                  <h2
                    className="font-display font-700 text-white"
                    style={{ fontSize: "0.85rem", letterSpacing: "0.08em", textTransform: "uppercase" }}
                  >
                    Présentation
                  </h2>
                  <p className="font-body text-[12px] text-white/30 leading-relaxed">
                    Univers créatif &amp; approche UGC
                  </p>
                </div>

                {/* Text content — HTML from trusted admin DB source */}
                {/* eslint-disable-next-line react/no-danger */}
                <div
                  className="presentation-content"
                  dangerouslySetInnerHTML={{ __html: artist.presentation }}
                  style={{
                    fontSize: "clamp(1rem, 1.8vw, 1.15rem)",
                    maxWidth: "680px",
                  }}
                />
              </div>
            </div>
          )}

          {!artist.presentation && <div className="pb-20" />}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SECTION 02 — Reels
      ══════════════════════════════════════════ */}
      {reels.length > 0 && (
        <section
          style={{
            background: "#0f0f0f",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-20">

            <div className="flex items-end justify-between mb-10 animate-fade-in-up">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="font-display text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: "#6052ff" }}
                  >
                    02
                  </span>
                  <span style={{ width: "24px", height: "1px", background: "rgba(96,82,255,0.4)", display: "block" }} />
                  <span className="font-display text-[10px] tracking-[0.2em] uppercase text-white/30">
                    Reels
                  </span>
                </div>
                <h2
                  className="font-display font-800 text-white tracking-tight leading-none"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.025em" }}
                >
                  Ses <span style={{ color: "#6052ff" }}>Reels</span>
                </h2>
              </div>
              <span className="font-display text-[11px] text-white/20 tracking-[0.1em]">
                {reels.length} reel{reels.length > 1 ? "s" : ""}
              </span>
            </div>

            {/* Scroll horizontal mobile → grille sm:3col → lg:4col */}
            <div className="reels-scroll-container">
              {reels.map((url, i) => (
                <div
                  key={i}
                  className="reel-wrap animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.08}s` }}
                >
                  <div className="reel-card">
                    <video
                      src={url}
                      className="w-full h-full object-cover"
                      style={{ display: "block" }}
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>
                  {/* Hover overlay — pure CSS via .reel-wrap:hover .reel-overlay */}
                  <div className="reel-overlay" aria-hidden="true">
                    <svg
                      width="44"
                      height="44"
                      viewBox="0 0 44 44"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="reel-play-icon"
                    >
                      <circle cx="22" cy="22" r="21" stroke="rgba(255,255,255,0.8)" strokeWidth="1.5" />
                      <path d="M18 14.5L31 22L18 29.5V14.5Z" fill="white" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          SECTION 03 — Photos
      ══════════════════════════════════════════ */}
      {photos.length > 0 && (
        <section
          style={{
            background: "#131313",
            borderTop: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="max-w-6xl mx-auto px-6 py-20">

            <div className="flex items-end justify-between mb-10 animate-fade-in-up">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span
                    className="font-display text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: "#6052ff" }}
                  >
                    03
                  </span>
                  <span style={{ width: "24px", height: "1px", background: "rgba(96,82,255,0.4)", display: "block" }} />
                  <span className="font-display text-[10px] tracking-[0.2em] uppercase text-white/30">
                    Photos
                  </span>
                </div>
                <h2
                  className="font-display font-800 text-white tracking-tight leading-none"
                  style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)", letterSpacing: "-0.025em" }}
                >
                  Shooting <span style={{ color: "#6052ff" }}>éditorial</span>
                </h2>
              </div>
              <span className="font-display text-[11px] text-white/20 tracking-[0.1em]">
                {photos.length} photo{photos.length > 1 ? "s" : ""}
              </span>
            </div>

            {/* Grille carrée style Instagram : 3 col → 4 → 5 */}
            <div className="photos-grid">
              {photos.map((url, i) => (
                <div
                  key={i}
                  className="photo-cell animate-fade-in-up"
                  style={{ animationDelay: `${i * 0.05}s` }}
                >
                  <Image
                    src={url}
                    alt={`Photo de ${name} #${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
                  />
                  <div className="photo-overlay" aria-hidden="true" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ══════════════════════════════════════════
          CTA BOTTOM — 04
      ══════════════════════════════════════════ */}
      <section
        style={{
          borderTop: "1px solid rgba(255,255,255,0.05)",
          background: "linear-gradient(180deg, #131313 0%, #0d0d18 100%)",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-24 text-center">
          <div className="section-divider mb-14" />

          <div className="flex items-center justify-center gap-3 mb-6">
            <span style={{ width: "32px", height: "1px", background: "rgba(96,82,255,0.3)" }} />
            <span className="font-display text-[10px] tracking-[0.25em] uppercase" style={{ color: "#6052ff" }}>
              Collaborer
            </span>
            <span style={{ width: "32px", height: "1px", background: "rgba(96,82,255,0.3)" }} />
          </div>

          <h2
            className="font-display font-800 text-white leading-none tracking-tight mb-8"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Intégrez{" "}
            <span style={{ color: "#6052ff" }}>{firstName}</span>
            <br />
            <span style={{ color: "rgba(255,255,255,0.35)" }}>à votre prochain projet</span>
          </h2>

          <a href="/#contact" className="btn-primary btn-primary-pulse">
            Démarrer un projet
          </a>
        </div>
      </section>
    </div>
  );
}
