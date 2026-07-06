import type { Metadata } from "next";
import { Source_Sans_3 } from "next/font/google";
import { getSiteSettings } from "@/lib/settings";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
});

const fallbackTitle =
  "Implantologia Dentale a Conegliano | Studio Dentistico Dott. Gianluca Marin";
const fallbackDescription =
  "Studio Dentistico Dott. Gianluca Marin a Conegliano (TV): implantologia a carico immediato, All-on-4, chirurgia computer guidata e sedazione cosciente. Oltre 20 anni di attività.";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  return {
    title: {
      default: settings.seoTitle ?? fallbackTitle,
      template: `%s | ${settings.name}`,
    },
    description: settings.seoDescription ?? fallbackDescription,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${sourceSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
