"use client";

import { useState } from "react";
import { Loader2, Save, Check, KeyRound } from "lucide-react";
import { Card, PageHeader } from "@/components/admin/ui";

export function PasswordSettings() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-800 placeholder:text-slate-400 transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20";
  const labelClass = "block text-sm font-semibold text-navy-800";

  async function handleSubmit() {
    setError("");
    setSaved(false);

    if (newPassword.length < 8) {
      setError("Password baru minimal 8 karakter.");
      return;
    }
    if (newPassword !== confirm) {
      setError("Konfirmasi password baru tidak sama.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/auth/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal mengganti password.");
        setSaving(false);
        return;
      }
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Terjadi kesalahan jaringan. Coba lagi.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Pengaturan"
        description="Kelola keamanan akun admin kamu."
      />

      <Card className="max-w-lg p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-50">
            <KeyRound className="h-5 w-5 text-pink-600" />
          </div>
          <div>
            <h2 className="font-bold text-navy-800">Ganti Password</h2>
            <p className="text-xs text-slate-400">
              Gunakan password yang kuat dan tidak dipakai di situs lain.
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 rounded-xl border border-pink-200 bg-pink-50 px-4 py-3 text-sm text-pink-700">
            {error}
          </div>
        )}

        <div className="mt-5 space-y-4">
          <div>
            <label htmlFor="currentPassword" className={labelClass}>
              Password Saat Ini
            </label>
            <input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              autoComplete="current-password"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="newPassword" className={labelClass}>
              Password Baru
            </label>
            <input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimal 8 karakter"
              autoComplete="new-password"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className={labelClass}>
              Ulangi Password Baru
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="Ketik ulang password baru"
              autoComplete="new-password"
              className={inputClass}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={saving}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-pinkglow transition-all hover:bg-pink-700 disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : saved ? (
            <Check className="h-4 w-4" />
          ) : (
            <Save className="h-4 w-4" />
          )}
          {saving ? "Menyimpan..." : saved ? "Tersimpan!" : "Simpan Password Baru"}
        </button>
      </Card>
    </div>
  );
}
