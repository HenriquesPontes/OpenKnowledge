import type { Metadata, Viewport } from "next";
import { Ovo } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  APP_ORIGIN,
  APP_STORE_URL,
  GITHUB_URL,
  jsonLdScript,
} from "@/lib/catalog";
import { footer } from "@/lib/constants";
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
      "Open Knowledge | Creole languages of São Tomé, Cabo Verde, Guiné-Bissau, and Angola",
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
    icon: "/images/logo-icon.png",
    apple: "/images/logo-icon.png",
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
        url: "/images/logo-icon.png",
        alt: "Open Knowledge",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Open Knowledge — Creole languages of São Tomé, Cabo Verde, Guiné-Bissau, and Angola",
    description,
    images: ["/images/logo-icon.png"],
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
      logo: `${APP_ORIGIN}/images/logo-icon.png`,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${ovo.variable} antialiased min-h-dvh flex flex-col`}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:text-[#141414]"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="flex flex-1 flex-col">
          {children}
        </main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: jsonLdScript(organizationJsonLd) }}
        />
      </body>
    </html>
  );
}
