"use client";

import {
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import type { FeatureCollection, Geometry } from "geojson";
import africaGeojson from "@/data/africa-countries.json";
import {
  africaMap,
  countries,
  languages,
  languageForDataset,
  lexiconLocations,
  lexiconMapRegions,
} from "@/lib/constants";
import {
  buildFocusLayout,
  buildMapLayout,
  parseCountrySvgLayout,
  type FeatureIdResolver,
  type MapLayout,
  type PathData,
} from "@/lib/map-path";

const africa = africaGeojson as FeatureCollection<Geometry>;

const resolver: FeatureIdResolver = {
  id: (properties) => {
    const value = properties?.id;
    return typeof value === "string" && value.length > 0 ? value : null;
  },
  name: (properties, id) => String(properties?.name ?? id),
};

const knowledgeHrefs: Record<string, string> = {
  ST: "/languages/saotome",
  CV: "/languages/caboverde",
  GW: "/languages/guinebissau",
  AO: "/languages/angola",
};

const fillNorth = "#ffffff";
const fillSouth = "#e6e6e6";
const fillSelected = "#174729";
const fillIdle = "#c8c8c8";
const stroke = "#141414";
const strokeHover = "#818181";
const strokeSelected = "#ffffff";

function countryFill(subregion: string, lifted: boolean) {
  if (lifted) return "#ffffff";
  return subregion === "Northern Africa" ? fillNorth : fillSouth;
}

function regionFill(
  subregion: string,
  state: { selected: boolean; hovered: boolean; hasSelection: boolean },
) {
  if (state.selected) return fillSelected;
  if (state.hovered) return "#ffffff";
  if (state.hasSelection) return fillIdle;
  return countryFill(subregion, false);
}

function distanceSq(
  a: { lon: number; lat: number },
  b: { lon: number; lat: number },
) {
  const dx = a.lon - b.lon;
  const dy = a.lat - b.lat;
  return dx * dx + dy * dy;
}

function foldName(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function nameMatchScore(regionName: string, languageTitle: string) {
  const region = foldName(regionName);
  const title = foldName(languageTitle);
  if (!region || !title) return 0;
  if (region === title) return 3;
  if (region.includes(title) || title.includes(region)) return 2;
  return 0;
}

function datasetForPath(
  countryId: string,
  path: PathData,
  useSvgNames: boolean,
) {
  const mapped = lexiconMapRegions[path.id];
  if (mapped) return mapped;

  const country = countries.find((item) => item.isoA2 === countryId);
  if (!country) return null;
  const candidates = languages.filter((item) => item.country === country.id);
  if (candidates.length === 0) return null;
  if (candidates.length === 1) return candidates[0].dataset;

  if (useSvgNames) {
    let best = candidates[0];
    let bestScore = 0;
    for (const language of candidates) {
      const score = Math.max(
        nameMatchScore(path.name, language.title),
        nameMatchScore(path.name, language.aliases),
      );
      if (score > bestScore) {
        best = language;
        bestScore = score;
      }
    }
    return bestScore > 0 ? best.dataset : null;
  }

  let best = candidates[0];
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const language of candidates) {
    const location = lexiconLocations[language.dataset];
    if (!location) continue;
    const next = distanceSq(
      { lon: path.lngLat[0], lat: path.lngLat[1] },
      location,
    );
    if (next < bestDistance) {
      best = language;
      bestDistance = next;
    }
  }
  return best.dataset;
}

function countryMeta(id: string) {
  const catalog = countries.find((item) => item.isoA2 === id);
  const feature = africa.features.find(
    (item) => resolver.id(item.properties) === id,
  );
  const subregion =
    typeof feature?.properties?.subregion === "string"
      ? feature.properties.subregion
      : "";
  return {
    title: catalog?.title ?? String(feature?.properties?.name ?? id),
    subregion,
  };
}

function pathMatchesDataset(
  countryId: string,
  path: PathData,
  dataset: string | undefined,
  useSvgNames: boolean,
) {
  if (!dataset) return false;
  return datasetForPath(countryId, path, useSvgNames) === dataset;
}

export function AfricaMap({
  focusCountryId,
  focusDataset,
  onFocusDataset,
}: {
  focusCountryId?: string;
  focusDataset?: string;
  onFocusDataset?: (dataset: string) => void;
} = {}) {
  const lockedFocus = Boolean(focusCountryId);
  const [openedCountryId, setOpenedCountryId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [svgLayout, setSvgLayout] = useState<MapLayout | null>(null);
  const [svgState, setSvgState] = useState<"idle" | "loading" | "ready" | "missing">(
    "idle",
  );
  // d3-geo path strings can differ slightly between Node SSR and the browser;
  // render paths only after mount to avoid hydration attribute mismatches.
  const [mapReady, setMapReady] = useState(false);
  const countryId = focusCountryId ?? openedCountryId;
  const focused = Boolean(countryId);
  const canLeave = Boolean(openedCountryId) && !lockedFocus;

  useEffect(() => {
    setMapReady(true);
  }, []);

  useEffect(() => {
    if (!countryId) {
      setSvgLayout(null);
      setSvgState("idle");
      return;
    }

    const iso = countryId.toLowerCase();
    const subregion = countryMeta(countryId).subregion;
    let cancelled = false;
    setSvgState("loading");
    setSvgLayout(null);

    fetch(`/images/maps/africa/${iso}.svg`)
      .then((response) => {
        if (!response.ok) throw new Error("missing country svg");
        return response.text();
      })
      .then((text) => {
        if (cancelled) return;
        const parsed = parseCountrySvgLayout(text, subregion);
        setSvgLayout(parsed);
        setSvgState(parsed ? "ready" : "missing");
      })
      .catch(() => {
        if (cancelled) return;
        setSvgLayout(null);
        setSvgState("missing");
      });

    return () => {
      cancelled = true;
    };
  }, [countryId]);

  const geoLayout = useMemo(
    () =>
      focused && countryId
        ? buildFocusLayout(africa, resolver, countryId, 720, 560, 28)
        : buildMapLayout(africa, resolver, 1200, 1280, 24),
    [focused, countryId],
  );
  const layout = focused && svgLayout ? svgLayout : geoLayout;
  const usingSvg = Boolean(focused && svgLayout);

  const focusLocation = focusDataset
    ? lexiconLocations[focusDataset]
    : undefined;
  const selectedPathIds = useMemo(() => {
    if (!focused || !countryId || !focusDataset) return new Set<string>();
    return new Set(
      layout.paths
        .filter((path) =>
          pathMatchesDataset(countryId, path, focusDataset, usingSvg),
        )
        .map((path) => path.id),
    );
  }, [focused, countryId, focusDataset, layout.paths, usingSvg]);
  const selectedPathId = focused
    ? ([...selectedPathIds][0] ?? selectedId)
    : selectedId;
  const hasLexiconSelection = focused
    ? selectedPathIds.size > 0
    : Boolean(selectedId);
  const activeId = hoveredId ?? selectedPathId;

  const ordered = useMemo(() => {
    return [...layout.paths].sort((a, b) => {
      const rank = (path: PathData) => {
        if (selectedPathIds.has(path.id)) return 4;
        if (path.id === hoveredId) return 3;
        if (path.id === activeId) return 2;
        if (path.markers.length > 0 || knowledgeHrefs[path.id]) return 1;
        return 0;
      };
      return rank(a) - rank(b);
    });
  }, [layout.paths, activeId, hoveredId, selectedPathIds]);

  function closeCountry() {
    setOpenedCountryId(null);
    setSelectedId(null);
    setHoveredId(null);
    setSvgLayout(null);
    setSvgState("idle");
  }

  function selectRegion(id: string) {
    if (!focused) {
      setOpenedCountryId(id);
      setSelectedId(null);
      setHoveredId(null);
      return;
    }
    if (countryId && onFocusDataset) {
      const path = layout.paths.find((item) => item.id === id);
      if (!path) return;
      const dataset = datasetForPath(countryId, path, usingSvg);
      if (dataset) onFocusDataset(dataset);
      setSelectedId(id);
      return;
    }
    setSelectedId(id);
  }

  if (lockedFocus && svgState === "loading") {
    return (
      <div
        className="relative w-full max-w-[36rem] aspect-square"
        aria-hidden="true"
      />
    );
  }

  if (layout.paths.length === 0) {
    return null;
  }

  const active = layout.paths.find((path) => path.id === activeId);
  const marker = usingSvg
    ? null
    : focusLocation
      ? layout.project(focusLocation.lon, focusLocation.lat)
      : null;
  const language = languageForDataset(focusDataset ?? "");
  const hoveredDataset =
    hoveredId && countryId && active
      ? datasetForPath(countryId, active, usingSvg)
      : null;
  const hoveredLanguage = hoveredDataset
    ? languageForDataset(hoveredDataset)
    : undefined;
  const meta = countryId ? countryMeta(countryId) : null;
  const lexiconHref = countryId ? knowledgeHrefs[countryId] : undefined;
  const namibia = layout.paths.find((path) => path.id === "NA");
  const cardLanguage = hoveredId ? hoveredLanguage : language;
  const cardCountryName = countries.find(
    (item) => item.id === cardLanguage?.country,
  )?.title;
  const cardTitle = focused
    ? (cardLanguage?.title ?? meta?.title ?? active?.name)
    : active?.name;
  const cardRegion = focused
    ? (cardCountryName ?? meta?.title)
    : active?.subregion;

  const countryCard = active || (focused && cardTitle) ? (
    <div className="w-max max-w-full rounded-xl border border-border bg-[#141414]/90 px-3 py-2.5">
      <p className="whitespace-nowrap text-white text-sm tracking-[-0.01em]">
        {cardTitle}
      </p>
      {cardRegion ? (
        <p className="mt-0.5 whitespace-nowrap text-muted text-xs tracking-[-0.01em]">
          {cardRegion}
        </p>
      ) : null}
      {!focused && active ? (
        <p className="mt-2 whitespace-nowrap text-xs tracking-[-0.01em] text-white/70">
          Open country map
        </p>
      ) : lexiconHref && canLeave ? (
        <a
          href={lexiconHref}
          className="mt-2 inline-block whitespace-nowrap text-xs tracking-[-0.01em] text-white/70 hover:text-white transition-colors"
        >
          Open lexicon
        </a>
      ) : null}
    </div>
  ) : null;

  return (
    <div
      className={
        lockedFocus
          ? "relative w-full max-w-[36rem]"
          : "relative w-full max-w-[72rem] mx-auto"
      }
    >
      {canLeave ? (
        <div className="relative mb-5 z-20 w-full sm:w-[min(22rem,78%)]">
          <button
            type="button"
            onClick={closeCountry}
            className="text-muted hover:text-white transition-colors text-sm sm:text-base tracking-[-0.01em]"
          >
            Africa
          </button>
          <h2
            className="mt-2 font-heading text-white tracking-[-0.03em] leading-[1.08]"
            style={{ fontSize: "clamp(1.35rem, 4.5vw, 2.35rem)" }}
          >
            {meta?.title}
          </h2>
        </div>
      ) : null}
      <div className="relative">
        {!focused ? (
          <div className="relative mb-5 sm:mb-0 sm:pointer-events-none sm:absolute sm:left-0 sm:bottom-[16%] z-20 w-full sm:w-[min(22rem,78%)] sm:pr-3 lg:bottom-[18%] lg:w-[min(28rem,34%)]">
            <h2
              className="font-heading text-white tracking-[-0.03em] leading-[1.08]"
              style={{ fontSize: "clamp(1.35rem, 4.5vw, 2.35rem)" }}
            >
              {africaMap.title}
            </h2>
            <p className="mt-2 text-muted text-xs sm:text-sm lg:text-base leading-[1.45] tracking-[-0.01em]">
              {africaMap.subtitle}
            </p>
            {countryCard ? (
              <div className="pointer-events-none absolute left-0 top-full mt-4 hidden sm:block">
                {countryCard}
              </div>
            ) : null}
          </div>
        ) : null}
        <svg
          viewBox={
            mapReady
              ? usingSvg
                ? `-6 -4 ${layout.width + 22} ${layout.height + 28}`
                : `0 0 ${layout.width} ${layout.height}`
              : focused
                ? "0 0 720 560"
                : "0 0 1200 1280"
          }
          role="img"
          aria-label={
            focused
              ? `${language?.title ?? meta?.title ?? "Country"} map`
              : "Interactive map of Africa"
          }
          shapeRendering="geometricPrecision"
          className="block w-full h-auto overflow-visible touch-manipulation"
          style={{
            filter:
              "drop-shadow(4px 8px 0 rgba(0,0,0,0.55)) drop-shadow(8px 18px 22px rgba(0,0,0,0.4))",
          }}
        >
          {mapReady ? (
            <>
          <g transform="translate(4 10)" pointerEvents="none" aria-hidden="true">
            {layout.paths.map((pathData) => (
              <path
                key={`${pathData.id}-slab`}
                d={pathData.d}
                fill="#0c0c0c"
                stroke="#0c0c0c"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
            ))}
          </g>
          {ordered.map((pathData) => {
            const selected = focused
              ? selectedPathIds.has(pathData.id)
              : pathData.id === selectedId;
            const hovered = pathData.id === hoveredId;
            const lifted =
              selected ||
              hovered ||
              (!focused &&
                (selectedId === pathData.id || hoveredId === pathData.id));
            const knowledge = Boolean(knowledgeHrefs[pathData.id]);

            function onKeyDown(event: KeyboardEvent<SVGGElement>) {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectRegion(pathData.id);
              }
            }

            function onPointerDown(event: PointerEvent<SVGGElement>) {
              if (event.button !== 0) return;
              selectRegion(pathData.id);
            }

            return (
              <g
                key={pathData.id}
                className={`cursor-pointer touch-manipulation outline-none transition-transform duration-300 ease-out ${
                  lifted ? "-translate-y-1" : ""
                }`}
                role="button"
                tabIndex={0}
                aria-label={pathData.name}
                aria-pressed={selected}
                onPointerDown={onPointerDown}
                onKeyDown={onKeyDown}
                onPointerEnter={(event) => {
                  if (event.pointerType !== "touch") setHoveredId(pathData.id);
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType !== "touch") setHoveredId(null);
                }}
              >
                <path
                  d={pathData.d}
                  fill={
                    focused
                      ? regionFill(pathData.subregion, {
                          selected,
                          hovered,
                          hasSelection: hasLexiconSelection,
                        })
                      : countryFill(pathData.subregion, lifted)
                  }
                  stroke={
                    selected ? strokeSelected : lifted ? strokeHover : stroke
                  }
                  strokeWidth={selected || knowledge || lifted ? 1.8 : 1.2}
                  strokeLinejoin="round"
                  vectorEffect="non-scaling-stroke"
                />
                {!focused
                  ? pathData.markers.map(([x, y], index) => (
                      <circle
                        key={`${pathData.id}-marker-${index}`}
                        cx={x}
                        cy={y}
                        r={lifted ? 3.6 : 2.8}
                        fill={countryFill(pathData.subregion, lifted)}
                        stroke={lifted ? strokeHover : stroke}
                        strokeWidth={0.9}
                      />
                    ))
                  : null}
              </g>
            );
          })}
          {focused && marker ? (
            <circle
              cx={marker[0]}
              cy={marker[1]}
              r="6"
              fill="#141414"
              stroke="#ffffff"
              strokeWidth="2"
            />
          ) : null}
            </>
          ) : null}
        </svg>
        {mapReady && !focused
          ? layout.paths
              .filter((pathData) => pathData.markers.length > 0)
              .map((pathData) => (
                <button
                  key={`${pathData.id}-hit`}
                  type="button"
                  aria-label={pathData.name}
                  className="absolute z-10 h-11 w-11 -translate-x-1/2 -translate-y-1/2 rounded-full lg:h-8 lg:w-8"
                  style={{
                    left: `${(pathData.centroid[0] / layout.width) * 100}%`,
                    top: `${(pathData.centroid[1] / layout.height) * 100}%`,
                  }}
                  onClick={() => selectRegion(pathData.id)}
                />
              ))
          : null}
        {mapReady && !focused && countryCard ? (
          <div
            className="absolute left-0 top-[var(--card-y,64%)] z-20 -translate-y-1/2 sm:hidden"
            style={
              namibia
                ? ({
                    "--card-y": `${(namibia.centroid[1] / layout.height) * 100}%`,
                  } as CSSProperties)
                : undefined
            }
          >
            {countryCard}
          </div>
        ) : null}
        {focused && countryCard ? (
          <div className="mt-4">
            {countryCard}
          </div>
        ) : null}
      </div>
    </div>
  );
}
