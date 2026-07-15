"use client";

import type { ReactNode } from "react";
import { trackWaClick } from "@/components/public/AnalyticsTracker";
import { sendInboxMessage } from "@/lib/sendInboxMessage";

// Kartu channel kontak. Khusus channel WhatsApp, klik juga dicatat
// sebagai pesan masuk & event analytics (channel lain tidak perlu).
// Ikon dirender di server component pemanggil lalu dikirim sebagai
// children biasa — komponen (function) Lucide tidak bisa dikirim
// langsung sebagai prop lintas server/client boundary.

export function ContactChannelLink({
  icon,
  title,
  value,
  note,
  href,
  waMessage,
}: {
  icon: ReactNode;
  title: string;
  value: string;
  note: string;
  href: string;
  waMessage?: string;
}) {
  function handleClick() {
    if (!waMessage) return;
    trackWaClick("/kontak");
    sendInboxMessage({ detail: waMessage, source: "/kontak" });
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-soft"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-50">
        {icon}
      </div>
      <div>
        <div className="font-bold text-navy-800">{title}</div>
        <div className="text-sm text-slate-600">{value}</div>
        <div className="mt-0.5 text-xs text-slate-400">{note}</div>
      </div>
    </a>
  );
}
