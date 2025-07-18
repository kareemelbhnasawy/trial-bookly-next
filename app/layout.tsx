import type { Metadata } from "next";
import { Inter, Tajawal } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default:
      "رواسي - منصة مواد البناء الشاملة | Rawasy - Construction Materials Marketplace",
    template: "%s | Rawasy",
  },
  description:
    "منصة رواسي الشاملة لمواد البناء في الشرق الأوسط. اكتشف وأطلب مواد البناء عالية الجودة من موردين موثوقين.",
  keywords: [
    "مواد البناء",
    "اسمنت",
    "حديد",
    "رمل",
    "خرسانة",
    "Construction Materials",
    "Cement",
    "Steel",
    "Sand",
    "Concrete",
  ],
  authors: [{ name: "Rawasy Team" }],
  creator: "Rawasy",
  publisher: "Rawasy",
  openGraph: {
    type: "website",
    locale: "ar_SA",
    alternateLocale: "en_US",
    url: "https://rawasy.com",
    siteName: "Rawasy",
    title: "رواسي - منصة مواد البناء الشاملة",
    description: "منصة رواسي الشاملة لمواد البناء في الشرق الأوسط",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rawasy Construction Materials Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "رواسي - منصة مواد البناء الشاملة",
    description: "منصة رواسي الشاملة لمواد البناء في الشرق الأوسط",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${inter.variable} ${tajawal.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0ea5e9" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </head>
      <body className="font-arabic antialiased">
        <div id="root" className="min-h-screen bg-background">
          {children}
        </div>
      </body>
    </html>
  );
}
