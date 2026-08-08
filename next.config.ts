import type { NextConfig } from "next";

// URL dello Studio Sanity ospitato (studioHost in studio/sanity.cli.ts).
const SANITY_STUDIO_URL = "https://dentistaconegliano.sanity.studio";

// URL Iubenda per privacy/cookie policy (gia' in uso in components/site-footer.tsx).
const IUBENDA_PRIVACY_URL = "https://www.iubenda.com/privacy-policy/29730377";
const IUBENDA_COOKIE_URL = "https://www.iubenda.com/privacy-policy/29730377/cookie-policy";

// Redirect 301 dalle URL del vecchio sito (indicizzate su Google, gia'
// reindirizzate una volta verso un sito provvisorio via .htaccess Apache)
// direttamente alle nuove URL, per non perdere il posizionamento e
// evitare doppi hop di redirect ora che il sito e' su Vercel.
//
// Le voci marcate "NOTE:" non hanno un corrispettivo 1:1 sul sito nuovo:
// puntano alla pagina piu' pertinente disponibile, ma vanno riviste se
// nasce un contenuto piu' specifico.
const legacyRedirects: { source: string; destination: string }[] = [
  // Ortodonzia (tutte le sottopagine confluiscono nell'unica pagina servizio)
  { source: "/specializzazioni/ortodonzia-trattamenti.html", destination: "/servizi/ortodonzia" },
  { source: "/specializzazioni/ortodonzia-trattamenti/ortodonzia-intercettiva.html", destination: "/servizi/ortodonzia" },
  { source: "/specializzazioni/ortodonzia-trattamenti/ortodonzia-fissa.html", destination: "/servizi/ortodonzia" },
  { source: "/specializzazioni/ortodonzia-trattamenti/ortodonzia-prechirurgica.html", destination: "/servizi/ortodonzia" },
  { source: "/specializzazioni/ortodonzia-trattamenti/educatori-funzionali.html", destination: "/servizi/ortodonzia" },
  { source: "/specializzazioni/ortodonzia-trattamenti/ortodonzia-atm.html", destination: "/servizi/ortodonzia" },
  { source: "/specializzazioni/ortodonzia-trattamenti/agenesie-dentali.html", destination: "/servizi/ortodonzia" },
  { source: "/specializzazioni/ortodonzia-trattamenti/malocclusioni-dentali.html", destination: "/servizi/ortodonzia" },
  { source: "/specializzazioni/ortodonzia-trattamenti/ortodonzia-mobile.html", destination: "/servizi/ortodonzia" },
  { source: "/specializzazioni/ortodonzia-trattamenti/ortodonzia-invisibile.html", destination: "/servizi/ortodonzia" },
  { source: "/specializzazioni/estetica-dentale/ortodonzia-nell-adulto.html", destination: "/servizi/ortodonzia" },

  // Implantologia (slug rinominati: implantologia-dentale -> impianti-carico-immediato / all-on-4)
  // NOTE: la vecchia pagina generica "implantologia-dentale" non ha piu' un equivalente
  // diretto (il servizio e' stato suddiviso); punta alla pagina implantologica principale.
  { source: "/specializzazioni/implantologia-dentale.html", destination: "/servizi/impianti-carico-immediato" },
  { source: "/specializzazioni/implantologia-dentale/implantologia-carico-immediato.html", destination: "/servizi/impianti-carico-immediato" },
  // NOTE: nessuna pagina dedicata a iuxta-ossea / rigenerazione ossea / rialzo del seno oggi: fallback sulla pagina implantologica principale.
  { source: "/specializzazioni/implantologia-dentale/implantologia-iuxta-ossea.html", destination: "/servizi/impianti-carico-immediato" },
  // NOTE: "protesi mobile" (removibile) non ha equivalente: protesi-fissa-ponti-e-corone e' solo per protesi fisse. Fallback sull'indice servizi.
  { source: "/specializzazioni/implantologia-dentale/protesi-mobile.html", destination: "/servizi" },
  { source: "/specializzazioni/implantologia-dentale/rigenerazione-ossea-gbr.html", destination: "/servizi/impianti-carico-immediato" },
  { source: "/specializzazioni/implantologia-dentale/rialzo-seno-mascellare.html", destination: "/servizi/impianti-carico-immediato" },
  { source: "/specializzazioni/implantologia-dentale/implantologia-poco-osso-toronto-bridge.html", destination: "/servizi/all-on-4" },
  { source: "/specializzazioni/implantologia-dentale/implantologia-all-on-four.html", destination: "/servizi/all-on-4" },
  { source: "/specializzazioni/implantologia-dentale/implantologia-all-on-six.html", destination: "/servizi/all-on-4" },
  // NOTE: "paura del dentista" non e' piu' una pagina dedicata sul sito nuovo, solo una categoria del blog.
  { source: "/specializzazioni/implantologia-dentale/implantologia-per-odontofobici.html", destination: "/blog?categoria=paura-del-dentista" },

  // Estetica dentale / protesi
  { source: "/specializzazioni/estetica-dentale.html", destination: "/servizi/estetica-dentale" },
  { source: "/specializzazioni/estetica-dentale/ricostruzione-estetica.html", destination: "/servizi/estetica-dentale" },
  { source: "/specializzazioni/estetica-dentale/intarsio-dentale.html", destination: "/servizi/estetica-dentale" },
  { source: "/specializzazioni/estetica-dentale/sbiancamento-professionale.html", destination: "/servizi/sbiancamento-dentale" },
  { source: "/specializzazioni/estetica-dentale/faccette-estetiche.html", destination: "/servizi/faccette-dentali" },
  { source: "/specializzazioni/estetica-dentale/corone-in-ceramica.html", destination: "/servizi/protesi-fissa-ponti-e-corone" },
  { source: "/specializzazioni/estetica-dentale/corone-in-zirconia.html", destination: "/servizi/protesi-fissa-ponti-e-corone" },
  { source: "/specializzazioni/estetica-dentale/capsule-dentali-metal-free.html", destination: "/servizi/protesi-fissa-ponti-e-corone" },
  { source: "/specializzazioni/trattamenti-generali/protesi-fissa.html", destination: "/servizi/protesi-fissa-ponti-e-corone" },
  { source: "/specializzazioni/estetica-dentale/rimozione-sicura-amalgame.html", destination: "/servizi/sostituzione-vecchie-otturazioni" },
  // NOTE: "ozonoterapia-della-carie" non esiste piu' come servizio: fallback sull'igiene/prevenzione.
  { source: "/specializzazioni/estetica-dentale/trattamento-carie-dentale.html", destination: "/servizi/igiene-professionale" },

  // Parodontologia / gengive (slug rinominati)
  { source: "/specializzazioni/cura-parodontite.html", destination: "/servizi/cura-laser-delle-gengive" },
  { source: "/specializzazioni/cura-parodontite/sanguinamento-gengivale.html", destination: "/servizi/cura-laser-delle-gengive" },
  { source: "/specializzazioni/cura-parodontite/cura-delle-afte.html", destination: "/servizi/cura-laser-delle-gengive" },
  { source: "/specializzazioni/cura-parodontite/desensibilizzazione.html", destination: "/servizi/cura-laser-delle-gengive" },
  { source: "/specializzazioni/cura-parodontite/denti-che-si-muovono.html", destination: "/servizi/cura-laser-delle-gengive" },
  { source: "/specializzazioni/cura-parodontite/cura-della-parodontite-laser.html", destination: "/servizi/cura-laser-delle-gengive" },
  { source: "/specializzazioni/cura-parodontite/cura-dell-alitosi.html", destination: "/servizi/cura-laser-delle-gengive" },
  { source: "/specializzazioni/cura-parodontite/ricostruzione-delle-gengive.html", destination: "/servizi/esposizione-delle-radici" },
  { source: "/specializzazioni/cura-parodontite/recessione-gengivale.html", destination: "/servizi/esposizione-delle-radici" },

  // Trattamenti generali (slug rinominati)
  { source: "/specializzazioni/trattamenti-generali.html", destination: "/servizi" },
  { source: "/specializzazioni/trattamenti-generali/igiene-dentale.html", destination: "/servizi/igiene-professionale" },
  { source: "/specializzazioni/trattamenti-generali/dentista-dei-bambini-pedodonzia.html", destination: "/servizi/dentista-bambini" },
  { source: "/specializzazioni/trattamenti-generali/rimozione-dente-del-giudizio.html", destination: "/servizi/estrazione-dente-giudizio" },
  // NOTE: vedi nota sopra su "paura del dentista".
  { source: "/specializzazioni/trattamenti-generali/paura-del-dentista.html", destination: "/blog?categoria=paura-del-dentista" },
  { source: "/specializzazioni/trattamenti-generali/endodonzia-dentale.html", destination: "/servizi/devitalizzazione" },
  { source: "/specializzazioni/trattamenti-generali/granulomi-e-cisti-dentali.html", destination: "/servizi/devitalizzazione" },
  { source: "/specializzazioni/trattamenti-generali/fluoroprofilassi.html", destination: "/servizi/dentista-bambini" },
  // NOTE: "corsi-sedazione-odontoiatria" non esiste piu' e la categoria blog "sedazione-cosciente" e' vuota: fallback sull'indice servizi.
  { source: "/specializzazioni/trattamenti-generali/sedazione-cosciente.html", destination: "/servizi" },
  { source: "/specializzazioni/trattamenti-generali/impronta-con-scanner.html", destination: "/servizi" },

  // Studio / chi siamo (sul sito nuovo e' una pagina singola senza sottopagine)
  // NOTE: nessuna sezione dedicata a garanzie/certificazioni oggi: fallback sulla pagina Studio.
  { source: "/lo-studio/garanzie.html", destination: "/studio" },
  { source: "/lo-studio/equipe-medica.html", destination: "/studio" },
  { source: "/lo-studio/certificazioni.html", destination: "/studio" },
  { source: "/lo-studio/sterilizzazione.html", destination: "/studio" },
  { source: "/lo-studio/pubblicazioni.html", destination: "/studio" },
  { source: "/lo-studio/fotogallery.html", destination: "/studio" },
  { source: "/lo-studio/come-raggiungerci.html", destination: "/contatti" },
  // NOTE: non esiste piu' una pagina dedicata al dott. Marin: fallback sulla pagina Studio.
  { source: "/recensioni.html", destination: "/studio" },
  { source: "/casi-clinici.html", destination: "/interventi-realizzati" },

  // Contatti / legal
  { source: "/contatti.html", destination: "/contatti" },
  { source: "/privacy", destination: IUBENDA_PRIVACY_URL },
  { source: "/cookie", destination: IUBENDA_COOKIE_URL },

  // Blog (nessun redirect verso una categoria specifica: ora il blog esiste
  // davvero sul sito nuovo, quindi si punta all'indice generale)
  { source: "/blog.html", destination: "/blog" },
  // NOTE: il suffisso ".html" e' obbligatorio per due motivi:
  // 1) "/blog/:path*" (senza suffisso) fa match anche di "/blog" stesso
  //    (il param opzionale assorbe pure lo slash iniziale), creando un
  //    redirect loop /blog -> /blog -> ... (ERR_TOO_MANY_REDIRECTS).
  // 2) senza vincolo il pattern intercetterebbe anche i veri articoli del
  //    blog nuovo su /blog/:slug (i redirect vengono valutati da Next.js
  //    PRIMA delle route dinamiche), rendendoli irraggiungibili. I vecchi
  //    URL del sito precedente terminavano tutti in ".html", quindi il
  //    suffisso li isola correttamente dai nuovi slug.
  { source: "/blog/:path*.html", destination: "/blog" },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io", pathname: "/images/**" },
    ],
  },
  // Scorciatoie comode per il cliente: /admin e /studio-admin portano allo
  // Studio Sanity. Redirect temporaneo (307): se cambia l'host dello Studio
  // basta aggiornare qui.
  async redirects() {
    return [
      { source: "/admin", destination: SANITY_STUDIO_URL, permanent: false },
      { source: "/admin/:path*", destination: SANITY_STUDIO_URL, permanent: false },
      // 301: consolidano definitivamente il link equity delle vecchie URL
      // indicizzate da Google sulle nuove URL del sito attuale.
      ...legacyRedirects.map((r) => ({ ...r, permanent: true })),
    ];
  },
};

export default nextConfig;
