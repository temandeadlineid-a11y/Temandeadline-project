"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { Check } from "lucide-react";
import { trackWaClick } from "@/components/public/AnalyticsTracker";
import { sendInboxMessage } from "@/lib/sendInboxMessage";

// Kartu channel kontak. Channel WhatsApp TIDAK membuka wa.me langsung —
// klik-nya mencatat pesan ke "Pesan Masuk" admin dulu. Channel lain
// (Email, Instagram) tetap link keluar biasa.
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
  const [sent, setSent] = useState(false);

  const className =
    "flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-soft";

  const body = (
    <>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-50">
        {sent ? <Check className="h-5 w-5 text-emerald-500" /> : icon}
      </div>
      <div>
        <div className="font-bold text-navy-800">{title}</div>
        <div className="text-sm text-slate-600">
          {sent ? "Pesan terkirim, kami segera balas!" : value}
        </div>
        {!sent && <div className="mt-0.5 text-xs text-slate-400">{note}</div>}
      </div>
    </>
  );

  if (waMessage) {
    return (
      <button
        type="button"
        disabled={sent}
        onClick={() => {
          if (sent) return;
          trackWaClick("/kontak");
          sendInboxMessage({ detail: waMessage, source: "/kontak" });
          setSent(true);
          setTimeout(() => setSent(false), 5000);
        }}
        className={`w-full ${className} disabled:cursor-default`}
      >
        {body}
      </button>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {body}
    </a>
  );
}
