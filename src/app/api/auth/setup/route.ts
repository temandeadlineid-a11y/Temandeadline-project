import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Setup admin pertama kali. HANYA bisa dipakai saat belum ada admin sama sekali.
// Setelah admin pertama dibuat, endpoint ini otomatis terkunci.

export async function GET() {
  try {
    const count = await prisma.admin.count();
    return NextResponse.json({ needsSetup: count === 0 });
  } catch {
    return NextResponse.json(
      { needsSetup: false, error: "Database belum siap. Cek DATABASE_URL." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const count = await prisma.admin.count();
    if (count > 0) {
      return NextResponse.json(
        { error: "Admin sudah ada. Setup hanya untuk pertama kali." },
        { status: 403 }
      );
    }

    const { username, password, name } = await req.json();
    if (!username || !password || String(password).length < 8) {
      return NextResponse.json(
        { error: "Username wajib diisi dan password minimal 8 karakter." },
        { status: 400 }
      );
    }

    const hashed = await bcrypt.hash(String(password), 10);
    await prisma.admin.create({
      data: {
        username: String(username).toLowerCase().trim(),
        password: hashed,
        name: String(name || "Admin").trim(),
      },
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json(
      { error: "Gagal membuat admin. Pastikan database terkoneksi." },
      { status: 500 }
    );
  }
}
