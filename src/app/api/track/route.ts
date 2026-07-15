import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Menerima event dari pengunjung: pageview & klik WhatsApp.
// Bot/crawler diabaikan supaya angka analytics tetap jujur.

const RATE_LIMIT_MAX = 60;
const RATE_LIMIT_WINDOW_MS = 5 * 60 * 1000; // 5 menit

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}

function cleanReferrer(raw: string): string {
  if (!raw) return "Langsung";
  try {
    const host = new URL(raw).hostname.replace(/^www\./, "");
    if (!host || host.includes("temandeadline")) return "Langsung";
    if (host.includes("instagram")) return "Instagram";
    if (host.includes("google")) return "Google";
    if (host.includes("facebook")) return "Facebook";
    if (host.includes("tiktok")) return "TikTok";
    if (host.includes("whatsapp") || host === "wa.me") return "WhatsApp";
    if (host.includes("twitter") || host === "x.com" || host === "t.co")
      return "X / Twitter";
    return host;
  } catch {
    return "Langsung";
  }
}

export async function POST(req: Request) {
  try {
    const ua = req.headers.get("user-agent") || "";
    if (/bot|crawl|spider|slurp|preview|facebookexternalhit/i.test(ua)) {
      return NextResponse.json({ ok: true });
    }

    const body = await req.json().catch(() => ({}));
    const type = body?.type;
    if (type !== "pageview" && type !== "wa_click") {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    const ip = getClientIp(req).slice(0, 60);

    // Batasi banjir event dari satu IP (bot/script), tanpa mengganggu
    // pengunjung asli yang wajar jumlah klik/pageview-nya.
    if (ip !== "unknown") {
      const recentCount = await prisma.event.count({
        where: {
          ip,
          createdAt: { gte: new Date(Date.now() - RATE_LIMIT_WINDOW_MS) },
        },
      });
      if (recentCount >= RATE_LIMIT_MAX) {
        return NextResponse.json({ ok: true });
      }
    }

    const device = /mobile|android|iphone|ipad/i.test(ua)
      ? "mobile"
      : "desktop";

    await prisma.event.create({
      data: {
        type,
        path: String(body?.path || "/").slice(0, 190),
        referrer: cleanReferrer(String(body?.referrer || "")).slice(0, 120),
        device,
        ip,
      },
    });

    return NextResponse.json({ ok: true });
  } catch {
    // Tracking tidak boleh mengganggu pengunjung — gagal pun tetap ok
    return NextResponse.json({ ok: true });
  }
}
