import Link from "next/link";
import Tracker from "@/components/Tracker";
import { SiteFooter, SiteHeader } from "@/components/SiteChrome";
import { QUESTS, SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/ledger";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  applicationCategory: "GameApplication",
  operatingSystem: "Any",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export default function Home() {
  return (
    <>
      <SiteHeader h1 />
      <div className="intro">
        <p>
          Track your <strong>RotMG daily quests</strong> from the Tinkerer: pick today&apos;s quests, count the marks you
          already have and see which dungeon to run for the rest. All {QUESTS.length} quests are included, from Scout
          quests to Epic quests. Browse marks <Link href="/dungeons">by dungeon</Link> or see{" "}
          <Link href="/quests">every quest&apos;s requirements</Link>.
        </p>
      </div>
      <main>
        <Tracker />
      </main>
      <SiteFooter />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
