import Link from "next/link";
import {
  Layers,
  MessageSquareQuote,
  HelpCircle,
  Users,
  Eye,
  MessageCircle,
  ArrowRight,
  BarChart3,
  PenSquare,
} from "lucide-react";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";
import { Card } from "@/components/admin/ui";
import { SeedButton } from "@/components/admin/SeedButton";

export const dynamic = "force-dynamic";

async function getCounts() {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [services, testimonials, faqs, team, viewsToday, clicksToday] =
      await Promise.all([
        prisma.service.count(),
        prisma.testimonial.count(),
        prisma.faq.count(),
        prisma.teamMember.count(),
        prisma.event.count({
          where: { type: "pageview", createdAt: { gte: startOfToday } },
        }),
        prisma.event.count({
          where: { type: "wa_click", createdAt: { gte: startOfToday } },
        }),
      ]);
    return { ok: true, services, testimonials, faqs, team, viewsToday, clicksToday };
  } catch {
    return { ok: false, services: 0, testimonials: 0, faqs: 0, team: 0, viewsToday: 0, clicksToday: 0 };
  }
}

export default async function AdminDashboardPage() {
  const [session, counts] = await Promise.all([getAdminSession(), getCounts()]);
  const contentEmpty =
    counts.ok &&
    counts.services + counts.testimonials + counts.faqs === 0;

  const shortcuts = [
    { href: "/admin/layanan", label: "Layanan", count: counts.services, icon: Layers },
    { href: "/admin/testimoni", label: "Testimoni", count: counts.testimonials, icon: MessageSquareQuote },
    { href: "/admin/faq", label: "FAQ", count: counts.faqs, icon: HelpCircle },
    { href: "/admin/tim", label: "Anggota Tim", count: counts.team, icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-navy-800 md:text-3xl">
          Halo, {session?.name || "Admin"} 👋
        </h1>
        <p className="mt-1.5 text-sm text-slate-500">
          Selamat datang di panel kelola TemanDeadline. Semua perubahan
          langsung tampil di website.
        </p>
      </div>

      {!counts.ok && (
        <div className="rounded-xl border border-pink-200 bg-pink-50 px-4 py-3 text-sm text-pink-700">
          Database belum terhubung. Pastikan DATABASE_URL sudah benar di
          pengaturan Vercel.
        </div>
      )}

      {contentEmpty && (
        <Card className="flex flex-col items-start justify-between gap-4 border-pink-200 bg-pink-50/50 p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-bold text-navy-800">
              Konten masih kosong nih
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Isi otomatis dengan data contoh (layanan, testimoni, FAQ) biar
              website langsung terlihat lengkap. Nanti tinggal diedit.
            </p>
          </div>
          <SeedButton />
        </Card>
      )}

      {/* Statistik hari ini */}
      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-navy-50">
            <Eye className="h-6 w-6 text-navy-700" />
          </div>
          <div>
            <div className="font-display text-3xl font-semibold text-navy-800">
              {counts.viewsToday}
            </div>
            <div className="text-sm text-slate-500">Kunjungan hari ini</div>
          </div>
        </Card>
        <Card className="flex items-center gap-4 p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-pink-50">
            <MessageCircle className="h-6 w-6 text-pink-600" />
          </div>
          <div>
            <div className="font-display text-3xl font-semibold text-navy-800">
              {counts.clicksToday}
            </div>
            <div className="text-sm text-slate-500">
              Klik WhatsApp hari ini
            </div>
          </div>
        </Card>
      </div>

      {/* Pintasan kelola konten */}
      <div>
        <h2 className="font-bold text-navy-800">Kelola Konten</h2>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shortcuts.map((s) => (
            <Link key={s.href} href={s.href}>
              <Card className="group flex items-center justify-between p-5 transition-all hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-soft">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 transition-colors group-hover:bg-pink-50">
                    <s.icon className="h-5 w-5 text-slate-400 transition-colors group-hover:text-pink-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-navy-800">{s.label}</div>
                    <div className="text-xs text-slate-400">
                      {s.count} item
                    </div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-pink-600" />
              </Card>
            </Link>
          ))}
          <Link href="/admin/konten">
            <Card className="group flex items-center justify-between p-5 transition-all hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-soft">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 transition-colors group-hover:bg-pink-50">
                  <PenSquare className="h-5 w-5 text-slate-400 transition-colors group-hover:text-pink-600" />
                </div>
                <div>
                  <div className="font-semibold text-navy-800">
                    Konten Situs
                  </div>
                  <div className="text-xs text-slate-400">
                    Hero, statistik, kontak
                  </div>
                </div>
              </div>
              <ArrowRight className="h-4 w-4 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-pink-600" />
            </Card>
          </Link>
        </div>
      </div>

      <Link href="/admin/analytics">
        <Card className="group mt-1 flex items-center justify-between bg-navy-900 p-6 transition-all hover:-translate-y-0.5 hover:shadow-lift">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-pink-600/15">
              <BarChart3 className="h-5 w-5 text-pink-400" />
            </div>
            <div>
              <div className="font-bold text-white">Lihat Analytics Lengkap</div>
              <div className="text-sm text-slate-400">
                Tren kunjungan, sumber trafik, dan conversion rate
              </div>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 text-slate-500 transition-all group-hover:translate-x-1 group-hover:text-pink-400" />
        </Card>
      </Link>
    </div>
  );
}
