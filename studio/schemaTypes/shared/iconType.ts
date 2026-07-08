import { defineType } from "sanity";
import { iconOptions } from "./icons";
import { IconSelect } from "../../components/IconSelect";

// Tipo stringa "icona" con input custom ad anteprima (vedi IconSelect).
// Usare `type: "iconString"` al posto di string + options.list nei campi icona.
export const iconString = defineType({
  name: "iconString",
  title: "Icona",
  type: "string",
  options: { list: iconOptions },
  components: { input: IconSelect },
});
