import { getContent, saveContent, checkAdminPassword } from "@/lib/content";

export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(getContent());
}

export async function PUT(request: Request) {
  const password = request.headers.get("x-admin-password");
  if (!checkAdminPassword(password)) {
    return Response.json({ error: "Yetkisiz. Şifre hatalı." }, { status: 401 });
  }
  try {
    const body = await request.json();
    if (!body.siteName || !body.hero || !Array.isArray(body.services)) {
      return Response.json({ error: "Geçersiz içerik formatı." }, { status: 400 });
    }
    saveContent(body);
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Kaydetme hatası." }, { status: 500 });
  }
}
