"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  PenSquare,
  Layers,
  Inbox,
  MessageSquareQuote,
  HelpCircle,
  Users,
  ExternalLink,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menu = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pesan", label: "Pesan Masuk", icon: Inbox },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/konten", label: "Konten Situs", icon: PenSquare },
  { href: "/admin/layanan", label: "Layanan", icon: Layers },
  { href: "/admin/testimoni", label: "Testimoni", icon: MessageSquareQuote },
  { href: "/admin/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/tim", label: "Tim (Internal)", icon: Users },
];

export function AdminSidebar({ name }: { name: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const nav = (
    <nav className="flex h-full flex-col">
      <div className="px-5 pb-5 pt-6">
        <Link href="/admin" className="text-lg font-extrabold tracking-tight text-navy-800">
          Teman<span className="text-pink-600">Deadline</span>
          <span className="text-pink-600">.</span>
        </Link>
        <p className="mt-0.5 text-xs text-slate-400">Panel Admin</p>
      </div>

      <div className="flex-1 space-y-1 overflow-y-auto px-3">
        {menu.map((m) => {
          const active =
            m.href === "/admin"
              ? pathname === "/admin"
              : pathname.startsWith(m.href);
          return (
            <Link
              key={m.href}
              href={m.href}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                active
                  ? "bg-pink-50 text-pink-700"
                  : "text-slate-500 hover:bg-slate-50 hover:text-navy-800"
              )}
            >
              <m.icon
                className={cn("h-4.5 w-4.5 h-[18px] w-[18px]", active ? "text-pink-600" : "text-slate-400")}
              />
              {m.label}
            </Link>
          );
        })}
      </div>

      <div className="space-y-1 border-t border-slate-100 p-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-navy-800"
        >
          <ExternalLink className="h-[18px] w-[18px] text-slate-400" />
          Lihat Situs
        </a>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-500 transition-colors hover:bg-pink-50 hover:text-pink-700"
        >
          <LogOut className="h-[18px] w-[18px]" />
          Keluar ({name})
        </button>
      </div>
    </nav>
  );

  return (
    <>
      {/* Topbar mobile */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
        <Link href="/admin" className="font-extrabold tracking-tight text-navy-800">
          Teman<span className="text-pink-600">Deadline</span>
          <span className="text-pink-600">.</span>{" "}
          <span className="text-xs font-medium text-slate-400">Admin</span>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg p-2 text-navy-800 hover:bg-slate-100"
          aria-label={open ? "Tutup menu" : "Buka menu"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Drawer mobile */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-navy-900/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-72 border-r border-slate-200 bg-white shadow-lift">
            {nav}
          </aside>
        </div>
      )}

      {/* Sidebar desktop */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white lg:block">
        {nav}
      </aside>
    </>
  );
}
