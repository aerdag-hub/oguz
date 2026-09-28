export default function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-y border-amber-400/20 bg-slate-950 py-3">
      <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className="flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-slate-200">
            {t}
            <span className="text-amber-400">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
