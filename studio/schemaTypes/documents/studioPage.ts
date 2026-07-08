import { defineType, defineField, defineArrayMember } from "sanity";
import { UsersIcon } from "@sanity/icons/Users";
import { seoFields, noIndexField, seoGroup } from "../shared/seoFields";

const enabledField = defineField({
  name: "enabled",
  title: "Mostra sezione",
  type: "boolean",
  initialValue: true,
});

const imageWithAlt = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "Testo alternativo", type: "string" })],
  });

const iconCard = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [
      defineArrayMember({
        type: "object",
        name: "iconCard",
        fields: [
          defineField({ name: "icon", title: "Icona", type: "iconString" }),
          defineField({ name: "title", title: "Titolo", type: "string" }),
          defineField({ name: "text", title: "Testo", type: "text", rows: 3 }),
        ],
        preview: { select: { title: "title", subtitle: "icon" } },
      }),
    ],
  });

export const studioPage = defineType({
  name: "studioPage",
  title: "Pagina Lo Studio",
  type: "document",
  icon: UsersIcon,
  groups: [
    { name: "hero", title: "Intro", default: true },
    { name: "profile", title: "Profilo dottore" },
    { name: "team", title: "Team" },
    { name: "studio", title: "Ambiente studio" },
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
        defineField({
          name: "highlights",
          title: "Punti in evidenza",
          type: "array",
          of: [defineArrayMember({ type: "string" })],
        }),
        imageWithAlt("image", "Immagine (dottore)"),
        defineField({
          name: "imageRole",
          title: "Didascalia sull'immagine (ruolo)",
          type: "string",
          description: "Es. Direttore Sanitario · Implantologo",
        }),
      ],
    }),

    defineField({
      name: "profile",
      title: "Sezione «Profilo professionale»",
      type: "object",
      group: "profile",
      fields: [
        enabledField,
        defineField({ name: "eyebrow", title: "Occhiello", type: "string" }),
        defineField({ name: "title", title: "Titolo", type: "string" }),
        iconCard("cards", "Riquadri (formazione/percorso)"),
      ],
    }),

    defineField({
      name: "team",
      title: "Sezione Team",
      type: "object",
      group: "team",
      description: "L'elenco dei membri arriva dai documenti «Membro dello Staff».",
      fields: [
        enabledField,
        defineField({ name: "eyebrow", title: "Occhiello", type: "string" }),
        defineField({ name: "title", title: "Titolo", type: "string" }),
        defineField({ name: "description", title: "Descrizione", type: "text", rows: 3 }),
      ],
    }),

    defineField({
      name: "studio",
      title: "Sezione «Ambiente e tecnologia»",
      type: "object",
      group: "studio",
      fields: [
        enabledField,
        defineField({ name: "eyebrow", title: "Occhiello", type: "string" }),
        defineField({ name: "title", title: "Titolo", type: "string" }),
        defineField({ name: "description", title: "Descrizione", type: "text", rows: 4 }),
        imageWithAlt("image", "Immagine dello studio"),
        iconCard("features", "Caratteristiche"),
      ],
    }),

    ...seoFields,
    noIndexField,
  ],
  preview: {
    prepare: () => ({ title: "Pagina Lo Studio" }),
  },
});
