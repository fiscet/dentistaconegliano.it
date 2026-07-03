import { defineType, defineArrayMember } from "sanity";
import { ImageIcon } from "@sanity/icons/Image";

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
  ],
});
