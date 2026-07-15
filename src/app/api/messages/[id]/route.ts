import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

type Params = { params: { id: string } };

// PATCH: tandai pesan sebagai dibaca/baru (bagian dari penyaringan admin).
// DELETE: hapus pesan yang sudah tidak relevan.

export async function PATCH(req: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json().catch(() => ({}));
  const status = body?.status === "read" ? "read" : "new";

  const message = await prisma.message.update({
    where: { id: params.id },
    data: { status },
  });

  return NextResponse.json(message);
}

export async function DELETE(_req: Request, { params }: Params) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.message.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
