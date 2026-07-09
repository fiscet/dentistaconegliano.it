import type { Metadata } from "next";
import type { SanityImageSource } from "@sanity/image-url";
import { urlFor } from "@/sanity/lib/image";
import { getSiteSettings } from "@/lib/settings";

// Risolve un'immagine OG (1200×630) dal primo source Sanity valido passato.
// Uso: ogImageUrl(doc.seoImage, doc.image) — prova seoImage, poi image.
export function ogImageUrl(...sources: unknown[]): string | undefined {
  for (const s of sources) {
    if (s && typeof s === "object" && "asset" in s && (s as { asset?: unknown }).asset) {
      return urlFor(s as SanityImageSource).width(1200).height(630).fit("crop").url();
    }
  }
  return undefined;
}

// Costruisce openGraph + twitter per una pagina. In Next il campo `openGraph`
// di un figlio SOVRASCRIVE del tutto quello del root layout, quindi qui
// includiamo sempre siteName/locale/immagine. Va spread-ato nel Metadata della
// pagina insieme a title/description.
export async function socialMeta({
  title,
  description,
  image,
  type = "website",
}: {
  title?: string;
  description?: string;
  image?: string;
  type?: "website" | "article";
}): Promise<Pick<Metadata, "openGraph" | "twitter">> {
  const settings = await getSiteSettings();
  const ogImage = image ?? settings.seoImageUrl ?? "/images/gianluca-marin-home.jpg";
  return {
    openGraph: {
      type,
      siteName: settings.name,
      locale: "it_IT",
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      ...(title ? { title } : {}),
      ...(description ? { description } : {}),
      images: [ogImage],
    },
  };
}

// Canonical assoluto per una pagina. path deve iniziare con "/" ("/" per la home).
export async function canonicalUrl(path: string): Promise<Pick<Metadata, "alternates">> {
  const settings = await getSiteSettings();
  return { alternates: { canonical: new URL(path, settings.url).toString() } };
}

// robots meta per singolo documento con noIndex=true. Assente/false -> nessun
// override (resta il default index/follow di Next).
export function robotsMeta(noIndex?: boolean | null): Pick<Metadata, "robots"> {
  if (!noIndex) return {};
  return { robots: { index: false, follow: true } };
}
