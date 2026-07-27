import { defineType, defineField } from "sanity";
import { PlayIcon } from "@sanity/icons/Play";
import { seoFields, noIndexField, seoGroup } from "../shared/seoFields";

export const videoPage = defineType({
  name: "videoPage",
  title: "Pagina Video",
  type: "document",
  icon: PlayIcon,
  groups: [{ name: "hero", title: "Intro", default: true }, seoGroup],
  fields: [
    defineField({
      name: "hero",
      title: "Sezione introduttiva",
      type: "object",
      group: "hero",
      description: "L'elenco dei video arriva dai documenti «Video».",
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
    prepare: () => ({ title: "Pagina Video" }),
  },
});
