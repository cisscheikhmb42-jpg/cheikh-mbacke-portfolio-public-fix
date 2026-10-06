import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cheikh Mbacke Cissé — Digital Marketing & AI Content Creator",
  description: "Portfolio de Cheikh Mbacke Cissé, spécialiste en marketing digital, social media, création de contenu et intelligence artificielle.",
  openGraph: {
    title: "Cheikh Mbacke Cissé — Digital Marketing & AI Content Creator",
    description: "Marketing digital, social media, création de contenu et IA appliquée.",
    type: "website",
    locale: "fr_FR",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
