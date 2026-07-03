import { defineType, defineField } from "sanity";
import { CommentIcon } from "@sanity/icons/Comment";

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonianza",
  type: "document",
  icon: CommentIcon,
  fields: [
    defineField({
      name: "authorName",
      title: "Nome del paziente",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "text",
      title: "Testo della testimonianza",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Valutazione (1-5)",
      type: "number",
      validation: (rule) => rule.min(1).max(5).integer(),
      initialValue: 5,
    }),
    defineField({
      name: "date",
      title: "Data",
      type: "date",
    }),
    defineField({
      name: "source",
      title: "Fonte",
      type: "string",
      options: {
        list: ["Google", "Facebook", "Diretta"],
      },
      description: "Da dove proviene la recensione.",
    }),
    defineField({
      name: "featured",
      title: "In evidenza",
      type: "boolean",
      initialValue: false,
      description: "Mostrala nelle sezioni in evidenza del sito.",
    }),
  ],
  preview: {
    select: { title: "authorName", subtitle: "text" },
  },
});
