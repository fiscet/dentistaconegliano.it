// Etichette delle categorie articolo: deve restare in sync con la options.list
// del campo "category" in studio/schemaTypes/documents/post.ts.
export const BLOG_CATEGORY_LABELS: Record<string, string> = {
  bambini: "Bambini",
  "casi-di-successo": "Casi di successo",
  "estetica-dentale": "Estetica Dentale",
  gravidanza: "Gravidanza",
  "implantologia-dentale": "Implantologia Dentale",
  "patologie-varie": "Patologie varie",
  "paura-del-dentista": "Paura del Dentista",
  prevenzione: "Prevenzione",
  "sedazione-cosciente": "Sedazione Cosciente",
};

export const BLOG_CATEGORY_ORDER = Object.keys(BLOG_CATEGORY_LABELS);
