/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["localhost", "images.unsplash.com", "cdn.rawasy.com"],
  },
  i18n: {
    locales: ["ar", "en"],
    defaultLocale: "ar",
    localeDetection: true,
  },
};

module.exports = nextConfig;
