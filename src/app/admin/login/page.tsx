"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";

const ADMIN_USERNAME = "admin";

export default function AdminLoginPage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Kalau belum ada admin sama sekali, arahkan ke halaman setup dulu
  useEffect(() => {
    fetch("/api/auth/setup")
      .then((r) => r.json())
      .then((d) => {
        if (d.needsSetup) router.replace("/admin/setup");
        else setChecking(false);
      })
      .catch(() => setChecking(false));
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: ADMIN_USERNAME, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal masuk. Coba lagi.");
        setLoading(false);
        return;
      }
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
    "w-full rounded-xl border border-navy-600 bg-navy-800 px-4 py-3 pl-11 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20";

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-900 px-4">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-pink-600/15 blur-3xl" />
        <div className="absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-pink-600/10 blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        <div className="text-center">
          <div className="text-2xl font-extrabold tracking-tight text-white">
            Teman<span className="text-pink-400">Deadline</span>
            <span className="text-pink-400">.</span>
          </div>
          <p className="mt-1.5 text-sm text-slate-400">Panel Admin</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mt-8 rounded-3xl border border-navy-700 bg-navy-800/60 p-7 backdrop-blur"
        >
          <h1 className="font-display text-xl font-semibold text-white">
            Masuk ke Dashboard
          </h1>

          {error && (
            <div className="mt-4 rounded-xl border border-pink-500/30 bg-pink-500/10 px-4 py-3 text-sm text-pink-300">
              {error}
            </div>
          )}

          <div className="mt-5 space-y-4">
            <div className="relative">
              <Lock className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
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
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-slate-500">
          Halaman ini khusus pengelola TemanDeadline.
        </p>
      </div>
    </div>
  );
}
