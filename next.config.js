const createNextIntlPlugin = require("next-intl/plugin");

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["localhost", "images.unsplash.com", "cdn.rawasy.com"],
  },
  // Remove the old i18n config since we're using next-intl with app router
};

module.exports = withNextIntl(nextConfig);
