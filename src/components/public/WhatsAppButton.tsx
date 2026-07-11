"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { buildWaLink, cn } from "@/lib/utils";
import { trackWaClick } from "@/components/public/AnalyticsTracker";

type Props = {
  whatsapp: string;
  message: string;
  label?: string;
  variant?: "primary" | "outline" | "navy";
  size?: "md" | "lg";
  className?: string;
};

export function WhatsAppButton({
  whatsapp,
  message,
  label = "Konsultasi Gratis via WhatsApp",
  variant = "primary",
  size = "lg",
  className,
}: Props) {
  const pathname = usePathname();

  return (
    <a
      href={buildWaLink(whatsapp, message)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWaClick(pathname || "/")}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2",
        size === "lg" ? "px-7 py-3.5 text-base" : "px-5 py-2.5 text-sm",
        variant === "primary" &&
          "bg-pink-600 text-white shadow-pinkglow hover:bg-pink-700",
        variant === "outline" &&
          "border border-slate-300 bg-white text-navy-800 hover:border-pink-300 hover:bg-pink-50",
        variant === "navy" &&
          "bg-white text-navy-800 shadow-lift hover:bg-pink-50",
        className
      )}
    >
      <MessageCircle className="h-5 w-5" />
      {label}
    </a>
  );
}
