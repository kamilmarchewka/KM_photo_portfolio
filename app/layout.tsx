import type { Metadata } from "next";
import { Montserrat, Dynalight, Abril_Fatface } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import TopBar from "@/components/TopBar";

const abrilFatface = Abril_Fatface({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-abril-fatface",
});
const montserratNormal = Montserrat({
  subsets: ["latin"],
  style: "normal",
  variable: "--font-montserrat-normal",
});

const montserratItalic = Montserrat({
  subsets: ["latin"],
  style: "italic",
  variable: "--font-montserrat-italic",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kamilmarchewka.studio"),
  title: "Kamil Marchewka | Fotograf Kraków",
  description:
    "Szukasz fotografa z Krakowa, który uwieczni emocje na koncercie, zrobi profesjonalny portret lub podkreśli linie Twojego samochodu? Sprawdź moje portfolio. Profesjonalna fotografia motoryzacyjna, eventowa i portretowa. Zapraszam do współpracy!",

  appleWebApp: {
    title: "KM",
    statusBarStyle: "default",
    capable: true,
  },

  openGraph: {
    title: "Kamil Marchewka | Fotograf Kraków",
    description:
      "Szukasz fotografa z Krakowa, który uwieczni emocje na koncercie, zrobi profesjonalny portret lub podkreśli linie Twojego samochodu? Sprawdź moje portfolio. Profesjonalna fotografia motoryzacyjna, eventowa i portretowa. Zapraszam do współpracy!",
    url: "https://kamilmarchewka.studio",
    siteName: "KM",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${abrilFatface.variable} ${montserratNormal.variable} ${montserratItalic.variable} h-full antialiased`}
    >
      <body className="min-h-full font-montserrat bg-zinc-50 text-zinc-800">
        <TopBar />
        <main className="mx-auto max-w-7xl w-full px-6 lg:px-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
