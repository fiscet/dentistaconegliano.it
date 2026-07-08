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
