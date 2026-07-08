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

export const seoGroup = { name: "seo", title: "SEO" };
