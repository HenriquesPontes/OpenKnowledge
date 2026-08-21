import { footer } from "@/lib/constants";

export const metadata = {
  title: "Terms of service",
  description:
    "Terms of service for Open Knowledge, Linguistic Research, the Forro Vivo App, Forro Connect, and the API Platform operated by LIVLU TECHNOLOGIES LTD.",
  alternates: { canonical: "/legal/terms" },
};

export default function LegalTermsPage() {
  return (
    <>
      <h1
        className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        Terms of service
      </h1>
      <p className="mt-4 max-w-[40rem] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        The rules for using ForroVivo products and this website.
      </p>

      <div className="mt-10 max-w-[42rem] space-y-6 text-muted text-base leading-7 tracking-[-0.01em]">
        <p>
          By using this website, joining a waitlist, creating an API Platform
          account, downloading or using the Forro Vivo App, or joining Forro
          Connect, you agree to these terms. If you use a product on behalf of
          an organisation, you confirm that you are allowed to bind that
          organisation.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Open Knowledge and Linguistic Research
        </h2>
        <p>
          Open Knowledge publishes public linguistic knowledge for African
          Creole languages and related language work, including isolated
          lexicons and documentation. Linguistic Research is the evidence
          layer: sources, methodology, and the read-only Linguistic Research
          API.
        </p>
        <p>
          You may use published data and the API for research, education,
          language learning, and language technology that respects dataset
          isolation. You must not invent, merge, or substitute lexical data
          across languages or varieties. You must not present generated or
          guessed forms as attested evidence from ForroVivo.
        </p>
        <p>
          The knowledge base is not legal, medical, immigration, or official
          government advice. Empty fields mean evidence was not published —
          they are not an invitation to invent content.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Forro Vivo App
        </h2>
        <p>
          The Forro Vivo App is a learning product: dictionary, lessons, and
          exercises, starting with Forro of São Tomé and Príncipe. It is
          software learning. It does not replace a native speaker, and it is
          not Forro Connect.
        </p>
        <p>
          You must use the app lawfully and in line with the App Store or other
          platform terms that apply to your download. You must not reverse
          engineer, scrape, or redistribute the app in a way that breaks those
          platform rules or these terms. Voice, audio, and other capabilities
          arrive according to the product roadmap and may change as the app
          develops.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Forro Connect
        </h2>
        <p>
          Forro Connect matches learners with real Forro speakers and cultural
          knowledge holders for live lessons. The lesson is the product.
          Speakers are paid for teaching time. Cultural knowledge shared in a
          lesson remains with the speaker; Connect is not a marketplace that
          sells the language itself as a commodity.
        </p>
        <p>
          Waitlist registration does not guarantee a match or a lesson time.
          When booking and payment open, the price and what it covers are shown
          before you pay. Learners and speakers must treat each other with
          respect. Harassment, fraud, or misuse of Connect may result in
          removal from the waitlist or service.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          API Platform
        </h2>
        <p>
          API Platform accounts are for operating keys and trying the Linguistic
          Research API. Keys identify your client. Public read access may still
          work without a key, subject to fair-use limits. You must keep keys
          secret, not share them publicly, and not use the API to attack,
          overload, or misrepresent the service.
        </p>
        <p>
          Full authentication, errors, rate limits, and routes are defined in{" "}
          <a
            href="/docs/api-reference"
            className="text-white hover:text-white/70 transition-colors"
          >
            Documentation
          </a>
          . Those technical rules form part of these terms for API use.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Acceptable use
        </h2>
        <p>
          You must not attempt to disrupt the service, bypass access controls,
          harvest personal data, or use ForroVivo products in a way that harms
          speakers, sources, or the integrity of Linguistic Research.{" "}
          {footer.companyName} may suspend or close accounts, revoke keys, or
          refuse service when these terms are broken or abuse is suspected.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Pricing and billing
        </h2>
        <p>
          Free products on this site do not require payment. When a paid product
          or live lesson is offered, pricing is shown at the point of purchase
          or booking. For invoices, receipts, refunds, or payment questions,{" "}
          <a
            href={`mailto:${footer.contacts.billing}`}
            className="text-white hover:text-white/70 transition-colors underline-offset-4 hover:underline"
          >
            contact billing
          </a>
          .
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Liability
        </h2>
        <p>
          The site, research data, app, Connect, and API are provided so that
          people can learn, research, and build with care. To the fullest
          extent allowed by law, {footer.companyName} is not liable for
          indirect or consequential loss arising from use of the products.
          Nothing in these terms limits liability that cannot be limited under
          the laws of England and Wales.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Governing law
        </h2>
        <p>
          These terms are governed by the laws of England and Wales. For
          questions about these terms,{" "}
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
