"use client";

import { useEffect, useMemo, useState, type MouseEvent } from "react";
import {
  ALL_ITEMS, CATEGORIES, ITEM_GROUPS, QUESTS, QUEST_BY_NAME,
  bossOf, dungeonOf, imgSrc, itemGroup, rewardCounts, type ItemGroup, type Quest,
} from "@/lib/ledger";

// ---------- persisted state ----------
// Daily quests reset at 00:00 UTC: picks + completions reset with the day, inventory carries over.
interface State {
  day: string;
  picks: string[];
  done: Record<string, boolean>;
  inv: Record<string, number>;
  lastPicks: string[];
}
type View = "today" | "pick" | "inv";

const KEY = "tinkerers-ledger:v1";
const VIEW_KEY = "tinkerers-ledger:view";
const utcDay = () => new Date().toISOString().slice(0, 10);
const EMPTY: State = { day: "", picks: [], done: {}, inv: {}, lastPicks: [] };

function rollDay(s: State): State {
  const today = utcDay();
  if (s.day === today) return s;
  return { ...s, day: today, picks: [], done: {}, lastPicks: s.picks.length ? s.picks : s.lastPicks };
}

function loadState(): State {
  let raw: Partial<State> | null = null;
  try { raw = JSON.parse(localStorage.getItem(KEY) || "null"); } catch { /* storage unavailable */ }
  const s: State = { ...EMPTY, ...(raw || {}) };
  s.picks = s.picks.filter(n => QUEST_BY_NAME[n]);
  if (!s.day) s.day = utcDay();
  return rollDay(s);
}

const clamp = (v: number) => Math.max(0, Math.min(999, Math.floor(v) || 0));

