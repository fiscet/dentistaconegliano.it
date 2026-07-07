import { defineType, defineField, defineArrayMember } from "sanity";
import { TagIcon } from "@sanity/icons/Tag";
import { seoFields, seoGroup } from "../shared/seoFields";

const enabledField = defineField({
  name: "enabled",
  title: "Mostra sezione",
  type: "boolean",
  initialValue: true,
});

export const pricePage = defineType({
  name: "pricePage",
  title: "Pagina Prezzi",
  type: "document",
  icon: TagIcon,
  groups: [
    { name: "hero", title: "Intro", default: true },
    { name: "factors", title: "Cosa influenza il costo" },
    { name: "list", title: "Listino" },
    { name: "cta", title: "CTA" },
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
        defineField({ name: "description", title: "Descrizione", type: "text", rows: 3 }),
      ],
    }),

    defineField({
      name: "factors",
      title: "Sezione «Cosa influenza il costo»",
      type: "object",
      group: "factors",
      fields: [
        enabledField,
        defineField({ name: "eyebrow", title: "Occhiello", type: "string" }),
        defineField({ name: "title", title: "Titolo", type: "string" }),
        defineField({
          name: "items",
          title: "Fattori",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "factor",
              fields: [
                defineField({
                  name: "icon",
                  title: "Icona",
                  type: "iconString",
                }),
                defineField({ name: "title", title: "Titolo", type: "string" }),
                defineField({ name: "text", title: "Testo", type: "text", rows: 3 }),
              ],
              preview: { select: { title: "title", subtitle: "icon" } },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "list",
      title: "Sezione Listino",
      type: "object",
      group: "list",
      description: 'Le card prezzo arrivano dai Servizi che hanno un "Prezzo minimo" compilato.',
      fields: [
        enabledField,
        defineField({ name: "eyebrow", title: "Occhiello", type: "string" }),
        defineField({ name: "title", title: "Titolo", type: "string" }),
        defineField({ name: "description", title: "Descrizione", type: "text", rows: 3 }),
      ],
    }),

    defineField({
      name: "cta",
      title: "Sezione CTA finale",
      type: "object",
      group: "cta",
      fields: [
        enabledField,
        defineField({ name: "eyebrow", title: "Occhiello", type: "string" }),
        defineField({ name: "title", title: "Titolo", type: "string" }),
        defineField({ name: "description", title: "Descrizione", type: "text", rows: 3 }),
        defineField({ name: "boxTitle", title: "Titolo del box", type: "string" }),
      ],
    }),

    ...seoFields,
  ],
  preview: {
    prepare: () => ({ title: "Pagina Prezzi" }),
  },
});
