import Link from "next/link";

export default function Footer({
  siteName,
  slogan,
  footerText,
  email,
  phone,
  address,
  services,
}: {
  siteName: string;
  slogan: string;
  footerText: string;
  email: string;
  phone: string;
  address: string;
  services: string[];
}) {
  return (
    <footer className="relative overflow-hidden bg-slate-950 text-slate-300">
      <div className="pointer-events-none absolute -top-32 left-1/4 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 right-1/4 h-64 w-64 rounded-full bg-blue-600/10 blur-3xl" />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4">
        <div className="md:col-span-1">
          <p className="font-display text-lg font-extrabold text-white">{siteName}</p>
          <p className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-500">
            {slogan}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-slate-400">{footerText}</p>
        </div>
        <div className="text-sm">
          <p className="font-display font-bold text-white">Hizmetler</p>
          <div className="mt-3 flex flex-col gap-2 text-slate-400">
            {services.slice(0, 6).map((s) => (
              <Link key={s} href="/hizmetler" className="transition hover:text-amber-400">
                → {s}
              </Link>
            ))}
          </div>
        </div>
        <div className="text-sm">
          <p className="font-display font-bold text-white">Kurumsal</p>
          <div className="mt-3 flex flex-col gap-2 text-slate-400">
            <Link href="/" className="transition hover:text-amber-400">→ Ana Sayfa</Link>
            <Link href="/hizmetler" className="transition hover:text-amber-400">→ Hizmetlerimiz</Link>
            <Link href="/hakkimizda" className="transition hover:text-amber-400">→ Hakkımızda</Link>
            <Link href="/iletisim" className="transition hover:text-amber-400">→ İletişim</Link>
            <Link href="/admin" className="transition hover:text-amber-400">→ Yönetim Paneli</Link>
          </div>
        </div>
        <div className="text-sm">
          <p className="font-display font-bold text-white">İletişim</p>
          <div className="mt-3 space-y-2 text-slate-400">
            <p className="text-base font-bold text-amber-400">{phone}</p>
            <p>{email}</p>
            <p>{address}</p>
          </div>
          <Link
            href="/iletisim"
            className="mt-4 inline-block rounded-full bg-amber-500 px-5 py-2 text-sm font-bold text-slate-950 transition hover:bg-amber-400"
          >
            Ücretsiz Ön Görüşme
          </Link>
        </div>
      </div>
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-xs text-slate-500 sm:flex-row">
          <span>{footerText}</span>
          <span>Bursa merkezli • Türkiye geneli mobil muayene</span>
        </div>
      </div>
    </footer>
  );
}
