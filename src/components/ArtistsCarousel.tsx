"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useCallback, useEffect } from "react";

type ArtistCard = {
  slug: string | null;
  name: string;
  artworkStyleTags: string[];
  mediumTags: string[];
  imageUrl: string | null;
  accentColor: string;
  bgGrad: string;
};

type Props = {
  artists: ArtistCard[];
};

const AUTO_SCROLL_INTERVAL = 3000; // ms entre chaque carte
const RESUME_DELAY = 4000;         // ms d'inactivité avant reprise auto

export default function ArtistsCarousel({ artists }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const autoTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isPausedRef = useRef(false);

  /* ── Observe which card is most visible ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const observer = new IntersectionObserver(
      (entries) => {
        let best: { index: number; ratio: number } | null = null;
        entries.forEach((entry) => {
          const idx = Number((entry.target as HTMLElement).dataset.index);
          if (!best || entry.intersectionRatio > best.ratio) {
            best = { index: idx, ratio: entry.intersectionRatio };
          }
        });
        if (best && (best as { index: number; ratio: number }).ratio > 0.5) {
          const idx = (best as { index: number; ratio: number }).index;
          activeIndexRef.current = idx;
          setActiveIndex(idx);
        }
      },
      { root: track, threshold: [0.5, 0.75, 1.0] }
    );

    const cards = track.querySelectorAll("[data-index]");
    cards.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, [artists.length]);

  /* ── Snap to card by index (scroll track only, never the window) ── */
  const snapTo = useCallback((idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(`[data-index="${idx}"]`);
    if (!card) return;
    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    const trackWidth = track.offsetWidth;
    const scrollTarget = Math.max(0, cardLeft - trackWidth / 2 + cardWidth / 2);
    track.scrollTo({ left: scrollTarget, behavior: "smooth" });
    activeIndexRef.current = idx;
    setActiveIndex(idx);
  }, []);

  /* ── Auto-scroll ── */
  const startAuto = useCallback(() => {
    if (autoTimerRef.current) clearInterval(autoTimerRef.current);
    autoTimerRef.current = setInterval(() => {
      if (isPausedRef.current) return;
      const next = (activeIndexRef.current + 1) % artists.length;
      snapTo(next);
    }, AUTO_SCROLL_INTERVAL);
  }, [artists.length, snapTo]);

  const pauseAuto = useCallback(() => {
    isPausedRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isPausedRef.current = false;
    }, RESUME_DELAY);
  }, []);

  useEffect(() => {
    startAuto();
    return () => {
      if (autoTimerRef.current) clearInterval(autoTimerRef.current);
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    };
  }, [startAuto]);

  return (
    <div className="relative w-full">
      {/* ── Track ── */}
      <div
        ref={trackRef}
        className="artists-carousel-track"
        onTouchStart={pauseAuto}
        onMouseDown={pauseAuto}
        style={{
          display: "flex",
          gap: "12px",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          touchAction: "pan-x",
          paddingLeft: "24px",
          paddingRight: "24px",
          paddingBottom: "4px",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {artists.map((artist, i) => (
          <Link
            key={i}
            href={artist.slug ? `/artistes/${artist.slug}` : "#artistes"}
            data-index={i}
            style={{
              flex: "0 0 calc(85vw)",
              maxWidth: "320px",
              scrollSnapAlign: "center",
              borderRadius: "16px",
              overflow: "hidden",
              background: artist.bgGrad,
              border: i === activeIndex
                ? `1px solid ${artist.accentColor}66`
                : "1px solid rgba(255,255,255,0.06)",
              transition: "border-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease",
              transform: i === activeIndex ? "scale(1)" : "scale(0.96)",
              boxShadow: i === activeIndex
                ? `0 8px 32px ${artist.accentColor}33, 0 2px 8px rgba(0,0,0,0.6)`
                : "0 2px 8px rgba(0,0,0,0.4)",
              willChange: "transform",
              display: "block",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            {/* Visual area */}
            <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden" }}>
              {/* Accent glow */}
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "112px",
                  height: "112px",
                  borderRadius: "50%",
                  background: artist.accentColor,
                  opacity: i === activeIndex ? 0.3 : 0.15,
                  filter: "blur(32px)",
                  transition: "opacity 0.4s ease",
                }}
              />

              {/* Artist image */}
              {artist.imageUrl ? (
                <Image
                  src={artist.imageUrl}
                  alt={artist.name}
                  fill
                  className="object-cover object-top"
                  sizes="85vw"
                />
              ) : null}

              {/* Index badge */}
              <div
                style={{
                  position: "absolute",
                  top: "16px",
                  left: "16px",
                  width: "32px",
                  height: "32px",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `${artist.accentColor}25`,
                  border: "1px solid rgba(255,255,255,0.1)",
                  zIndex: 10,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "13px",
                    color: "#fff",
                  }}
                >
                  {i + 1}
                </span>
              </div>

              {/* Bottom fade */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)",
                }}
              />

              {/* Accent bar */}
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  opacity: 0.6,
                  background: `linear-gradient(to right, transparent, ${artist.accentColor}, transparent)`,
                }}
              />
            </div>

            {/* Info */}
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "14px",
                  color: "#fff",
                  margin: 0,
                }}
              >
                {artist.name}
              </h3>

              {artist.artworkStyleTags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {artist.artworkStyleTags.map((tag, j) => (
                    <span
                      key={j}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "11px",
                        fontWeight: 600,
                        padding: "4px 10px",
                        borderRadius: "6px",
                        color: artist.accentColor,
                        background: `${artist.accentColor}22`,
                        border: `1px solid ${artist.accentColor}55`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {artist.mediumTags.length > 0 && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {artist.mediumTags.map((tag, j) => (
                    <span
                      key={j}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "11px",
                        fontWeight: 500,
                        padding: "4px 10px",
                        borderRadius: "6px",
                        color: "#c9cdd4",
                        background: "rgba(255,255,255,0.08)",
                        border: "1px solid rgba(255,255,255,0.15)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* ── Dot indicators ── */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "8px",
          marginTop: "20px",
          paddingBottom: "4px",
        }}
        role="tablist"
        aria-label="Artistes"
      >
        {artists.map((artist, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === activeIndex}
            aria-label={`Artiste ${i + 1}: ${artist.name}`}
            onClick={() => { pauseAuto(); snapTo(i); }}
            style={{
              width: i === activeIndex ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === activeIndex ? artist.accentColor : "rgba(255,255,255,0.2)",
              border: "none",
              padding: 0,
              cursor: "pointer",
              transition: "all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)",
              boxShadow: i === activeIndex
                ? `0 0 8px ${artist.accentColor}88`
                : "none",
            }}
          />
        ))}
      </div>

      {/* ── Hide scrollbar on webkit ── */}
      <style>{`
        .artists-carousel-track::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  );
}
