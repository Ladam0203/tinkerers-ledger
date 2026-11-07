import { CATEGORIES, MARK_SOURCES, QUESTS, type Quest } from "@/data/quests";

export const SITE_NAME = "Tinkerer's Ledger";
export const SITE_TITLE = "Tinkerer's Ledger – RotMG Daily Quest & Mark Tracker";
export const SITE_DESCRIPTION =
  "Track your Realm of the Mad God daily quests: pick today's Tinkerer quests, count your marks, " +
  "see which dungeon drops each mark and know when a quest is ready to turn in.";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://tinkerers-ledger.vercel.app").replace(/\/$/, "");

export const slug = (s: string) =>
  s.toLowerCase().replace(/['’.]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const imgSrc = (item: string) => `/img/${slug(item)}.png`;

export const dungeonOf = (item: string): string | undefined => MARK_SOURCES[item]?.[0];
export const bossOf = (item: string): string | undefined => MARK_SOURCES[item]?.[1];

export const QUEST_BY_NAME: Record<string, Quest> = Object.fromEntries(QUESTS.map(q => [q.name, q]));
export const QUEST_BY_SLUG: Record<string, Quest> = Object.fromEntries(QUESTS.map(q => [slug(q.name), q]));

/** Every item that appears as a quest requirement, in first-seen order. */
export const ALL_ITEMS = [...new Set(QUESTS.flatMap(q => Object.keys(q.needs)))];

export interface Dungeon {
  name: string;
  slug: string;
  mark: string;
  boss: string;
  /** Quests that need this dungeon's mark, with how many of it. */
  quests: { quest: Quest; count: number }[];
}

export const DUNGEONS: Dungeon[] = Object.entries(MARK_SOURCES)
  .map(([mark, [name, boss]]) => ({
    name,
    slug: slug(name),
    mark,
    boss,
    quests: QUESTS.filter(q => q.needs[mark]).map(quest => ({ quest, count: quest.needs[mark] })),
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

export const DUNGEON_BY_SLUG: Record<string, Dungeon> = Object.fromEntries(DUNGEONS.map(d => [d.slug, d]));

export type ItemGroup = "Marks by dungeon" | "Potions" | "Eggs" | "Tarot cards" | "Other";
export const ITEM_GROUPS: ItemGroup[] = ["Marks by dungeon", "Potions", "Eggs", "Tarot cards", "Other"];

export function itemGroup(i: string): ItemGroup {
  if (i.startsWith("Mark of")) return "Marks by dungeon";
  if (i.includes("Potion")) return "Potions";
  if (i.includes("Egg")) return "Eggs";
  if (i.includes("Tarot")) return "Tarot cards";
  return "Other";
}

/** Rewards collapsed to [item, count] pairs. */
export function rewardCounts(q: Quest): [string, number][] {
  const c: Record<string, number> = {};
  for (const r of q.rewards) c[r] = (c[r] || 0) + 1;
  return Object.entries(c);
}

export { CATEGORIES, QUESTS };
export type { Quest };
