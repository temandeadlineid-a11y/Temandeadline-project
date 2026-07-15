"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn, buildWaLink } from "@/lib/utils";
import { trackWaClick } from "@/components/public/AnalyticsTracker";
import { sendInboxMessage } from "@/lib/sendInboxMessage";

const links = [
  { href: "/", label: "Beranda" },
  { href: "/layanan", label: "Layanan" },
  { href: "/testimoni", label: "Testimoni" },
  { href: "/faq", label: "FAQ" },
];

export function Navbar({
  whatsapp,
  waMessage,
}: {
  whatsapp: string;
  waMessage: string;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Tutup menu mobile otomatis setiap pindah halaman
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/85 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="text-xl font-extrabold tracking-tight text-navy-800"
        >
          Teman<span className="text-pink-600">Deadline</span>
          <span className="text-pink-600">.</span>
        </Link>

        {/* Menu desktop */}
        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "relative py-1 text-sm font-medium transition-colors",
                  active
                    ? "text-navy-800"
                    : "text-slate-500 hover:text-navy-800"
                )}
              >
                {l.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-pink-600 transition-all duration-300",
                    active ? "w-full" : "w-0"
                  )}
                />
              </Link>
            );
          })}
          <a
            href={buildWaLink(whatsapp, waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackWaClick(pathname);
              sendInboxMessage({ detail: waMessage, source: pathname || "/" });
            }}
            className="rounded-full bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-pinkglow transition-all duration-200 hover:-translate-y-0.5 hover:bg-pink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
          >
            Konsultasi Gratis
          </a>
        </div>

        {/* Tombol menu mobile */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-navy-800 transition-colors hover:bg-slate-100 md:hidden"
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                pathname === l.href
                  ? "bg-pink-50 text-pink-700"
                  : "text-slate-600 hover:bg-slate-50"
              )}
            >
              {l.label}
            </Link>
          ))}
          <a
            href={buildWaLink(whatsapp, waMessage)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              trackWaClick(pathname);
              sendInboxMessage({ detail: waMessage, source: pathname || "/" });
            }}
            className="mt-3 block rounded-full bg-pink-600 px-5 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-pink-700"
          >
            Konsultasi Gratis
          </a>
        </div>
      )}
    </header>
  );
}
