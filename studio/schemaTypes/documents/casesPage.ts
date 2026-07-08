import { defineType, defineField } from "sanity";
import { ImagesIcon } from "@sanity/icons/Images";
import { seoFields, seoGroup } from "../shared/seoFields";

export const casesPage = defineType({
  name: "casesPage",
  title: "Pagina Interventi Realizzati",
  type: "document",
  icon: ImagesIcon,
  groups: [{ name: "hero", title: "Intro", default: true }, seoGroup],
  fields: [
    defineField({
      name: "hero",
      title: "Sezione introduttiva",
      type: "object",
      group: "hero",
      description: "L'elenco dei casi arriva dai documenti «Caso Clinico / Intervento».",
      fields: [
        defineField({ name: "eyebrow", title: "Occhiello", type: "string" }),
        defineField({ name: "title", title: "Titolo", type: "string" }),
        defineField({ name: "description", title: "Descrizione", type: "text", rows: 3 }),
      ],
    }),
    ...seoFields,
  ],
  preview: {
    prepare: () => ({ title: "Pagina Interventi Realizzati" }),
  },
});
