import { defineType, defineField, defineArrayMember } from "sanity";
import { CogIcon } from "@sanity/icons/Cog";
import { seoFields, seoGroup } from "../shared/seoFields";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Impostazioni Sito",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "identity", title: "Identità", default: true },
    { name: "contact", title: "Contatti" },
    { name: "legal", title: "Dati legali" },
    seoGroup,
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "Nome dello studio",
      type: "string",
      validation: (rule) => rule.required(),
      group: "identity",
    }),
    defineField({
      name: "shortName",
      title: "Nome breve",
      type: "string",
      description: "Usato nel logo/header, es. STUDIO DENTISTICO",
      group: "identity",
    }),
    defineField({
      name: "doctor",
      title: "Titolare",
      type: "string",
      group: "identity",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      group: "identity",
    }),
    defineField({
      name: "yearsBadge",
      title: "Badge anni di attività",
      type: "string",
      description: "Es. 20+ Anni di Attività",
      group: "identity",
    }),
    defineField({
      name: "footerDescription",
      title: "Descrizione nel footer",
      type: "text",
      rows: 3,
      description:
        "Frase sotto il nome nel footer, es. Esperienza ventennale e soluzioni implantari...",
      group: "identity",
    }),
    defineField({
      name: "legalName",
      title: "Ragione sociale",
      type: "string",
      description: "Es. Studio Dentistico dott. Gianluca Marin S.r.l.",
      group: "legal",
    }),
    defineField({
      name: "vatNumber",
      title: "Partita IVA",
      type: "string",
      group: "legal",
    }),
    defineField({
      name: "shareCapital",
      title: "Capitale sociale",
      type: "string",
      description: "Es. € 10.000 i.v.",
      group: "legal",
    }),
    defineField({
      name: "alboRegistration",
      title: "Iscrizione Albo",
      type: "string",
      description: "Es. Iscrizione Albo Odontoiatri TV n. 1234",
      group: "legal",
    }),
    defineField({
      name: "phone",
      title: "Telefono",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (rule) => rule.email(),
      group: "contact",
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp",
      type: "string",
      description: "Numero in formato internazionale, es. +39333...",
      group: "contact",
    }),
    defineField({
      name: "address",
      title: "Indirizzo",
      type: "object",
      group: "contact",
      fields: [
        defineField({ name: "street", title: "Via e numero", type: "string" }),
        defineField({ name: "postalCode", title: "CAP", type: "string" }),
        defineField({ name: "city", title: "Città", type: "string" }),
        defineField({ name: "province", title: "Provincia", type: "string" }),
      ],
    }),
    defineField({
      name: "openingHours",
      title: "Orari di apertura",
      type: "string",
      description: "Es. Lun - Ven: 09:00 - 19:00 | Sab: 09:00 - 13:00",
      group: "contact",
    }),
    defineField({
      name: "socials",
      title: "Profili social",
      type: "array",
      group: "contact",
      of: [
        defineArrayMember({
          type: "object",
          name: "social",
          fields: [
            defineField({
              name: "platform",
              title: "Piattaforma",
              type: "string",
              options: {
                list: [
                  "Facebook",
                  "Instagram",
                  "YouTube",
                  "LinkedIn",
                  "TikTok",
                  "Google Business Profile",
                ],
              },
            }),
            defineField({
              name: "url",
              title: "URL",
              type: "url",
              description:
                'Per Google Business Profile: il link "Condividi profilo" dalla scheda su Google Maps/Search.',
            }),
          ],
          preview: { select: { title: "platform", subtitle: "url" } },
        }),
      ],
    }),
    ...seoFields,
  ],
  preview: {
    prepare: () => ({ title: "Impostazioni Sito" }),
  },
});
