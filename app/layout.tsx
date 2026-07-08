import type { Metadata } from 'next';
import { Source_Sans_3 } from 'next/font/google';
import { getSiteSettings } from '@/lib/settings';
import { Analytics } from '@/components/analytics';
import { CookieConsent } from '@/components/cookie-consent';
import { MotionProvider } from '@/components/motion-provider';
import './globals.css';

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

const sourceSans = Source_Sans_3({
  variable: '--font-source-sans',
  subsets: ['latin']
});

const fallbackTitle =
  'Implantologia Dentale a Conegliano | Studio Dentistico Dott. Gianluca Marin';
const fallbackDescription =
  'Studio Dentistico Dott. Gianluca Marin a Conegliano (TV): implantologia a carico immediato, All-on-4, chirurgia computer guidata e sedazione cosciente. Oltre 20 anni di attività.';

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();

  const title = settings.seoTitle ?? fallbackTitle;
  const description = settings.seoDescription ?? fallbackDescription;
  // Immagine social: campo seoImage di siteSettings; fallback a un'immagine
  // statica del sito (risolta in assoluto grazie a metadataBase).
  const ogImage = settings.seoImageUrl ?? '/images/gianluca-marin-home.jpg';

  return {
    metadataBase: new URL(settings.url),
    title: {
      default: title,
      template: `%s | ${settings.name}`
    },
    description,
    openGraph: {
      type: 'website',
      siteName: settings.name,
      locale: 'it_IT',
      url: settings.url,
      title,
      description,
      images: [{ url: ogImage }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage]
    }
  };
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it" className={`${sourceSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground overflow-x-hidden">
        {GA_ID && <Analytics />}
        <MotionProvider>
          {children}
          {GA_ID && <CookieConsent />}
        </MotionProvider>
      </body>
    </html>
  );
}
