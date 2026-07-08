import { defineType, defineField } from "sanity";
import { HeartIcon } from "@sanity/icons/Heart";
import { seoFields, seoGroup } from "../shared/seoFields";

export const service = defineType({
  name: "service",
  title: "Servizio / Trattamento",
  type: "document",
  icon: HeartIcon,
  groups: [
    { name: "content", title: "Contenuto", default: true },
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
      type: "iconString",
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
    defineField({
      name: "showInFooter",
      title: "Mostra nel footer",
      type: "boolean",
      initialValue: false,
      description:
        "Se attivo, il servizio compare nella colonna «I Nostri Servizi» del footer. Utile per elencare solo i principali.",
      group: "content",
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
