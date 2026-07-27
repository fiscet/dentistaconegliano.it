import type { StructureResolver } from "sanity/structure";
import { CogIcon } from "@sanity/icons/Cog";
import { MenuIcon } from "@sanity/icons/Menu";
import { HomeIcon } from "@sanity/icons/Home";
import { UsersIcon } from "@sanity/icons/Users";
import { ImagesIcon } from "@sanity/icons/Images";
import { ActivityIcon } from "@sanity/icons/Activity";
import { PlayIcon } from "@sanity/icons/Play";
import { DocumentsIcon } from "@sanity/icons/Documents";
import { PagesInfoPanel, ContentInfoPanel } from "./components/InfoPanel";

// Tipi gestiti come singleton (documento unico con _id fisso).
const SINGLETONS = [
  "siteSettings",
  "navigation",
  "homePage",
  "studioPage",
  "casesPage",
  "pathPage",
  "videoPage",
  "blogPage",
];

// Tipi a collection già elencati esplicitamente nel menu.
const LISTED = [
  "page",
  "service",
  "clinicalCase",
  "post",
  "video",
  "staffMember",
  "testimonial",
  "faq",
  "locationPage",
];

// Tipi da NON mostrare nella sidebar: media.tag arriva dal plugin media e si
// gestisce dentro il tool "Media", non come documento a sé.
const HIDDEN = ["media.tag"];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Contenuti")
    .items([
      S.listItem()
        .title("Impostazioni Sito")
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("siteSettings")
            .title("Impostazioni Sito"),
        ),
      S.listItem()
        .title("Menu di Navigazione")
        .icon(MenuIcon)
        .child(
          S.document()
            .schemaType("navigation")
            .documentId("navigation")
            .title("Menu di Navigazione"),
        ),

      S.divider(),

      // Titolo di blocco cliccabile: apre la spiegazione della sezione
      // "Pagine del Sito" (differenza con "Contenuti" sotto). Niente icona e
      // maiuscolo/trattini per farlo leggere come separatore, non come voce.
      S.listItem()
        .title("── PAGINE DEL SITO ──")
        .showIcon(false)
        .child(S.component(PagesInfoPanel).id("pages-info").title("Pagine del Sito")),

      S.listItem()
        .title("Home Page")
        .icon(HomeIcon)
        .child(
          S.document()
            .schemaType("homePage")
            .documentId("homePage")
            .title("Home Page"),
        ),
      S.listItem()
        .title("Pagina Lo Studio")
        .icon(UsersIcon)
        .child(
          S.document()
            .schemaType("studioPage")
            .documentId("studioPage")
            .title("Pagina Lo Studio"),
        ),
      S.listItem()
        .title("Pagina Interventi Realizzati")
        .icon(ImagesIcon)
        .child(
          S.document()
            .schemaType("casesPage")
            .documentId("casesPage")
            .title("Pagina Interventi Realizzati"),
        ),
      S.listItem()
        .title("Pagina Percorso di Cura")
        .icon(ActivityIcon)
        .child(
          S.document()
            .schemaType("pathPage")
            .documentId("pathPage")
            .title("Pagina Percorso di Cura"),
        ),
      S.listItem()
        .title("Pagina Video")
        .icon(PlayIcon)
        .child(
          S.document()
            .schemaType("videoPage")
            .documentId("videoPage")
            .title("Pagina Video"),
        ),
      S.listItem()
        .title("Pagina Blog")
        .icon(DocumentsIcon)
        .child(
          S.document()
            .schemaType("blogPage")
            .documentId("blogPage")
            .title("Pagina Blog"),
        ),

      S.divider(),

      // Titolo di blocco cliccabile: apre la spiegazione della sezione
      // "Contenuti" (differenza con "Pagine del Sito" sopra). Niente icona e
      // maiuscolo/trattini per farlo leggere come separatore, non come voce.
      S.listItem()
        .title("── CONTENUTI ──")
        .showIcon(false)
        .child(S.component(ContentInfoPanel).id("content-info").title("Contenuti")),

      S.documentTypeListItem("page").title("Pagine"),
      S.documentTypeListItem("service").title("Servizi / Trattamenti"),
      S.documentTypeListItem("clinicalCase").title("Casi Clinici / Interventi"),
      S.documentTypeListItem("post").title("Blog"),
      S.documentTypeListItem("video").title("Video"),
      S.documentTypeListItem("staffMember").title("Staff"),
      S.documentTypeListItem("testimonial").title("Recensioni"),
      S.documentTypeListItem("faq").title("FAQ"),
      S.documentTypeListItem("locationPage").title("Landing Località"),

      S.divider(),

      // Eventuali nuovi tipi non ancora elencati sopra.
      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId() as string;
        return !SINGLETONS.includes(id) && !LISTED.includes(id) && !HIDDEN.includes(id);
      }),
    ]);
