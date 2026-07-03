import type { MetadataRoute } from "next";
import { fetchInventory } from "@/services/inventoryService";

const siteUrl = "https://cars-sr99-website.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const inventory = await fetchInventory();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${siteUrl}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/kapcsolat`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/autobeszamitas`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = inventory.map((car) => ({
    url: `${siteUrl}/kinalat/${car.id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
