import { footer } from "@/lib/constants";

export const metadata = {
  title: "Company",
  description:
    "Company information for LIVLU TECHNOLOGIES LTD and the ForroVivo product family: Open Knowledge, Linguistic Research, the Forro Vivo App, and Forro Connect.",
  alternates: { canonical: "/legal/company" },
};

export default function LegalCompanyPage() {
  return (
    <>
      <h1
        className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        Company
      </h1>
      <p className="mt-4 max-w-[40rem] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        Who operates ForroVivo, and how the products relate to each other.
      </p>

      <div className="mt-10 max-w-[42rem] space-y-6 text-muted text-base leading-7 tracking-[-0.01em]">
        <p>
          {footer.companyName} is a private limited company{" "}
          {footer.registration.toLowerCase()}. Company number{" "}
          {footer.companyNumber}. You can confirm the filing record on{" "}
          <a
            href={footer.companiesHouseHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-white/70 transition-colors"
          >
            Companies House
          </a>
          .
        </p>
        <p>
          ForroVivo is the platform name used by {footer.companyName}. It
          covers the work of documenting, preserving, and structuring African
          Creole languages, and making them accessible to new generations.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          The product family
        </h2>
        <p>
          <span className="text-white">Open Knowledge</span> is this public
          website: languages, dictionaries, documentation, and the API
          Platform. It is the public home of the ForroVivo Linguistic Research
          work.
        </p>
        <p>
          <span className="text-white">Linguistic Research</span> is the
          evidence layer behind the products: isolated lexicons, attested
          sources, methodology, and the read-only Linguistic Research API. Every
          linguistic claim is meant to stay traceable to a source.
        </p>
        <p>
          <span className="text-white">Forro Vivo App</span> is the learning
          product for African Creole languages, starting with Forro of São Tomé
          and Príncipe. It provides dictionary, lessons, and exercises. It is
          software learning — not a replacement for a native speaker.
        </p>
        <p>
          <span className="text-white">Forro Connect</span> connects learners
          with real Forro speakers and cultural knowledge holders for live
          lessons. Teaching time is the product. Community income for speakers
          is part of how Connect is designed to work.
        </p>
        <p>
          <span className="text-white">API Platform</span> is the developer
          surface on this site for keys and live requests against the Linguistic
          Research API. Full rules live in Documentation.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Marks and naming
        </h2>
        <p>
          The ForroVivo name, Open Knowledge, Forro Vivo, Forro Connect, and
          related marks are used by {footer.companyName}. Use that does not
          confuse the public about who operates the products, or that suggests
          endorsement without permission, is not allowed.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Questions
        </h2>
        <p>
          For company and compliance questions,{" "}
          <a
            href={`mailto:${footer.contacts.legal}`}
            className="text-white hover:text-white/70 transition-colors underline-offset-4 hover:underline"
          >
            write to legal
          </a>
          .
        </p>
      </div>
    </>
  );
}
