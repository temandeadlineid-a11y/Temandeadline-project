import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

export const COOKIE_NAME = "td_admin";

// TIDAK ADA fallback secret di sini dengan sengaja. Fallback yang
// hardcoded akan terlihat oleh siapa pun yang membaca repo publik ini,
// sehingga token admin bisa dipalsukan. Kalau JWT_SECRET belum diisi,
// lebih aman sistem gagal total (fail closed) daripada diam-diam
// memakai secret yang sudah diketahui semua orang.
function getSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error(
      "JWT_SECRET belum diisi. Wajib diset di environment variables (jangan pernah hardcode di kode)."
    );
  }
  return new TextEncoder().encode(secret);
}

export type AdminSession = { sub: string; username: string; name: string };

export async function signToken(payload: AdminSession) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSecret());
}

export async function verifyToken(token: string): Promise<AdminSession | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    return payload as unknown as AdminSession;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const token = cookies().get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifyToken(token);
}
