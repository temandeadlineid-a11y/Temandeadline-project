"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, ShieldCheck } from "lucide-react";

// Halaman ini hanya bisa dipakai SEKALI: saat database belum punya admin.
// Setelah admin pertama dibuat, halaman otomatis mengarah ke login.

const ADMIN_USERNAME = "admin";

export default function AdminSetupPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/auth/setup")
      .then((r) => r.json())
      .then((d) => {
        if (!d.needsSetup) router.replace("/admin/login");
        else setChecking(false);
      })
      .catch(() => setChecking(false));
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password minimal 8 karakter.");
      return;
    }
    if (password !== confirm) {
      setError("Konfirmasi password tidak sama.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/setup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username: ADMIN_USERNAME, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal membuat akun admin.");
        setLoading(false);
        return;
      }

      // Langsung login otomatis setelah setup berhasil
      await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: ADMIN_USERNAME, password }),
      });
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Terjadi kesalahan jaringan. Coba lagi.");
      setLoading(false);
    }
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-900">
        <Loader2 className="h-7 w-7 animate-spin text-pink-400" />
      </div>
    );
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-navy-600 bg-navy-800 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20";
  const labelClass = "block text-sm font-semibold text-slate-300";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-900 px-4 py-10">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-pink-600/15 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-600/15">
            <ShieldCheck className="h-6 w-6 text-pink-400" />
          </div>
          <h1 className="mt-4 font-display text-2xl font-semibold text-white">
            Setup Admin Pertama
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Buat akun pengelola untuk dashboard TemanDeadline. Halaman ini
            hanya muncul sekali dan terkunci otomatis setelahnya.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-7 rounded-3xl border border-navy-700 bg-navy-800/60 p-7 backdrop-blur"
        >
          {error && (
            <div className="mb-4 rounded-xl border border-pink-500/30 bg-pink-500/10 px-4 py-3 text-sm text-pink-300">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className={labelClass}>
                Nama Panggilan
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="cth: Admin TD"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="password" className={labelClass}>
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                autoComplete="new-password"
                required
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="confirm" className={labelClass}>
                Ulangi Password
              </label>
              <input
                id="confirm"
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Ketik ulang password"
                autoComplete="new-password"
                required
                className={inputClass}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-pink-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:bg-pink-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            {loading ? "Menyiapkan..." : "Buat Akun & Masuk"}
          </button>
        </form>
      </div>
    </div>
  );
}
