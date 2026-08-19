import { Container } from "@/components/ui/Container";
import { footer } from "@/lib/constants";

export const metadata = {
  title: "Legal",
};

export default function LegalPage() {
  return (
    <section className="pt-28 pb-20 sm:pt-36">
      <Container>
        <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
          Legal
        </p>
        <h1
          className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          Company, privacy, and EULA
        </h1>
        <p className="mt-4 max-w-[640px] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
          This site is published by {footer.companyName}.
        </p>

        <div className="mt-12 max-w-[720px] space-y-12">
          <section>
            <h2 className="font-heading text-white tracking-[-0.02em] text-[28px] leading-tight">
              Company information
            </h2>
            <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
              {footer.companyName} is a private limited company {footer.registration.toLowerCase()}.
              Company number {footer.companyNumber}.
            </p>
            <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
              Open Knowledge is a ForroVivo product operated by{" "}
              {footer.companyName}. You can confirm the filing record on{" "}
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
          </section>

          <section id="privacy">
            <h2 className="font-heading text-white tracking-[-0.02em] text-[28px] leading-tight">
              Privacy
            </h2>
            <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
              If you join the waitlist, we process the email address you submit
              so we can tell you when Open Knowledge and related ForroVivo
              products are available. That address is sent to Beehiiv, our
              newsletter provider, using the credentials configured for this
              site.
            </p>
            <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
              We do not sell waitlist addresses. We do not use the public
              Linguistic Research API to collect personal data. Server logs
              may include technical data such as IP address for security and
              operation of the site.
            </p>
            <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
              To ask about your waitlist email, contact {footer.companyName}.
            </p>
          </section>

          <section id="eula">
            <h2 className="font-heading text-white tracking-[-0.02em] text-[28px] leading-tight">
              End User License Agreement
            </h2>
            <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
              This site and the public API are provided for research, education,
              and language documentation. Do not treat the knowledge base as
              legal, medical, or official government advice. Do not invent,
              merge, or substitute lexical data across isolated datasets.
            </p>
            <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
              Third-party dictionaries and papers keep their original licences.
              Project-original material is published under CC BY 4.0 unless a
              source page says otherwise. The ForroVivo name, Open Knowledge,
              and related marks are used by {footer.companyName}.
            </p>
            <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
              The public API is read-only. Authentication is not required
              today. Rate limits and access controls may be introduced if usage
              requires them. These terms are governed by the laws of England
              and Wales.
            </p>
          </section>
        </div>
      </Container>
    </section>
  );
}
