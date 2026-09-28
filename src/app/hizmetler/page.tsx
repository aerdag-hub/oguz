import { getContent } from "@/lib/content";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";

export default function Hizmetler() {
  const c = getContent();
  return (
    <div>
      <PageHeader
        badge="Periyodik Muayene Hizmetleri"
        title="Muayene ve ölçüm hizmetlerimiz"
        desc="İş Ekipmanlarının Kullanımında Sağlık ve Güvenlik Şartları Yönetmeliği'ne göre; basınçlı kaplar, kaldırma ekipmanları, elektrik ve yangın tesisatları yılda en az 1 kez muayene edilmelidir."
      />
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {c.services.map((s) => (
          <div key={s.id} className="overflow-hidden rounded-xl border border-slate-200 hover:shadow-md">
            {s.image && <img src={s.image} alt={s.title} className="h-48 w-full object-cover" loading="lazy" />}
            <div className="p-6">
              <p className="text-3xl">{s.icon}</p>
              <h2 className="mt-2 text-xl font-bold">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 rounded-xl bg-amber-50 p-6 text-sm text-slate-700">
        <p className="font-bold">Muayene süreci nasıl işler?</p>
        <p className="mt-2">1) Ekipman listesini iletin → 2) Sahada göz muayenesi + ölçüm/test → 3) Aynı gün ön bilgi → 4) 3 iş günü içinde onaylı rapor. Periyot dolmadan hatırlatma yapıyoruz.</p>
      </div>

      {(c.legislation || []).length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-bold">İlgili mevzuat</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {c.legislation.map((m) => (
              <div key={m.title} className="rounded-xl border border-slate-200 p-5">
                <p className="font-bold">⚖️ {m.title}</p>
                <p className="mt-2 text-sm text-slate-600">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
