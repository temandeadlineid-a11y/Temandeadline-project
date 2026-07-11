import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

// Merangkum data Event 30 hari terakhir jadi angka siap tampil:
// total kunjungan, klik WA, conversion rate, grafik harian,
// halaman terpopuler, sumber trafik, dan perangkat.

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const now = new Date();
    const since30 = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const events = await prisma.event.findMany({
      where: { createdAt: { gte: since30 } },
      orderBy: { createdAt: "desc" },
    });

    const views = events.filter((e) => e.type === "pageview");
    const clicks = events.filter((e) => e.type === "wa_click");

    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);
    const viewsToday = views.filter(
      (e) => e.createdAt >= startOfToday
    ).length;
    const clicksToday = clicks.filter(
      (e) => e.createdAt >= startOfToday
    ).length;

    // Grafik 14 hari terakhir
    const daily: { date: string; views: number; clicks: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const day = new Date(now);
      day.setDate(day.getDate() - i);
      day.setHours(0, 0, 0, 0);
      const next = new Date(day.getTime() + 24 * 60 * 60 * 1000);
      daily.push({
        date: day.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "short",
        }),
        views: views.filter((e) => e.createdAt >= day && e.createdAt < next)
          .length,
        clicks: clicks.filter((e) => e.createdAt >= day && e.createdAt < next)
          .length,
      });
    }

    const countBy = (arr: typeof events, key: "path" | "referrer") => {
      const map = new Map<string, number>();
      arr.forEach((e) => {
        const k = e[key] || "-";
        map.set(k, (map.get(k) || 0) + 1);
      });
      return [...map.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6)
        .map(([name, count]) => ({ name, count }));
    };

    const devices = {
      mobile: views.filter((e) => e.device === "mobile").length,
      desktop: views.filter((e) => e.device === "desktop").length,
    };

    const conversion =
      views.length > 0
        ? ((clicks.length / views.length) * 100).toFixed(1)
        : "0";

    return NextResponse.json({
      totals: {
        views30: views.length,
        clicks30: clicks.length,
        conversion,
        viewsToday,
        clicksToday,
      },
      daily,
      topPages: countBy(views, "path"),
      topReferrers: countBy(views, "referrer"),
      devices,
      recent: events.slice(0, 12).map((e) => ({
        type: e.type,
        path: e.path,
        referrer: e.referrer,
        device: e.device,
        createdAt: e.createdAt,
      })),
    });
  } catch {
    return NextResponse.json(
      { error: "Gagal memuat analytics." },
      { status: 500 }
    );
  }
}
