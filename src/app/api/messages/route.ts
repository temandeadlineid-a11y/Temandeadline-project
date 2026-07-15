import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

// POST: pengunjung situs mengirim pesan/minat konsultasi (tanpa login) —
// dicatat sebagai "pesan masuk" sebelum dibuka ke WhatsApp.
// GET: admin melihat daftar pesan masuk, bisa disaring lewat ?status=.

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 menit

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req).slice(0, 60);

    // Batasi spam/bot: maksimal beberapa pesan per IP dalam beberapa
    // menit. Ditolak secara diam-diam (tetap balas ok) supaya bot tidak
    // tahu dia sedang dibatasi, dan pengunjung asli tidak melihat error.
    if (ip !== "unknown") {
      const recentCount = await prisma.message.count({
        where: {
          ip,
          createdAt: { gte: new Date(Date.now() - RATE_LIMIT_WINDOW_MS) },
        },
      });
      if (recentCount >= RATE_LIMIT_MAX) {
        return NextResponse.json({ ok: true });
      }
    }

    const body = await req.json().catch(() => ({}));

    const name = String(body?.name || "").slice(0, 120);
    const phone = String(body?.phone || "").slice(0, 40);
    const service = String(body?.service || "").slice(0, 120);
    const detail = String(body?.detail || "").slice(0, 2000);
    const source = String(body?.source || "/").slice(0, 190);

    if (!detail) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    await prisma.message.create({
      data: { name, phone, service, detail, source, ip },
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
