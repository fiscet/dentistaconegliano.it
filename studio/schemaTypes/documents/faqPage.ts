import { defineType, defineField } from "sanity";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { seoFields, noIndexField, seoGroup } from "../shared/seoFields";

export const faqPage = defineType({
  name: "faqPage",
  title: "Pagina FAQ",
  type: "document",
  icon: HelpCircleIcon,
  groups: [{ name: "hero", title: "Intro", default: true }, seoGroup],
  fields: [
    defineField({
      name: "hero",
      title: "Sezione introduttiva",
      type: "object",
      group: "hero",
      description: "L'elenco delle domande arriva dai documenti «FAQ».",
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
    prepare: () => ({ title: "Pagina FAQ" }),
  },
});
