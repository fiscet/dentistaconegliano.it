import { defineType, defineField, defineArrayMember } from "sanity";
import { MenuIcon } from "@sanity/icons/Menu";

export const navigation = defineType({
  name: "navigation",
  title: "Menu di Navigazione",
  type: "document",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "title",
      title: "Nome del menu",
      type: "string",
      initialValue: "Menu principale",
      readOnly: true,
    }),
    defineField({
      name: "items",
      title: "Voci del menu",
      type: "array",
      of: [defineArrayMember({ type: "navItem" })],
      validation: (rule) => rule.min(1),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Menu di Navigazione" }),
  },
});
