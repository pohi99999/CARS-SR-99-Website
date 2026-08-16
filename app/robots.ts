import type { MetadataRoute } from "next";

import { siteUrl } from "@/utils/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: siteUrl,
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
