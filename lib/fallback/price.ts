// Contenuti di fallback della pagina Prezzi: usati quando il singleton
// pricePage su Sanity manca o un campo è vuoto. Copy neutro (niente brand,
// garanzie o claim sui finanziamenti). Le card prezzo arrivano dai servizi.

export const heroFallback = {
  title: "Prezzi chiari e trasparenza clinica",
  description:
    "I prezzi in questa pagina sono indicativi e servono a darti un ordine di grandezza. Il preventivo definitivo viene sempre concordato dopo la visita, in base al tuo caso clinico.",
};

export const factorsFallback = {
  eyebrow: "Guida alla scelta",
  title: "Cosa influenza il costo di un trattamento",
  items: [
    {
      _key: "f1",
      icon: "shield",
      title: "Qualità e certificazione dei materiali",
      text: "Utilizziamo impianti in titanio di grado medicale con tracciabilità e garanzia. La qualità dei componenti incide sul risultato e sulla durata nel tempo.",
    },
    {
      _key: "f2",
      icon: "monitor",
      title: "Pianificazione digitale e tecnologie 3D",
      text: "La chirurgia computer-guidata richiede software avanzati e dime chirurgiche personalizzate: più precisione, interventi mininvasivi e tempi di recupero ridotti.",
    },
    {
      _key: "f3",
      icon: "activity",
      title: "Condizioni cliniche del paziente",
      text: "Lo stato dell'osso e delle gengive può richiedere procedure preliminari. Ogni piano di cura viene definito dopo una valutazione clinica e radiografica.",
    },
  ],
};

export const listFallback = {
  eyebrow: "Listino indicativo",
  title: "Range di prezzo di riferimento",
  description:
    "Ogni piano di cura viene personalizzato dopo la valutazione clinica. Di seguito i prezzi medi di riferimento per le principali soluzioni.",
};

export const ctaFallback = {
  eyebrow: "Il tuo preventivo",
  title: "Un preventivo su misura, senza sorprese",
  description:
    "Ogni situazione è diversa. Durante la prima visita valutiamo il tuo caso e ti forniamo un piano di cura chiaro e dettagliato, con un preventivo definitivo e trasparente.",
  boxTitle: "Prenota una consulenza",
};
