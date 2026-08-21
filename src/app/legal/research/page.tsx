import { LegalProductDocument, readSiteCopy } from "@/components/sections/LegalProductDocument";

export const metadata = {
  title: "Linguistic Research legal",
  description:
    "Product-only terms and privacy for Linguistic Research datasets and the read-only API — supplements to the LIVLU TECHNOLOGIES LTD company policies.",
  alternates: { canonical: "/legal/research" },
};

export default async function LegalResearchPage() {
  const copy = await readSiteCopy();
  return <LegalProductDocument docs={copy.legalProductResearch} />;
}
