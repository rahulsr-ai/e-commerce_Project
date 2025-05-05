/** @type {import('next').NextConfig} */
const nextConfig = {
 
  headers: async () => [
    {
      source: "/(.*)",
      headers: [
        { key: "X-Forwarded-Host", value: "l0r49zrp-3000.inc1.devtunnels.ms" },
      ],
    },
  ],
  images: {
    // Defines external image sources that can be used in Next.js Image component
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Allows images from Unsplash
      },
      {
        protocol: "https",
        hostname: "lcasimhmjerojawtzwrr.supabase.co", // Allows images from Supabase storage
      },
    ],
  },
};

export default nextConfig;
