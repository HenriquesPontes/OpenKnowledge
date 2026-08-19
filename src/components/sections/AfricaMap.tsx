"use client";

import { useMemo, useState, type KeyboardEvent } from "react";
import { useRouter } from "next/navigation";
import type { FeatureCollection, Geometry } from "geojson";
import africaGeojson from "@/data/africa-countries.json";
import { africaMap } from "@/lib/constants";
import { buildMapLayout, type FeatureIdResolver } from "@/lib/map-path";

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

export function AfricaMap() {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const layout = useMemo(
    () => buildMapLayout(africa, resolver, 1200, 1280, 24),
    [],
  );

  const ordered = useMemo(() => {
    return [...layout.paths].sort((a, b) => {
      const rank = (path: (typeof layout.paths)[number]) => {
        if (path.id === selectedId) return 3;
        if (path.id === hoveredId) return 2;
        if (path.markers.length > 0 || knowledgeHrefs[path.id]) return 1;
        return 0;
      };
      return rank(a) - rank(b);
    });
  }, [layout.paths, selectedId, hoveredId]);

  function selectRegion(id: string) {
    setSelectedId(id);
    const href = knowledgeHrefs[id];
    if (href) router.push(href);
  }

  if (layout.paths.length === 0) {
    return null;
  }

  const active =
    layout.paths.find((path) => path.id === hoveredId) ??
    layout.paths.find((path) => path.id === selectedId);

  return (
    <div className="relative w-full max-w-[72rem] mx-auto">
      <div className="relative">
        <svg
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          role="img"
          aria-label="Interactive map of Africa"
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
          const lifted = selectedId === pathData.id || hoveredId === pathData.id;
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
              aria-pressed={selectedId === pathData.id}
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
              {pathData.markers.map(([x, y], index) => (
                <circle
                  key={`${pathData.id}-marker-${index}`}
                  cx={x}
                  cy={y}
                  r={lifted ? 3.6 : 2.8}
                  fill={countryFill(pathData.subregion, lifted)}
                  stroke={lifted ? strokeHover : stroke}
                  strokeWidth={0.9}
                />
              ))}
            </g>
          );
        })}
        </svg>
        {layout.paths
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
          ))}
        {active ? (
          <div className="absolute right-0 top-2 z-20 max-w-[15rem] rounded-xl border border-border bg-[#141414]/90 px-3 py-2.5 sm:top-4">
            <p className="text-white text-sm tracking-[-0.01em]">{active.name}</p>
            {active.subregion ? (
              <p className="mt-0.5 text-muted text-xs tracking-[-0.01em]">
                {active.subregion}
              </p>
            ) : null}
            <p className="mt-2 text-xs tracking-[-0.01em] text-white/70">
              {knowledgeHrefs[active.id]
                ? "Open lexicon"
                : "Lexicon not published yet"}
            </p>
          </div>
        ) : null}
        <div className="pointer-events-none absolute left-0 bottom-[12%] z-20 w-[min(22rem,78%)] pr-3 sm:bottom-[16%] sm:w-[min(26rem,42%)] lg:bottom-[18%] lg:w-[min(28rem,34%)]">
          <h2
            className="font-heading text-white tracking-[-0.03em] leading-[1.08]"
            style={{ fontSize: "clamp(1.35rem, 4.5vw, 2.35rem)" }}
          >
            {africaMap.title}
          </h2>
          <p className="mt-2 text-muted text-xs sm:text-sm lg:text-base leading-[1.45] tracking-[-0.01em]">
            {africaMap.subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}
