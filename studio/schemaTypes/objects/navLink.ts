import { defineType, defineField, defineArrayMember } from "sanity";
import { LinkIcon } from "@sanity/icons/Link";

// Campi comuni a ogni voce di menu (senza sottovoci).
const linkFields = [
  defineField({
    name: "label",
    title: "Etichetta",
    type: "string",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "linkType",
    title: "Tipo di link",
    type: "string",
    options: {
      list: [
        { title: "Percorso interno (es. /video)", value: "path" },
        { title: "Contenuto Sanity", value: "internal" },
        { title: "URL esterno", value: "external" },
      ],
      layout: "radio",
    },
    initialValue: "path",
    validation: (rule) => rule.required(),
  }),
  defineField({
    name: "path",
    title: "Percorso",
    type: "string",
    description: "Percorso relativo al sito, es. /servizi oppure /#contatti",
    hidden: ({ parent }) => parent?.linkType !== "path",
    validation: (rule) =>
      rule.custom((value, context) => {
        const parent = context.parent as { linkType?: string } | undefined;
        if (parent?.linkType === "path" && !value) return "Percorso obbligatorio";
        if (value && !value.startsWith("/")) return "Deve iniziare con /";
        return true;
      }),
  }),
  defineField({
    name: "internalLink",
    title: "Contenuto collegato",
    type: "reference",
    // Pagine singleton + tipi a lista; ogni nuova pagina singleton va
    // aggiunta qui e nella mappa tipo→route di lib/nav.ts (sito).
    to: [
      { type: "homePage" },
      { type: "studioPage" },
      { type: "casesPage" },
      { type: "page" },
      { type: "service" },
      { type: "post" },
    ],
    hidden: ({ parent }) => parent?.linkType !== "internal",
  }),
  defineField({
    name: "externalUrl",
    title: "URL esterno",
    type: "url",
    hidden: ({ parent }) => parent?.linkType !== "external",
    validation: (rule) => rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
  }),
  defineField({
    name: "openInNewTab",
    title: "Apri in nuova scheda",
    type: "boolean",
    initialValue: false,
  }),
];

// Sottovoce di menu: solo link, senza ulteriori figli.
export const navLink = defineType({
  name: "navLink",
  title: "Voce di menu",
  type: "object",
  icon: LinkIcon,
  fields: linkFields,
  preview: {
    select: { title: "label", subtitle: "path" },
  },
});

// Voce di primo livello: link + eventuali sottovoci (un livello di dropdown).
export const navItem = defineType({
  name: "navItem",
  title: "Voce di menu principale",
  type: "object",
  icon: LinkIcon,
  fields: [
    ...linkFields,
    defineField({
      name: "children",
      title: "Sottovoci (dropdown)",
      type: "array",
      of: [defineArrayMember({ type: "navLink" })],
    }),
  ],
  preview: {
    select: { title: "label", children: "children" },
    prepare({ title, children }) {
      const count = Array.isArray(children) ? children.length : 0;
      return {
        title,
        subtitle: count > 0 ? `${count} sottovoci` : undefined,
      };
    },
  },
});
