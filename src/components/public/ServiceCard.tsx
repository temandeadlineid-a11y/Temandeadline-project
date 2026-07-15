"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Check } from "lucide-react";
import { trackWaClick } from "@/components/public/AnalyticsTracker";
import { sendInboxMessage } from "@/lib/sendInboxMessage";

// Kartu layanan: border tipis, hover terangkat halus, hierarki jelas.
// Seluruh kartu bisa diklik untuk tanya-tanya layanan ini — pesan masuk
// ke "Pesan Masuk" admin dulu, TIDAK langsung membuka WhatsApp.

export function ServiceCard({
  emoji,
  title,
  description,
}: {
  emoji: string;
  title: string;
  description: string;
}) {
  const pathname = usePathname();
  const [sent, setSent] = useState(false);

  function handleClick() {
    if (sent) return;
    const message = `Halo TemanDeadline! Saya tertarik dengan layanan ${title}, boleh dibantu?`;
    trackWaClick(pathname || "/");
    sendInboxMessage({ service: title, detail: message, source: pathname || "/" });
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={sent}
      className="group block w-full rounded-2xl border border-slate-200 bg-white p-6 text-left transition-all duration-300 hover:-translate-y-1 hover:border-pink-200 hover:shadow-lift disabled:cursor-default disabled:hover:translate-y-0"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50 text-2xl transition-colors group-hover:bg-pink-100">
        <span aria-hidden>{emoji}</span>
      </div>
      <h3 className="mt-4 text-lg font-bold text-navy-800">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        {description}
      </p>
      {sent ? (
        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600">
          <Check className="h-4 w-4" />
          Pesan terkirim, kami segera balas!
        </div>
      ) : (
        <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-pink-600">
          <MessageCircle className="h-4 w-4" />
          Tanya via WhatsApp
        </div>
      )}
    </button>
  );
}
