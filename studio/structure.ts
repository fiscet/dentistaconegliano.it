import type { StructureResolver } from "sanity/structure";
import { CogIcon } from "@sanity/icons/Cog";
import { MenuIcon } from "@sanity/icons/Menu";
import { HomeIcon } from "@sanity/icons/Home";
import { UsersIcon } from "@sanity/icons/Users";
import { ImagesIcon } from "@sanity/icons/Images";

// Tipi gestiti come singleton (documento unico con _id fisso).
const SINGLETONS = [
  "siteSettings",
  "navigation",
  "homePage",
  "studioPage",
  "casesPage",
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

      S.divider(),

      S.documentTypeListItem("page").title("Pagine"),
      S.documentTypeListItem("service").title("Servizi / Trattamenti"),
      S.documentTypeListItem("clinicalCase").title("Casi Clinici / Interventi"),
      S.documentTypeListItem("post").title("Blog"),
      S.documentTypeListItem("video").title("Video"),
      S.documentTypeListItem("staffMember").title("Staff"),
      S.documentTypeListItem("testimonial").title("Testimonianze"),

      S.divider(),

      // Eventuali nuovi tipi non ancora elencati sopra.
      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId() as string;
        return !SINGLETONS.includes(id) && !LISTED.includes(id) && !HIDDEN.includes(id);
      }),
    ]);
