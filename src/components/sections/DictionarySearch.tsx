"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/Button";
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

function countryIsoForDataset(dataset: string) {
  const language = languages.find((item) => item.dataset === dataset);
  if (language) {
    return countries.find((item) => item.id === language.country)?.isoA2;
  }
  const prefix = dataset.includes("/") ? dataset.split("/")[0] : dataset;
  return countries.find((item) => item.datasetPrefix === prefix)?.isoA2;
}

function ResultFields({ value }: { value: unknown }) {
  if (value === null || value === undefined) {
    return <span className="text-muted">Empty</span>;
  }

  if (typeof value === "string" || typeof value === "number" || typeof value === "boolean") {
    return <span className="text-white">{String(value)}</span>;
  }

  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="text-muted">Empty</span>;
    return (
      <ul className="mt-1 space-y-1">
        {value.map((item, index) => (
          <li key={index}>
            <ResultFields value={item} />
          </li>
        ))}
      </ul>
    );
  }

  if (typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>);
    if (entries.length === 0) return <span className="text-muted">Empty</span>;
    return (
      <dl className="mt-2 space-y-3">
        {entries.map(([key, nested]) => (
          <div key={key}>
            <dt className="text-muted text-sm tracking-[-0.01em]">{key}</dt>
            <dd className="mt-1 text-base tracking-[-0.01em]">
              <ResultFields value={nested} />
            </dd>
          </div>
        ))}
      </dl>
    );
  }

  return null;
}

export function DictionarySearch({ datasets }: { datasets: DatasetOption[] }) {
  const [dataset, setDataset] = useState(datasets[0]?.dataset ?? "");
  const [headword, setHeadword] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [result, setResult] = useState<unknown>(null);
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
      const data = await response.json();
      if (!response.ok) {
        setError(
          typeof data.error === "string"
            ? data.error
            : "No entry matched that headword in this isolated lexicon.",
        );
        setStatus("done");
        return;
      }
      setResult(data);
      setStatus("done");
    } catch {
      setError("The dictionary could not complete that lookup.");
      setStatus("done");
    }
  }

  const countryIso = countryIsoForDataset(dataset);

  return (
    <div>
      <form onSubmit={onSubmit} className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <select
            value={dataset}
            onChange={(event) => setDataset(event.target.value)}
            aria-label="Isolated lexicon"
            className="field w-full max-w-full sm:max-w-[280px]"
          >
            {datasets.map((item) => (
              <option key={item.dataset} value={item.dataset}>
                {item.label}
              </option>
            ))}
          </select>
          <div className="flex w-full items-center gap-3 sm:w-auto">
            <input
              type="search"
              value={headword}
              onChange={(event) => setHeadword(event.target.value)}
              placeholder="Look up a headword"
              required
              className="field min-w-0 flex-1 sm:w-[280px] sm:flex-none"
            />
            <Button
              type="submit"
              disabled={status === "loading"}
              className="shrink-0 px-5 sm:px-8"
            >
              {status === "loading" ? "Looking up…" : "Look up"}
            </Button>
          </div>
        </div>
      </form>

      {countryIso ? (
        <div className="mt-10">
          <AfricaMap
            focusCountryId={countryIso}
            focusDataset={dataset}
            onFocusDataset={setDataset}
          />
        </div>
      ) : null}

      {error ? (
        <p className="mt-8 text-muted text-base tracking-[-0.01em]">{error}</p>
      ) : null}

      {result ? (
        <div className="mt-10 max-w-[720px] rounded-2xl border border-border bg-surface px-4 py-5 sm:px-6 sm:py-6 overflow-x-auto">
          <ResultFields value={result} />
        </div>
      ) : null}
    </div>
  );
}
