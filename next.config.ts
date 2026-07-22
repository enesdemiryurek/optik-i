import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export — hosting'e yüklemek için
  output: "export",
  basePath: "/optik-l", // <-- CSS ve asset yollarının kaymaması için bu şart!
  trailingSlash: true,

  images: {
    // Static export'ta Next.js Image Optimization çalışmaz,
    // unoptimized: true ile düz <img> gibi davranır.
    unoptimized: true,
    remotePatterns: [],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
    formats: ['image/avif', 'image/webp'],
  },
};

export default nextConfig;