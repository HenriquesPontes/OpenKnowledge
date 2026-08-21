import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Ovo } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { LocaleProvider } from "@/components/locale/LocaleProvider";
import {
  APP_ORIGIN,
  APP_STORE_URL,
  GITHUB_URL,
  jsonLdScript,
} from "@/lib/catalog";
import { footer } from "@/lib/constants";
import { LOCALE_COOKIE, getSiteCopy, localeFromCookie } from "@/lib/i18n";
import "./globals.css";

const ovo = Ovo({
  variable: "--font-ovo",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "dark",
  themeColor: "#141414",
};

const description =
  "Open knowledge for the Creole languages of São Tomé and Príncipe, Cabo Verde, Guiné-Bissau, and Angola. A structured, evidence-based linguistic knowledge base with an open API.";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? APP_ORIGIN,
  ),
  title: {
    default:
      "Open Knowledge | Creole languages of São Tomé, Cabo Verde, Guiné-Bissau, and Angola and other languages",
    template: "%s | Open Knowledge",
  },
  description,
  applicationName: "Open Knowledge",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/images/app/forro-icon.png",
    apple: "/images/app/forro-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "en_GB",
    siteName: "Open Knowledge",
    title:
      "Open Knowledge — Creole languages of São Tomé, Cabo Verde, Guiné-Bissau, and Angola",
    description,
    images: [
      {
        url: "/images/app/forro-icon.png",
        alt: "Open Knowledge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Open Knowledge — Creole languages of São Tomé, Cabo Verde, Guiné-Bissau, and Angola",
    description,
    images: ["/images/app/forro-icon.png"],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${APP_ORIGIN}/#organization`,
      name: footer.companyName,
      url: APP_ORIGIN,
      logo: `${APP_ORIGIN}/images/app/forro-icon.png`,
      sameAs: [GITHUB_URL, APP_STORE_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${APP_ORIGIN}/#website`,
      name: "Open Knowledge",
      alternateName: ["ForroVivo", "Forro Vivo"],
      url: APP_ORIGIN,
      inLanguage: "en-GB",
      publisher: { "@id": `${APP_ORIGIN}/#organization` },
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const locale = localeFromCookie(cookieStore.get(LOCALE_COOKIE)?.value);
  const copy = getSiteCopy(locale);

  return (
    <html
      lang={locale === "pt" ? "pt" : "en"}
      className="dark"
      suppressHydrationWarning
    >
      <body className={`${ovo.variable} antialiased min-h-dvh flex flex-col`}>
        <LocaleProvider initialLocale={locale}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-[#141414]"
          >
            {copy.layout.skipToContent}
          </a>
          <Navbar />
          <main id="main" className="flex-1 flex flex-col">
            {children}
          </main>
          <Footer />
        </LocaleProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
