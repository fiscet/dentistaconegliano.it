import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default:
      "Implantologia Dentale a Conegliano | Studio Dentistico Dott. Gianluca Marin",
    template: "%s | Studio Dentistico Dott. Gianluca Marin",
  },
  description:
    "Studio Dentistico Dott. Gianluca Marin a Conegliano (TV): implantologia a carico immediato, All-on-4, chirurgia computer guidata e sedazione cosciente. Oltre 20 anni di attività.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground overflow-x-hidden">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
