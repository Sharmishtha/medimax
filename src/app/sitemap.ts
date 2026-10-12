import type { MetadataRoute } from "next";
import { HOSPITAL, SPECIALTIES } from "@/lib/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${HOSPITAL.url}/`, changeFrequency: "monthly", priority: 1 },
    ...SPECIALTIES.map((s) => ({
      url: `${HOSPITAL.url}/specialties/${s.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
