import type { MetadataRoute } from "next";
import { profile } from "@/data/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: profile.siteUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${profile.siteUrl}/mentions-legales`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
