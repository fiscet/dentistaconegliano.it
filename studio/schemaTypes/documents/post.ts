import { defineType, defineField } from "sanity";
import { DocumentTextIcon } from "@sanity/icons/DocumentText";
import { seoFields, seoGroup } from "../shared/seoFields";

export const post = defineType({
  name: "post",
  title: "Articolo Blog",
  type: "document",
  icon: DocumentTextIcon,
  groups: [{ name: "content", title: "Contenuto", default: true }, seoGroup],
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
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
      name: "publishedAt",
      title: "Data di pubblicazione",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
      group: "content",
    }),
    defineField({
      name: "excerpt",
      title: "Riassunto",
      type: "text",
      rows: 3,
      description: "Mostrato negli elenchi e come descrizione di default per la SEO.",
      group: "content",
    }),
    defineField({
      name: "mainImage",
      title: "Immagine principale",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Testo alternativo", type: "string" }),
      ],
      group: "content",
    }),
    defineField({
      name: "author",
      title: "Autore",
      type: "reference",
      to: [{ type: "staffMember" }],
      group: "content",
    }),
    defineField({
      name: "body",
      title: "Contenuto",
      type: "blockContent",
      group: "content",
    }),
    ...seoFields,
  ],
  orderings: [
    {
      title: "Più recenti",
      name: "publishedAtDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "mainImage" },
  },
});
