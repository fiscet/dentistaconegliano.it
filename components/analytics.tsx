import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// GA4 con Google Consent Mode v2. I default di consenso sono impostati a
// "denied" PRIMA del caricamento di gtag.js: GA4 non scrive cookie finché
// l'utente non accetta dal banner (vedi CookieConsent, che chiama
// gtag('consent','update', ...)). Non renderizza nulla se manca il
// Measurement ID (NEXT_PUBLIC_GA_ID).
export function Analytics() {
  if (!GA_ID) return null;

  return (
    <>
      <Script id="ga-consent-default" strategy="beforeInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});
gtag('js',new Date());
gtag('config','${GA_ID}');`}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
    </>
  );
}
