import type { StructureResolver } from "sanity/structure";
import { CogIcon } from "@sanity/icons/Cog";
import { MenuIcon } from "@sanity/icons/Menu";
import { HomeIcon } from "@sanity/icons/Home";
import { TagIcon } from "@sanity/icons/Tag";

// Tipi gestiti come singleton (documento unico con _id fisso).
const SINGLETONS = ["siteSettings", "navigation", "homePage", "pricePage"];

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
        .title("Pagina Prezzi")
        .icon(TagIcon)
        .child(
          S.document()
            .schemaType("pricePage")
            .documentId("pricePage")
            .title("Pagina Prezzi"),
        ),

      S.divider(),

      S.documentTypeListItem("page").title("Pagine"),
      S.documentTypeListItem("service").title("Servizi / Trattamenti"),
      S.documentTypeListItem("post").title("Blog"),
      S.documentTypeListItem("video").title("Video"),
      S.documentTypeListItem("staffMember").title("Staff"),
      S.documentTypeListItem("testimonial").title("Testimonianze"),

      S.divider(),

      // Eventuali nuovi tipi non ancora elencati sopra.
      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId() as string;
        return (
          !SINGLETONS.includes(id) &&
          !["page", "service", "post", "video", "staffMember", "testimonial"].includes(id)
        );
      }),
    ]);
