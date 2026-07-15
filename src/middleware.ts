import { NextResponse, type NextRequest } from "next/server";
import { jwtVerify } from "jose";

// Melindungi seluruh halaman /admin kecuali login & setup.
// Token disimpan sebagai httpOnly cookie sehingga aman dari akses JavaScript.

const PUBLIC_ADMIN_PATHS = ["/admin/login", "/admin/setup"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (PUBLIC_ADMIN_PATHS.some((p) => pathname.startsWith(p))) {
    return NextResponse.next();
  }

  const token = req.cookies.get("td_admin")?.value;
  // Sengaja TIDAK ada fallback secret: kalau JWT_SECRET belum diset,
  // semua token dianggap tidak valid (fail closed), bukan diam-diam
  // memvalidasi pakai secret yang bisa dilihat siapa pun di repo publik.
  if (token && process.env.JWT_SECRET) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      // token tidak valid → lanjut ke redirect di bawah
    }
  }

  const loginUrl = new URL("/admin/login", req.url);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
