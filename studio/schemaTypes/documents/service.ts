import { defineType, defineField } from "sanity";
import { HeartIcon } from "@sanity/icons/Heart";
import { seoFields, seoGroup } from "../shared/seoFields";

export const service = defineType({
  name: "service",
  title: "Servizio / Trattamento",
  type: "document",
  icon: HeartIcon,
  groups: [{ name: "content", title: "Contenuto", default: true }, seoGroup],
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
