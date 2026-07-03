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
    street: "Viale Italia, 120",
    postalCode: "31015",
    city: "Conegliano",
    province: "TV",
  },
  addressLine: "Viale Italia, 120 - 31015 Conegliano (TV)",
  openingHours: "Lun - Ven: 09:00 - 19:00 | Sab: 09:00 - 13:00",
  yearsBadge: "20+ Anni di Attività",
} as const;

export const nav = [
  { label: "Home", href: "/" },
  { label: "Prezzi", href: "/costo-impianto-dentale-conegliano" },
  { label: "Lo Studio", href: "/studio" },
  { label: "Video", href: "/video" },
  { label: "Casi Clinici", href: "/interventi-realizzati" },
  { label: "Contatti", href: "/#contatti" },
] as const;
