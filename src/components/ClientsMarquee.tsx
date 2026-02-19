import Image from "next/image";

// Uniquement les 4 partenaires réels — images depuis /public/images/partners/
const clients = [
  { name: "YUMÉ",     src: "/images/partners/yume.png" },
  { name: "Logitech", src: "/images/partners/logitech.png" },
  { name: "ADAM",     src: "/images/partners/adam.png" },
  { name: "ArtThema", src: "/images/partners/artthema.png" },
];

// Duplication ×4 pour défilement sans couture
const all = [...clients, ...clients, ...clients, ...clients];

export default function ClientsMarquee() {
  return (
    <section className="py-14 bg-[#131313] relative overflow-hidden">
      <div className="section-divider mb-12" />

      <div className="max-w-7xl mx-auto px-6 mb-8 text-center">
        <p className="font-display text-[11px] text-[#9ca3af] uppercase tracking-[0.25em]">
          Ils collaborent avec nos créateurs
        </p>
      </div>

      {/* Marquee */}
      <div className="relative w-full overflow-hidden">
        {/* Estompage gauche/droite */}
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-[#131313] to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-[#131313] to-transparent pointer-events-none" />

        <div className="flex animate-marquee gap-6 items-center" style={{ width: "max-content" }}>
          {all.map((client, i) => (
            <div
              key={i}
              className="flex items-center justify-center rounded-xl border border-white/8 bg-white hover:border-[#6052ff]/40 transition-all duration-300 group"
              style={{ width: "180px", height: "90px", padding: "12px 20px" }}
            >
              <Image
                src={client.src}
                alt={client.name}
                width={140}
                height={60}
                className="h-12 w-auto object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-12" />
    </section>
  );
}
