import { defineType, defineField } from "sanity";
import { DocumentIcon } from "@sanity/icons/Document";
import { seoFields, seoGroup } from "../shared/seoFields";

export const page = defineType({
  name: "page",
  title: "Pagina",
  type: "document",
  icon: DocumentIcon,
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
      name: "intro",
      title: "Introduzione",
      type: "text",
      rows: 3,
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
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
