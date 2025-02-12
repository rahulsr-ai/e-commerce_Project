/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Strict Mode Enable
  swcMinify: true, // SWC Minify Enable
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    domains: ["images.unsplash.com"], // Allow images from Unsplash
    unoptimized: true, // Disable Next.js image optimization (if needed)
  },
};

export default nextConfig;
