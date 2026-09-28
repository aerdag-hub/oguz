"use client";

import { useEffect, useState } from "react";

export type Slide = { image: string; title: string; desc: string };

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [idx, setIdx] = useState(0);
  const valid = slides.filter((s) => s.image);
  if (valid.length === 0) return null;

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % valid.length), 5000);
    return () => clearInterval(t);
  }, [valid.length]);

  const cur = valid[idx % valid.length];

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="relative min-h-[420px] overflow-hidden rounded-2xl bg-slate-900 text-white shadow-xl">
          {valid.map((s, i) => (
            <img
              key={s.title}
              src={s.image}
              alt={s.title}
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
                i === idx % valid.length ? "opacity-50" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="relative flex min-h-[420px] flex-col justify-end p-6 md:p-10">
            <p className="text-sm font-semibold text-amber-400">Öne çıkan muayeneler</p>
            <h2 className="mt-2 max-w-2xl text-2xl font-extrabold md:text-4xl" key={cur.title}>
              {cur.title}
            </h2>
            <p className="mt-3 max-w-2xl text-sm text-slate-200 md:text-base">{cur.desc}</p>
            <div className="mt-5 flex items-center gap-2">
              {valid.map((s, i) => (
                <button
                  key={s.title}
                  aria-label={s.title}
                  onClick={() => setIdx(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === idx % valid.length ? "w-8 bg-amber-400" : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setIdx((idx - 1 + valid.length) % valid.length)}
                className="rounded-lg border border-white/30 px-3 py-1 text-sm hover:bg-white/10"
              >
                ← Önceki
              </button>
              <button
                onClick={() => setIdx((idx + 1) % valid.length)}
                className="rounded-lg border border-white/30 px-3 py-1 text-sm hover:bg-white/10"
              >
                Sonraki →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
