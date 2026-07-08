import { revalidatePath } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";

// Webhook Sanity -> rivalidazione. A ogni modifica di contenuto (create/update/
// delete) Sanity chiama questa route: verifichiamo la firma col secret e
// rigeneriamo l'intero sito (revalidatePath "/" layout), così qualsiasi
// contenuto — video, articoli, servizi, casi, pagine — compare in pochi secondi
// senza redeploy. Il terzo argomento `true` aggiunge un piccolo ritardo perché
// il webhook parte prima che la CDN di Sanity si aggiorni.
export async function POST(req: NextRequest) {
  try {
    const { isValidSignature } = await parseBody<{ _type?: string }>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
      true,
    );

    if (!isValidSignature) {
      return new Response("Firma non valida", { status: 401 });
    }

    revalidatePath("/", "layout");

    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (err) {
    console.error("Errore webhook revalidate:", err);
    return new Response((err as Error).message, { status: 500 });
  }
}
