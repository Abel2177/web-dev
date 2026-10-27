/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Serve AVIF first (best compression), WebP as fallback.
    // Browsers that support neither get the original JPEG/PNG.
    formats: ["image/avif", "image/webp"],
    // Matches the breakpoints used in DishCard sizes attribute so the browser
    // always picks the tightest-fitting source — no wasted bytes on mobile.
    deviceSizes: [640, 750, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256,320, 384, 400, 448, 512],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
        pathname: "/recipe-images/**",
      },
    ],
  },
};

export default nextConfig;
