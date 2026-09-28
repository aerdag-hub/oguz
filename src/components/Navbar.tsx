import Link from "next/link";
import SiteLogo from "./SiteLogo";

export default function Navbar({
  siteName,
  phone,
  email,
}: {
  siteName: string;
  phone: string;
  email: string;
}) {
  return (
    <header className="sticky top-0 z-50">
      {/* Üst bilgi barı */}
      <div className="bg-slate-950 text-[12px] text-slate-300">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-1.5">
          <div className="flex items-center gap-4">
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-1.5 hover:text-amber-400">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping-soft" />
              {phone}
            </a>
            <a href={`mailto:${email}`} className="hidden hover:text-amber-400 sm:block">
              {email}
            </a>
          </div>
          <Link href="/admin" className="text-slate-400 hover:text-amber-400">
            Yönetim Girişi
          </Link>
        </div>
      </div>
      {/* Ana menü */}
      <div className="border-b border-slate-200/70 bg-white/90 shadow-[0_2px_20px_-10px_rgba(2,6,23,0.3)] backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between gap-4 px-4">
          <Link href="/" className="flex min-w-0 items-center gap-3">
            <SiteLogo siteName={siteName} />
            <span className="hidden flex-col leading-tight lg:flex">
              <span className="font-display text-[17px] font-extrabold tracking-tight text-slate-900">
                BURSA PERİYODİK
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-600">
                Kontrol
              </span>
            </span>
          </Link>
          <nav className="hidden items-center gap-1 text-sm font-semibold text-slate-700 md:flex">
            {[
              ["Ana Sayfa", "/"],
              ["Hizmetler", "/hizmetler"],
              ["Hakkımızda", "/hakkimizda"],
              ["İletişim", "/iletisim"],
            ].map(([label, href]) => (
              <Link
                key={href + label}
                href={href}
                className="rounded-full px-4 py-2 transition hover:bg-slate-100 hover:text-slate-950"
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="hidden items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-bold text-slate-800 transition hover:border-amber-400 hover:text-amber-700 xl:flex"
            >
              📞 {phone}
            </a>
            <Link
              href="/iletisim"
              className="group rounded-full bg-slate-900 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-slate-900/20 transition hover:bg-amber-500 hover:text-slate-950 hover:shadow-amber-500/30"
            >
              Teklif Al
              <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
        <div className="flex gap-5 overflow-x-auto border-t border-slate-100 px-4 py-2 text-[13px] font-semibold text-slate-600 md:hidden">
          <Link href="/">Ana Sayfa</Link>
          <Link href="/hizmetler">Hizmetler</Link>
          <Link href="/hakkimizda">Hakkımızda</Link>
          <Link href="/iletisim">İletişim</Link>
        </div>
      </div>
    </header>
  );
}
