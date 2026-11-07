import type { MetadataRoute } from "next";
import { DUNGEONS, QUESTS, SITE_URL, slug } from "@/lib/ledger";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (p: string) => `${SITE_URL}${p}`;
  return [
    { url: url("/"), changeFrequency: "weekly", priority: 1 },
    { url: url("/dungeons"), changeFrequency: "monthly", priority: 0.8 },
    { url: url("/quests"), changeFrequency: "monthly", priority: 0.8 },
    ...DUNGEONS.map(d => ({ url: url(`/dungeons/${d.slug}`), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...QUESTS.map(q => ({ url: url(`/quests/${slug(q.name)}`), changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
