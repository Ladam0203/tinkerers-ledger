import Link from "next/link";
import Countdown from "./Countdown";

export function SiteHeader({ h1 = false }: { h1?: boolean }) {
  // Only the home page uses the site name as its <h1>; content pages have their own.
  const Title = h1 ? "h1" : "span";
  return (
    <header className="site-header">
      <Link href="/" className="brand">
        <img src="/img/quest-chest.png" alt="" width={32} height={32} />
        <Title className="brand-title" style={{ margin: 0, fontSize: 22, fontFamily: "var(--font-pixel), monospace" }}>
          Tinkerer&apos;s Ledger
        </Title>
      </Link>
      <div className="right">
        <nav className="site-nav" aria-label="Site">
          <Link href="/">Tracker</Link>
          <Link href="/dungeons">Dungeons</Link>
          <Link href="/quests">Quests</Link>
        </nav>
        <div className="reset">Reset in <Countdown /> <small>(00:00 UTC)</small></div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>
        Tinkerer&apos;s Ledger is a free fan-made tracker for Realm of the Mad God daily quests.
        Your progress is saved in your browser only.
      </p>
      <p>
        Item images and drop data via the <a href="https://www.realmeye.com/wiki" rel="noopener">RealmEye wiki</a>.
        Realm of the Mad God and its assets are © DECA Games. This site is not affiliated with or endorsed by DECA Games or RealmEye.
      </p>
    </footer>
  );
}
