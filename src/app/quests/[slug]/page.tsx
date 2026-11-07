import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { QUESTS, QUEST_BY_SLUG, bossOf, dungeonOf, imgSrc, rewardCounts, slug } from "@/lib/ledger";

export const dynamicParams = false;
export const generateStaticParams = () => QUESTS.map(q => ({ slug: slug(q.name) }));

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const q = QUEST_BY_SLUG[(await params).slug];
  if (!q) return {};
  const needs = Object.entries(q.needs).map(([i, n]) => `${n}× ${i}`).join(", ");
  return {
    title: `${q.name} – RotMG ${q.category} Daily Quest`,
    description: `${q.name} (${q.category} quest) needs ${needs}. Reward: ${q.rewards.join(", ")}.`,
    alternates: { canonical: `/quests/${slug(q.name)}` },
  };
}

export default async function QuestPage({ params }: Props) {
  const q = QUEST_BY_SLUG[(await params).slug];
  if (!q) notFound();
  const items = Object.entries(q.needs);

  return (
    <>
      <SiteHeader />
      <main className="page">
        <div className="crumbs"><Link href="/">Tracker</Link> / <Link href="/quests">Quests</Link> / {q.name}</div>
        <h1>{q.name}</h1>
        <p className="lead">{q.category} daily quest from the Tinkerer.</p>

        <div className="card">
          <h2 style={{ margin: 0 }}>Items needed</h2>
          <div className="slots">
            {items.flatMap(([i, n]) =>
              Array.from({ length: n }, (_, k) => (
                <div className="slot" key={`${i}-${k}`} title={i}>
                  <img src={imgSrc(i)} alt={i} width={40} height={40} />
                </div>
              )),
            )}
          </div>
          <ul className="req-list">
            {items.map(([i, n]) => {
              const d = dungeonOf(i);
              return (
                <li key={i}>
                  <img src={imgSrc(i)} alt="" width={32} height={32} />
                  <span className="count">{n}×</span>
                  <span>
                    {i}
                    {d && (
                      <> – <Link href={`/dungeons/${slug(d)}`}>{d}</Link> <span className="muted">({bossOf(i)})</span></>
                    )}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="card">
          <h2 style={{ margin: 0 }}>Rewards</h2>
          <ul className="req-list">
            {rewardCounts(q).map(([r, c]) => (
              <li key={r}>
                <img src={imgSrc(r)} alt="" width={32} height={32} />
                <span className="count">{c}×</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>

        <Link href="/" className="cta">Track this quest →</Link>
      </main>
      <SiteFooter />
    </>
  );
}
