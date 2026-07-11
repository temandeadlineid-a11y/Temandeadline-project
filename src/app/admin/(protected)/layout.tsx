import { getAdminSession } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

// Middleware sudah menjaga rute /admin — layout ini lapisan kedua
// sekaligus tempat sidebar dipasang untuk semua halaman admin.

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getAdminSession();

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminSidebar name={session?.name || "Admin"} />
      <div className="lg:pl-64">
        <main className="mx-auto max-w-6xl p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
