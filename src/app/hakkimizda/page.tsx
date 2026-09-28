import { getContent } from "@/lib/content";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";

export default function Hakkimizda() {
  const c = getContent();
  return (
    <div>
      <PageHeader badge={c.about.title} title={c.slogan} desc={c.about.text} />
      <div className="mx-auto max-w-6xl px-4 py-12">
      {c.about.image && (
        <img src={c.about.image} alt="Bursa Periyodik Kontrol ekibi" className="h-72 w-full rounded-2xl border border-slate-200 object-cover shadow-lg" loading="lazy" />
      )}

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-slate-50 p-6">
          <p className="text-sm font-semibold text-slate-500">Kuruluş</p>
          <p className="text-2xl font-extrabold">{c.about.year}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-6">
          <p className="text-sm font-semibold text-slate-500">Ekip</p>
          <p className="text-2xl font-extrabold">{c.about.team}</p>
        </div>
        <div className="rounded-xl bg-slate-50 p-6">
          <p className="text-sm font-semibold text-slate-500">Muayene</p>
          <p className="text-2xl font-extrabold">2.500+</p>
        </div>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-200 p-6">
          <h2 className="font-bold">Misyonumuz</h2>
          <p className="mt-2 text-sm text-slate-600">{c.about.mission}</p>
        </div>
        <div className="rounded-xl border border-slate-200 p-6">
          <h2 className="font-bold">Vizyonumuz</h2>
          <p className="mt-2 text-sm text-slate-600">{c.about.vision}</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">
        <h2 className="font-bold">Çalışma ilkelerimiz</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700">
          {c.about.bullets.map((b) => (
            <li key={b} className="flex gap-2">
              <span className="text-green-600">✓</span> {b}
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  );
}
