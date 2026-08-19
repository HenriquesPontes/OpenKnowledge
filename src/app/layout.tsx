import type { Metadata, Viewport } from "next";
import { Ovo } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
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

export const metadata: Metadata = {
  title: {
    default: "Open Knowledge",
    template: "%s | Open Knowledge",
  },
  description:
    "Open knowledge for the Creole languages of São Tomé and Príncipe, Cabo Verde, Guiné-Bissau, and Angola. A structured, evidence-based linguistic knowledge base with an open API.",
  icons: {
    icon: "/images/logo-icon.png",
    apple: "/images/logo-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${ovo.variable} antialiased min-h-dvh flex flex-col`}>
        <Navbar />
        <main className="flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
