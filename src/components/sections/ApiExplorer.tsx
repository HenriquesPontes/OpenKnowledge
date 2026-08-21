"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { BrowserMockup } from "@/components/sections/BrowserMockup";
import { useLocale } from "@/components/locale/LocaleProvider";
import { API_ORIGIN } from "@/lib/catalog";

type DatasetOption = {
  dataset: string;
  label: string;
};

type Operation = "identity" | "languages" | "datasets" | "lookup" | "search";

const OPERATIONS: Array<{ id: Operation; label: string }> = [
  { id: "identity", label: "GET /v1" },
  { id: "languages", label: "GET /v1/languages" },
  { id: "datasets", label: "GET /v1/datasets" },
  { id: "lookup", label: "GET /v1/{dataset}/lookup" },
  { id: "search", label: "GET /v1/search" },
];

function publicPath(
  operation: Operation,
  dataset: string,
  headword: string,
  query: string,
) {
  switch (operation) {
    case "identity":
      return "/v1";
    case "languages":
      return "/v1/languages";
    case "datasets":
      return "/v1/datasets";
    case "lookup":
      return `/v1/${dataset}/lookup?headword=${encodeURIComponent(headword)}`;
    case "search":
      return `/v1/search?dataset=${encodeURIComponent(dataset)}&q=${encodeURIComponent(query)}`;
  }
}

function proxyPath(
  operation: Operation,
  dataset: string,
  headword: string,
  query: string,
) {
  switch (operation) {
    case "identity":
      return "/api/v1";
    case "languages":
      return "/api/v1/languages";
    case "datasets":
      return "/api/v1/datasets";
    case "lookup":
      return `/api/v1/${dataset}/lookup?headword=${encodeURIComponent(headword)}`;
    case "search":
      return `/api/v1/search?dataset=${encodeURIComponent(dataset)}&q=${encodeURIComponent(query)}`;
  }
}

export function ApiExplorer({ datasets }: { datasets: DatasetOption[] }) {
  const { copy } = useLocale();
  const t = copy.apiExplorer;
  const [operation, setOperation] = useState<Operation>("lookup");
  const [dataset, setDataset] = useState(datasets[0]?.dataset ?? "saotome/forro");
  const [headword, setHeadword] = useState("kume");
  const [query, setQuery] = useState("kume");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");
  const [httpStatus, setHttpStatus] = useState<number | null>(null);
  const [body, setBody] = useState<string | null>(null);

  const documented = useMemo(
    () => `${API_ORIGIN}${publicPath(operation, dataset, headword.trim(), query.trim())}`,
    [operation, dataset, headword, query],
  );

  const needsDataset = operation === "lookup" || operation === "search";
  const needsHeadword = operation === "lookup";
  const needsQuery = operation === "search";

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (needsDataset && !dataset) return;
    if (needsHeadword && !headword.trim()) return;
    if (needsQuery && !query.trim()) return;

    setStatus("loading");
    setHttpStatus(null);

    try {
      const response = await fetch(
        proxyPath(operation, dataset, headword.trim(), query.trim()),
      );
      const text = await response.text();
      setHttpStatus(response.status);
      try {
        setBody(JSON.stringify(JSON.parse(text), null, 2));
      } catch {
        setBody(text || t.emptyResponse);
      }
    } catch {
      setHttpStatus(502);
      setBody(t.failed);
    }
    setStatus("done");
  }

  return (
    <div id="try" className="scroll-mt-28">
      <h2 className="text-white text-lg sm:text-[21px] tracking-[-0.01em]">
        {t.tryApi}
      </h2>

      <form onSubmit={onSubmit} className="mt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <select
            value={operation}
            onChange={(event) => setOperation(event.target.value as Operation)}
            aria-label={t.routeAria}
            className="field w-full max-w-full sm:max-w-[280px]"
          >
            {OPERATIONS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
          {needsDataset ? (
            <select
              value={dataset}
              onChange={(event) => setDataset(event.target.value)}
              aria-label={t.lexiconAria}
              className="field w-full max-w-full sm:max-w-[280px]"
            >
              {datasets.map((item) => (
                <option key={item.dataset} value={item.dataset}>
                  {item.label}
                </option>
              ))}
            </select>
          ) : null}
          {needsHeadword ? (
            <input
              type="search"
              value={headword}
              onChange={(event) => setHeadword(event.target.value)}
              placeholder={t.headword}
              required
              className="field min-w-0 w-full sm:w-[200px]"
            />
          ) : null}
          {needsQuery ? (
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={t.searchQuery}
              required
              className="field min-w-0 w-full sm:w-[200px]"
            />
          ) : null}
          <Button type="submit" disabled={status === "loading"} className="shrink-0">
            {status === "loading" ? t.running : t.run}
          </Button>
        </div>
      </form>

      {httpStatus ? (
        <p className="mt-4 text-muted text-sm tracking-[-0.01em]">
          HTTP {httpStatus}
        </p>
      ) : null}

      <div className="mt-6">
        <BrowserMockup command={`curl "${documented}"`} body={body ?? t.emptyBody} />
      </div>
    </div>
  );
}
