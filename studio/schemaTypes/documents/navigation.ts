import { defineType, defineField, defineArrayMember } from "sanity";
import { MenuIcon } from "@sanity/icons/Menu";

export const navigation = defineType({
  name: "navigation",
  title: "Menu di Navigazione",
  type: "document",
  icon: MenuIcon,
  groups: [
    { name: "header", title: "Menu header", default: true },
    { name: "footer", title: "Menu footer" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Nome del menu",
      type: "string",
      initialValue: "Menu principale",
      readOnly: true,
      group: "header",
    }),
    defineField({
      name: "items",
      title: "Voci del menu header",
      type: "array",
      of: [defineArrayMember({ type: "navItem" })],
      description: "Menu principale in alto. Le voci possono avere sottovoci (dropdown).",
      validation: (rule) => rule.min(1),
      group: "header",
    }),
    defineField({
      name: "footerLinks",
      title: "Link del footer (colonna «Link Rapidi»)",
      type: "array",
      of: [defineArrayMember({ type: "navLink" })],
      description:
        "Link della colonna «Link Rapidi» nel footer. La colonna «I Nostri Servizi» è generata in automatico dai Servizi, quindi non va inserita qui.",
      group: "footer",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Menu di Navigazione" }),
  },
});
