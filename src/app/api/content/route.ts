import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { DEFAULT_CONTENT } from "@/lib/seed-data";

// GET: ambil semua konten situs (default + yang sudah diedit)
// PUT: simpan perubahan konten (upsert per key)

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const rows = await prisma.siteContent.findMany();
    const fromDb = Object.fromEntries(rows.map((r) => [r.key, r.value]));
    return NextResponse.json({ ...DEFAULT_CONTENT, ...fromDb });
  } catch {
    return NextResponse.json({ ...DEFAULT_CONTENT });
  }
}

export async function PUT(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = (await req.json()) as Record<string, string>;
    const allowedKeys = Object.keys(DEFAULT_CONTENT);

    const updates = Object.entries(body)
      .filter(([key]) => allowedKeys.includes(key))
      .map(([key, value]) =>
        prisma.siteContent.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        })
      );

    await prisma.$transaction(updates);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Gagal menyimpan. Cek koneksi database." },
      { status: 500 }
    );
  }
}
