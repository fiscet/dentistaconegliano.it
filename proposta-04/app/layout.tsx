import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dentistaconegliano.it"),
  title: {
    default: "Impianti Dentali a Conegliano | Studio Dentistico",
    template: "%s | Dentista Conegliano",
  },
  description:
    "Implantologia dentale a Conegliano: impianti a carico immediato, denti fissi in 24 ore e protocolli personalizzati. Prima visita e preventivo senza impegno.",
  keywords: [
    "impianti dentali Conegliano",
    "implantologia Conegliano",
    "dentista Conegliano",
    "costo impianto dentale",
    "denti fissi",
  ],
  openGraph: {
    title: "Impianti Dentali a Conegliano | Studio Dentistico",
    description:
      "Implantologia dentale a Conegliano con tecnologie avanzate e risultati naturali. Prenota la tua prima visita.",
    type: "website",
    locale: "it_IT",
  },
};

export const viewport: Viewport = {
  themeColor: "#1aa7e8",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" className={`${inter.variable} ${poppins.variable} bg-background`}>
      <body className="font-sans antialiased">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
