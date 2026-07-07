import { defineType, defineField } from "sanity";
import { UserIcon } from "@sanity/icons/User";

export const staffMember = defineType({
  name: "staffMember",
  title: "Membro dello Staff",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({
      name: "name",
      title: "Nome e cognome",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    }),
    defineField({
      name: "role",
      title: "Ruolo",
      type: "string",
      description: "Es. Odontoiatra, Igienista dentale, Assistente alla poltrona",
    }),
    defineField({
      name: "category",
      title: "Categoria",
      type: "string",
      options: {
        list: [
          { title: "Medico", value: "medico" },
          { title: "Staff / Assistenza", value: "staff" },
        ],
        layout: "radio",
      },
      initialValue: "medico",
      description: "Serve a raggruppare il team nella pagina Lo Studio.",
    }),
    defineField({
      name: "photo",
      title: "Foto",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Testo alternativo", type: "string" }),
      ],
    }),
    defineField({
      name: "excerpt",
      title: "Descrizione breve",
      type: "text",
      rows: 3,
      description: "Testo mostrato nella card del team.",
    }),
    defineField({
      name: "bio",
      title: "Biografia completa",
      type: "blockContent",
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
    select: { title: "name", subtitle: "role", media: "photo" },
  },
});
