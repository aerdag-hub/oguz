import Link from "next/link";
import { getContent } from "@/lib/content";
import HeroSlider from "@/components/HeroSlider";
import Marquee from "@/components/Marquee";
import Counter from "@/components/Counter";

export const dynamic = "force-dynamic";

const STEPS = [
  { n: "01", t: "Ekipman listesini gönderin", d: "Vinç, kazan, forklift, topraklama… listenizi WhatsApp veya form ile iletin." },
  { n: "02", t: "24 saatte plan + fiyat", d: "Saha günü netleşir, şeffaf fiyat alırsınız. Sürpriz maliyet yok." },
  { n: "03", t: "Sahada muayene", d: "Mühendis ekibimiz göz muayenesi, ölçüm ve yük testlerini yapar." },
  { n: "04", t: "Onaylı rapor + hatırlatma", d: "3 iş gününde raporunuz elinizde; periyot dolmadan hatırlatırız." },
];

export default function Home() {
  const c = getContent();
  const tel = c.contact.phone.replace(/\s/g, "");
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="pointer-events-none absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-700/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-amber-500/25 blur-3xl" />
        <div className="bg-dot-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:py-24 lg:grid-cols-2">
          <div className="animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-amber-300 backdrop-blur">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-ping-soft" />
              {c.hero.badge}
            </span>
            <h1 className="font-display mt-5 text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
              {c.hero.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">{c.hero.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/hizmetler"
                className="group rounded-full bg-amber-500 px-7 py-3.5 font-bold text-slate-950 shadow-xl shadow-amber-500/25 transition hover:bg-amber-400"
              >
                {c.hero.ctaPrimary}
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </Link>
              <a
                href={`tel:${tel}`}
                className="rounded-full border border-white/25 px-7 py-3.5 font-bold text-white backdrop-blur transition hover:border-amber-400 hover:text-amber-300"
              >
                📞 {c.contact.phone}
              </a>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-300">
              {["6331'e tam uyum", "Mühendis kadro", "3 günde onaylı rapor"].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/20 text-xs text-emerald-400">✓</span>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-amber-500/30 to-blue-600/30 blur-2xl" />
            {c.hero.image && (
              <img
                src={c.hero.image}
                alt="Periyodik kontrol sahası"
                className="relative h-[480px] w-full rounded-[2rem] border border-white/10 object-cover shadow-2xl"
              />
            )}
            <div className="absolute -left-6 top-8 rounded-2xl border border-white/10 bg-slate-900/90 px-5 py-4 shadow-xl backdrop-blur">
              <p className="font-display text-3xl font-extrabold text-amber-400">2.500+</p>
              <p className="text-xs font-semibold uppercase tracking-widest text-slate-300">Tamamlanan muayene</p>
            </div>
            <div className="absolute -right-4 bottom-8 rounded-2xl border border-white/10 bg-slate-900/90 px-5 py-4 shadow-xl backdrop-blur">
              <p className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 animate-ping-soft" />
                Bugün sahada
              </p>
              <p className="mt-1 text-xs text-slate-300">Bursa + mobil ekipler</p>
            </div>
          </div>
        </div>
      </section>

      {/* KAYAN ŞERİT */}
      <Marquee items={c.services.map((s) => s.title)} />

      {/* İSTATİSTİK BANDI */}
      <section className="relative overflow-hidden bg-amber-500 text-slate-950">
        <div className="bg-dot-grid-dark pointer-events-none absolute inset-0 opacity-50" />
        <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4">
          {c.stats.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <p className="font-display text-4xl font-extrabold tracking-tight md:text-5xl">
                <Counter value={s.value} />
              </p>
              <p className="mt-1 text-sm font-bold uppercase tracking-widest text-slate-800">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HİZMETLER */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="inline-block rounded-full bg-amber-100 px-4 py-1 text-xs font-bold uppercase tracking-widest text-amber-700">
              Muayene Hizmetleri
            </p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight md:text-5xl">
              Hangi ekipmanlara <span className="text-amber-500">bakıyoruz?</span>
            </h2>
          </div>
          <Link href="/hizmetler" className="group text-sm font-bold text-slate-900 hover:text-amber-600">
            Tüm hizmetler
            <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {c.services.map((s, i) => (
            <Link
              key={s.id}
              href="/hizmetler"
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white transition duration-300 hover:-translate-y-1.5 hover:border-amber-300 hover:shadow-[0_20px_50px_-15px_rgba(245,158,11,0.4)]"
            >
              <div className="relative overflow-hidden">
                {s.image && (
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    className="h-52 w-full object-cover transition duration-500 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-0 transition group-hover:opacity-100" />
                <span className="font-display absolute left-4 top-4 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-bold text-amber-400 backdrop-blur">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="absolute bottom-4 left-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-2xl shadow-lg">
                  {s.icon}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-bold leading-snug">{s.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-slate-600">{s.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-amber-600">
                  İncele
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SÜREÇ */}
      <section className="relative overflow-hidden bg-slate-950 py-16 text-white md:py-24">
        <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="relative mx-auto max-w-6xl px-4">
          <p className="text-center text-xs font-bold uppercase tracking-[0.25em] text-amber-400">Nasıl çalışıyoruz</p>
          <h2 className="font-display mx-auto mt-3 max-w-2xl text-center text-3xl font-extrabold tracking-tight md:text-5xl">
            4 adımda muayeneniz tamam
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-4">
            {STEPS.map((s) => (
              <div
                key={s.n}
                className="group rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:border-amber-400/50 hover:bg-white/10"
              >
                <p className="font-display text-4xl font-extrabold text-amber-500/90 transition group-hover:text-amber-400">
                  {s.n}
                </p>
                <p className="font-display mt-3 font-bold">{s.t}</p>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SLIDER */}
      <div className="bg-slate-50">
        <HeroSlider
          slides={c.services.map((s) => ({ image: s.image || "", title: s.title, desc: s.desc }))}
        />
      </div>

      {/* MEVZUAT */}
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <p className="inline-block rounded-full bg-slate-900 px-4 py-1 text-xs font-bold uppercase tracking-widest text-amber-400">
              İlgili Mevzuat
            </p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">
              Dayandığımız yasal çerçeve
            </h2>
            <p className="mt-4 leading-relaxed text-slate-600">
              Tüm muayenelerimizi aşağıdaki kanun ve yönetmeliklere göre yapıyor, raporlarımızda
              ilgili madde ve standartlara atıf veriyoruz. Denetimde eliniz güçlü olsun.
            </p>
            <Link
              href="/hizmetler"
              className="mt-6 inline-block rounded-full bg-slate-900 px-6 py-3 text-sm font-bold text-white transition hover:bg-amber-500 hover:text-slate-950"
            >
              Hizmet detayları →
            </Link>
          </div>
          <div className="space-y-3">
            {(c.legislation || []).map((m, i) => (
              <details
                key={m.title}
                open={i === 0}
                className="group rounded-2xl border border-slate-200 bg-white transition open:border-amber-300 open:shadow-[0_15px_40px_-15px_rgba(245,158,11,0.35)]"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-sm text-amber-400 transition group-open:bg-amber-500 group-open:text-slate-950">
                      ⚖
                    </span>
                    {m.title}
                  </span>
                  <span className="text-amber-500 transition group-open:rotate-45">＋</span>
                </summary>
                <p className="px-5 pb-5 pl-[4.25rem] text-sm leading-relaxed text-slate-600">{m.desc}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* HAKKIMIZDA + CTA */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="bg-dot-grid pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 md:py-20 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-amber-400">{c.about.title}</p>
            <h2 className="font-display mt-3 text-3xl font-extrabold tracking-tight md:text-4xl">{c.slogan}</h2>
            <p className="mt-4 leading-relaxed text-slate-300">{c.about.text}</p>
            <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {c.about.bullets.map((b) => (
                <li key={b} className="flex items-start gap-2 rounded-xl border border-white/10 bg-white/5 p-3 text-sm">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs text-emerald-400">✓</span>
                  {b}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col justify-center rounded-[2rem] bg-gradient-to-br from-amber-500 to-amber-600 p-8 text-slate-950 shadow-2xl md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-800">Muayene periyodunuz geçmesin</p>
            <p className="font-display mt-2 text-3xl font-extrabold leading-tight md:text-4xl">
              24 saatte plan + fiyat alın
            </p>
            <a href={`tel:${tel}`} className="font-display mt-4 text-2xl font-extrabold md:text-3xl">
              📞 {c.contact.phone}
            </a>
            <p className="mt-1 text-sm font-semibold text-slate-800">{c.contact.email}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/iletisim"
                className="rounded-full bg-slate-950 px-7 py-3 font-bold text-white transition hover:bg-slate-800"
              >
                Teklif Formu →
              </Link>
              <Link
                href="/hakkimizda"
                className="rounded-full border-2 border-slate-900/20 px-7 py-3 font-bold transition hover:border-slate-950"
              >
                Bizi Tanıyın
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
