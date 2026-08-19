"use client";

import { motion } from "motion/react";
import { Container } from "@/components/ui/Container";
import { countries, languages } from "@/lib/constants";
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
