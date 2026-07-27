import { defineType, defineField } from "sanity";
import { DocumentsIcon } from "@sanity/icons/Documents";
import { seoFields, noIndexField, seoGroup } from "../shared/seoFields";

export const blogPage = defineType({
  name: "blogPage",
  title: "Pagina Blog",
  type: "document",
  icon: DocumentsIcon,
  groups: [{ name: "hero", title: "Intro", default: true }, seoGroup],
  fields: [
    defineField({
      name: "hero",
      title: "Sezione introduttiva",
      type: "object",
      group: "hero",
      description: "L'elenco degli articoli arriva dai documenti «Blog».",
      fields: [
        defineField({ name: "eyebrow", title: "Occhiello", type: "string" }),
        defineField({ name: "title", title: "Titolo", type: "string" }),
        defineField({ name: "description", title: "Descrizione", type: "text", rows: 3 }),
      ],
    }),
    ...seoFields,
    noIndexField,
  ],
  preview: {
    prepare: () => ({ title: "Pagina Blog" }),
  },
});
