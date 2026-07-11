"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Kirim event tracking ke API internal.
// Dipakai untuk: pageview otomatis + klik tombol WhatsApp (konversi).

function send(type: "pageview" | "wa_click", path: string) {
  try {
    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type,
        path,
        referrer: document.referrer || "",
      }),
      keepalive: true,
    }).catch(() => {});
  } catch {}
}

export function trackWaClick(path: string) {
  send("wa_click", path);
}

export function AnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    if (!pathname || pathname.startsWith("/admin")) return;
    send("pageview", pathname);
  }, [pathname]);

  return null;
}
