import { LegalProductDocument, readSiteCopy } from "@/components/sections/LegalProductDocument";

export const metadata = {
  title: "Open Knowledge legal",
  description:
    "Product-only terms and privacy for Open Knowledge, the API Platform, and Forro Connect waitlist — supplements to the LIVLU TECHNOLOGIES LTD company policies.",
  alternates: { canonical: "/legal/open-knowledge" },
};

export default async function LegalOpenKnowledgePage() {
  const copy = await readSiteCopy();
  return <LegalProductDocument docs={copy.legalProductOpenKnowledge} />;
}
