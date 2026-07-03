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
    select: { title: "title", subtitle: "youtubeUrl" },
  },
});
