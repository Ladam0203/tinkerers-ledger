import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { DUNGEONS, DUNGEON_BY_SLUG, imgSrc, slug } from "@/lib/ledger";

export const dynamicParams = false;
export const generateStaticParams = () => DUNGEONS.map(d => ({ slug: d.slug }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = DUNGEON_BY_SLUG[(await params).slug];
  if (!d) return {};
  const names = d.quests.map(q => q.quest.name).join(", ");
  return {
    title: `${d.name} – ${d.mark} & Daily Quests`,
    description: `${d.boss} in the ${d.name} drops the ${d.mark}. Used in ${d.quests.length} RotMG daily quest${d.quests.length === 1 ? "" : "s"}: ${names}.`,
    alternates: { canonical: `/dungeons/${d.slug}` },
  };
}

export default async function DungeonPage({ params }: Props) {
  const d = DUNGEON_BY_SLUG[(await params).slug];
  if (!d) notFound();
  const total = d.quests.reduce((s, q) => s + q.count, 0);

  return (
    <>
      <SiteHeader />
      <main className="page">
        <div className="crumbs"><Link href="/">Tracker</Link> / <Link href="/dungeons">Dungeons</Link> / {d.name}</div>
        <div className="mark-head">
          <div className="slot"><img src={imgSrc(d.mark)} alt={d.mark} width={48} height={48} /></div>
          <div>
            <h1>{d.name}</h1>
            <p className="lead" style={{ margin: 0 }}>Drops the {d.mark}</p>
          </div>
        </div>

        <h2>Mark details</h2>
        <dl className="facts">
          <dt>Mark</dt><dd>{d.mark}</dd>
          <dt>Boss</dt><dd>{d.boss}</dd>
          <dt>Dungeon</dt><dd>{d.name}</dd>
          <dt>Used in</dt><dd>{d.quests.length} daily quest{d.quests.length === 1 ? "" : "s"} ({total} marks to do them all once)</dd>
        </dl>

        <h2>Daily quests that need the {d.mark}</h2>
        <ul className="link-grid">
          {d.quests.map(({ quest, count }) => (
            <li key={quest.name}>
              <Link href={`/quests/${slug(quest.name)}`}>
                <img src={imgSrc(d.mark)} alt="" width={32} height={32} />
                <span>
                  {quest.name}
                  <small>
                    {count}× this mark
                    {Object.keys(quest.needs).length > 1 && ` + ${Object.keys(quest.needs).length - 1} other mark type(s)`}
                    {" · "}{quest.category}
                  </small>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <Link href="/" className="cta">Track your dailies →</Link>
      </main>
      <SiteFooter />
    </>
  );
}
