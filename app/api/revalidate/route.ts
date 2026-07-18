import { revalidatePath, revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { client } from "@/sanity/lib/client";

// Webhook Sanity -> rivalidazione. A ogni modifica di contenuto (create/update/
// delete) Sanity chiama questa route: verifichiamo la firma col secret.
// `sanityFetch` (defineLive) cache-a le query con `next.revalidate: false` +
// tag custom `sanity:<syncTag>` del documento: sono IMMUNI a revalidatePath
// (che invalida solo la Route Cache, non i fetch con tag propri), quindi senza
// questo passaggio i visitatori "freschi" vedono contenuti stale a tempo
// indefinito. Rifacciamo perciò la stessa query sync-tag sul documento
// modificato per ottenere gli stessi tag di sanityFetch e invalidarli
// davvero con revalidateTag. revalidatePath resta come rigenerazione extra
// della shell di pagina. Il terzo argomento di parseBody aggiunge un piccolo
// ritardo perché il webhook parte prima che la CDN di Sanity si aggiorni.
export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{ _id?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true,
    );

    if (!isValidSignature) {
      return new Response("Firma non valida", { status: 401 });
    }

    if (body?._id) {
      const { syncTags } = await client.fetch(
        "*[_id == $id][0]",
        { id: body._id },
        { filterResponse: false },
      );
      for (const tag of syncTags ?? []) revalidateTag(`sanity:${tag}`, "max");
    }

    revalidatePath("/", "layout");

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error("Errore webhook revalidate:", err);
    return new Response((err as Error).message, { status: 500 });
  }
}
