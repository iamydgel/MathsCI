import type { Metadata } from "next";
import { Inter, Poppins, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "MathSci CI 🇨🇮 — Les Mathématiques au Cœur de l'Excellence",
  description: "Portail des mathématiques en Côte d'Ivoire : opportunités professionnelles, parcours scolaires d'excellence, portraits inspirants et agenda des concours nationaux.",
  keywords: ["Mathématiques", "Côte d'Ivoire", "STEM", "ENSEA", "INP-HB", "Actuariat", "Data Science", "Concours"],
  authors: [{ name: "MathSci CI" }],
  openGraph: {
    title: "MathSci CI 🇨🇮 — Les Mathématiques au Cœur de l'Excellence",
    description: "Découvrez comment les mathématiques façonnent l'avenir et les carrières scientifiques d'excellence en Côte d'Ivoire.",
    type: "website",
    locale: "fr_CI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} scroll-smooth`}
    >
      <body className="antialiased min-h-screen flex flex-col selection:bg-ci-orange selection:text-white">
        {children}
      </body>
    </html>
  );
}
