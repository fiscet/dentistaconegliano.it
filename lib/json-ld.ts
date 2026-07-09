import type { SiteSettings } from "@/lib/settings";

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
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address.street,
      postalCode: settings.address.postalCode,
      addressLocality: settings.address.city,
      addressRegion: settings.address.province,
      addressCountry: "IT",
    },
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
