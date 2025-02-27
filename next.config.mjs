/** @type {import('next').NextConfig} */
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = withBundleAnalyzer({
  output: "standalone", // Better for production deployment
  reactStrictMode: true, // Enable strict mode
  swcMinify: true, // Enable minification

  experimental: {
    optimizeCss: true, // Optimize CSS
    optimizeFonts: true, // Optimize Fonts
    scrollRestoration: true, // Improve UX for navigation
    esmExternals: true, // Improve build performance
  },

  webpack(config, { isServer }) {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false, // Avoid including Node.js-only modules in frontend
        path: false,
        os: false,
      };
    }
    return config;
  },

  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove "X-Powered-By" header

  i18n: {
    locales: ["en"], // Only English locale needed
    defaultLocale: "en",
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "geolocation=(self)" },
        ],
      },
    ];
  },
});

export default nextConfig;
