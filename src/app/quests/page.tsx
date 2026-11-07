import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { CATEGORIES, QUESTS, imgSrc, slug } from "@/lib/ledger";

export const metadata: Metadata = {
  title: "All RotMG Daily Quests",
  description:
    "Every Realm of the Mad God Tinkerer daily quest: Scout, Beginner, Standard, Mighty, Epic and Craft quests with required marks and rewards.",
  alternates: { canonical: "/quests" },
};

export default function QuestsIndex() {
  return (
    <>
      <SiteHeader />
      <main className="page">
        <div className="crumbs"><Link href="/">Tracker</Link> / Quests</div>
        <h1>All daily quests</h1>
        <p className="lead">All {QUESTS.length} Tinkerer daily quests with the items they need and what they reward.</p>
        {CATEGORIES.map(cat => (
          <section key={cat}>
            <h2>{cat} quests</h2>
            <ul className="link-grid">
              {QUESTS.filter(q => q.category === cat).map(q => {
                const items = Object.entries(q.needs);
                return (
                  <li key={q.name}>
                    <Link href={`/quests/${slug(q.name)}`}>
                      <img src={imgSrc(items[0][0])} alt="" width={32} height={32} />
                      <span>
                        {q.name}
                        <small>{items.map(([i, n]) => `${n}× ${i}`).join(", ")}</small>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </main>
      <SiteFooter />
    </>
  );
}
