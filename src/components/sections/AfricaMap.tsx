"use client";

import { useMemo, useState, type CSSProperties, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import type { FeatureCollection, Geometry } from "geojson";
import africaGeojson from "@/data/africa-countries.json";
import {
  africaMap,
  countries,
  languages,
  lexiconLocations,
} from "@/lib/constants";
import {
  buildFocusLayout,
  buildMapLayout,
  type FeatureIdResolver,
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
const stroke = "#141414";
const strokeHover = "#818181";

function countryFill(subregion: string, lifted: boolean) {
  if (lifted) return "#ffffff";
  return subregion === "Northern Africa" ? fillNorth : fillSouth;
}

function distanceSq(
  a: { lon: number; lat: number },
  b: { lon: number; lat: number },
) {
  const dx = a.lon - b.lon;
  const dy = a.lat - b.lat;
  return dx * dx + dy * dy;
}

function nearestPathId(
  paths: PathData[],
  location?: { lat: number; lon: number },
) {
  if (!location || paths.length === 0) return paths[0]?.id ?? null;
  let best = paths[0];
  let bestDistance = Number.POSITIVE_INFINITY;
  for (const path of paths) {
    const next = distanceSq(
      { lon: path.lngLat[0], lat: path.lngLat[1] },
      location,
    );
    if (next < bestDistance) {
      best = path;
      bestDistance = next;
    }
  }
  return best.id;
}

function datasetForPath(countryId: string, path: PathData) {
  const country = countries.find((item) => item.isoA2 === countryId);
  if (!country) return null;
  const candidates = languages.filter((item) => item.country === country.id);
  if (candidates.length === 0) return null;

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

export function AfricaMap({
  focusCountryId,
  focusDataset,
  onFocusDataset,
}: {
  focusCountryId?: string;
  focusDataset?: string;
  onFocusDataset?: (dataset: string) => void;
} = {}) {
  const router = useRouter();
  const focused = Boolean(focusCountryId);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const layout = useMemo(
    () =>
      focused && focusCountryId
        ? buildFocusLayout(africa, resolver, focusCountryId, 720, 560, 28)
        : buildMapLayout(africa, resolver, 1200, 1280, 24),
    [focused, focusCountryId],
  );

  const focusLocation = focusDataset
    ? lexiconLocations[focusDataset]
    : undefined;
  const focusPathId = focused
    ? nearestPathId(layout.paths, focusLocation)
    : null;
  const activeId = focused ? (hoveredId ?? focusPathId) : (hoveredId ?? selectedId);

  const ordered = useMemo(() => {
    return [...layout.paths].sort((a, b) => {
      const rank = (path: PathData) => {
        if (path.id === activeId) return 3;
        if (path.id === hoveredId) return 2;
        if (path.markers.length > 0 || knowledgeHrefs[path.id]) return 1;
        return 0;
      };
      return rank(a) - rank(b);
    });
  }, [layout.paths, activeId, hoveredId]);

  function selectRegion(id: string) {
    if (focused && focusCountryId && onFocusDataset) {
      const path = layout.paths.find((item) => item.id === id);
      if (!path) return;
      const dataset = datasetForPath(focusCountryId, path);
      if (dataset) onFocusDataset(dataset);
      return;
    }
    setSelectedId(id);
    const href = knowledgeHrefs[id];
    if (href) router.push(href);
  }

  if (layout.paths.length === 0) {
    return null;
  }

  const active =
    layout.paths.find((path) => path.id === hoveredId) ??
    layout.paths.find((path) => path.id === (focused ? focusPathId : selectedId));
  const marker = focusLocation ? layout.project(focusLocation.lon, focusLocation.lat) : null;
  const language = languages.find((item) => item.dataset === focusDataset);
  const country = countries.find((item) => item.isoA2 === focusCountryId);
  const namibia = layout.paths.find((path) => path.id === "NA");

  const countryCard = active ? (
    <div className="max-w-[min(15rem,calc(100%-0.75rem))] rounded-xl border border-border bg-[#141414]/90 px-3 py-2.5">
      <p className="text-white text-sm tracking-[-0.01em]">
        {focused ? (language?.title ?? active.name) : active.name}
      </p>
      {focused ? (
        <p className="mt-0.5 text-muted text-xs tracking-[-0.01em]">
          {language?.group ?? country?.title}
        </p>
      ) : active.subregion ? (
        <p className="mt-0.5 text-muted text-xs tracking-[-0.01em]">
          {active.subregion}
        </p>
      ) : null}
      {!focused ? (
        <p className="mt-2 text-xs tracking-[-0.01em] text-white/70">
          {knowledgeHrefs[active.id]
            ? "Open lexicon"
            : "Lexicon not published yet"}
        </p>
      ) : null}
    </div>
  ) : null;

  return (
    <div
      className={
        focused
          ? "relative w-full max-w-[36rem]"
          : "relative w-full max-w-[72rem] mx-auto"
      }
    >
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
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          role="img"
          aria-label={
            focused
              ? `${language?.title ?? country?.title ?? "Country"} map`
              : "Interactive map of Africa"
          }
          shapeRendering="geometricPrecision"
          className="block w-full h-auto touch-manipulation"
          style={{
            filter:
              "drop-shadow(4px 8px 0 rgba(0,0,0,0.55)) drop-shadow(8px 18px 22px rgba(0,0,0,0.4))",
          }}
        >
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
            const lifted =
              pathData.id === activeId ||
              (!focused &&
                (selectedId === pathData.id || hoveredId === pathData.id));
            const knowledge = Boolean(knowledgeHrefs[pathData.id]);

            function onKeyDown(event: KeyboardEvent<SVGGElement>) {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                selectRegion(pathData.id);
              }
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
                aria-pressed={pathData.id === (focused ? focusPathId : selectedId)}
                onClick={() => selectRegion(pathData.id)}
                onKeyDown={onKeyDown}
                onPointerEnter={(event) => {
                  if (event.pointerType !== "touch") setHoveredId(pathData.id);
                }}
                onPointerLeave={(event) => {
                  if (event.pointerType !== "touch") setHoveredId(null);
                }}
                onFocus={() => setHoveredId(pathData.id)}
                onBlur={() => setHoveredId(null)}
              >
                <path
                  d={pathData.d}
                  fill={countryFill(pathData.subregion, lifted)}
                  stroke={lifted ? strokeHover : stroke}
                  strokeWidth={knowledge || lifted ? 1.6 : 1.2}
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
        </svg>
        {!focused
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
        {!focused && countryCard ? (
          <div
            className="absolute left-0 top-[var(--card-y,64%)] z-20 -translate-y-1/2 sm:hidden"
            style={
              namibia
                ? ({
                    "--card-y": `${(namibia.centroid[1] / layout.height) * 100}%`,
                  } satisfies CSSProperties)
                : undefined
            }
          >
            {countryCard}
          </div>
        ) : null}
        {focused && countryCard ? (
          <div className="absolute left-0 top-2 z-20 sm:left-auto sm:right-0 sm:top-4">
            {countryCard}
          </div>
        ) : null}
      </div>
    </div>
  );
}