// ---------- component ----------
export default function Tracker() {
  const [state, setState] = useState<State>(EMPTY);
  const [loaded, setLoaded] = useState(false);
  const [view, setViewState] = useState<View>("today");
  const [search, setSearch] = useState("");
  const [showAll, setShowAll] = useState(false);

  // Load once on the client (the server render uses the empty state).
  useEffect(() => {
    setState(loadState());
    try {
      const v = localStorage.getItem(VIEW_KEY);
      if (v === "today" || v === "pick" || v === "inv") setViewState(v);
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* ignore */ }
  }, [state, loaded]);

  // Roll the day over if the page stays open past 00:00 UTC.
  useEffect(() => {
    const t = setInterval(() => setState(s => (s.day ? rollDay(s) : s)), 15_000);
    return () => clearInterval(t);
  }, []);

  const setView = (v: View) => {
    setViewState(v);
    try { localStorage.setItem(VIEW_KEY, v); } catch { /* ignore */ }
    window.scrollTo(0, 0);
  };

  // ---------- derived ----------
  const have = (item: string) => state.inv[item] || 0;
  const isReady = (q: Quest) => Object.entries(q.needs).every(([i, n]) => have(i) >= n);
  const missingCount = (q: Quest) =>
    Object.entries(q.needs).reduce((m, [i, n]) => m + Math.max(0, n - have(i)), 0);

  /** Total needed per item across today's quests that aren't turned in yet. */
  const openNeeds = useMemo(() => {
    const need: Record<string, number> = {};
    for (const n of state.picks) {
      if (state.done[n]) continue;
      for (const [i, c] of Object.entries(QUEST_BY_NAME[n].needs)) need[i] = (need[i] || 0) + c;
    }
    return need;
  }, [state.picks, state.done]);

  // ---------- actions ----------
  const setInv = (item: string, v: number) =>
    setState(s => {
      const inv = { ...s.inv };
      const c = clamp(v);
      if (c) inv[item] = c; else delete inv[item];
      return { ...s, inv };
    });
  const addInv = (item: string, d: number) => setInv(item, have(item) + d);

  const togglePick = (name: string) =>
    setState(s => {
      if (s.picks.includes(name)) {
        const done = { ...s.done };
        delete done[name];
        return { ...s, picks: s.picks.filter(p => p !== name), done };
      }
      return { ...s, picks: [...s.picks, name] };
    });

  const turnIn = (q: Quest) => {
    if (!isReady(q)) return;
    setState(s => {
      const inv = { ...s.inv };
      for (const [i, n] of Object.entries(q.needs)) {
        inv[i] = (inv[i] || 0) - n;
        if (!inv[i]) delete inv[i];
      }
      return { ...s, inv, done: { ...s.done, [q.name]: true } };
    });
  };

  const undo = (q: Quest) =>
    setState(s => {
      const inv = { ...s.inv };
      for (const [i, n] of Object.entries(q.needs)) inv[i] = (inv[i] || 0) + n;
      const done = { ...s.done };
      delete done[q.name];
      return { ...s, inv, done };
    });

  // ---------- pieces ----------
  const openPicks = state.picks.filter(n => !state.done[n]);
  const readyCount = openPicks.filter(n => isReady(QUEST_BY_NAME[n])).length;
  const doneCount = state.picks.length - openPicks.length;
  const shortCount = Object.entries(openNeeds).reduce((s, [i, n]) => s + Math.max(0, n - have(i)), 0);

  const term = search.trim().toLowerCase();
  const matches = (q: Quest) =>
    !term ||
    q.name.toLowerCase().includes(term) ||
    Object.keys(q.needs).some(i => `${i} ${dungeonOf(i) || ""}`.toLowerCase().includes(term));

  const invItems = (showAll ? ALL_ITEMS : ALL_ITEMS.filter(i => openNeeds[i] || have(i)))
    .slice()
    .sort((a, b) => (dungeonOf(a) || a).localeCompare(dungeonOf(b) || b));
  const invGroups: Partial<Record<ItemGroup, string[]>> = {};
  for (const i of invItems) (invGroups[itemGroup(i)] ||= []).push(i);

  return (
    <div className="tracker" data-view={view}>
      <div className="col">
        {/* ---------- today ---------- */}
        <section className="view view-today" aria-labelledby="h-today">
          <div className="section-head">
            <h2 id="h-today">
              Today{" "}
              {state.picks.length > 0 && (
                <span className="muted">· {readyCount} ready · {doneCount}/{state.picks.length} done</span>
              )}
            </h2>
            <div className="actions">
              {state.lastPicks.length > 0 && state.picks.length === 0 && (
                <button onClick={() => setState(s => ({ ...s, picks: s.lastPicks.filter(n => QUEST_BY_NAME[n]) }))}>
                  Restore yesterday&apos;s picks
                </button>
              )}
              <button onClick={() => setState(s => ({ ...s, picks: [], done: {} }))}>Clear</button>
            </div>
          </div>
          <p className="hint">Tap a slot to add that item, tap a filled slot to remove one.</p>

          <div className="today-list">
            {loaded && state.picks.length === 0 && (
              <div className="empty">No quests picked yet. Pick today&apos;s quests from the list.</div>
            )}
            {state.picks.map(name => {
              const q = QUEST_BY_NAME[name];
              const done = !!state.done[name];
              const ready = !done && isReady(q);
              const go = Object.entries(q.needs).filter(([i, n]) => dungeonOf(i) && have(i) < n);
              return (
                <div key={name} className={`quest ${done ? "done" : ready ? "ready" : ""}`}>
                  <div className="quest-top">
                    <div className="left">
                      <h3>{name}</h3>
                      <span className="tag">{q.category}</span>
                    </div>
                    {done ? <span className="status done">Done</span>
                      : ready ? <span className="status ready">Ready!</span>
                      : <span className="status need">{missingCount(q)} missing</span>}
                  </div>

                  {!done && go.length > 0 && (
                    <div className="go">
                      {go.map(([i, n], k) => (
                        <span key={i} title={bossOf(i)}>
                          {k > 0 && " · "}
                          {dungeonOf(i)}
                          {n - have(i) > 1 && <> <b>×{n - have(i)}</b></>}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="quest-body">
                    <div className="slots">
                      {Object.entries(q.needs).flatMap(([item, n]) =>
                        Array.from({ length: n }, (_, k) => {
                          const filled = done || k < have(item);
                          const where = dungeonOf(item) ? ` – ${dungeonOf(item)}` : "";
                          return (
                            <div
                              key={`${item}-${k}`}
                              className={`slot ${filled ? "" : "missing"} ${done ? "" : "tap"}`}
                              title={`${item}${where} (${Math.min(have(item), n)}/${n})`}
                              onClick={done ? undefined : () => addInv(item, filled ? -1 : 1)}
                            >
                              <img src={imgSrc(item)} alt={item} width={40} height={40} />
                            </div>
                          );
                        }),
                      )}
                    </div>
                    <div className="rewards">
                      →{" "}
                      {rewardCounts(q).map(([r, c]) => (
                        <span key={r}>
                          <img src={imgSrc(r)} alt={r} title={r} width={28} height={28} />
                          {c > 1 && `×${c}`}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="buttons">
                    {done ? (
                      <button onClick={() => undo(q)} title="Un-complete and give the items back">Undo</button>
                    ) : (
                      <button className="primary" disabled={!ready} onClick={() => turnIn(q)}
                        title="Mark done and remove the items from inventory">Turn in</button>
                    )}
                    <button onClick={() => togglePick(name)}>Remove</button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------- picker ---------- */}
        <section className="view view-pick" aria-labelledby="h-pick">
          <div className="section-head">
            <h2 id="h-pick">Pick today&apos;s quests</h2>
            <input type="search" placeholder="Search quest, mark or dungeon…" value={search}
              onChange={e => setSearch(e.target.value)} aria-label="Search quests" />
          </div>
          {CATEGORIES.map(cat => {
            const qs = QUESTS.filter(q => q.category === cat && matches(q));
            if (!qs.length) return null;
            return (
              <div className="cat" key={cat}>
                <h3>{cat} quests</h3>
                <div className="pick-list">
                  {qs.map(q => {
                    const on = state.picks.includes(q.name);
                    const ready = loaded && isReady(q);
                    return (
                      <button key={q.name} className={`pick ${on ? "on" : ""}`} onClick={() => togglePick(q.name)}
                        title={on ? "Remove from today" : "Add to today"}>
                        <span className={`ready-dot ${ready ? "" : "no"}`} />
                        {q.name}
                        <span className="icons">
                          {Object.keys(q.needs).slice(0, 5).map(i => (
                            <img key={i} src={imgSrc(i)} alt="" title={i} width={24} height={24} />
                          ))}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {QUESTS.every(q => !matches(q)) && <div className="empty">No matches.</div>}
        </section>
      </div>

      {/* ---------- inventory ---------- */}
      <aside className="col view view-inv" aria-labelledby="h-inv">
        <div className="section-head">
          <h2 id="h-inv">Inventory</h2>
          <label className="toggle">
            <input type="checkbox" checked={showAll} onChange={e => setShowAll(e.target.checked)} /> all items
          </label>
        </div>
        <p className="hint">Tap an item to add one, − to remove (right-click works too).</p>
        <div className="inventory">
          {invItems.length === 0 && (
            <div className="empty">Pick quests to see the items they need, or tick “all items”.</div>
          )}
          {ITEM_GROUPS.filter(g => invGroups[g]).map(g => (
            <div key={g} style={{ display: "contents" }}>
              <div className="inv-group">{g}</div>
              {invGroups[g]!.map(i => {
                const h = have(i), n = openNeeds[i] || 0, d = dungeonOf(i);
                return (
                  <div className="inv-row" key={i}>
                    <div className={`slot ${h ? "" : "missing"}`} title="Tap +1, right-click −1"
                      onClick={() => addInv(i, 1)}
                      onContextMenu={(e: MouseEvent) => { e.preventDefault(); addInv(i, -1); }}>
                      <img src={imgSrc(i)} alt="" width={40} height={40} />
                      <span className="count">{h || ""}</span>
                    </div>
                    <div className="name">
                      {d ? <>{d}<div className="sub">{i}</div></> : i}
                      {n > 0 && (
                        <span className={`need ${h >= n ? "ok" : "short"}`}>
                          {h >= n ? "enough" : `need ${n - h} more`} ({n} for today)
                        </span>
                      )}
                    </div>
                    <button onClick={() => addInv(i, -1)} aria-label={`Remove one ${i}`}>−</button>
                    <input type="number" min={0} value={h} aria-label={`${i} count`}
                      onChange={e => setInv(i, Number(e.target.value))} />
                    <button onClick={() => addInv(i, 1)} aria-label={`Add one ${i}`}>+</button>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </aside>

      {/* ---------- mobile tab bar ---------- */}
      <nav className="tabbar" aria-label="Sections">
        <button className={view === "today" ? "on" : ""} onClick={() => setView("today")}>
          Today{state.picks.length > 0 && <span className={`badge ${readyCount ? "good" : ""}`}>{readyCount} ready</span>}
        </button>
        <button className={view === "pick" ? "on" : ""} onClick={() => setView("pick")}>
          Quests{state.picks.length > 0 && <span className="badge">{state.picks.length}</span>}
        </button>
        <button className={view === "inv" ? "on" : ""} onClick={() => setView("inv")}>
          Inventory{shortCount > 0 && <span className="badge">−{shortCount}</span>}
        </button>
      </nav>
    </div>
  );
}
