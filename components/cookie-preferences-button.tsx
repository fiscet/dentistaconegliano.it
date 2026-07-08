"use client";

// Riapre il banner cookie (evento ascoltato da CookieConsent) per revocare o
// modificare il consenso in qualsiasi momento — requisito GDPR.
export function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event("open-cookie-consent"))}
      className="cursor-pointer hover:text-primary-foreground transition-colors"
    >
      Preferenze cookie
    </button>
  );
}
