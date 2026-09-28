export default function PageHeader({
  badge,
  title,
  desc,
}: {
  badge: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="relative overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-amber-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-amber-400/40 bg-amber-400/10 px-4 py-1 text-xs font-bold uppercase tracking-widest text-amber-300">
          {badge}
        </span>
        <h1 className="font-display mt-4 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-slate-300">{desc}</p>
      </div>
      <div className="relative h-1.5 bg-gradient-to-r from-amber-500 via-amber-300 to-blue-600" />
    </div>
  );
}
