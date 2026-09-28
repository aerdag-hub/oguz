import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";

const msgFile = path.join(process.cwd(), "src", "data", "messages.json");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;
    if (!name || !email || !message) {
      return Response.json({ error: "Tüm alanlar zorunlu." }, { status: 400 });
    }
    let list: unknown[] = [];
    try {
      if (fs.existsSync(msgFile)) {
        list = JSON.parse(fs.readFileSync(msgFile, "utf-8"));
      }
    } catch {
      list = [];
    }
    list.push({ name, email, message, date: new Date().toISOString() });
    fs.mkdirSync(path.dirname(msgFile), { recursive: true });
    fs.writeFileSync(msgFile, JSON.stringify(list, null, 2), "utf-8");
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Gönderim hatası." }, { status: 500 });
  }
}

export async function GET(request: Request) {
  const password = request.headers.get("x-admin-password");
  const expected = process.env.ADMIN_PASSWORD || "admin123";
  if (password !== expected) {
    return Response.json({ error: "Yetkisiz." }, { status: 401 });
  }
  try {
    if (!fs.existsSync(msgFile)) return Response.json([]);
    const raw = fs.readFileSync(msgFile, "utf-8");
    return Response.json(JSON.parse(raw));
  } catch {
    return Response.json([]);
  }
}
