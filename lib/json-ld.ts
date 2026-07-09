import type { SiteSettings } from "@/lib/settings";

// Coordinate dello studio (Via Maggiore Giovanni Piovesana 159, Conegliano),
// geocodificate su OpenStreetMap/Nominatim il 2026-07-09 — match esatto sul
// civico 159. Aggiornare se lo studio cambia sede.
const STUDIO_GEO = { latitude: 45.8930405, longitude: 12.3236976 } as const;

// Comuni entro ~60km da Conegliano usati come area servita dichiarata
// dallo studio (vedi lib/site.ts / marketing "raggio 60km").
const AREA_SERVED_CITIES = [
  "Conegliano",
  "Vittorio Veneto",
  "Treviso",
  "Oderzo",
  "Pordenone",
  "Castelfranco Veneto",
  "Motta di Livenza",
] as const;

// LocalBusiness/Dentist condiviso: da usare su home + /contatti (le pagine
// standard per LocalBusiness secondo le linee guida Google, non su ogni pagina).
// Orario strutturato: il campo openingHours dei settings è testo libero,
// quindi la versione machine-readable resta hardcoded qui — va tenuta
// sincronizzata manualmente se cambiano gli orari dello studio.
export function dentistJsonLd(settings: SiteSettings) {
  return {
    "@context": "https://schema.org",
    "@type": ["Dentist", "MedicalBusiness"],
    name: settings.name,
    url: settings.url,
    telephone: settings.phoneHref.replace("tel:", ""),
    ...(settings.logoUrl ? { image: settings.logoUrl } : {}),
    priceRange: "€€",
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address.street,
      postalCode: settings.address.postalCode,
      addressLocality: settings.address.city,
      addressRegion: settings.address.province,
      addressCountry: "IT",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: STUDIO_GEO.latitude,
      longitude: STUDIO_GEO.longitude,
    },
    areaServed: AREA_SERVED_CITIES.map((name) => ({
      "@type": "City",
      name,
    })),
    ...(settings.socials.length
      ? { sameAs: settings.socials.map((s) => s.url).filter((url): url is string => Boolean(url)) }
      : {}),
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "13:00",
      },
    ],
    founder: {
      "@type": "Person",
      name: settings.doctor,
      jobTitle: "Direttore Sanitario e Chirurgo Implantologo",
    },
    medicalSpecialty: "Dentistry",
  };
}

// BreadcrumbList generico: items in ordine da Home a pagina corrente.
export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// MedicalProcedure per la pagina dettaglio di un servizio/trattamento.
export function serviceJsonLd({
  name,
  description,
  url,
  image,
  provider,
}: {
  name: string;
  description?: string;
  url: string;
  image?: string;
  provider: { name: string; url: string };
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name,
    ...(description ? { description } : {}),
    url,
    ...(image ? { image } : {}),
    provider: {
      "@type": "Dentist",
      name: provider.name,
      url: provider.url,
    },
  };
}

// VideoObject per i video "il dottore risponde" pubblicati su YouTube.
// L'ID viene estratto dallo stesso URL usato da LiteYouTube per l'embed.
function youtubeVideoId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  );
  return match?.[1] ?? null;
}

// Converte una durata "mm:ss" (formato dello Studio) nel formato ISO 8601
// richiesto da schema.org per VideoObject.duration (es. "4:13" -> "PT4M13S").
function toIso8601Duration(duration: string): string | null {
  const match = duration.match(/^(\d{1,3}):(\d{2})$/);
  if (!match) return null;
  const minutes = Number(match[1]);
  const seconds = Number(match[2]);
  return `PT${minutes}M${seconds}S`;
}

export function videoObjectJsonLd({
  title,
  description,
  youtubeUrl,
  publishedAt,
  duration,
  thumbnailUrl,
}: {
  title: string;
  description?: string;
  youtubeUrl: string;
  publishedAt?: string;
  duration?: string;
  thumbnailUrl?: string;
}) {
  const id = youtubeVideoId(youtubeUrl);
  if (!id) return null;

  const isoDuration = duration ? toIso8601Duration(duration) : null;

  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: title,
    description: description ?? title,
    thumbnailUrl: [thumbnailUrl ?? `https://i.ytimg.com/vi/${id}/hqdefault.jpg`],
    ...(publishedAt ? { uploadDate: publishedAt } : {}),
    ...(isoDuration ? { duration: isoDuration } : {}),
    embedUrl: `https://www.youtube-nocookie.com/embed/${id}`,
    contentUrl: youtubeUrl,
  };
}

// Article JSON-LD per un post del blog.
export function articleJsonLd({
  title,
  description,
  image,
  publishedAt,
  authorName,
  url,
}: {
  title: string;
  description?: string;
  image?: string;
  publishedAt?: string;
  authorName?: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    ...(description ? { description } : {}),
    ...(image ? { image } : {}),
    ...(publishedAt ? { datePublished: publishedAt } : {}),
    ...(authorName ? { author: { "@type": "Person", name: authorName } } : {}),
    mainEntityOfPage: url,
  };
}
