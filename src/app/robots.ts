import type { MetadataRoute } from "next";
import { APP_ORIGIN } from "@/lib/catalog";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/waitlist",
        "/api/lookup",
        "/api/v1",
        "/api/keys",
        "/api/auth",
      ],
    },
    sitemap: `${APP_ORIGIN}/sitemap.xml`,
  };
}
