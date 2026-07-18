// Dati centralizzati dello studio: mantenere il NAP (Name, Address, Phone)
// identico ovunque — sito, Google Business Profile, directory.
export const site = {
  name: "Studio Dentistico Dott. Gianluca Marin",
  shortName: "STUDIO DENTISTICO",
  doctor: "Dott. Gianluca Marin",
  domain: "dentistaconegliano.it",
  url: "https://www.dentistaconegliano.it",
  phone: "0438 415356",
  phoneHref: "tel:+390438415356",
  address: {
    street: "Via Maggiore Giovanni Piovesana 159",
    postalCode: "31015",
    city: "Conegliano",
    province: "TV",
  },
  addressLine: "Via Maggiore Giovanni Piovesana 159 - 31015 Conegliano (TV)",
  openingHours: "Lun - Ven: 09:00 - 19:00 | Sab: 09:00 - 13:00",
  yearsBadge: "20+ Anni di Attività",
  footerDescription:
    "Esperienza ventennale e soluzioni implantari d'avanguardia per ripristinare il tuo sorriso in sicurezza.",
  legalName: "Studio Dentistico dott. Gianluca Marin S.r.l.",
  vatNumber: "03687380265",
  shareCapital: "€ 10.000 i.v.",
  alboRegistration: "Iscrizione Albo Odontoiatri TV n. 695",
} as const;

// Fallback usato solo se il documento navigation di Sanity è vuoto.
// Tenere le rotte esistenti (niente 404 nel menu). Le pagine ancora da
// costruire (es. /studio) si aggiungono qui e in Sanity quando esistono.
export const nav = [
  { label: "Home", href: "/" },
  { label: "Servizi", href: "/servizi" },
  { label: "Lo Studio", href: "/studio" },
  { label: "Come Funziona", href: "/percorso-di-cura" },
  { label: "Casi Clinici", href: "/interventi-realizzati" },
  { label: "Contatti", href: "/contatti" },
] as const;
