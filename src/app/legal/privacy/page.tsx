import { footer } from "@/lib/constants";

export const metadata = {
  title: "Privacy",
  description:
    "Privacy policy for Open Knowledge, Linguistic Research, the Forro Vivo App, Forro Connect, and the API Platform operated by LIVLU TECHNOLOGIES LTD.",
  alternates: { canonical: "/legal/privacy" },
};

export default function LegalPrivacyPage() {
  return (
    <>
      <h1
        className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        Privacy
      </h1>
      <p className="mt-4 max-w-[40rem] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        How {footer.companyName} handles personal data across ForroVivo
        products.
      </p>

      <div className="mt-10 max-w-[42rem] space-y-6 text-muted text-base leading-7 tracking-[-0.01em]">
        <p>
          This policy explains what we collect, why we collect it, and how to
          reach us. It covers Open Knowledge, Linguistic Research surfaces on
          this site, waitlists, the API Platform, and related ForroVivo product
          pages. The Forro Vivo App and Forro Connect may also process data
          needed to deliver those products, as described below.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Who is responsible
        </h2>
        <p>
          {footer.companyName} operates ForroVivo products and is responsible
          for personal data processed through this website and the related
          product surfaces described here. {footer.registration}. Company
          number {footer.companyNumber}.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          What we collect
        </h2>
        <p>
          <span className="text-white">Waitlists.</span> If you join a waitlist
          for Open Knowledge, Forro Connect, dictionaries, or the API Platform,
          we process the email address you submit and which product waitlist you
          joined, so we can tell you when that product is available.
        </p>
        <p>
          <span className="text-white">API Platform accounts.</span> If you
          create an account, we process your email address and authentication
          credentials to operate the account, issue or replace API keys, and
          protect the service. We may also process registration codes when you
          apply one.
        </p>
        <p>
          <span className="text-white">Technical logs.</span> Server logs may
          include IP address, request metadata, and similar technical data
          needed for security, reliability, and abuse prevention.
        </p>
        <p>
          <span className="text-white">Forro Vivo App.</span> The learning app
          may process account or device information required by the App Store
          or other platforms, and in-app preferences needed to deliver
          dictionary, lessons, and exercises. Linguistic content in the app is
          language data, not a profile of your private life.
        </p>
        <p>
          <span className="text-white">Forro Connect.</span> When Connect is
          active, we process the information needed to match learners and
          speakers, schedule live lessons, and operate community income for
          teaching time. That may include contact details and lesson-related
          information you provide.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Linguistic Research data
        </h2>
        <p>
          The Linguistic Research API and public lexicons are language
          documentation resources. They are not designed to collect personal
          profiles. We do not use the public research API to build advertising
          profiles. Attested linguistic entries remain tied to sources; they are
          not treated as personal data about end users of this site.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Why we process data
        </h2>
        <p>
          We process personal data to provide the products you ask for, to
          communicate about waitlists and accounts, to secure the service, to
          meet legal obligations, and to improve reliability. When a newsletter
          or email provider is configured, waitlist addresses may also be sent
          to that provider so we can reach you about the product you joined.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Sharing
        </h2>
        <p>
          We do not sell personal data. We may use processors that help us run
          email, hosting, security, or payment flows. Platform partners such as
          the App Store may process data under their own terms when you
          download or pay through their store. We share data when required by
          law or to protect the service and users from abuse or security risk.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Retention
        </h2>
        <p>
          We keep waitlist, account, and log data only as long as needed for the
          purposes above, including security and legal requirements. When data
          is no longer needed, we delete or anonymise it where practical.
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Your choices
        </h2>
        <p>
          You may ask for access to the personal data we hold about you, ask us
          to correct it, or ask us to delete waitlist or account data where
          applicable. You may also ask us to stop certain communications. To
          exercise privacy rights,{" "}
          <a
            href={`mailto:${footer.contacts.privacy}`}
            className="text-white hover:text-white/70 transition-colors underline-offset-4 hover:underline"
          >
            write to privacy
          </a>
          .
        </p>

        <h2 className="pt-4 font-heading text-white tracking-[-0.02em] text-2xl leading-tight">
          Security reports
        </h2>
        <p>
          If you believe an account or system has been compromised,{" "}
          <a
            href={`mailto:${footer.contacts.security}`}
            className="text-white hover:text-white/70 transition-colors underline-offset-4 hover:underline"
          >
            report a security issue
          </a>
          . Include enough detail for us to investigate. Do not use findings to
          disrupt service or access data that is not yours.
        </p>
      </div>
    </>
  );
}
