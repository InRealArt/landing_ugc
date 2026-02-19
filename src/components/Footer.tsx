import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#131313] border-t border-white/6 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <div className="bg-white rounded-xl px-3 py-1.5">
              <Image
                src="/images/logo/logo_ira.png"
                alt="InRealArt"
                width={110}
                height={48}
                className="h-12 w-auto object-contain"
              />
            </div>
          </Link>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6">
            {[
              { label: "Pour les Marques", href: "#marques" },
              { label: "Nos Artistes", href: "#artistes" },
              { label: "Comment ça marche", href: "#comment" },
              { label: "FAQ", href: "#faq" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="font-display text-xs text-white/30 hover:text-[#6052ff] transition-colors duration-300"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Copyright */}
          <p className="font-body text-xs text-white/20">
            © {currentYear} InRealArt. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
