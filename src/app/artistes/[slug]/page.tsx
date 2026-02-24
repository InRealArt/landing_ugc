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

  const styleTags = artist.title
    ? artist.title.split(/\s*[,—\/]\s*/).map((s) => s.trim()).filter(Boolean)
    : [];

  const medias = artist.mediaUrls ?? [];

  return (
    <div className="min-h-screen bg-[#131313] text-white">

      {/* ── Navbar identique à la landing ── */}
      <Navbar />

      {/* ── Breadcrumb sous la navbar ── */}
      <div
        className="flex items-center gap-2 px-6 border-b border-white/5 bg-[#131313]"
        style={{ marginTop: "var(--header-height, 90px)", height: "40px" }}
      >
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

      {/* ── Hero ── */}
      <section className="relative">
        {/* Background blur */}
        {artist.profileImageUrl && (
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <Image
              src={artist.profileImageUrl}
              alt=""
              fill
              className="object-cover object-top scale-110"
              style={{ filter: "blur(48px)", opacity: 0.1 }}
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#131313]/70 via-[#131313]/85 to-[#131313]" />
          </div>
        )}

        <div className="relative max-w-5xl mx-auto px-6 pt-14 pb-20 flex flex-col md:flex-row gap-12 items-start">

          {/* Profile image */}
          <div className="shrink-0 animate-fade-in-up">
            <div
              className="relative rounded-2xl overflow-hidden border border-white/10"
              style={{
                width: "clamp(180px, 28vw, 260px)",
                aspectRatio: "3/4",
                boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(96,82,255,0.12)",
              }}
            >
              {artist.profileImageUrl ? (
                <Image
                  src={artist.profileImageUrl}
                  alt={name}
                  fill
                  className="object-cover object-top"
                  sizes="260px"
                  priority
                />
              ) : (
                <div className="w-full h-full bg-[#1d1c1c] flex items-center justify-center">
                  <span className="font-display font-800 text-5xl text-[#6052ff]/40">
                    {name[0]}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 animate-fade-in-up delay-100">

            {/* Style tags */}
            {styleTags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-5">
                {styleTags.map((tag, i) => (
                  <span
                    key={i}
                    className="font-body text-[11px] font-600 px-3 py-1 rounded-full border"
                    style={{
                      color: "#6052ff",
                      background: "rgba(96,82,255,0.1)",
                      borderColor: "rgba(96,82,255,0.3)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Name */}
            <h1 className="font-display font-800 text-4xl sm:text-5xl lg:text-6xl text-white leading-tight tracking-tight mb-4">
              {name}
            </h1>

            {/* Accent bar */}
            <div
              className="mb-6"
              style={{
                width: "48px",
                height: "3px",
                borderRadius: "2px",
                background: "linear-gradient(to right, #6052ff, #a855f7)",
              }}
            />

            {/* Description */}
            {artist.description ? (
              <p className="font-body text-base text-[#c9cdd4] leading-relaxed max-w-xl">
                {artist.description}
              </p>
            ) : (
              <p className="font-body text-base text-[#9ca3af]/50 leading-relaxed max-w-xl italic">
                Artiste UGC — InRealArt
              </p>
            )}

            {/* CTA */}
            <div className="mt-8">
              <a href="/#contact" className="btn-primary">
                Travailler avec {firstName}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Media gallery ── */}
      {medias.length > 0 && (
        <section className="max-w-5xl mx-auto px-6 pb-24">
          <div className="mb-10 animate-fade-in-up">
            <span className="font-display text-[11px] text-[#9ca3af] uppercase tracking-[0.2em] font-500">
              Portfolio
            </span>
            <h2 className="font-display font-800 text-2xl sm:text-3xl text-white mt-2 tracking-tight">
              Créations <span className="text-[#6052ff]">UGC</span>
            </h2>
          </div>

          <div style={{ columns: "2", columnGap: "12px" }} className="sm:columns-3">
            {medias.map((url, i) => (
              <div
                key={i}
                className="break-inside-avoid mb-3 rounded-xl overflow-hidden border border-white/6 animate-fade-in-up"
                style={{ animationDelay: `${i * 0.07}s`, background: "#1d1c1c" }}
              >
                {isVideo(url) ? (
                  <video
                    src={url}
                    className="w-full block"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <Image
                    src={url}
                    alt={`Création de ${name} #${i + 1}`}
                    width={600}
                    height={800}
                    className="w-full h-auto block"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA bottom ── */}
      <section
        className="border-t border-white/6"
        style={{ background: "linear-gradient(180deg, #131313 0%, #0e0d1a 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="section-divider mb-12" />
          <span className="font-display text-[11px] text-[#9ca3af] uppercase tracking-[0.2em] font-500 block mb-4">
            Collaborer avec InRealArt
          </span>
          <h2 className="font-display font-800 text-2xl sm:text-3xl lg:text-4xl text-white leading-tight tracking-tight mb-8">
            Intégrez{" "}
            <span className="text-[#6052ff]">{firstName}</span>
            {" "}à votre prochain projet
          </h2>
          <a href="/#contact" className="btn-primary btn-primary-pulse">
            Démarrer un projet
          </a>
        </div>
      </section>
    </div>
  );
}
