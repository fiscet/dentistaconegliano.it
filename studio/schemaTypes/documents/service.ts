import { defineType, defineField } from "sanity";
import { HeartIcon } from "@sanity/icons/Heart";
import { seoFields, seoGroup } from "../shared/seoFields";
import { iconOptions } from "../shared/icons";

export const service = defineType({
  name: "service",
  title: "Servizio / Trattamento",
  type: "document",
  icon: HeartIcon,
  groups: [
    { name: "content", title: "Contenuto", default: true },
    { name: "price", title: "Prezzo" },
    { name: "home", title: "In Home" },
    seoGroup,
  ],
  fields: [
    defineField({
      name: "title",
      title: "Nome del trattamento",
      type: "string",
      validation: (rule) => rule.required(),
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
      description: "URL della pagina: /servizi/<slug>",
      group: "content",
    }),
    defineField({
      name: "icon",
      title: "Icona",
      type: "string",
      options: { list: iconOptions },
      description: "Mostrata nella card in home e nell'elenco servizi.",
      group: "content",
    }),
    defineField({
      name: "excerpt",
      title: "Descrizione breve",
      type: "text",
      rows: 3,
      description: "Mostrata nelle card e negli elenchi.",
      group: "content",
    }),
    defineField({
      name: "image",
      title: "Immagine",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Testo alternativo", type: "string" }),
      ],
      group: "content",
    }),
    defineField({
      name: "body",
      title: "Descrizione completa",
      type: "blockContent",
      group: "content",
    }),
    defineField({
      name: "order",
      title: "Ordine di visualizzazione",
      type: "number",
      initialValue: 0,
      group: "content",
    }),

    // --- Prezzo (indicativo, per la pagina /prezzi) ---
    defineField({
      name: "priceBadge",
      title: "Etichetta prezzo",
      type: "string",
      description: "Piccola etichetta sulla card, es. 'Arcata Completa', 'Soluzione Singola'.",
      group: "price",
    }),
    defineField({
      name: "priceMin",
      title: "Prezzo minimo (€)",
      type: "number",
      description: "Estremo inferiore del range indicativo. Vuoto = 'su preventivo'.",
      validation: (rule) => rule.min(0),
      group: "price",
    }),
    defineField({
      name: "priceMax",
      title: "Prezzo massimo (€)",
      type: "number",
      description: "Estremo superiore del range. Vuoto = prezzo 'a partire da'.",
      validation: (rule) => rule.min(0),
      group: "price",
    }),
    defineField({
      name: "priceNote",
      title: "Nota prezzo",
      type: "string",
      description: "Es. 'ad arcata', 'a impianto'. Mostrata sotto il prezzo.",
      group: "price",
    }),
    defineField({
      name: "priceFeatures",
      title: "Cosa include",
      type: "array",
      of: [{ type: "string" }],
      description: "Voci elencate nella card prezzo (es. 'Corona in zirconio inclusa').",
      group: "price",
    }),
    defineField({
      name: "popular",
      title: 'Evidenzia come "Più richiesto"',
      type: "boolean",
      initialValue: false,
      description: "Mette in risalto la card nella pagina /prezzi.",
      group: "price",
    }),

    // --- In Home ---
    defineField({
      name: "showInHome",
      title: "Mostra in home",
      type: "boolean",
      initialValue: false,
      description: "Se attivo, il servizio compare tra le card della sezione Trattamenti in home.",
      group: "home",
    }),
    defineField({
      name: "homeTitle",
      title: "Titolo in home (override)",
      type: "string",
      description: "Opzionale: se valorizzato sostituisce il nome del trattamento nella card in home.",
      hidden: ({ parent }) => !parent?.showInHome,
      group: "home",
    }),
    defineField({
      name: "homeExcerpt",
      title: "Descrizione breve in home (override)",
      type: "text",
      rows: 3,
      description: "Opzionale: se valorizzata sostituisce la descrizione breve nella card in home.",
      hidden: ({ parent }) => !parent?.showInHome,
      group: "home",
    }),

    ...seoFields,
  ],
  orderings: [
    {
      title: "Ordine manuale",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "excerpt", media: "image" },
  },
});
