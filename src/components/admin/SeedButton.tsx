"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, Loader2, Check } from "lucide-react";

export function SeedButton() {
  const router = useRouter();
  const [state, setState] = useState<"idle" | "loading" | "done">("idle");

  async function handleSeed() {
    setState("loading");
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      if (!res.ok) throw new Error();
      setState("done");
      setTimeout(() => router.refresh(), 800);
    } catch {
      setState("idle");
      alert("Gagal mengisi data contoh. Coba lagi.");
    }
  }

  return (
    <button
      onClick={handleSeed}
      disabled={state !== "idle"}
      className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-pinkglow transition-all hover:bg-pink-700 disabled:opacity-70"
    >
      {state === "loading" ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : state === "done" ? (
        <Check className="h-4 w-4" />
      ) : (
        <Sparkles className="h-4 w-4" />
      )}
      {state === "loading"
        ? "Mengisi data..."
        : state === "done"
        ? "Berhasil!"
        : "Isi Data Contoh"}
    </button>
  );
}
