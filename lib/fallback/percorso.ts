// Contenuti di fallback della pagina Percorso di Cura, usati quando il
// singleton pathPage su Sanity manca o un campo è vuoto.

export const heroFallback = {
  eyebrow: "Cosa aspettarsi",
  title: "Come funziona il percorso di cura",
  description:
    "Sappiamo che non conoscere i passaggi di una cura può generare ansia. Per questo il nostro percorso è organizzato in quattro fasi chiare, così saprai sempre cosa succede e perché.",
};

export const stepsFallback: { _key: string; icon: string; title: string; text: string }[] = [
  {
    _key: "step-1",
    icon: "calendar",
    title: "Prima visita",
    text: "Un colloquio conoscitivo e una visita clinica completa, per ascoltare le tue esigenze e valutare con calma la situazione di partenza.",
  },
  {
    _key: "step-2",
    icon: "search",
    title: "Diagnosi",
    text: "Esami approfonditi (radiografie, TAC 3D, impronte digitali) per arrivare a una diagnosi precisa, spiegata in parole semplici.",
  },
  {
    _key: "step-3",
    icon: "clipboard-list",
    title: "Piano di trattamento",
    text: "Ti presentiamo un piano di cura personalizzato, con fasi, tempi e costi chiari e senza sorprese, prima di iniziare qualsiasi trattamento.",
  },
  {
    _key: "step-4",
    icon: "stethoscope",
    title: "Intervento e controlli",
    text: "Eseguiamo il trattamento con la massima cura e ti seguiamo nei controlli successivi, per un risultato stabile nel tempo.",
  },
];

export const ctaFallback = {
  title: "Pronto a iniziare il tuo percorso?",
  description:
    "Prenota la prima visita: è il primo passo per capire insieme la soluzione più adatta a te.",
  buttonLabel: "Prenota la prima visita",
};
