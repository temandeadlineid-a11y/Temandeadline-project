"use client";

import { useEffect, useState } from "react";
import { Loader2, Inbox, Check, Trash2, MessageCircle } from "lucide-react";
import { Card, PageHeader, Badge } from "@/components/admin/ui";
import { buildWaLink, formatDateID } from "@/lib/utils";

type Message = {
  id: string;
  name: string;
  phone: string;
  service: string;
  detail: string;
  source: string;
  status: string;
  createdAt: string;
};

type Filter = "all" | "new" | "read";

const POLL_INTERVAL_MS = 8000;

export function MessagesInbox() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);

  async function load(showSpinner: boolean) {
    if (showSpinner) setLoading(true);
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch {
      // Polling gagal sesekali tidak masalah, dicoba lagi di interval berikutnya
    } finally {
      if (showSpinner) setLoading(false);
    }
  }

  // Ambil sekali di awal (dengan spinner), lalu polling diam-diam di
  // latar belakang supaya pesan baru muncul otomatis tanpa refresh.
  // Berhenti polling saat tab tidak aktif biar hemat request.
  useEffect(() => {
    load(true);

    const interval = setInterval(() => {
      if (document.visibilityState === "visible") load(false);
    }, POLL_INTERVAL_MS);

    function handleVisibility() {
      if (document.visibilityState === "visible") load(false);
    }
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  async function markStatus(id: string, status: "new" | "read") {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
    await fetch(`/api/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
  }

  async function remove(id: string) {
    if (!confirm("Hapus pesan ini?")) return;
    setMessages((prev) => prev.filter((m) => m.id !== id));
    await fetch(`/api/messages/${id}`, { method: "DELETE" });
  }

  const filtered = messages.filter((m) =>
    filter === "all" ? true : m.status === filter
  );
  const newCount = messages.filter((m) => m.status === "new").length;

  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "Semua", count: messages.length },
    { key: "new", label: "Baru", count: newCount },
    { key: "read", label: "Dibaca", count: messages.length - newCount },
  ];

  if (loading) {
    return (
      <Card className="flex items-center justify-center py-20">
        <Loader2 className="h-7 w-7 animate-spin text-pink-500" />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pesan Masuk"
        description={
          <>
            Semua yang masuk lewat tombol WhatsApp & form konsultasi di
            website, sebelum kamu balas.{" "}
            <span className="inline-flex items-center gap-1.5 text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Diperbarui otomatis
            </span>
          </>
        }
      />

      <div className="flex gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setFilter(t.key)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              filter === t.key
                ? "bg-pink-600 text-white"
                : "bg-white text-slate-500 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Card className="flex flex-col items-center justify-center py-16 text-center">
          <Inbox className="h-8 w-8 text-slate-300" />
          <h2 className="mt-3 font-bold text-navy-800">Belum ada pesan</h2>
          <p className="mt-1 text-sm text-slate-400">
            Pesan akan muncul di sini setiap ada pengunjung klik tombol
            WhatsApp atau kirim form konsultasi.
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((m) => (
            <Card key={m.id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-bold text-navy-800">
                      {m.name || "Anonim"}
                    </span>
                    {m.phone && (
                      <span className="text-xs text-slate-400">{m.phone}</span>
                    )}
                    {m.service && <Badge tone="pink">{m.service}</Badge>}
                    <Badge tone={m.status === "new" ? "green" : "slate"}>
                      {m.status === "new" ? "Baru" : "Dibaca"}
                    </Badge>
                  </div>
                  <p className="mt-2 whitespace-pre-line text-sm text-slate-600">
                    {m.detail}
                  </p>
                  <p className="mt-2 text-xs text-slate-400">
                    Dari halaman {m.source || "/"} &bull;{" "}
                    {formatDateID(m.createdAt)}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {m.phone && (
                    <a
                      href={buildWaLink(
                        m.phone,
                        `Halo ${m.name || "kak"}, terima kasih sudah menghubungi TemanDeadline${
                          m.service ? ` mengenai layanan ${m.service}` : ""
                        }.`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => markStatus(m.id, "read")}
                      className="inline-flex items-center gap-1.5 rounded-full bg-pink-50 px-3 py-1.5 text-xs font-semibold text-pink-700 transition-colors hover:bg-pink-100"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      Balas
                    </a>
                  )}
                  {m.status === "new" ? (
                    <button
                      onClick={() => markStatus(m.id, "read")}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-50"
                    >
                      <Check className="h-3.5 w-3.5" />
                      Tandai dibaca
                    </button>
                  ) : (
                    <button
                      onClick={() => markStatus(m.id, "new")}
                      className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-500 transition-colors hover:bg-slate-50"
                    >
                      Tandai baru
                    </button>
                  )}
                  <button
                    onClick={() => remove(m.id)}
                    aria-label="Hapus pesan"
                    className="inline-flex items-center justify-center rounded-full border border-slate-200 p-1.5 text-slate-400 transition-colors hover:border-pink-200 hover:bg-pink-50 hover:text-pink-600"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
