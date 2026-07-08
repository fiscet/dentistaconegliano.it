"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-consent"; // "granted" | "denied"

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

const PRIVACY_URL = "https://www.iubenda.com/privacy-policy/29730377";
const COOKIE_URL = "https://www.iubenda.com/privacy-policy/29730377/cookie-policy";

// Banner di consenso per GA4 (Consent Mode v2). Categoria unica: statistiche.
// Alla scelta aggiorna il consenso via gtag e la memorizza, così non
// riappare. È riapribile in ogni momento (evento "open-cookie-consent" dal
// link "Preferenze cookie" nel footer) → withdrawal GDPR.
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "granted") {
      window.gtag?.("consent", "update", { analytics_storage: "granted" });
    } else if (!stored) {
      setVisible(true);
    }
    const open = () => setVisible(true);
    window.addEventListener("open-cookie-consent", open);
    return () => window.removeEventListener("open-cookie-consent", open);
  }, []);

  const choose = (granted: boolean) => {
    localStorage.setItem(STORAGE_KEY, granted ? "granted" : "denied");
    window.gtag?.("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
    });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Informativa sui cookie"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm leading-relaxed text-slate-600">
            Usiamo cookie tecnici e, previo consenso, cookie statistici (Google
            Analytics) per capire come viene usato il sito. Puoi accettarli o
            rifiutarli. Dettagli nella{" "}
            <a
              href={COOKIE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              Cookie Policy
            </a>{" "}
            e nella{" "}
            <a
              href={PRIVACY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-sky-600 underline underline-offset-2 hover:text-sky-700"
            >
              Privacy Policy
            </a>
            .
          </p>
          <div className="flex shrink-0 gap-3">
            <button
              type="button"
              onClick={() => choose(false)}
              className="cursor-pointer rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
            >
              Rifiuta
            </button>
            <button
              type="button"
              onClick={() => choose(true)}
              className="cursor-pointer rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-700"
            >
              Accetta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
