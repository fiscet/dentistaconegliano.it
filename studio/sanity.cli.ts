import { defineCliConfig } from "sanity/cli";

export default defineCliConfig({
  api: {
    projectId: "wqblxiv7",
    dataset: "production",
  },
  // Host di deploy fisso: evita che `sanity deploy` chieda ogni volta il
  // nome dello studio (hosting su dentistaconegliano.sanity.studio).
  studioHost: "dentistaconegliano",
});
