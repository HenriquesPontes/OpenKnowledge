"use client";

import { useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
import { API_ORIGIN, isCountryDataset } from "@/lib/catalog";
import { countries, languages } from "@/lib/constants";

const AfricaMap = dynamic(
  () =>
    import("@/components/sections/AfricaMap").then((mod) => mod.AfricaMap),
  {
    ssr: false,
    loading: () => <div className="w-full max-w-[36rem] aspect-[720/560]" />,
  },
);

type DatasetOption = {
  dataset: string;
  label: string;
};

type LookupQuery = {
  headword?: string;
};

type LookupResult = {
  dataset?: string;
  kind?: string;
  language?: string;
  language_name?: string;
  canonical_dataset?: string;
  query?: LookupQuery;
  match?: string;
  count?: number;
  entries?: unknown[];
};

const MATCH_LABEL: Record<string, string> = {
  exact: "Exact match",
  normalized: "Spelling match",
  "diacritic-insensitive": "Match ignoring accents",
};

const EXTRA_LABEL: Record<string, string> = {
  orthography: "Orthography",
  semantic_category: "Semantic category",
  regional_information: "Regional note",
  usage_notes: "Usage",
  notes: "Notes",
  cross_language_relation: "Cross-language relation",
};

function countryIsoForDataset(dataset: string) {
  const language = languages.find((item) => item.dataset === dataset);
  if (language) {
    return countries.find((item) => item.id === language.country)?.isoA2;
  }
  const prefix = dataset.includes("/") ? dataset.split("/")[0] : dataset;
  return countries.find((item) => item.datasetPrefix === prefix)?.isoA2;
}

function optionForDataset(datasets: DatasetOption[], next: string) {
  if (isCountryDataset(next)) {
    const prefix = next.includes("/") ? next.split("/")[0] : next;
    return (
      datasets.find((item) => item.dataset.startsWith(`${prefix}/`))?.dataset ??
      next
    );
  }
  const exact = datasets.find((item) => item.dataset === next);
  if (exact) return exact.dataset;
  const slug = next.split("/").pop() ?? next;
  return (
    datasets.find(
      (item) =>
        item.dataset === slug ||
        item.dataset.endsWith(`/${slug}`) ||
        item.dataset.endsWith(`_${slug}`),
    )?.dataset ?? next
  );
}

function asRecord(value: unknown): Record<string, unknown> | null {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asList(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function text(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") {
    return String(value);
  }
  return "";
}

function display(value: unknown): string | null {
  const next = text(value);
  return next && next !== "null" ? next : null;
}

function uniqueText(values: unknown[]): string[] {
  const seen = new Set<string>();
  const rows: string[] = [];
  for (const value of values) {
    const next = display(value);
    if (!next || seen.has(next)) continue;
    seen.add(next);
    rows.push(next);
  }
  return rows;
}

function namedForms(value: unknown): string[] {
  return uniqueText(
    asList(value).map((item) => {
      if (typeof item === "string") return item;
      const row = asRecord(item);
      return row
        ? display(row.form) || display(row.headword) || display(row.term)
        : null;
    }),
  );
}

function errorMessage(data: unknown, fallback: string) {
  const row = asRecord(data);
  if (!row) return fallback;
  return (
    display(row.message) ||
    display(row.error) ||
    fallback
  );
}

function matchLabel(match: string | undefined) {
  if (!match) return null;
  return MATCH_LABEL[match] ?? match.replace(/-/g, " ");
}

function senseLabel(index: number, total: number) {
  if (total <= 1) return "Lexical entry";
  return `Sense ${index + 1} of ${total}`;
}

function audioSrc(item: Record<string, unknown>, dataset: string) {
  const direct = display(item.url);
  if (direct) return direct;
  const file = text(item.file).replace(/\\/g, "/");
  const name = file.split("/").pop();
  if (!name || !dataset) return null;
  return `${API_ORIGIN}/v1/${dataset}/audio/${encodeURIComponent(name)}`;
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-border bg-surface-alt px-2.5 py-1 text-sm text-muted tracking-[-0.01em]">
      {children}
    </span>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="border-t border-border pt-4 mt-4 first:mt-0 first:border-t-0 first:pt-0">
      <p className="text-muted text-xs uppercase tracking-[0.08em]">{label}</p>
      <div className="mt-1.5 text-white text-base leading-relaxed tracking-[-0.01em]">
        {children}
      </div>
    </div>
  );
}

function EntryCard({
  entry,
  dataset,
  index,
  total,
}: {
  entry: Record<string, unknown>;
  dataset: string;
  index: number;
  total: number;
}) {
  const headword = display(entry.headword) ?? "Untitled headword";
  const pronunciation = display(entry.pronunciation);
  const ipa = display(entry.ipa);
  const phonetic =
    pronunciation && ipa && pronunciation === ipa
      ? pronunciation
      : [pronunciation, ipa].filter(Boolean).join(" · ") || null;
  const partOfSpeech = display(entry.part_of_speech);
  const partOfSpeechLabel = display(entry.part_of_speech_label);
  const languageName = display(entry.language_name);
  const aliases = uniqueText(asList(entry.language_aliases));
  const portuguese =
    display(entry.translation_pt) || display(entry.definition_pt);
  const english = display(entry.translation_en) || display(entry.definition_en);
  const example = display(entry.example);
  const examplePt = display(entry.example_translation_pt);
  const exampleEn = display(entry.example_translation_en);
  const grammar = display(entry.grammatical_information);
  const culture = display(entry.cultural_context);
  const etymology = display(entry.etymology);
  const variants = namedForms(entry.variants);
  const synonyms = namedForms(entry.synonyms);
  const relatedTerms = namedForms(entry.related_terms);
  const source = display(entry.source);
  const sourceTitle = display(entry.source_title);
  const sourceType = display(entry.source_type);
  const sourcePage = display(entry.source_page);
  const sourceUrl = display(entry.source_url);
  const sourceText = display(entry.source_text);
  const verification = display(entry.verification_status);
  const confidence = display(entry.confidence);
  const graph = asRecord(entry.graph);
  const related = asList(graph?.related_to)
    .map((item) => asRecord(item))
    .filter((item): item is Record<string, unknown> => Boolean(item));
  const appearsIn = asList(graph?.appears_in)
    .map((item) => asRecord(item))
    .filter((item): item is Record<string, unknown> => Boolean(item));
  const audio = asList(entry.audio)
    .map((item) => asRecord(item))
    .filter((item): item is Record<string, unknown> => Boolean(item))
    .map((item) => ({
      ...item,
      src: audioSrc(item, dataset),
      caption:
        display(item.primary_text) ||
        display(item.kind) ||
        "Recording",
      translation: display(item.translation_pt) || display(item.translation_en),
    }))
    .filter((item) => item.src);

  const extraKeys = Object.keys(entry).filter((key) => {
    if (key in EXTRA_LABEL) return Boolean(display(entry[key]));
    return false;
  });

  return (
    <article className="rounded-2xl border border-border bg-surface px-4 py-5 sm:px-6 sm:py-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-muted text-sm tracking-[-0.01em]">
            {senseLabel(index, total)}
          </p>
          <h2 className="mt-1 font-heading text-white tracking-[-0.03em] leading-[1.1] text-[2rem] sm:text-[2.5rem]">
            {headword}
          </h2>
          {phonetic ? (
            <p className="mt-1 text-muted text-base tracking-[-0.01em]">
              [{phonetic}]
            </p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          {partOfSpeech ? <Chip>{partOfSpeech}</Chip> : null}
          {partOfSpeechLabel && partOfSpeechLabel !== partOfSpeech ? (
            <Chip>{partOfSpeechLabel}</Chip>
          ) : null}
          {verification ? <Chip>{verification}</Chip> : null}
          {confidence ? <Chip>{confidence} confidence</Chip> : null}
        </div>
      </div>

      {languageName || aliases.length ? (
        <p className="mt-3 text-muted text-sm tracking-[-0.01em]">
          {[languageName, aliases.join(" / ")].filter(Boolean).join(" · ")}
        </p>
      ) : null}

      {portuguese ? (
        <Row label="Portuguese">
          <p>{portuguese}</p>
        </Row>
      ) : null}

      {english ? (
        <Row label="English">
          <p>{english}</p>
        </Row>
      ) : null}

      {example || examplePt || exampleEn ? (
        <Row label="Example">
          {example ? <p className="italic">{example}</p> : null}
          {examplePt ? (
            <p className={example ? "mt-1 text-muted" : undefined}>{examplePt}</p>
          ) : null}
          {exampleEn ? (
            <p className={example || examplePt ? "mt-1 text-muted" : undefined}>
              {exampleEn}
            </p>
          ) : null}
        </Row>
      ) : null}

      {grammar ? (
        <Row label="Grammar">
          <p>{grammar}</p>
        </Row>
      ) : null}

      {culture ? (
        <Row label="Cultural context">
          <p>{culture}</p>
        </Row>
      ) : null}

      {etymology ? (
        <Row label="Etymology">
          <p>{etymology}</p>
        </Row>
      ) : null}

      {variants.length ? (
        <Row label="Variants">
          <p>{variants.join(" · ")}</p>
        </Row>
      ) : null}

      {synonyms.length ? (
        <Row label="Synonyms">
          <p>{synonyms.join(" · ")}</p>
        </Row>
      ) : null}

      {relatedTerms.length ? (
        <Row label="Related terms">
          <p>{relatedTerms.join(" · ")}</p>
        </Row>
      ) : null}

      {appearsIn.length ? (
        <Row label="Appears in">
          <ul className="space-y-2">
            {appearsIn.map((item, itemIndex) => (
              <li key={`${display(item.id) ?? itemIndex}`}>
                <p>
                  {display(item.title) ||
                    display(item.headword) ||
                    display(item.kind) ||
                    "Documented occurrence"}
                </p>
                {display(item.kind) ? (
                  <p className="mt-0.5 text-muted text-sm">{display(item.kind)}</p>
                ) : null}
              </li>
            ))}
          </ul>
        </Row>
      ) : null}

      {related.some(
        (item) =>
          display(item.title) ||
          display(item.headword) ||
          display(item.text) ||
          display(item.kind),
      ) ? (
        <Row label="Related">
          <ul className="space-y-2">
            {related.map((item, itemIndex) => {
              const title =
                display(item.title) ||
                display(item.headword) ||
                display(item.text) ||
                display(item.kind);
              if (!title) return null;
              return (
                <li key={`${display(item.id) ?? itemIndex}`}>
                  <p>{title}</p>
                  {display(item.kind) && display(item.kind) !== title ? (
                    <p className="mt-0.5 text-muted text-sm">{display(item.kind)}</p>
                  ) : null}
                </li>
              );
            })}
          </ul>
        </Row>
      ) : null}

      {audio.length ? (
        <Row label="Recordings">
          <ul className="space-y-3">
            {audio.map((item, itemIndex) => (
              <li
                key={`${item.src}-${itemIndex}`}
                className="rounded-xl border border-border bg-surface-alt px-3 py-3"
              >
                <p>{item.caption}</p>
                {item.translation ? (
                  <p className="mt-1 text-muted text-sm leading-relaxed">
                    {item.translation}
                  </p>
                ) : null}
                <audio
                  className="mt-3 w-full"
                  controls
                  preload="none"
                  src={item.src ?? undefined}
                >
                  Your browser does not play this recording.
                </audio>
              </li>
            ))}
          </ul>
        </Row>
      ) : null}

      {extraKeys.map((key) => (
        <Row key={key} label={EXTRA_LABEL[key]}>
          <p>{display(entry[key])}</p>
        </Row>
      ))}

      {source || sourceTitle ? (
        <Row label="Source">
          <p>{source || sourceTitle}</p>
          {sourceTitle && source && sourceTitle !== source ? (
            <p className="mt-1 text-muted text-sm">{sourceTitle}</p>
          ) : null}
          {sourceType || sourcePage ? (
            <p className="mt-1 text-muted text-sm">
              {[sourceType, sourcePage ? `p. ${sourcePage}` : null]
                .filter(Boolean)
                .join(" · ")}
            </p>
          ) : null}
          {sourceText && sourceText !== portuguese && sourceText !== english ? (
            <p className="mt-1 text-muted text-sm">{sourceText}</p>
          ) : null}
          {sourceUrl ? (
            <a
              href={sourceUrl}
              className="mt-2 inline-block text-sm text-white underline decoration-white/30 underline-offset-4 hover:decoration-white"
              target="_blank"
              rel="noopener noreferrer"
            >
              Open source
            </a>
          ) : null}
        </Row>
      ) : null}
    </article>
  );
}

function LookupResults({
  result,
  datasets,
}: {
  result: LookupResult;
  datasets: DatasetOption[];
}) {
  const dataset = display(result.dataset) ?? "";
  const datasetLabel =
    datasets.find((item) => item.dataset === dataset)?.label || dataset;
  const entries = asList(result.entries)
    .map((item) => asRecord(item))
    .filter((item): item is Record<string, unknown> => Boolean(item));
  const queried = display(result.query?.headword);
  const language = display(result.language_name) || display(result.language);
  const match = matchLabel(display(result.match) ?? undefined);
  const count = typeof result.count === "number" ? result.count : entries.length;

  return (
    <div className="mt-10 max-w-[720px]" aria-live="polite">
      <div className="rounded-2xl border border-border bg-surface px-4 py-4 sm:px-6">
        <p className="text-white text-base tracking-[-0.01em]">
          {queried ? `Results for “${queried}”` : "Lookup results"}
        </p>
        <p className="mt-1 text-muted text-sm tracking-[-0.01em] leading-relaxed">
          {[
            datasetLabel,
            language,
            count
              ? `${count} ${count === 1 ? "sense" : "senses"}`
              : null,
            match,
          ]
            .filter(Boolean)
            .join(" · ")}
        </p>
      </div>

      <div className="mt-4 space-y-4">
        {entries.map((entry, index) => (
          <EntryCard
            key={display(entry.id) || `${dataset}-${index}`}
            entry={entry}
            dataset={dataset}
            index={index}
            total={entries.length}
          />
        ))}
      </div>
    </div>
  );
}

export function DictionarySearch({
  datasets,
  children,
}: {
  datasets: DatasetOption[];
  children?: ReactNode;
}) {
  const [dataset, setDataset] = useState(datasets[0]?.dataset ?? "");
  const [headword, setHeadword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [result, setResult] = useState<LookupResult | null>(null);
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!dataset || !headword.trim()) return;

    setStatus("loading");
    setError("");
    setResult(null);

    try {
      const response = await fetch(
        `/api/lookup?dataset=${encodeURIComponent(dataset)}&headword=${encodeURIComponent(headword.trim())}`,
      );
      const data: unknown = await response.json();
      if (!response.ok) {
        setError(
          errorMessage(
            data,
            "No entry matched that headword in this isolated lexicon.",
          ),
        );
        setStatus("done");
        return;
      }
      const payload = asRecord(data);
      if (!payload) {
        setError("The dictionary could not complete that lookup.");
        setStatus("done");
        return;
      }
      setResult(payload as LookupResult);
      setStatus("done");
    } catch {
      setError("The dictionary could not complete that lookup.");
      setStatus("done");
    }
  }

  const countryIso = countryIsoForDataset(dataset);

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,36rem)] lg:gap-x-12 lg:gap-y-8">
      {countryIso ? (
        <div
          className={
            children
              ? "lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:sticky lg:top-28"
              : "lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:sticky lg:top-28"
          }
        >
          <AfricaMap
            focusCountryId={countryIso}
            focusDataset={dataset}
            onFocusDataset={(next) => setDataset(optionForDataset(datasets, next))}
          />
        </div>
      ) : null}

      {children ? (
        <div className="lg:col-start-1 lg:row-start-1">{children}</div>
      ) : null}

      <form
        onSubmit={onSubmit}
        className={
          countryIso
            ? children
              ? "lg:col-start-1 lg:row-start-2"
              : "lg:col-start-1 lg:row-start-1"
            : undefined
        }
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:flex-wrap lg:items-center">
          <select
            value={dataset}
            onChange={(event) => setDataset(event.target.value)}
            aria-label="Isolated lexicon"
            className="field w-full lg:max-w-[280px]"
          >
            {datasets.map((item) => (
              <option key={item.dataset} value={item.dataset}>
                {item.label}
              </option>
            ))}
          </select>
          <input
            type="search"
            value={headword}
            onChange={(event) => setHeadword(event.target.value)}
            placeholder="Look up a headword"
            required
            className="field w-full min-w-0 lg:w-[280px]"
          />
          <Button type="submit" disabled={status === "loading"}>
            {status === "loading" ? "Looking up…" : "Look up"}
          </Button>
        </div>
      </form>

      {error || result ? (
        <div
          className={
            countryIso
              ? children
                ? "lg:col-start-1 lg:row-start-3"
                : "lg:col-start-1 lg:row-start-2"
              : undefined
          }
        >
          {error ? (
            <p className="text-muted text-base tracking-[-0.01em]">{error}</p>
          ) : null}

          {result ? <LookupResults result={result} datasets={datasets} /> : null}
        </div>
      ) : null}
    </div>
  );
}
