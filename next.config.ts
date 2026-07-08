import type { NextConfig } from "next";

// URL dello Studio Sanity ospitato (studioHost in studio/sanity.cli.ts).
const SANITY_STUDIO_URL = "https://dentistaconegliano.sanity.studio";

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
    ];
  },
};

export default nextConfig;
