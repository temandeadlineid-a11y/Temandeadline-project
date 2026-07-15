import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken, COOKIE_NAME } from "@/lib/auth";

// Percobaan login gagal dibatasi supaya password admin tidak bisa
// ditebak dengan brute force: 5x gagal berturut-turut mengunci akun
// selama 15 menit.
const MAX_ATTEMPTS = 5;
const LOCK_MINUTES = 15;

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username dan password wajib diisi." },
        { status: 400 }
      );
    }

    const admin = await prisma.admin.findUnique({
      where: { username: String(username).toLowerCase().trim() },
    });

    if (admin?.lockedUntil && admin.lockedUntil > new Date()) {
      const minutesLeft = Math.ceil(
        (admin.lockedUntil.getTime() - Date.now()) / 60000
      );
      return NextResponse.json(
        {
          error: `Terlalu banyak percobaan gagal. Coba lagi dalam ${minutesLeft} menit.`,
        },
        { status: 429 }
      );
    }

    const valid =
      admin && (await bcrypt.compare(String(password), admin.password));

    if (!valid) {
      if (admin) {
        const attempts = admin.failedAttempts + 1;
        await prisma.admin.update({
          where: { id: admin.id },
          data: {
            failedAttempts: attempts,
            lockedUntil:
              attempts >= MAX_ATTEMPTS
                ? new Date(Date.now() + LOCK_MINUTES * 60000)
                : null,
          },
        });
      }
      return NextResponse.json(
        { error: "Username atau password salah." },
        { status: 401 }
      );
    }

    await prisma.admin.update({
      where: { id: admin.id },
      data: { failedAttempts: 0, lockedUntil: null },
    });

    const token = await signToken({
      sub: admin.id,
      username: admin.username,
      name: admin.name,
    });

    const res = NextResponse.json({ ok: true, name: admin.name });
    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7 hari
    });
    return res;
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan. Coba lagi." },
      { status: 500 }
    );
  }
}
