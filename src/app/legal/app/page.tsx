import { LegalProductDocument, readSiteCopy } from "@/components/sections/LegalProductDocument";

export const metadata = {
  title: "Forro Vivo App legal",
  description:
    "Product-only terms and privacy for the Forro Vivo App (iOS and Android) — supplements to the LIVLU TECHNOLOGIES LTD company policies.",
  alternates: { canonical: "/legal/app" },
};

export default async function LegalAppPage() {
  const copy = await readSiteCopy();
  return <LegalProductDocument docs={copy.legalProductApp} />;
}
