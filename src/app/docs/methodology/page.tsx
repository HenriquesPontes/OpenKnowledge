import { Button } from "@/components/ui/Button";
import { Architecture } from "@/components/sections/Architecture";
import { principle } from "@/lib/constants";
import { GITHUB_URL } from "@/lib/catalog";

export default function MethodologyPage() {
  return (
    <>
      <h1
        className="font-heading text-white tracking-[-0.03em] leading-[1.05]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
      >
        Methodology
      </h1>
      <p className="mt-4 text-muted text-lg sm:text-[21px] tracking-[-0.01em] leading-normal">
        Evidence before generation
      </p>
      <p className="mt-6 text-muted text-base leading-7 tracking-[-0.01em]">
        {principle}
      </p>
      <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
        This is retrieval and verification, not generative translation. Never
        invent a gloss, infer a missing word, creolize Portuguese, or copy a
        form from one folder into another because the spelling looks close.
      </p>
      <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
        Forro, Angolar and Lung’Ie are documented as independent systems. Cabo
        Verde is one island, one folder. Guinea-Bissau is one region, one
        folder. Angola Contruy is the Angola country dataset; it is not Angolar.
        Official Portuguese of these countries is not a creole lexicon in this
        knowledge base.
      </p>
      <p className="mt-4 text-muted text-base leading-7 tracking-[-0.01em]">
        If evidence does not exist, the field stays empty. A missing translation
        is better than a guessed one. Disagreements are recorded, not silently
        resolved.
      </p>

      <div className="-mx-6 sm:mx-0 mt-4">
        <Architecture />
      </div>

      <div className="mt-4">
        <Button href={`${GITHUB_URL}/blob/main/docs/methodology.md`}>
          Full methodology on GitHub
        </Button>
      </div>
    </>
  );
}
