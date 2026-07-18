import { defineType, defineField, defineArrayMember } from "sanity";
import { ActivityIcon } from "@sanity/icons/Activity";
import { seoFields, noIndexField, seoGroup } from "../shared/seoFields";

export const pathPage = defineType({
  name: "pathPage",
  title: "Pagina Percorso di Cura",
  type: "document",
  icon: ActivityIcon,
  groups: [
    { name: "hero", title: "Intro", default: true },
    { name: "steps", title: "Passaggi" },
    { name: "cta", title: "CTA finale" },
    seoGroup,
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Sezione introduttiva",
      type: "object",
      group: "hero",
      fields: [
        defineField({ name: "eyebrow", title: "Occhiello", type: "string" }),
        defineField({ name: "title", title: "Titolo", type: "string" }),
        defineField({ name: "description", title: "Descrizione", type: "text", rows: 4 }),
      ],
    }),

    defineField({
      name: "steps",
      title: "I 4 passaggi",
      type: "array",
      group: "steps",
      description: "L'ordine degli elementi determina la numerazione mostrata in pagina.",
      validation: (rule) => rule.min(2).max(6),
      of: [
        defineArrayMember({
          type: "object",
          name: "pathStep",
          fields: [
            defineField({ name: "icon", title: "Icona", type: "iconString" }),
            defineField({
              name: "title",
              title: "Titolo",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({ name: "text", title: "Testo", type: "text", rows: 3 }),
          ],
          preview: { select: { title: "title", subtitle: "icon" } },
        }),
      ],
    }),

    defineField({
      name: "cta",
      title: "Invito finale",
      type: "object",
      group: "cta",
      fields: [
        defineField({ name: "title", title: "Titolo", type: "string" }),
        defineField({ name: "description", title: "Descrizione", type: "text", rows: 3 }),
        defineField({
          name: "buttonLabel",
          title: "Testo del bottone",
          type: "string",
          initialValue: "Prenota la prima visita",
        }),
      ],
    }),

    ...seoFields,
    noIndexField,
  ],
  preview: {
    prepare: () => ({ title: "Pagina Percorso di Cura" }),
  },
});
