"use client";

import { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("Gönderiliyor...");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setStatus("Mesajınız alındı. Teşekkürler!");
      setForm({ name: "", email: "", message: "" });
    } else {
      setStatus("Hata oluştu, tekrar deneyin.");
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3 rounded-xl border border-slate-200 p-6">
      <input
        className="w-full rounded-lg border border-slate-300 px-3 py-2"
        placeholder="Adınız"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        className="w-full rounded-lg border border-slate-300 px-3 py-2"
        placeholder="E-posta"
        type="email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <textarea
        className="w-full rounded-lg border border-slate-300 px-3 py-2"
        placeholder="Ekipman listeniz — örn: 2 forklift, 1 hava tankı, topraklama ölçümü"
        rows={5}
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        required
      />
      <button className="w-full rounded-lg bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700">
        Gönder
      </button>
      {status && <p className="text-sm text-slate-600">{status}</p>}
    </form>
  );
}
