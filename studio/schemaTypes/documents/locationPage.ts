import { defineType, defineField, defineArrayMember } from "sanity";
import { PinFilledIcon } from "@sanity/icons/PinFilled";
import { seoFields, noIndexField, seoGroup } from "../shared/seoFields";

export const locationPage = defineType({
  name: "locationPage",
  title: "Landing Località",
  type: "document",
  icon: PinFilledIcon,
  groups: [{ name: "content", title: "Contenuto", default: true }, seoGroup],
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      description: "Es. Dentista a Treviso — Studio Dott. Gianluca Marin",
      validation: (rule) => rule.required(),
      group: "content",
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
      description: "URL della pagina: /zona/<slug>",
      group: "content",
    }),
    defineField({
      name: "cityName",
      title: "Nome della città",
      type: "string",
      description: "Solo il nome, es. \"Treviso\". Usato nei dati strutturati (areaServed).",
      validation: (rule) => rule.required(),
      group: "content",
    }),
    defineField({
      name: "intro",
      title: "Introduzione",
      type: "text",
      rows: 3,
      description: "Testo unico per questa città: perché scegliere lo studio, distanza, collegamenti.",
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
      name: "featuredServices",
      title: "Trattamenti in evidenza per questa zona",
      type: "array",
      of: [defineArrayMember({ type: "reference", to: [{ type: "service" }] })],
      group: "content",
    }),
    defineField({
      name: "body",
      title: "Contenuto",
      type: "blockContent",
      group: "content",
    }),
    ...seoFields,
    noIndexField,
  ],
  preview: {
    select: { title: "title", subtitle: "cityName" },
  },
});
