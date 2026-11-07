import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { DUNGEONS, imgSrc } from "@/lib/ledger";

export const metadata: Metadata = {
  title: "RotMG Marks by Dungeon",
  description:
    "Every Realm of the Mad God quest mark, which dungeon and boss drops it, and which Tinkerer daily quests need it.",
  alternates: { canonical: "/dungeons" },
};

export default function DungeonsIndex() {
  return (
    <>
      <SiteHeader />
      <main className="page">
        <div className="crumbs"><Link href="/">Tracker</Link> / Dungeons</div>
        <h1>Marks by dungeon</h1>
        <p className="lead">
          Each dungeon boss drops a mark used for the Tinkerer&apos;s daily quests. Pick a dungeon to see its mark
          and every quest that needs it.
        </p>
        <ul className="link-grid">
          {DUNGEONS.map(d => (
            <li key={d.slug}>
              <Link href={`/dungeons/${d.slug}`}>
                <img src={imgSrc(d.mark)} alt="" width={32} height={32} />
                <span>
                  {d.name}
                  <small>{d.mark} · {d.quests.length} quest{d.quests.length === 1 ? "" : "s"}</small>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </>
  );
}
