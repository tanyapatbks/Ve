import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Caveat } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-jost",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ve Tan Boon — Perspective · Creative · Reflective",
  description: "Personal space of Ve Tan Boon. Highlighting perspectives on life, creative works, and research-focused reflections.",
  keywords: ["Ve Tan Boon", "Perspective", "Creative", "Reflective", "Personal Portfolio", "Thailand", "Bangkok"],
  authors: [{ name: "Ve Tan Boon" }],
  openGraph: {
    title: "Ve Tan Boon — Personal Space",
    description: "Perspective · Creative · Reflective. Discover the personal and professional world of Ve Tan Boon.",
    type: "website",
    locale: "th_TH",
  },
};

export default function RootLayout({
  children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    <html
      lang="th"
      className={`${cormorant.variable} ${jost.variable} ${caveat.variable} h-full scroll-smooth`}
    >
      <body className="min-h-full flex flex-col paper-texture font-sans selection:bg-cream-muted selection:text-cream-ink">
        {children}
      </body>
    </html>
  );
}
