"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { countries, languages, principle } from "@/lib/constants";
import {
  countryEntryTotal,
  recordForDataset,
  type LanguageRecord,
} from "@/lib/catalog";

function Card({
  href,
  delay,
  title,
  subtitle,
  meta,
}: {
  href: string;
  delay: number;
  title: string;
  subtitle: string;
  meta?: string;
}) {
  return (
    <motion.a
      href={href}
      className="block rounded-xl border border-border bg-surface px-5 py-6 transition-[border-color,background-color] duration-150 hover:border-white/12 hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/25"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, ease: "easeOut", delay: delay * 0.4 }}
    >
      <h3 className="text-white text-lg sm:text-[21px] font-normal tracking-[-0.01em]">
        {title}
      </h3>
      <p className="mt-3 text-muted text-base leading-[22px] tracking-[-0.01em]">
        {subtitle}
      </p>
      {meta ? (
        <p className="mt-6 text-muted text-base tracking-[-0.01em]">{meta}</p>
      ) : null}
    </motion.a>
  );
}

export function FeatureGrid({
  catalog = [],
}: {
  catalog?: LanguageRecord[];
}) {
  return (
    <section id="countries" className="pt-2 pb-12 sm:pb-16 md:pb-20 [content-visibility:auto] [contain-intrinsic-size:auto_24rem]">
      <Container>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {countries.map((country, i) => {
            const total = countryEntryTotal(catalog, country.datasetPrefix);
            return (
              <Card
                key={country.id}
                href={country.href}
                delay={i * 0.1}
                title={`${country.number} — ${country.title}`}
                subtitle={country.aliases}
                meta={
                  total > 0
                    ? `${total.toLocaleString("en-GB")} lexical entries across isolated folders`
                    : undefined
                }
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export function VarietyGrid({
  countryId,
  catalog = [],
  query = "",
}: {
  countryId: string;
  catalog?: LanguageRecord[];
  query?: string;
}) {
  const needle = query.trim().toLowerCase();
  const country = countries.find((item) => item.id === countryId);
  const countryHit =
    !needle ||
    [country?.title, country?.aliases, country?.id].some((value) =>
      value?.toLowerCase().includes(needle),
    );

  const varieties = languages.filter((item) => {
    if (item.country !== countryId) return false;
    if (!needle || countryHit) return true;
    return [item.title, item.aliases, item.autonym, item.group, item.dataset]
      .join(" ")
      .toLowerCase()
      .includes(needle);
  });

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {varieties.map((language, i) => {
        const live = recordForDataset(catalog, language.dataset);
        const entryCount = live?.entry_count;
        return (
          <Card
            key={language.id}
            href={language.href}
            delay={i * 0.05}
            title={language.title}
            subtitle={`${language.aliases} · ${language.group}`}
            meta={
              typeof entryCount === "number"
                ? `${entryCount.toLocaleString("en-GB")} lexical entries`
                : undefined
            }
          />
        );
      })}
    </div>
  );
}

const REGION_COLOR: Record<string, string> = {
  saotome: "#f9a8d4",
  caboverde: "#7dd3fc",
  guinebissau: "#bef264",
  angola: "#fbbf24",
};

type ResearchRow = {
  id: string;
  title: string;
  dataset: string;
  href: string;
  group: string;
  countryId: string;
  countryTitle: string;
  entries: number | null;
  knowledge: Record<string, number>;
};

function formatCount(value: number) {
  return value.toLocaleString("en-GB");
}

function researchRows(catalog: LanguageRecord[]): ResearchRow[] {
  return languages.map((language) => {
    const country = countries.find((item) => item.id === language.country);
    const live = recordForDataset(catalog, language.dataset);
    return {
      id: language.id,
      title: language.title,
      dataset: language.dataset,
      href: language.href,
      group: language.group,
      countryId: language.country,
      countryTitle: country?.title ?? language.country,
      entries: typeof live?.entry_count === "number" ? live.entry_count : null,
      knowledge: live?.knowledge ?? {},
    };
  });
}

function flowPath(x1: number, y1: number, x2: number, y2: number) {
  const mid = (y1 + y2) / 2;
  return `M ${x1} ${y1} C ${x1} ${mid}, ${x2} ${mid}, ${x2} ${y2}`;
}

function LexiconFlow({
  rows,
  focusCountry,
  hoverId,
  onFocusCountry,
  onHover,
}: {
  rows: ResearchRow[];
  focusCountry: string | null;
  hoverId: string | null;
  onFocusCountry: (id: string | null) => void;
  onHover: (id: string | null) => void;
}) {
  const ranked = rows
    .filter((row) => typeof row.entries === "number")
    .sort((a, b) => (b.entries ?? 0) - (a.entries ?? 0));

  const countryNodes = countries.map((country, index) => {
    const total = ranked
      .filter((row) => row.countryId === country.id)
      .reduce((sum, row) => sum + (row.entries ?? 0), 0);
    return {
      id: country.id,
      title: country.title,
      iso: country.isoA2,
      color: REGION_COLOR[country.id] ?? "#ffffff",
      total,
      x: 90 + index * 175,
      y: 398,
    };
  });

  if (ranked.length === 0) {
    return null;
  }

  const max = Math.max(...ranked.map((row) => row.entries ?? 0), 1);
  const plotLeft = 28;
  const plotRight = 752;
  const plotTop = 22;
  const plotBottom = 248;
  const slot = (plotRight - plotLeft) / ranked.length;

  const bars = ranked.map((row, index) => {
    const height = ((row.entries ?? 0) / max) * (plotBottom - plotTop);
    const x = plotLeft + index * slot + slot * 0.18;
    const width = Math.max(slot * 0.64, 2);
    return {
      ...row,
      x,
      width,
      y: plotBottom - height,
      height,
      cx: x + width / 2,
    };
  });

  const ticks = 5;
  const active = bars.find((row) => row.id === hoverId);

  return (
    <div className="relative">
      <svg
        viewBox="0 0 780 460"
        className="block w-full h-auto"
        role="img"
        aria-label="Published lexical entries by isolated lexicon, flowing into country nodes"
      >
        {Array.from({ length: ticks }, (_, i) => {
          const value = Math.round((max * (ticks - 1 - i)) / (ticks - 1));
          const y = plotTop + ((plotBottom - plotTop) * i) / (ticks - 1);
          return (
            <g key={value}>
              <line
                x1={plotLeft}
                x2={plotRight}
                y1={y}
                y2={y}
                stroke="#2a2a2a"
                strokeWidth="1"
              />
              <text
                x={plotLeft - 8}
                y={y + 3}
                textAnchor="end"
                fill="#818181"
                fontSize="10"
              >
                {formatCount(value)}
              </text>
            </g>
          );
        })}
        {bars.map((bar) => {
          const country = countryNodes.find((node) => node.id === bar.countryId);
          const dim =
            (focusCountry && bar.countryId !== focusCountry) ||
            (hoverId && hoverId !== bar.id && hoverId !== bar.countryId);
          return (
            <path
              key={`${bar.id}-flow`}
              d={flowPath(bar.cx, plotBottom + 4, country?.x ?? bar.cx, 360)}
              fill="none"
              stroke={bar.countryId ? REGION_COLOR[bar.countryId] : "#ffffff"}
              strokeWidth={hoverId === bar.id || hoverId === bar.countryId ? 2.4 : 1.2}
              strokeOpacity={dim ? 0.08 : hoverId === bar.id ? 0.95 : 0.38}
              className="pointer-events-none"
            />
          );
        })}
        {bars.map((bar) => {
          const dim =
            (focusCountry && bar.countryId !== focusCountry) ||
            (hoverId && hoverId !== bar.id && hoverId !== bar.countryId);
          return (
            <rect
              key={bar.id}
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              fill={REGION_COLOR[bar.countryId] ?? "#ffffff"}
              opacity={dim ? 0.16 : 1}
              className="cursor-pointer"
              role="presentation"
              onPointerEnter={() => onHover(bar.id)}
              onPointerLeave={() => onHover(null)}
              onClick={() => onFocusCountry(focusCountry === bar.countryId ? null : bar.countryId)}
            />
          );
        })}
        {countryNodes.map((node) => {
          const dim = focusCountry && focusCountry !== node.id;
          const activeNode = hoverId === node.id || focusCountry === node.id;
          return (
            <g
              key={node.id}
              className="cursor-pointer"
              onPointerEnter={() => onHover(node.id)}
              onPointerLeave={() => onHover(null)}
              onClick={() => onFocusCountry(focusCountry === node.id ? null : node.id)}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={activeNode ? 44 : 40}
                fill={node.color}
                opacity={dim ? 0.22 : 1}
              />
              <text
                x={node.x}
                y={node.y - 4}
                textAnchor="middle"
                fill="#141414"
                fontSize="11"
                fontWeight="600"
              >
                {node.iso}
              </text>
              <text
                x={node.x}
                y={node.y + 10}
                textAnchor="middle"
                fill="#141414"
                fontSize="11"
              >
                {formatCount(node.total)}
              </text>
            </g>
          );
        })}
      </svg>
      {active ? (
        <div className="pointer-events-none absolute left-3 top-3 rounded-xl border border-border bg-[#141414]/92 px-3 py-2.5">
          <p className="text-white text-sm tracking-[-0.01em]">{active.title}</p>
          <p className="mt-0.5 text-muted text-xs tracking-[-0.01em]">
            {active.countryTitle} · {active.group}
          </p>
          <p className="mt-1 text-white text-xs tracking-[-0.01em]">
            {formatCount(active.entries ?? 0)} lexical entries
          </p>
        </div>
      ) : null}
    </div>
  );
}

type NetNode = {
  id: string;
  kind: "country" | "language" | "field";
  label: string;
  countryId: string;
  href?: string;
  entries: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  fx?: number;
  fy?: number;
};

function IsolationNetwork({
  rows,
  focusCountry,
  hoverId,
  onFocusCountry,
  onHover,
}: {
  rows: ResearchRow[];
  focusCountry: string | null;
  hoverId: string | null;
  onFocusCountry: (id: string | null) => void;
  onHover: (id: string | null) => void;
}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const movedRef = useRef(false);
  const [nodes, setNodes] = useState<NetNode[]>([]);
  const [dragId, setDragId] = useState<string | null>(null);
  const width = 960;
  const height = 620;

  const knowledgeKeys = useMemo(() => {
    const keys = new Set<string>();
    for (const row of rows) {
      for (const [key, value] of Object.entries(row.knowledge)) {
        if (value > 0) keys.add(key);
      }
    }
    return [...keys];
  }, [rows]);

  const edges = useMemo(() => {
    const next: Array<{ source: string; target: string; weight: number }> = [];
    for (const row of rows) {
      next.push({ source: row.id, target: `country:${row.countryId}`, weight: 1 });
      for (const [key, value] of Object.entries(row.knowledge)) {
        if (value > 0) next.push({ source: row.id, target: `field:${key}`, weight: 0.45 });
      }
    }
    const byCountry = new Map<string, ResearchRow[]>();
    for (const row of rows) {
      const list = byCountry.get(row.countryId) ?? [];
      list.push(row);
      byCountry.set(row.countryId, list);
    }
    for (const list of byCountry.values()) {
      for (let i = 0; i < list.length; i += 1) {
        for (let j = i + 1; j < list.length; j += 1) {
          next.push({ source: list[i].id, target: list[j].id, weight: 0.18 });
        }
      }
    }
    return next;
  }, [rows]);

  useEffect(() => {
    const anchors: Record<string, { x: number; y: number }> = {
      saotome: { x: width * 0.28, y: height * 0.3 },
      caboverde: { x: width * 0.72, y: height * 0.28 },
      guinebissau: { x: width * 0.3, y: height * 0.72 },
      angola: { x: width * 0.72, y: height * 0.74 },
    };
    const seed: NetNode[] = countries.map((country) => ({
      id: `country:${country.id}`,
      kind: "country",
      label: country.title,
      countryId: country.id,
      href: country.href,
      entries: rows
        .filter((row) => row.countryId === country.id)
        .reduce((sum, row) => sum + (row.entries ?? 0), 0),
      x: anchors[country.id]?.x ?? width / 2,
      y: anchors[country.id]?.y ?? height / 2,
      vx: 0,
      vy: 0,
    }));
    rows.forEach((row, index) => {
      const anchor = anchors[row.countryId] ?? { x: width / 2, y: height / 2 };
      const angle = (index / Math.max(rows.length, 1)) * Math.PI * 2;
      seed.push({
        id: row.id,
        kind: "language",
        label: row.title,
        countryId: row.countryId,
        href: row.href,
        entries: row.entries ?? 1,
        x: anchor.x + Math.cos(angle) * 70,
        y: anchor.y + Math.sin(angle) * 70,
        vx: 0,
        vy: 0,
      });
    });
    knowledgeKeys.forEach((key, index) => {
      const angle = (index / Math.max(knowledgeKeys.length, 1)) * Math.PI * 2;
      seed.push({
        id: `field:${key}`,
        kind: "field",
        label: key.replaceAll("_", " "),
        countryId: "",
        entries: 1,
        x: width / 2 + Math.cos(angle) * 40,
        y: height / 2 + Math.sin(angle) * 40,
        vx: 0,
        vy: 0,
      });
    });

    const byId = () => new Map(seed.map((node) => [node.id, node]));
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ticks = reduced ? 40 : 220;
    for (let step = 0; step < ticks; step += 1) {
      const map = byId();
      for (let i = 0; i < seed.length; i += 1) {
        for (let j = i + 1; j < seed.length; j += 1) {
          const a = seed[i];
          const b = seed[j];
          let dx = b.x - a.x;
          let dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 0.15;
          const force = 1400 / (dist * dist);
          dx = (dx / dist) * force;
          dy = (dy / dist) * force;
          a.vx -= dx;
          a.vy -= dy;
          b.vx += dx;
          b.vy += dy;
        }
      }
      for (const edge of edges) {
        const a = map.get(edge.source);
        const b = map.get(edge.target);
        if (!a || !b) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        a.vx += dx * 0.012 * edge.weight;
        a.vy += dy * 0.012 * edge.weight;
        b.vx -= dx * 0.012 * edge.weight;
        b.vy -= dy * 0.012 * edge.weight;
      }
      for (const node of seed) {
        if (node.kind === "country") {
          const anchor = anchors[node.countryId];
          if (anchor) {
            node.vx += (anchor.x - node.x) * 0.06;
            node.vy += (anchor.y - node.y) * 0.06;
          }
        } else if (node.kind === "language") {
          const hub = map.get(`country:${node.countryId}`);
          if (hub) {
            node.vx += (hub.x - node.x) * 0.018;
            node.vy += (hub.y - node.y) * 0.018;
          }
        } else {
          node.vx += (width / 2 - node.x) * 0.01;
          node.vy += (height / 2 - node.y) * 0.01;
        }
        node.vx *= 0.72;
        node.vy *= 0.72;
        node.x = Math.min(width - 36, Math.max(36, node.x + node.vx));
        node.y = Math.min(height - 28, Math.max(28, node.y + node.vy));
      }
    }
    setNodes(seed.map((node) => ({ ...node })));
  }, [rows, edges, knowledgeKeys, width, height]);

  function pointerSvg(event: React.PointerEvent) {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    return {
      x: ((event.clientX - rect.left) / rect.width) * width,
      y: ((event.clientY - rect.top) / rect.height) * height,
    };
  }

  function onPointerMove(event: React.PointerEvent<SVGSVGElement>) {
    if (!dragId) return;
    movedRef.current = true;
    const point = pointerSvg(event);
    if (!point) return;
    setNodes((current) =>
      current.map((node) =>
        node.id === dragId ? { ...node, x: point.x, y: point.y } : node,
      ),
    );
  }

  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const linked = new Set<string>();
  if (hoverId) {
    const countryHover = countries.some((country) => country.id === hoverId);
    if (countryHover) {
      linked.add(`country:${hoverId}`);
      for (const node of nodes) {
        if (node.countryId === hoverId) linked.add(node.id);
      }
    } else {
      linked.add(hoverId);
      for (const edge of edges) {
        if (edge.source === hoverId) linked.add(edge.target);
        if (edge.target === hoverId) linked.add(edge.source);
      }
    }
  }

  const maxEntries = Math.max(...rows.map((row) => row.entries ?? 1), 1);

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      className="block w-full h-auto touch-manipulation"
      role="img"
      aria-label="Isolation network of countries, lexicons, and knowledge fields"
      onPointerMove={onPointerMove}
      onPointerUp={() => setDragId(null)}
      onPointerLeave={() => {
        setDragId(null);
        onHover(null);
      }}
    >
      {edges.map((edge) => {
        const a = nodeById.get(edge.source);
        const b = nodeById.get(edge.target);
        if (!a || !b) return null;
        const color =
          REGION_COLOR[a.countryId || b.countryId] ?? "#8a8a8a";
        const active = !hoverId || (linked.has(edge.source) && linked.has(edge.target));
        const dimCountry =
          focusCountry &&
          a.countryId !== focusCountry &&
          b.countryId !== focusCountry &&
          a.kind !== "field" &&
          b.kind !== "field";
        return (
          <path
            key={`${edge.source}-${edge.target}`}
            d={flowPath(a.x, a.y, b.x, b.y)}
            fill="none"
            stroke={color}
            strokeWidth={active ? 1.4 : 0.6}
            strokeOpacity={dimCountry ? 0.04 : active ? 0.55 : 0.08}
          />
        );
      })}
      {nodes.map((node) => {
        const color = REGION_COLOR[node.countryId] ?? "#d4d4d4";
        const active = !hoverId || linked.has(node.id);
        const dimCountry =
          focusCountry && node.countryId !== focusCountry && node.kind !== "field";
        const radius =
          node.kind === "country"
            ? 22
            : node.kind === "field"
              ? 10
              : 6 + (node.entries / maxEntries) * 10;
        const fontSize =
          node.kind === "country" ? 13 : node.kind === "field" ? 10 : 11 + (node.entries / maxEntries) * 5;
        return (
          <g
            key={node.id}
            className="cursor-pointer"
            opacity={dimCountry ? 0.16 : active ? 1 : 0.28}
            onPointerEnter={() => onHover(node.kind === "country" ? node.countryId : node.id)}
            onPointerDown={(event) => {
              event.currentTarget.setPointerCapture(event.pointerId);
              movedRef.current = false;
              setDragId(node.id);
            }}
            onClick={() => {
              if (movedRef.current) return;
              if (node.kind === "country") {
                onFocusCountry(focusCountry === node.countryId ? null : node.countryId);
                return;
              }
              if (node.href) window.location.assign(node.href);
            }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={radius}
              fill={node.kind === "language" ? color : "transparent"}
              stroke={color}
              strokeWidth={node.kind === "country" ? 2 : 1.2}
            />
            <text
              x={node.x}
              y={node.y + (node.kind === "country" ? 36 : radius + 12)}
              textAnchor="middle"
              fill={node.kind === "country" ? "#ffffff" : color}
              fontSize={fontSize}
              style={{ letterSpacing: "-0.02em" }}
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function ResearchStudio({
  catalog = [],
}: {
  catalog?: LanguageRecord[];
}) {
  const rows = useMemo(() => researchRows(catalog), [catalog]);
  const [focusCountry, setFocusCountry] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const published = rows.filter((row) => typeof row.entries === "number");
  const ranked = [...published].sort((a, b) => (b.entries ?? 0) - (a.entries ?? 0));
  const densest = ranked.slice(0, 5);
  const sparsest = [...ranked].reverse().slice(0, 5);
  const showFlow = published.length > 0;

  return (
    <div className="mt-16 sm:mt-20 space-y-16 sm:space-y-24">
      {showFlow ? (
        <div>
          <h2
            className="font-heading text-white tracking-[-0.03em] leading-[1.08]"
            style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
          >
            Published entries in every isolated lexicon
          </h2>
          <p className="mt-3 max-w-[40rem] text-muted text-sm sm:text-base leading-6 tracking-[-0.01em]">
            Each bar is one folder. Colour is the country index it belongs to.
            Hover a bar to read the lexicon; click a country node to isolate that cluster.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_16.5rem] lg:gap-10">
            <LexiconFlow
              rows={rows}
              focusCountry={focusCountry}
              hoverId={hoverId}
              onFocusCountry={setFocusCountry}
              onHover={setHoverId}
            />
            <div className="space-y-8">
              <div>
                <p className="text-muted text-[11px] tracking-[0.08em] uppercase mb-3">
                  Most documented
                </p>
                <ul className="space-y-2">
                  {densest.map((row) => (
                    <li key={row.id}>
                      <a
                        href={row.href}
                        onPointerEnter={() => setHoverId(row.id)}
                        onPointerLeave={() => setHoverId(null)}
                        className="flex items-baseline justify-between gap-3 text-sm tracking-[-0.01em] text-white/90 hover:text-white"
                      >
                        <span>{row.title}</span>
                        <span className="text-muted tabular-nums">
                          {formatCount(row.entries ?? 0)}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-muted text-[11px] tracking-[0.08em] uppercase mb-3">
                  Least documented
                </p>
                <ul className="space-y-2">
                  {sparsest.map((row) => (
                    <li key={row.id}>
                      <a
                        href={row.href}
                        onPointerEnter={() => setHoverId(row.id)}
                        onPointerLeave={() => setHoverId(null)}
                        className="flex items-baseline justify-between gap-3 text-sm tracking-[-0.01em] text-white/90 hover:text-white"
                      >
                        <span>{row.title}</span>
                        <span className="text-muted tabular-nums">
                          {formatCount(row.entries ?? 0)}
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-muted text-[11px] tracking-[0.08em] uppercase mb-3">
                  Entries by country
                </p>
                <ul className="space-y-2">
                  {countries.map((country) => (
                    <li key={country.id}>
                      <button
                        type="button"
                        onClick={() =>
                          setFocusCountry(focusCountry === country.id ? null : country.id)
                        }
                        onPointerEnter={() => setHoverId(country.id)}
                        onPointerLeave={() => setHoverId(null)}
                        className="flex w-full items-center gap-2.5 text-left text-sm tracking-[-0.01em] text-white/90 hover:text-white"
                      >
                        <span
                          className="h-2.5 w-2.5 rounded-full"
                          style={{ background: REGION_COLOR[country.id] }}
                        />
                        <span>{country.title}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-4 text-muted text-xs tracking-[-0.01em]">
            Source: ForroVivo Linguistic Research API · isolated lexicons only
          </p>
        </div>
      ) : null}

      <div className="border-t border-[#fbbf24]/70 pt-10 sm:pt-12">
        <h2
          className="font-heading text-white tracking-[-0.03em] leading-[1.08]"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
        >
          Isolation is the method
        </h2>
        <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-10">
          <p className="text-muted text-sm sm:text-base leading-7 tracking-[-0.01em]">
            {principle}
          </p>
          <p className="text-muted text-sm sm:text-base leading-7 tracking-[-0.01em]">
            São Tomé, Cabo Verde, Guiné-Bissau, and Angola stay separate indexes.
            Varieties inside a country still keep their own folders. Close spelling
            is not a reason to merge.
          </p>
        </div>
      </div>

      <div>
        <h2
          className="font-heading text-white tracking-[-0.03em] leading-[1.08]"
          style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
        >
          Knowledge graph of isolated communities
        </h2>
        <p className="mt-3 max-w-[40rem] text-muted text-sm sm:text-base leading-6 tracking-[-0.01em]">
          Colour is community. Label size follows published volume. Drag a node,
          hover to see neighbours, click a lexicon to open it. There are no edges
          between countries.
        </p>
        <div className="mt-8 overflow-hidden rounded-2xl bg-[#0c0c0c]">
          <IsolationNetwork
            rows={rows}
            focusCountry={focusCountry}
            hoverId={hoverId}
            onFocusCountry={setFocusCountry}
            onHover={setHoverId}
          />
        </div>
        <p className="mt-4 text-muted text-xs tracking-[-0.01em]">
          Colour marks country community. Size marks published lexical entries.
          Weights mark co-membership in the same isolated index, never a merged lexicon.
        </p>
      </div>
    </div>
  );
}
