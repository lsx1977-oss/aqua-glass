import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    // Wikimedia Commons hosts the film stills.
    remotePatterns: [
      { protocol: "https", hostname: "thumb.wikimedia.org" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
    // 90 is used for the HD film posters; Next 16 only allows 75 unless listed here.
    qualities: [75, 90],
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
