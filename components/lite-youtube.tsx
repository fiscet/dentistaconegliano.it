"use client";

import { useState } from "react";
import { Play } from "lucide-react";

// Estrae l'ID (11 char) da watch / youtu.be / shorts / embed.
function getYouTubeId(url: string): string | null {
  const m = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/,
  );
  return m ? m[1] : null;
}

// Embed YouTube privacy-friendly: mostra solo la copertina finché l'utente non
// clicca; solo allora carica il player youtube-nocookie. Niente cookie/richieste
// a YouTube prima del play → non richiede consenso.
export function LiteYouTube({ url, caption }: { url: string; caption?: string }) {
  const [active, setActive] = useState(false);
  const id = getYouTubeId(url);
  if (!id) return null;

  return (
    <figure className="my-6">
      <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
        {active ? (
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={caption || "Video YouTube"}
            allow="autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setActive(true)}
            className="group absolute inset-0 h-full w-full cursor-pointer"
            aria-label={caption ? `Riproduci: ${caption}` : "Riproduci video YouTube"}
          >
            {/* Copertina servita da YouTube: <img> semplice, nessun cookie. */}
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
            <span className="absolute inset-0 grid place-items-center bg-black/20 transition-colors group-hover:bg-black/30">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-red-600 shadow-lg transition-transform group-hover:scale-110">
                <Play className="h-7 w-7 translate-x-0.5 fill-white text-white" aria-hidden="true" />
              </span>
            </span>
          </button>
        )}
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
