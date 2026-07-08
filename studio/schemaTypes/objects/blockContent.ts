import { defineType, defineArrayMember } from "sanity";
import { ImageIcon } from "@sanity/icons/Image";
import { PlayIcon } from "@sanity/icons/Play";

// Estrae l'ID video da un URL YouTube (watch, youtu.be, shorts, embed).
const YOUTUBE_ID_RE =
  /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

export const blockContent = defineType({
  name: "blockContent",
  title: "Contenuto",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Normale", value: "normal" },
        { title: "Titolo 2", value: "h2" },
        { title: "Titolo 3", value: "h3" },
        { title: "Citazione", value: "blockquote" },
      ],
      lists: [
        { title: "Elenco puntato", value: "bullet" },
        { title: "Elenco numerato", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Grassetto", value: "strong" },
          { title: "Corsivo", value: "em" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            title: "Link",
            type: "object",
            fields: [
              {
                name: "href",
                title: "URL",
                type: "url",
                validation: (rule) =>
                  rule.uri({ scheme: ["http", "https", "mailto", "tel"], allowRelative: true }),
              },
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      icon: ImageIcon,
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          title: "Testo alternativo",
          type: "string",
          description: "Descrizione dell'immagine per accessibilità e SEO.",
        },
      ],
    }),
    defineArrayMember({
      name: "youtube",
      title: "Video YouTube",
      type: "object",
      icon: PlayIcon,
      fields: [
        {
          name: "url",
          title: "URL YouTube",
          type: "url",
          description: "Incolla il link del video (es. https://www.youtube.com/watch?v=…).",
          validation: (rule) =>
            rule
              .required()
              .custom((value) =>
                !value || YOUTUBE_ID_RE.test(value) ? true : "Link YouTube non valido",
              ),
        },
        {
          name: "caption",
          title: "Didascalia",
          type: "string",
        },
      ],
      preview: {
        select: { title: "caption", subtitle: "url" },
        prepare: ({ title, subtitle }) => ({
          title: title || "Video YouTube",
          subtitle,
        }),
      },
    }),
  ],
});
