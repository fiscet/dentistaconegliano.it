import { defineType, defineField } from "sanity";
import { PlayIcon } from "@sanity/icons/Play";

export const video = defineType({
  name: "video",
  title: "Video",
  type: "document",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "title",
      title: "Titolo",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
      description: "URL della pagina dedicata: /video/<slug>",
    }),
    defineField({
      name: "youtubeUrl",
      title: "URL YouTube",
      type: "url",
      description: "Link completo al video, es. https://www.youtube.com/watch?v=XXXX",
      validation: (rule) =>
        rule.required().custom((value) => {
          if (!value) return true;
          const ok = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)/.test(value);
          return ok || "Inserisci un link YouTube valido (watch, youtu.be o shorts)";
        }),
    }),
    defineField({
      name: "description",
      title: "Descrizione",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "thumbnail",
      title: "Copertina personalizzata",
      type: "image",
      options: { hotspot: true },
      description:
        "Facoltativa: se non impostata viene usata la copertina automatica di YouTube.",
      fields: [
        defineField({ name: "alt", title: "Testo alternativo", type: "string" }),
      ],
    }),
    defineField({
      name: "duration",
      title: "Durata",
      type: "string",
      description: "Formato mm:ss, es. 4:13.",
      validation: (rule) =>
        rule.custom((value) => {
          if (!value) return true;
          return /^\d{1,3}:\d{2}$/.test(value) || "Usa il formato mm:ss, es. 4:13";
        }),
    }),
    defineField({
      name: "relatedService",
      title: "Servizio collegato",
      type: "reference",
      to: [{ type: "service" }],
      description: "Il trattamento di cui parla il video, se applicabile.",
    }),
    defineField({
      name: "publishedAt",
      title: "Data",
      type: "date",
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
    select: { title: "title", subtitle: "youtubeUrl", media: "thumbnail" },
  },
});
