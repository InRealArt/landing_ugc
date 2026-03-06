import Image from "next/image";

// Anneau 1 — rayon 160px, 4 logos, rotation horaire 22s
const ring1 = [
  { name: "YUMÉ",      src: "/images/partners/yume.png" },
  { name: "Logitech",  src: "/images/partners/logitech.png" },
  { name: "DEMAIN TV", src: "/images/partners/DEMAIN_TV_Logo.webp" },
  { name: "LMC",       src: "/images/partners/Logo-LMC.webp" },
];

// Anneau 2 — rayon 280px, 4 logos, rotation anti-horaire 30s
const ring2 = [
  { name: "ADAM",        src: "/images/partners/adam.png" },
  { name: "ArtThema",   src: "/images/partners/artthema.png" },
  { name: "Biennale",   src: "/images/partners/biennale-Biennale-2026.webp" },
  { name: "JobTalk TV", src: "/images/partners/JobTalk_Tv_Sans_fond.webp" },
];

// Pré-calcul des positions trigonométriques (évite les chaînes de transform)
// Chaque logo est positionné via left/top absolus depuis le centre
// → pas d'héritage de rotation → toujours droit
function getOrbitPositions(count: number, radius: number, offsetDeg = 0) {
  return Array.from({ length: count }, (_, i) => {
    const deg = (i / count) * 360 + offsetDeg;
    const rad = (deg * Math.PI) / 180;
    // CSS: x = sin, y = -cos pour partir du haut
    return {
      x: Math.sin(rad) * radius,
      y: -Math.cos(rad) * radius,
      deg,
    };
  });
}

const pos1 = getOrbitPositions(4, 160, 0);
const pos2 = getOrbitPositions(4, 280, 45);

export default function ClientsMarquee() {
  return (
    <section className="py-20 bg-[#131313] relative overflow-hidden">
      <div className="section-divider mb-16" />

      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <p className="font-display text-[11px] text-[#9ca3af] uppercase tracking-[0.25em]">
          Ils collaborent avec nos créateurs
        </p>
      </div>

      {/* Scène orbitale */}
      <div className="relative flex items-center justify-center" style={{ height: "660px" }}>

        {/* Halo central — même effet que Michel-Ange PhoneShowcase */}
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "200px",
            height: "200px",
            background: "radial-gradient(circle, rgba(96,82,255,0.95) 0%, rgba(96,82,255,0.35) 45%, transparent 70%)",
            filter: "blur(28px)",
            mixBlendMode: "screen",
            animation: "orbit-glow-pulse 3s ease-in-out infinite",
          }}
        />

        {/* Orbite 1 — trace */}
        <div
          className="absolute rounded-full"
          style={{
            width: "320px",
            height: "320px",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        />

        {/* Orbite 2 — trace */}
        <div
          className="absolute rounded-full"
          style={{
            width: "560px",
            height: "560px",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        />

        {/* Centre — logo InRealArt */}
        <div
          className="absolute z-10 flex items-center justify-center rounded-full border border-white/10"
          style={{
            width: "100px",
            height: "100px",
            background: "rgba(240,238,235,0.96)",
            boxShadow: "0 0 0 1px rgba(96,82,255,0.25), 0 8px 40px rgba(0,0,0,0.7)",
          }}
        >
          <Image
            src="/images/logo/logo_ira.png"
            alt="InRealArt"
            width={70}
            height={70}
            className="w-14 h-14 object-contain"
          />
        </div>

        {/* Anneau 1 — conteneur tournant (horaire 22s) */}
        <div
          className="absolute"
          style={{
            width: "320px",
            height: "320px",
            animation: "orbit-cw 22s linear infinite",
          }}
        >
          {ring1.map((client, i) => (
            <div
              key={client.name}
              className="absolute"
              style={{
                // Positionné depuis le centre du conteneur (160px = rayon)
                left: `calc(50% + ${pos1[i].x}px)`,
                top: `calc(50% + ${pos1[i].y}px)`,
                transform: "translate(-50%, -50%)",
                // Counter-rotation pour garder horizontal
                animation: "orbit-ccw 22s linear infinite",
              }}
            >
              <div
                className="flex items-center justify-center rounded-xl border border-white/10 hover:border-[#6052ff]/50 transition-all duration-300 group cursor-default"
                style={{
                  width: "150px",
                  height: "80px",
                  padding: "12px 18px",
                  background: "rgba(240,238,235,0.96)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
                }}
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  width={118}
                  height={54}
                  className="max-h-12 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Anneau 2 — conteneur tournant (anti-horaire 30s) */}
        <div
          className="absolute"
          style={{
            width: "560px",
            height: "560px",
            animation: "orbit-ccw 30s linear infinite",
          }}
        >
          {ring2.map((client, i) => (
            <div
              key={client.name}
              className="absolute"
              style={{
                left: `calc(50% + ${pos2[i].x}px)`,
                top: `calc(50% + ${pos2[i].y}px)`,
                transform: "translate(-50%, -50%)",
                animation: "orbit-cw 30s linear infinite",
              }}
            >
              <div
                className="flex items-center justify-center rounded-xl border border-white/10 hover:border-[#6052ff]/50 transition-all duration-300 group cursor-default"
                style={{
                  width: "168px",
                  height: "88px",
                  padding: "14px 20px",
                  background: "rgba(240,238,235,0.96)",
                  boxShadow: "0 4px 24px rgba(0,0,0,0.6)",
                }}
              >
                <Image
                  src={client.src}
                  alt={client.name}
                  width={132}
                  height={58}
                  className="max-h-14 w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          ))}
        </div>

      </div>

      <div className="section-divider mt-16" />
    </section>
  );
}
