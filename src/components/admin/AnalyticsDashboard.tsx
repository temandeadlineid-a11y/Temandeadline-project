"use client";

import { useEffect, useState } from "react";
import {
  Loader2,
  Eye,
  MessageCircle,
  TrendingUp,
  CalendarDays,
  Smartphone,
  Monitor,
} from "lucide-react";
import { Card, PageHeader, Badge } from "@/components/admin/ui";

// Analytics bawaan tanpa layanan pihak ketiga:
// data mentahnya dari tabel Event (pageview + klik WhatsApp).

type Data = {
  totals: {
    views30: number;
    clicks30: number;
    conversion: string;
    viewsToday: number;
    clicksToday: number;
  };
  daily: { date: string; views: number; clicks: number }[];
  topPages: { name: string; count: number }[];
  topReferrers: { name: string; count: number }[];
  devices: { mobile: number; desktop: number };
  recent: {
    type: string;
    path: string;
    referrer: string;
    device: string;
    createdAt: string;
  }[];
};

const pageLabels: Record<string, string> = {
  "/": "Beranda",
  "/layanan": "Layanan",
  "/harga": "Harga",
  "/testimoni": "Testimoni",
  "/faq": "FAQ",
  "/kontak": "Kontak",
};

export function AnalyticsDashboard() {
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/analytics")
      .then((r) => {
        if (!r.ok) throw new Error();
        return r.json();
      })
      .then(setData)
      .catch(() => setError("Gagal memuat data analytics."));
  }, []);

  if (error) {
    return (
      <div className="rounded-xl border border-pink-200 bg-pink-50 px-4 py-3 text-sm text-pink-700">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <Card className="flex items-center justify-center py-24">
        <Loader2 className="h-7 w-7 animate-spin text-pink-500" />
      </Card>
    );
  }

  const maxDaily = Math.max(1, ...data.daily.map((d) => d.views));
  const totalDevices = Math.max(1, data.devices.mobile + data.devices.desktop);
  const maxPage = Math.max(1, ...data.topPages.map((p) => p.count));
  const maxRef = Math.max(1, ...data.topReferrers.map((r) => r.count));

  const stats = [
    {
      icon: Eye,
      label: "Kunjungan (30 hari)",
      value: data.totals.views30,
      sub: `${data.totals.viewsToday} hari ini`,
    },
    {
      icon: MessageCircle,
      label: "Klik WhatsApp (30 hari)",
      value: data.totals.clicks30,
      sub: `${data.totals.clicksToday} hari ini`,
    },
    {
      icon: TrendingUp,
      label: "Conversion Rate",
      value: `${data.totals.conversion}%`,
      sub: "kunjungan → klik WA",
    },
    {
      icon: CalendarDays,
      label: "Rata-rata / Hari",
      value: Math.round(data.totals.views30 / 30),
      sub: "kunjungan per hari",
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analytics"
        description="Data pengunjung 30 hari terakhir, direkam langsung oleh website tanpa layanan pihak ketiga."
      />

      {/* Kartu ringkasan */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="p-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50">
              <s.icon className="h-5 w-5 text-pink-600" />
            </div>
            <div className="mt-3 font-display text-3xl font-semibold text-navy-800">
              {s.value}
            </div>
            <div className="mt-0.5 text-sm font-medium text-slate-500">
              {s.label}
            </div>
            <div className="text-xs text-slate-400">{s.sub}</div>
          </Card>
        ))}
      </div>

      {/* Grafik 14 hari */}
      <Card className="p-6">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-navy-800">Tren 14 Hari Terakhir</h2>
          <div className="flex items-center gap-4 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-navy-700" /> Kunjungan
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-sm bg-pink-500" /> Klik WA
            </span>
          </div>
        </div>
        <div className="mt-6 flex h-44 items-end gap-1.5 sm:gap-2">
          {data.daily.map((d, i) => (
            <div
              key={i}
              className="group relative flex flex-1 items-end justify-center gap-0.5"
              title={`${d.date}: ${d.views} kunjungan, ${d.clicks} klik WA`}
            >
              <div
                className="w-full max-w-[14px] rounded-t bg-navy-700 transition-colors group-hover:bg-navy-500"
                style={{ height: `${(d.views / maxDaily) * 100}%`, minHeight: d.views > 0 ? 4 : 1 }}
              />
              <div
                className="w-full max-w-[14px] rounded-t bg-pink-500 transition-colors group-hover:bg-pink-400"
                style={{ height: `${(d.clicks / maxDaily) * 100}%`, minHeight: d.clicks > 0 ? 4 : 1 }}
              />
            </div>
          ))}
        </div>
        <div className="mt-2 flex gap-1.5 sm:gap-2">
          {data.daily.map((d, i) => (
            <div
              key={i}
              className="flex-1 text-center text-[9px] text-slate-400 sm:text-[10px]"
            >
              {i % 2 === 0 ? d.date : ""}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid gap-5 lg:grid-cols-2">
        {/* Halaman terpopuler */}
        <Card className="p-6">
          <h2 className="font-bold text-navy-800">Halaman Terpopuler</h2>
          <div className="mt-4 space-y-3">
            {data.topPages.length === 0 && (
              <p className="text-sm text-slate-400">Belum ada data.</p>
            )}
            {data.topPages.map((p) => (
              <div key={p.name}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-navy-800">
                    {pageLabels[p.name] || p.name}
                  </span>
                  <span className="text-slate-400">{p.count}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-navy-700"
                    style={{ width: `${(p.count / maxPage) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Sumber trafik */}
        <Card className="p-6">
          <h2 className="font-bold text-navy-800">Sumber Trafik</h2>
          <div className="mt-4 space-y-3">
            {data.topReferrers.length === 0 && (
              <p className="text-sm text-slate-400">Belum ada data.</p>
            )}
            {data.topReferrers.map((r) => (
              <div key={r.name}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-navy-800">{r.name}</span>
                  <span className="text-slate-400">{r.count}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-pink-500"
                    style={{ width: `${(r.count / maxRef) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Perangkat */}
          <h2 className="mt-8 font-bold text-navy-800">Perangkat</h2>
          <div className="mt-4 flex gap-4">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 p-4">
              <Smartphone className="h-5 w-5 text-pink-600" />
              <div>
                <div className="font-display text-xl font-semibold text-navy-800">
                  {Math.round((data.devices.mobile / totalDevices) * 100)}%
                </div>
                <div className="text-xs text-slate-400">Mobile</div>
              </div>
            </div>
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 p-4">
              <Monitor className="h-5 w-5 text-navy-700" />
              <div>
                <div className="font-display text-xl font-semibold text-navy-800">
                  {Math.round((data.devices.desktop / totalDevices) * 100)}%
                </div>
                <div className="text-xs text-slate-400">Desktop</div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Aktivitas terbaru */}
      <Card className="p-6">
        <h2 className="font-bold text-navy-800">Aktivitas Terbaru</h2>
        {data.recent.length === 0 ? (
          <p className="mt-3 text-sm text-slate-400">
            Belum ada aktivitas. Bagikan link website-mu untuk mulai
            mendapatkan data.
          </p>
        ) : (
          <div className="mt-4 divide-y divide-slate-100">
            {data.recent.map((e, i) => (
              <div
                key={i}
                className="flex flex-wrap items-center gap-x-3 gap-y-1 py-2.5 text-sm"
              >
                {e.type === "wa_click" ? (
                  <Badge tone="pink">Klik WA</Badge>
                ) : (
                  <Badge tone="navy">Kunjungan</Badge>
                )}
                <span className="font-medium text-navy-800">
                  {pageLabels[e.path] || e.path}
                </span>
                <span className="text-slate-400">dari {e.referrer}</span>
                <span className="ml-auto text-xs text-slate-400">
                  {e.device} &bull;{" "}
                  {new Date(e.createdAt).toLocaleString("id-ID", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
