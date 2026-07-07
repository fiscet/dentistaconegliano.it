import { defineType, defineField } from "sanity";
import { ImagesIcon } from "@sanity/icons/Images";

const imageWithAlt = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [defineField({ name: "alt", title: "Testo alternativo", type: "string" })],
  });

export const clinicalCase = defineType({
  name: "clinicalCase",
  title: "Caso Clinico / Intervento",
  type: "document",
  icon: ImagesIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titolo del caso",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "badge",
      title: "Etichetta",
      type: "string",
      description: "Categoria mostrata sulla card, es. «Carico Immediato», «All-on-4».",
    }),
    imageWithAlt("imageBefore", "Immagine — Prima"),
    imageWithAlt("imageAfter", "Immagine — Dopo"),
    defineField({
      name: "description",
      title: "Descrizione",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "order",
      title: "Ordine di visualizzazione",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "showInHome",
      title: "Mostra in home",
      type: "boolean",
      initialValue: false,
      description: "Se attivo, il caso compare nella sezione «Casi Clinici» della home.",
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
    select: { title: "title", subtitle: "badge", media: "imageAfter" },
  },
});
