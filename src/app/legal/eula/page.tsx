import { footer } from "@/lib/constants";

export const metadata = {
  title: "EULA",
  description:
    "End User License Agreement for Open Knowledge, Linguistic Research, the Forro Vivo App, and related ForroVivo software and data operated by LIVLU TECHNOLOGIES LTD.",
  alternates: { canonical: "/legal/eula" },
};

export default function LegalEulaPage() {
  return (
    <>
      <h1
        className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        End User License Agreement
      </h1>
      <p className="mt-4 max-w-[40rem] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        The licence under which you may use ForroVivo software, documentation,
        and published research materials.
      </p>

      <div className="mt-10 max-w-[42rem] space-y-6 text-muted text-base leading-7 tracking-[-0.01em]">
        <p>
          This End User License Agreement (“EULA”) is between you and{" "}
          {footer.companyName}. It covers this website, Open Knowledge
          documentation, the Linguistic Research API and related public
          materials, and ForroVivo software products including the Forro Vivo
          App, except where a platform store licence or a separate written
          agreement says otherwise.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Licence grant
        </h2>
        <p>
          Subject to these terms and the{" "}
          <a
            href="/legal/terms"
            className="text-white hover:text-white/70 transition-colors"
          >
            Terms of service
          </a>
          , {footer.companyName} grants you a limited, non-exclusive,
          non-transferable licence to use the applicable ForroVivo product for
          personal or organisational research, education, language learning, or
          development against the public API.
        </p>
        <p>
          This licence does not transfer ownership of ForroVivo software, marks,
          or project-original materials. Platform stores may grant additional
          rights or limits for apps you download through them.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Linguistic Research materials
        </h2>
        <p>
          Published Linguistic Research materials are provided for research and
          education. Third-party dictionaries and papers keep their original
          licences. Project-original material is published under CC BY 4.0
          unless a source page says otherwise. Attribution should remain intact
          where CC BY 4.0 applies.
        </p>
        <p>
          Dataset isolation is part of the licence conditions for research use:
          do not merge, invent, or substitute lexical forms across languages or
          varieties and then present them as ForroVivo-attested evidence. Missing
          data must remain missing rather than guessed.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Forro Vivo App
        </h2>
        <p>
          The Forro Vivo App is licensed for use as a learning application —
          dictionary, lessons, and exercises — starting with Forro. You may not
          copy, modify, redistribute, or commercially exploit the app binary or
          its non-public assets except as allowed by the platform store terms
          and this EULA. Custom models and lesson systems in the app remain tied
          to ForroVivo’s product and source practices; they are not a grant to
          rebrand or resell the learning system.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Forro Connect
        </h2>
        <p>
          Forro Connect is a service for live lessons with speakers. Access to
          matching, booking, or lesson tools is licensed only for that purpose.
          You may not use Connect to scrape speaker information, resell
          community contacts, or extract cultural knowledge into a competing
          dataset without the speaker’s informed agreement and any separate
          rights that apply.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          API and documentation
        </h2>
        <p>
          The Linguistic Research API is read-only for lexicon data. You may
          call published routes in line with Documentation, authentication
          rules, and fair-use limits. You may not use the API to invent
          translations, write into datasets, or misrepresent responses as
          something other than ForroVivo research output.
        </p>
        <p>
          Technical rules in{" "}
          <a
            href="/docs/api-reference"
            className="text-white hover:text-white/70 transition-colors"
          >
            API documentation
          </a>{" "}
          form part of this EULA for API clients.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Restrictions
        </h2>
        <p>
          Except where law forbids these limits, you may not reverse engineer
          ForroVivo software, remove proprietary notices, use ForroVivo marks in
          a misleading way, or sublicense the products as if you were the
          operator. Security testing must not disrupt service or access data
          that is not yours; report issues through the security contact on the{" "}
          <a
            href="/legal"
            className="text-white hover:text-white/70 transition-colors"
          >
            Legal
          </a>{" "}
          page.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Termination
        </h2>
        <p>
          This licence continues until ended by you or by{" "}
          {footer.companyName}. It ends automatically if you break this EULA or
          the Terms of service. On termination, you must stop using the
          affected software and destroy local copies you are not otherwise
          licensed to keep. Provisions that by nature should survive —
          including ownership, licence limits on research misuse, and liability
          limits — continue to apply.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Governing law
        </h2>
        <p>
          This EULA is governed by the laws of England and Wales. Questions
          about licensing:{" "}
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
