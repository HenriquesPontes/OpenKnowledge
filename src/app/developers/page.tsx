import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { API_ORIGIN, GITHUB_URL } from "@/lib/catalog";

export const metadata = {
  title: "Developers — ForroVivo",
};

export default function DevelopersPage() {
  return (
    <section className="pt-28 pb-20 sm:pt-36">
      <Container>
        <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
          Developers
        </p>
        <h1
          className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
          style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)" }}
        >
          Public access first
        </h1>
        <p className="mt-4 max-w-[640px] text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
          The Linguistic Research API is public and read-only. Authentication
          and API keys are not required.
        </p>
        <p className="mt-6 max-w-[640px] text-muted text-base leading-7 tracking-[-0.01em]">
          Rate limits and signed keys will be introduced when usage requires
          them. Until then, query one isolated dataset at a time.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Button href="/docs/quickstart">Quickstart</Button>
          <Button href={`${API_ORIGIN}/docs`} variant="outline">
            Try the API
          </Button>
          <Button href={GITHUB_URL} variant="ghost">
            View source on GitHub
          </Button>
        </div>

        <div className="mt-16 sm:mt-20">
          <p className="text-muted text-sm sm:text-base tracking-[-0.01em]">
            Project Leadership
          </p>
          <h2
            className="mt-4 font-heading text-white tracking-[-0.03em] leading-[1.05]"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Henriques Pontes & Luís Lima
          </h2>

          <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="rounded-2xl border border-border bg-surface px-6 py-7">
              <h3 className="font-heading text-white tracking-[-0.02em] text-[28px] leading-tight">
                Henriques Pontes
              </h3>
              <p className="mt-2 text-muted text-sm sm:text-base tracking-[-0.01em]">
                Founder & Project Lead · Product & Technology
              </p>

              <div className="mt-5 space-y-4 text-muted text-base leading-7 tracking-[-0.01em]">
                <p>
                  **Henriques Pontes** is a technology professional and independent
                  developer focused on AI research and digital preservation, working
                  at the intersection of <span className="text-white">language</span>,{" "}
                  <span className="text-white">technology</span>, and{" "}
                  <span className="text-white">open knowledge</span>.
                </p>
                <p>
                  He founded <span className="text-white">ForroVivo</span>, originally
                  created to preserve and support <span className="text-white">Forro (Santome / Santomense)</span>,
                  a Creole language of São Tomé and Príncipe. What started as a
                  language-focused documentation effort grew into a broader goal:
                  building an open linguistic knowledge infrastructure for African Creole
                  languages.
                </p>
                <p>
                  Henriques leads the development of the{" "}
                  <span className="text-white">ForroVivo African Creole Knowledge Project</span>,
                  an open research initiative dedicated to collecting, structuring,
                  verifying, and making accessible linguistic and cultural knowledge for
                  languages that remain significantly underrepresented in modern digital
                  technology.
                </p>

                <div>
                  <p className="text-white/90 tracking-[-0.01em]">Focus</p>
                  <ul className="mt-3 list-disc list-inside text-muted text-base leading-7 tracking-[-0.01em]">
                    <li>Forro / Saotomense</li>
                    <li>Angolar / Ngola</li>
                    <li>Lung’Ie / Principense</li>
                  </ul>
                </div>

                <p>
                  The work is designed to expand into a wider collection of African
                  Creole and contact languages—creating datasets that can support
                  linguistic research, education, NLP workflows, machine translation
                  efforts, and AI grounded in real documentation.
                </p>

                <p>
                  His approach is strongly <span className="text-white">evidence-first</span>.
                  The project prioritizes source documentation, verification, and provenance
                  so linguistic claims are traceable to the underlying material.
                </p>

                <blockquote className="mt-2 border-l border-border pl-4 text-white/90">
                  The goal is not to teach AI to invent these languages. The goal is to give
                  technology access to knowledge that already exists.
                </blockquote>

                <p>
                  Through ForroVivo, he works toward an open ecosystem where researchers,
                  developers, educators, language communities, and AI researchers can access
                  and build upon structured linguistic knowledge.
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface px-6 py-7">
              <h3 className="font-heading text-white tracking-[-0.02em] text-[28px] leading-tight">
                Luís Lima
              </h3>
              <p className="mt-2 text-muted text-sm sm:text-base tracking-[-0.01em]">
                Co-Founder & Research Collaborator · Testing & Feedback
              </p>

              <div className="mt-5 space-y-4 text-muted text-base leading-7 tracking-[-0.01em]">
                <p>
                  <span className="text-white">Luís Lima</span> is a co-founder of the ForroVivo project
                  and has been involved since its earliest conceptual stage.
                </p>
                <p>
                  From the beginning, Luís worked alongside Henriques during early brainstorming and
                  ideation. His feedback helped challenge assumptions, shape the project direction,
                  and refine the development approach.
                </p>
                <p>
                  As the initiative evolved into an operational knowledge project, Luís continued to
                  contribute as a testing and feedback collaborator—evaluating new ideas, features, and
                  iterations from a user perspective.
                </p>
                <p>
                  Luís represents an important part of ForroVivo’s development philosophy: building through
                  conversation, testing, feedback, and continuous iteration.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
