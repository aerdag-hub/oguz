"use client";

import { useEffect, useState } from "react";
import type { SiteContent } from "@/lib/content";

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [content, setContent] = useState<SiteContent | null>(null);
  const [tab, setTab] = useState("genel");
  const [status, setStatus] = useState("");
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const saved = sessionStorage.getItem("admin-pass");
    if (saved) {
      setPassword(saved);
      loadContent(saved);
    }
  }, []);

  async function loadContent(pass: string) {
    const res = await fetch("/api/content", { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      setContent(data);
      setAuthed(true);
      sessionStorage.setItem("admin-pass", pass);
      loadMessages(pass);
    }
  }

  async function login(e: React.FormEvent) {
    e.preventDefault();
    // şifreyi doğrulamak için boş PUT denemiyoruz; önce içeriği çekip sonra kaydetmede doğruluyoruz
    // basit kontrol: /api/contact GET ile şifre testi
    const test = await fetch("/api/contact", {
      headers: { "x-admin-password": password },
    });
    if (test.status === 401) {
      const cRes = await fetch("/api/content", { cache: "no-store" });
      if (!cRes.ok) {
        setStatus("Bağlantı hatası.");
        return;
      }
      // içerik herkese açık, ama kaydetmede şifre kontrol edilecek.
      // Şifreyi ön doğrulamak için yanlış şifreyle kaydetme denemesi yapmıyoruz;
      // varsayılan şifre admin123 — kullanıcıya bilgi verelim.
      setStatus("Giriş için şifrenizi yazıp Kaydet dediğinizde doğrulanır. Varsayılan: admin123");
      const data = await cRes.json();
      setContent(data);
      setAuthed(true);
      sessionStorage.setItem("admin-pass", password);
      return;
    }
    await loadContent(password);
  }

  async function loadMessages(pass: string) {
    const res = await fetch("/api/contact", {
      headers: { "x-admin-password": pass },
    });
    if (res.ok) setMessages(await res.json());
  }

  async function save() {
    if (!content) return;
    setStatus("Kaydediliyor...");
    const res = await fetch("/api/content", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": password,
      },
      body: JSON.stringify(content),
    });
    if (res.ok) setStatus("Kaydedildi ✓ Site otomatik güncellendi.");
    else {
      const j = await res.json().catch(() => ({}));
      setStatus("Hata: " + (j.error || "kaydedilemedi. Şifreyi kontrol edin."));
    }
  }

  function logout() {
    sessionStorage.removeItem("admin-pass");
    setAuthed(false);
    setContent(null);
    setPassword("");
  }

  if (!authed || !content) {
    return (
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-3xl font-extrabold">Yönetim Paneli</h1>
        <p className="mt-2 text-sm text-slate-600">
          Site içeriklerini buradan güncelleyebilirsiniz. Varsayılan şifre:{" "}
          <code className="rounded bg-slate-100 px-1">admin123</code> (değiştirmek için .env.local
          dosyasına ADMIN_PASSWORD ekleyin).
        </p>
        <form onSubmit={login} className="mt-6 space-y-3 rounded-xl border p-6">
          <input
            type="password"
            className="w-full rounded-lg border px-3 py-2"
            placeholder="Yönetici şifresi"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white">
            Giriş Yap
          </button>
          {status && <p className="text-sm text-slate-600">{status}</p>}
        </form>
      </div>
    );
  }

  const tabs = [
    ["genel", "Genel"],
    ["hero", "Ana Sayfa / Hero"],
    ["hizmetler", "Hizmetler"],
    ["hakkimizda", "Hakkımızda"],
    ["referans", "Referanslar"],
    ["mevzuat", "Mevzuat"],
    ["iletisim", "İletişim"],
    ["mesajlar", "Mesajlar"],
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold">Yönetim Paneli</h1>
        <div className="flex gap-2">
          <button
            onClick={save}
            className="rounded-lg bg-green-600 px-5 py-2 font-semibold text-white hover:bg-green-700"
          >
            Kaydet
          </button>
          <button
            onClick={logout}
            className="rounded-lg border px-4 py-2 text-sm text-slate-600"
          >
            Çıkış
          </button>
        </div>
      </div>
      {status && <p className="mt-2 text-sm font-medium text-blue-700">{status}</p>}

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${
              tab === id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-xl border p-6">
        {tab === "genel" && (
          <div className="space-y-3">
            <label className="block text-sm">Site Adı
              <input className="mt-1 w-full rounded-lg border px-3 py-2" value={content.siteName}
                onChange={(e) => setContent({ ...content, siteName: e.target.value })} />
            </label>
            <label className="block text-sm">Slogan
              <input className="mt-1 w-full rounded-lg border px-3 py-2" value={content.slogan}
                onChange={(e) => setContent({ ...content, slogan: e.target.value })} />
            </label>
            <label className="block text-sm">Footer Yazısı
              <input className="mt-1 w-full rounded-lg border px-3 py-2" value={content.footerText}
                onChange={(e) => setContent({ ...content, footerText: e.target.value })} />
            </label>
          </div>
        )}

        {tab === "hero" && (
          <div className="space-y-3">
            {(["badge", "title", "subtitle", "ctaPrimary", "ctaSecondary"] as const).map((k) => (
              <label key={k} className="block text-sm">{k}
                <input className="mt-1 w-full rounded-lg border px-3 py-2" value={content.hero[k]}
                  onChange={(e) => setContent({ ...content, hero: { ...content.hero, [k]: e.target.value } })} />
              </label>
            ))}
            <label className="block text-sm">Hero Görsel URL
              <input className="mt-1 w-full rounded-lg border px-3 py-2" value={content.hero.image || ""}
                onChange={(e) => setContent({ ...content, hero: { ...content.hero, image: e.target.value } })} />
            </label>
            <div>
              <p className="text-sm font-semibold">İstatistikler</p>
              {content.stats.map((s, i) => (
                <div key={i} className="mt-2 flex gap-2">
                  <input className="w-24 rounded-lg border px-2 py-1" value={s.value}
                    onChange={(e) => { const v = [...content.stats]; v[i] = { ...v[i], value: e.target.value }; setContent({ ...content, stats: v }); }} />
                  <input className="flex-1 rounded-lg border px-2 py-1" value={s.label}
                    onChange={(e) => { const v = [...content.stats]; v[i] = { ...v[i], label: e.target.value }; setContent({ ...content, stats: v }); }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "hizmetler" && (
          <div className="space-y-4">
            {content.services.map((s, i) => (
              <div key={s.id} className="rounded-lg bg-slate-50 p-4">
                <div className="flex gap-2">
                  <input className="w-16 rounded-lg border px-2 py-1" value={s.icon}
                    onChange={(e) => { const v = [...content.services]; v[i] = { ...v[i], icon: e.target.value }; setContent({ ...content, services: v }); }} />
                  <input className="flex-1 rounded-lg border px-2 py-1 font-semibold" value={s.title}
                    onChange={(e) => { const v = [...content.services]; v[i] = { ...v[i], title: e.target.value }; setContent({ ...content, services: v }); }} />
                  <button className="text-sm text-red-600" onClick={() => setContent({ ...content, services: content.services.filter((_, j) => j !== i) })}>Sil</button>
                </div>
                <textarea className="mt-2 w-full rounded-lg border px-2 py-1 text-sm" value={s.desc} rows={2}
                  onChange={(e) => { const v = [...content.services]; v[i] = { ...v[i], desc: e.target.value }; setContent({ ...content, services: v }); }} />
                <input className="mt-2 w-full rounded-lg border px-2 py-1 text-sm" placeholder="Görsel URL" value={s.image || ""}
                  onChange={(e) => { const v = [...content.services]; v[i] = { ...v[i], image: e.target.value }; setContent({ ...content, services: v }); }} />
              </div>
            ))}
            <button className="rounded-lg border px-4 py-2 text-sm"
              onClick={() => setContent({ ...content, services: [...content.services, { id: "yeni-" + Date.now(), title: "Yeni Hizmet", desc: "Açıklama", icon: "✨" }] })}>
              + Hizmet Ekle
            </button>
          </div>
        )}

        {tab === "hakkimizda" && (
          <div className="space-y-3">
            <label className="block text-sm">Başlık
              <input className="mt-1 w-full rounded-lg border px-3 py-2" value={content.about.title}
                onChange={(e) => setContent({ ...content, about: { ...content.about, title: e.target.value } })} />
            </label>
            <label className="block text-sm">Metin
              <textarea className="mt-1 w-full rounded-lg border px-3 py-2" rows={4} value={content.about.text}
                onChange={(e) => setContent({ ...content, about: { ...content.about, text: e.target.value } })} />
            </label>
            <label className="block text-sm">Misyon
              <input className="mt-1 w-full rounded-lg border px-3 py-2" value={content.about.mission}
                onChange={(e) => setContent({ ...content, about: { ...content.about, mission: e.target.value } })} />
            </label>
            <label className="block text-sm">Vizyon
              <input className="mt-1 w-full rounded-lg border px-3 py-2" value={content.about.vision}
                onChange={(e) => setContent({ ...content, about: { ...content.about, vision: e.target.value } })} />
            </label>
            <label className="block text-sm">Görsel URL
              <input className="mt-1 w-full rounded-lg border px-3 py-2" value={content.about.image || ""}
                onChange={(e) => setContent({ ...content, about: { ...content.about, image: e.target.value } })} />
            </label>
            <div>
              <p className="text-sm font-semibold">Maddeler (her satır bir madde)</p>
              <textarea className="mt-1 w-full rounded-lg border px-3 py-2" rows={5}
                value={content.about.bullets.join("\n")}
                onChange={(e) => setContent({ ...content, about: { ...content.about, bullets: e.target.value.split("\n") } })} />
            </div>
          </div>
        )}

        {tab === "referans" && (
          <div className="space-y-2">
            {content.references.map((r, i) => (
              <div key={i} className="flex gap-2">
                <input className="flex-1 rounded-lg border px-2 py-1" value={r.name}
                  onChange={(e) => { const v = [...content.references]; v[i] = { ...v[i], name: e.target.value }; setContent({ ...content, references: v }); }} />
                <input className="w-40 rounded-lg border px-2 py-1" value={r.sector}
                  onChange={(e) => { const v = [...content.references]; v[i] = { ...v[i], sector: e.target.value }; setContent({ ...content, references: v }); }} />
                <button className="text-sm text-red-600" onClick={() => setContent({ ...content, references: content.references.filter((_, j) => j !== i) })}>Sil</button>
              </div>
            ))}
            <button className="rounded-lg border px-4 py-2 text-sm"
              onClick={() => setContent({ ...content, references: [...content.references, { name: "Yeni Firma", sector: "Sektör" }] })}>
              + Referans Ekle
            </button>
          </div>
        )}

        {tab === "mevzuat" && (
          <div className="space-y-2">
            {(content.legislation || []).map((m, i) => (
              <div key={i} className="rounded-lg bg-slate-50 p-3">
                <div className="flex gap-2">
                  <input className="flex-1 rounded-lg border px-2 py-1 font-semibold" value={m.title}
                    onChange={(e) => { const v = [...(content.legislation || [])]; v[i] = { ...v[i], title: e.target.value }; setContent({ ...content, legislation: v }); }} />
                  <button className="text-sm text-red-600" onClick={() => setContent({ ...content, legislation: (content.legislation || []).filter((_, j) => j !== i) })}>Sil</button>
                </div>
                <textarea className="mt-2 w-full rounded-lg border px-2 py-1 text-sm" rows={2} value={m.desc}
                  onChange={(e) => { const v = [...(content.legislation || [])]; v[i] = { ...v[i], desc: e.target.value }; setContent({ ...content, legislation: v }); }} />
              </div>
            ))}
            <button className="rounded-lg border px-4 py-2 text-sm"
              onClick={() => setContent({ ...content, legislation: [...(content.legislation || []), { title: "Yeni Mevzuat", desc: "Açıklama" }] })}>
              + Mevzuat Ekle
            </button>
          </div>
        )}

        {tab === "iletisim" && (
          <div className="space-y-3">
            {(["email", "phone", "address", "workHours"] as const).map((k) => (
              <label key={k} className="block text-sm">{k}
                <input className="mt-1 w-full rounded-lg border px-3 py-2" value={content.contact[k]}
                  onChange={(e) => setContent({ ...content, contact: { ...content.contact, [k]: e.target.value } })} />
              </label>
            ))}
          </div>
        )}

        {tab === "mesajlar" && (
          <div>
            <button className="rounded-lg border px-4 py-2 text-sm" onClick={() => loadMessages(password)}>Yenile</button>
            <div className="mt-4 space-y-2">
              {messages.length === 0 && <p className="text-sm text-slate-500">Henüz mesaj yok.</p>}
              {messages.map((m, i) => (
                <div key={i} className="rounded-lg bg-slate-50 p-3 text-sm">
                  <p className="font-semibold">{m.name} — {m.email}</p>
                  <p className="text-slate-600">{m.message}</p>
                  <p className="text-xs text-slate-400">{m.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <button onClick={save} className="mt-4 w-full rounded-lg bg-green-600 py-3 font-semibold text-white">
        Tüm Değişiklikleri Kaydet
      </button>
    </div>
  );
}
