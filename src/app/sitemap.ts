import type { MetadataRoute } from "next";
import { APP_ORIGIN } from "@/lib/catalog";
import { countries, languages } from "@/lib/constants";

const staticPaths = [
  "/",
  "/overview",
  "/app",
  "/app/credits",
  "/connect",
  "/connect/income",
  "/languages",
  "/dictionaries",
  "/research",
  "/docs",
  "/docs/open-knowledge",
  "/docs/app",
  "/docs/connect",
  "/docs/quickstart",
  "/docs/methodology",
  "/docs/api-reference",
  "/api",
  "/about",
  "/legal",
  "/translation",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const languagePaths = [
    ...countries.map((country) => `/languages/${country.id}`),
    ...languages.map((language) => language.href),
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${APP_ORIGIN}${path === "/" ? "" : path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: path === "/" || path === "/app" ? 1 : 0.7,
    })),
    ...languagePaths.map((path) => ({
      url: `${APP_ORIGIN}${path}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: path === "/languages/forro" ? 0.9 : 0.6,
    })),
  ];
}
