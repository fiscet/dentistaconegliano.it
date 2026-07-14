import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";

// Mappa i tipi documento alle URL del sito, per navigazione nell'iframe
// del Presentation Tool e per i badge "vai alla pagina" nello Studio.
// clinicalCase, staffMember e testimonial non hanno una pagina dedicata
// (compaiono solo dentro altre pagine) e non sono elencati qui.
export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    homePage: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: "Home Page", href: "/" }],
      }),
    }),
    studioPage: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: "Pagina Lo Studio", href: "/studio" }],
      }),
    }),
    casesPage: defineLocations({
      select: {},
      resolve: () => ({
        locations: [{ title: "Pagina Interventi Realizzati", href: "/interventi-realizzati" }],
      }),
    }),
    page: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Senza titolo",
            href: `/${doc?.slug}`,
          },
        ],
      }),
    }),
    service: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Senza titolo",
            href: `/servizi/${doc?.slug}`,
          },
          { title: "Tutti i servizi", href: "/servizi" },
        ],
      }),
    }),
    post: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Senza titolo",
            href: `/blog/${doc?.slug}`,
          },
          { title: "Tutto il blog", href: "/blog" },
        ],
      }),
    }),
    video: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          {
            title: doc?.title || "Senza titolo",
            href: `/video/${doc?.slug}`,
          },
          { title: "Tutti i video", href: "/video" },
        ],
      }),
    }),
  },
};
