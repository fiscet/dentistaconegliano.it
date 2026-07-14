import { defineType, defineField } from "sanity";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";

export const faq = defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  icon: HelpCircleIcon,
  fields: [
    defineField({
      name: "question",
      title: "Domanda",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Risposta",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "relatedService",
      title: "Servizio collegato",
      type: "reference",
      to: [{ type: "service" }],
      description: "Il trattamento a cui si riferisce la domanda, se applicabile.",
    }),
    defineField({
      name: "order",
      title: "Ordine di visualizzazione",
      type: "number",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Ordine manuale",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "question", subtitle: "answer" },
  },
});
