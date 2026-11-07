"use client";

import { useEffect, useState } from "react";

/** Time left until the daily reset at 00:00 UTC. Renders "--" on the server to avoid hydration mismatch. */
export default function Countdown() {
  const [text, setText] = useState("--");
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const next = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
      const s = Math.floor((next - now.getTime()) / 1000);
      const p = (n: number) => String(n).padStart(2, "0");
      setText(`${Math.floor(s / 3600)}h ${p(Math.floor(s / 60) % 60)}m ${p(s % 60)}s`);
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, []);
  return <span className="countdown">{text}</span>;
}
