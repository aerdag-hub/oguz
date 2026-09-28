import { getContent } from "@/lib/content";
import ContactForm from "@/components/ContactForm";
import PageHeader from "@/components/PageHeader";

export const dynamic = "force-dynamic";

export default function Iletisim() {
  const c = getContent();
  const tel = c.contact.phone.replace(/\s/g, "");
  return (
    <div>
      <PageHeader badge="İletişim" title="Teklif ve randevu için yazın" desc="Ekipman listenizi gönderin, 24 saat içinde saha planı ve şeffaf fiyat verelim." />
      <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <a href={`tel:${tel}`} className="block rounded-2xl bg-slate-950 p-6 text-white transition hover:bg-slate-900">
            <p className="text-xs font-bold uppercase tracking-widest text-amber-400">Telefon</p>
            <p className="font-display mt-1 text-2xl font-extrabold">{c.contact.phone}</p>
            <p className="mt-1 text-sm text-slate-400">Hemen aramak için dokunun</p>
          </a>
          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">E-posta</p>
            <p className="mt-1 font-bold">{c.contact.email}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Adres</p>
            <p className="mt-1 font-bold">{c.contact.address}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 p-5">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Çalışma Saatleri</p>
            <p className="mt-1 font-bold">{c.contact.workHours}</p>
          </div>
        </div>
        <ContactForm />
      </div>
      </div>
    </div>
  );
}
