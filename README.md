# Tinkerer's Ledger

RotMG daily quest & mark tracker. Next.js (App Router) + TypeScript, fully static.

- `src/data/quests.ts` – all quests and the mark → dungeon/boss table (edit here to add/fix quests)
- `src/components/Tracker.tsx` – the tracker UI (state is saved in the browser's localStorage)
- `src/app/dungeons/[slug]`, `src/app/quests/[slug]` – static SEO pages generated from the data
- `public/img` – item sprites from the RealmEye wiki (file name = slugified item name)

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # production build
```

Set `NEXT_PUBLIC_SITE_URL` (e.g. `https://tinkerersledger.com`) in Vercel so canonical URLs and the sitemap use your domain.

Images and drop data via the RealmEye wiki. Realm of the Mad God © DECA Games; not affiliated.
