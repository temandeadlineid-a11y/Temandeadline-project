import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

// Ganti password admin yang sedang login. Wajib masukkan password
// lama dulu supaya sesi yang "kecolongan" (mis. lupa logout di
// komputer umum) tidak bisa langsung dipakai untuk ambil alih akun.

export async function POST(req: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Password saat ini dan password baru wajib diisi." },
        { status: 400 }
      );
    }
    if (String(newPassword).length < 8) {
      return NextResponse.json(
        { error: "Password baru minimal 8 karakter." },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({ where: { id: session.sub } });
    if (!admin) {
      return NextResponse.json({ error: "Akun tidak ditemukan." }, { status: 404 });
    }

    const valid = await bcrypt.compare(String(currentPassword), admin.password);
    if (!valid) {
      return NextResponse.json(
        { error: "Password saat ini salah." },
        { status: 401 }
      );
    }

    const hashed = await bcrypt.hash(String(newPassword), 10);
    await prisma.admin.update({
      where: { id: admin.id },
      data: { password: hashed, failedAttempts: 0, lockedUntil: null },
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Gagal mengganti password. Coba lagi." },
      { status: 500 }
    );
  }
}
