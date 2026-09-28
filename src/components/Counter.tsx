"use client";

import { useEffect, useRef, useState } from "react";

function parseStat(raw: string) {
  const m = raw.match(/^([^0-9]*)([0-9][0-9.]*)([^0-9]*)$/);
  if (!m) return { prefix: "", target: 0, suffix: raw };
  return {
    prefix: m[1],
    target: parseInt(m[2].replace(/\./g, ""), 10) || 0,
    suffix: m[3],
  };
}

export default function Counter({ value }: { value: string }) {
  const { prefix, target, suffix } = parseStat(value);
  const [n, setN] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          const t0 = performance.now();
          const dur = 1400;
          const tick = (t: number) => {
            const p = Math.min(1, (t - t0) / dur);
            const eased = 1 - Math.pow(1 - p, 3);
            setN(Math.round(target * eased));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          obs.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {prefix}
      {n.toLocaleString("tr-TR")}
      {suffix}
    </span>
  );
}
