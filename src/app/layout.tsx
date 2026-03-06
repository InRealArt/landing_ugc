import type { Metadata } from "next";
import { Unbounded, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

// Chargement via next/font — auto-hébergé, pas de dépendance réseau Google Fonts
const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "InRealArt UGC — Contenu authentique avec les meilleurs artistes français",
  description:
    "Travaillez avec les meilleurs artistes français pour du contenu UGC authentique pour votre marque. Ne tombez plus jamais à court de créa publicitaires.",
  keywords: "UGC, contenu créateur, artistes, influence, marque, InRealArt",
  openGraph: {
    title: "InRealArt UGC — Contenu authentique avec les meilleurs artistes français",
    description:
      "Travaillez avec les meilleurs artistes français pour du contenu UGC authentique pour votre marque.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${unbounded.variable} ${bricolage.variable}`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
