import { defineType, defineField, defineArrayMember } from "sanity";
import { HomeIcon } from "@sanity/icons/Home";
import { seoFields, noIndexField, seoGroup } from "../shared/seoFields";

const enabledField = defineField({
  name: "enabled",
  title: "Mostra sezione",
  type: "boolean",
  initialValue: true,
});

const imageWithAlt = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Testo alternativo",
        type: "string",
      }),
    ],
  });

export const homePage = defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "Hero", default: true },
    { name: "stats", title: "Statistiche" },
    { name: "treatments", title: "Trattamenti" },
    { name: "doctor", title: "Profilo Dottore" },
    { name: "cases", title: "Casi Clinici" },
    { name: "testimonials", title: "Testimonianze" },
    { name: "contact", title: "Contatti" },
    seoGroup,
  ],
  fields: [
    defineField({
      name: "hero",
      title: "Sezione Hero",
      type: "object",
      group: "hero",
      fields: [
        enabledField,
        defineField({
          name: "badge",
          title: "Badge",
          type: "string",
          description: "Etichetta sopra il titolo, es. Specialisti in Implantologia...",
        }),
        defineField({ name: "title", title: "Titolo", type: "string" }),
        defineField({
          name: "titleHighlight",
          title: "Titolo — parte evidenziata",
          type: "string",
          description: "Testo mostrato in colore primario sulla seconda riga.",
        }),
        defineField({
          name: "titleSuffix",
          title: "Titolo — seguito",
          type: "string",
          description: "Testo dopo la parte evidenziata, es. con il carico immediato.",
        }),
        defineField({ name: "description", title: "Descrizione", type: "text", rows: 4 }),
        defineField({
          name: "features",
          title: "Punti di forza",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "feature",
              fields: [
                defineField({ name: "label", title: "Testo", type: "string" }),
                defineField({
                  name: "icon",
                  title: "Icona",
                  type: "iconString",
                }),
              ],
              preview: { select: { title: "label", subtitle: "icon" } },
            }),
          ],
        }),
        defineField({
          name: "ctaPrimaryLabel",
          title: "CTA principale (testo)",
          type: "string",
          description: "Porta alla sezione contatti.",
        }),
        defineField({
          name: "ctaSecondaryLabel",
          title: "CTA secondaria (testo)",
          type: "string",
          description: "Avvia la chiamata al numero dello studio.",
        }),
        imageWithAlt("image", "Immagine"),
        defineField({
          name: "experienceCard",
          title: "Card esperienza (sull'immagine)",
          type: "object",
          fields: [
            defineField({ name: "value", title: "Valore", type: "string", description: "Es. 20+" }),
            defineField({ name: "label", title: "Etichetta", type: "string" }),
            defineField({ name: "sublabel", title: "Sottotitolo", type: "string" }),
          ],
        }),
      ],
    }),

    defineField({
      name: "stats",
      title: "Sezione Statistiche",
      type: "object",
      group: "stats",
      fields: [
        enabledField,
        defineField({
          name: "items",
          title: "Statistiche",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "stat",
              fields: [
                defineField({ name: "value", title: "Valore", type: "string" }),
                defineField({ name: "label", title: "Etichetta", type: "string" }),
              ],
              preview: { select: { title: "value", subtitle: "label" } },
            }),
          ],
        }),
      ],
    }),

    defineField({
      name: "treatments",
      title: "Sezione Trattamenti",
      type: "object",
      group: "treatments",
      description:
        'Le card mostrano i Servizi con il flag "Mostra in home" attivo. Qui imposti solo l\'intestazione della sezione.',
      fields: [
        enabledField,
        defineField({ name: "eyebrow", title: "Occhiello", type: "string" }),
        defineField({ name: "title", title: "Titolo", type: "string" }),
        defineField({ name: "description", title: "Descrizione", type: "text", rows: 3 }),
      ],
    }),

    defineField({
      name: "doctorProfile",
      title: "Sezione Profilo Dottore",
      type: "object",
      group: "doctor",
      fields: [
        enabledField,
        defineField({ name: "eyebrow", title: "Occhiello", type: "string" }),
        defineField({ name: "title", title: "Titolo", type: "string" }),
        defineField({
          name: "roleLabel",
          title: "Ruolo",
          type: "string",
          description: "Mostrato sotto il nome sull'immagine.",
        }),
        defineField({
          name: "paragraphs",
          title: "Paragrafi",
          type: "array",
          of: [defineArrayMember({ type: "text", rows: 4 })],
        }),
        imageWithAlt("image", "Foto"),
        defineField({
          name: "highlights",
          title: "Riquadri in evidenza",
          type: "array",
          of: [
            defineArrayMember({
              type: "object",
              name: "highlight",
              fields: [
                defineField({ name: "title", title: "Titolo", type: "string" }),
                defineField({ name: "subtitle", title: "Sottotitolo", type: "string" }),
                defineField({
                  name: "icon",
                  title: "Icona",
                  type: "iconString",
                }),
              ],
              preview: { select: { title: "title", subtitle: "subtitle" } },
            }),
          ],
        }),
        defineField({ name: "ctaLabel", title: "Link (testo)", type: "string" }),
        defineField({
          name: "ctaHref",
          title: "Link (percorso)",
          type: "string",
          description: "Es. /studio",
        }),
      ],
    }),

    defineField({
      name: "clinicalCases",
      title: "Sezione Casi Clinici",
      type: "object",
      group: "cases",
      description:
        'Le card mostrano i Casi Clinici con il flag "Mostra in home" attivo. Qui imposti solo l\'intestazione della sezione.',
      fields: [
        enabledField,
        defineField({ name: "eyebrow", title: "Occhiello", type: "string" }),
        defineField({ name: "title", title: "Titolo", type: "string" }),
        defineField({ name: "description", title: "Descrizione", type: "text", rows: 3 }),
      ],
    }),

    defineField({
      name: "testimonials",
      title: "Sezione Testimonianze",
      type: "object",
      group: "testimonials",
      description:
        'Le card mostrano le Testimonianze con il flag "In evidenza" attivo. Qui imposti solo l\'intestazione della sezione; se non ce n\'è nessuna in evidenza la sezione resta nascosta.',
      fields: [
        enabledField,
        defineField({ name: "eyebrow", title: "Occhiello", type: "string" }),
        defineField({ name: "title", title: "Titolo", type: "string" }),
        defineField({ name: "description", title: "Descrizione", type: "text", rows: 3 }),
      ],
    }),

    defineField({
      name: "contact",
      title: "Sezione Contatti",
      type: "object",
      group: "contact",
      fields: [
        enabledField,
        defineField({ name: "eyebrow", title: "Occhiello", type: "string" }),
        defineField({ name: "title", title: "Titolo", type: "string" }),
        defineField({ name: "description", title: "Descrizione", type: "text", rows: 3 }),
        defineField({ name: "formTitle", title: "Titolo del modulo", type: "string" }),
      ],
    }),

    ...seoFields,
    noIndexField,
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});
