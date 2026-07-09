import { defineField } from "sanity";

// Campi SEO riutilizzabili: da spargere (...seoFields) nei document type indicizzabili.
export const seoFields = [
  defineField({
    name: "seoTitle",
    title: "Titolo SEO",
    type: "string",
    description: "Sovrascrive il titolo di pagina nei risultati di ricerca (max ~60 caratteri).",
    validation: (rule) => rule.max(70).warning("Meglio restare sotto i 60-70 caratteri"),
    group: "seo",
  }),
  defineField({
    name: "seoDescription",
    title: "Descrizione SEO",
    type: "text",
    rows: 3,
    validation: (rule) => rule.max(170).warning("Meglio restare sotto i 160 caratteri"),
    group: "seo",
  }),
  defineField({
    name: "seoImage",
    title: "Immagine social (Open Graph)",
    type: "image",
    group: "seo",
  }),
];

// Solo per i document type con una route pubblica dedicata (non siteSettings,
// che non è mai renderizzato come pagina propria).
export const noIndexField = defineField({
  name: "noIndex",
  title: "Escludi dai motori di ricerca (noindex)",
  type: "boolean",
  description: "Attiva solo per pagine che non devono comparire su Google.",
  initialValue: false,
  group: "seo",
});

export const seoGroup = { name: "seo", title: "SEO" };
