"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { MessageCircle, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackWaClick } from "@/components/public/AnalyticsTracker";
import { sendInboxMessage } from "@/lib/sendInboxMessage";

// Tombol ini TIDAK membuka WhatsApp langsung. Pesan dicatat ke "Pesan
// Masuk" admin dulu, supaya admin bisa saring & balas dari sana.

type Props = {
  message: string;
  label?: string;
  variant?: "primary" | "outline" | "navy";
  size?: "md" | "lg";
  className?: string;
};

export function WhatsAppButton({
  message,
  label = "Konsultasi Gratis via WhatsApp",
  variant = "primary",
  size = "lg",
  className,
}: Props) {
  const pathname = usePathname();
  const [sent, setSent] = useState(false);

  function handleClick() {
    if (sent) return;
    trackWaClick(pathname || "/");
    sendInboxMessage({ detail: message, source: pathname || "/" });
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2 disabled:cursor-default disabled:hover:translate-y-0",
        size === "lg" ? "px-7 py-3.5 text-base" : "px-5 py-2.5 text-sm",
        variant === "primary" &&
          "bg-pink-600 text-white shadow-pinkglow hover:bg-pink-700",
        variant === "outline" &&
          "border border-slate-300 bg-white text-navy-800 hover:border-pink-300 hover:bg-pink-50",
        variant === "navy" &&
          "bg-white text-navy-800 shadow-lift hover:bg-pink-50",
        className
      )}
      disabled={sent}
    >
      {sent ? (
        <>
          <Check className="h-5 w-5" />
          Pesan terkirim, kami segera balas!
        </>
      ) : (
        <>
          <MessageCircle className="h-5 w-5" />
          {label}
        </>
      )}
    </button>
  );
}
