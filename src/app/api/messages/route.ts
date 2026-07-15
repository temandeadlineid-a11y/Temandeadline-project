import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

// POST: pengunjung situs mengirim pesan/minat konsultasi (tanpa login) —
// dicatat sebagai "pesan masuk" sebelum dibuka ke WhatsApp.
// GET: admin melihat daftar pesan masuk, bisa disaring lewat ?status=.

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));

    const name = String(body?.name || "").slice(0, 120);
    const service = String(body?.service || "").slice(0, 120);
    const detail = String(body?.detail || "").slice(0, 2000);
    const source = String(body?.source || "/").slice(0, 190);

    if (!detail) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    await prisma.message.create({
      data: { name, service, detail, source },
    });

    return NextResponse.json({ ok: true });
  } catch {
    // Pencatatan pesan tidak boleh menggagalkan pengalaman pengunjung
    return NextResponse.json({ ok: true });
  }
}

export async function GET(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status");

  const messages = await prisma.message.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(messages);
}
