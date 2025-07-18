import createMiddleware from "next-intl/middleware";
import { locales } from "./lib/i18n";

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: "ar",

  // Always use a locale prefix
  localePrefix: "always",

  // Redirect to default locale when no locale is specified
  localeDetection: true,

  // Custom path matching
  pathnames: {
    "/": "/",
    "/categories": {
      ar: "/categories",
      en: "/categories",
    },
    "/cart": {
      ar: "/cart",
      en: "/cart",
    },
    "/checkout": {
      ar: "/checkout",
      en: "/checkout",
    },
    "/orders": {
      ar: "/orders",
      en: "/orders",
    },
    "/login": {
      ar: "/login",
      en: "/login",
    },
    "/register": {
      ar: "/register",
      en: "/register",
    },
    "/supplier": {
      ar: "/supplier",
      en: "/supplier",
    },
  },
});

export const config = {
  // Match only internationalized pathnames
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(ar|en)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
