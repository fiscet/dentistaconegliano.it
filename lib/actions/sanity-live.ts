"use server";

import { updateTag } from "next/cache";

// Action custom per <SanityLive>. Di default next-sanity usa in produzione
// revalidateTag(tag, "max"), che ha semantica stale-while-revalidate: al primo
// router.refresh() mostra ancora il contenuto vecchio e rigenera in background,
// quindi il nuovo compare solo al refresh SUCCESSIVO. updateTag invece invalida
// in modo immediato, così il router.refresh() (innescato ritornando "refresh")
// mostra subito i contenuti aggiornati → vero realtime senza refresh manuale.
//
// SanityLive ci passa i cache-tag già prefissati derivati dall'evento live.
export async function updateSanityLiveTags(unsafeTags: unknown): Promise<"refresh"> {
  const tags = Array.isArray(unsafeTags)
    ? unsafeTags.filter((tag): tag is string => typeof tag === "string")
    : [];
  for (const tag of tags) updateTag(tag);
  return "refresh";
}
