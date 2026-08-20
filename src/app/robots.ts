import type { MetadataRoute } from "next";
import { APP_ORIGIN } from "@/lib/catalog";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/waitlist", "/api/lookup"],
    },
    sitemap: `${APP_ORIGIN}/sitemap.xml`,
  };
}
