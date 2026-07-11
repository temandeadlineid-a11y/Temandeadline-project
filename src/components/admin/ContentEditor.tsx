"use client";

import { useEffect, useState } from "react";
import { Loader2, Save, Check } from "lucide-react";
import { Card, PageHeader } from "@/components/admin/ui";

// Semua teks penting di halaman publik bisa diubah dari sini,
// tanpa perlu menyentuh kode sama sekali.

type Group = {
  title: string;
  desc: string;
  fields: { key: string; label: string; textarea?: boolean; hint?: string }[];
};

const groups: Group[] = [
  {
    title: "Hero Beranda",
    desc: "Bagian paling atas yang pertama dilihat pengunjung.",
    fields: [
      { key: "heroBadge", label: "Badge Kecil" },
      { key: "heroTitle", label: "Judul Utama" },
      {
        key: "heroAccent",
        label: "Judul Aksen (pink miring)",
        hint: "Bagian judul yang tampil miring berwarna pink.",
      },
      { key: "heroSubtitle", label: "Subjudul", textarea: true },
    ],
  },
  {
    title: "Statistik",
    desc: "Empat angka kebanggaan di bawah hero. Isi dengan data jujur.",
    fields: [
      { key: "statProjects", label: "Proyek Selesai" },
      { key: "statSatisfaction", label: "Klien Puas" },
      { key: "statRating", label: "Rating Klien" },
      { key: "statResponse", label: "Respon Chat" },
    ],
  },
  {
    title: "Kontak & WhatsApp",
    desc: "Nomor WA dipakai semua tombol konsultasi di website.",
    fields: [
      {
        key: "whatsapp",
        label: "Nomor WhatsApp",
        hint: "Format internasional tanpa +, contoh: 6281234567890",
      },
      { key: "waMessage", label: "Pesan WA Otomatis", textarea: true },
      { key: "email", label: "Email" },
      { key: "instagram", label: "Instagram (tanpa @)" },
      { key: "jamOperasional", label: "Jam Operasional" },
    ],
  },
  {
    title: "CTA Penutup",
    desc: "Ajakan terakhir di bagian bawah beranda.",
    fields: [
      { key: "ctaTitle", label: "Judul CTA" },
      { key: "ctaSubtitle", label: "Subjudul CTA", textarea: true },
    ],
  },
];

export function ContentEditor() {
  const [content, setContent] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/content")
      .then((r) => r.json())
      .then((d) => setContent(d))
      .catch(() => setError("Gagal memuat konten."))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch("/api/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      if (!res.ok) throw new Error();
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch {
      setError("Gagal menyimpan. Coba lagi.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-navy-800 placeholder:text-slate-400 transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20";

  if (loading) {
    return (
      <Card className="flex items-center justify-center py-20">
        <Loader2 className="h-7 w-7 animate-spin text-pink-500" />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Konten Situs"
        description="Ubah teks di halaman publik. Perubahan langsung tampil setelah disimpan."
        action={
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-full bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-pinkglow transition-all hover:bg-pink-700 disabled:opacity-60"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : saved ? (
              <Check className="h-4 w-4" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {saving ? "Menyimpan..." : saved ? "Tersimpan!" : "Simpan Semua"}
          </button>
        }
      />

      {error && (
        <div className="rounded-xl border border-pink-200 bg-pink-50 px-4 py-3 text-sm text-pink-700">
          {error}
        </div>
      )}

      <div className="grid gap-5 lg:grid-cols-2">
        {groups.map((g) => (
          <Card key={g.title} className="p-6">
            <h2 className="font-bold text-navy-800">{g.title}</h2>
            <p className="mt-0.5 text-xs text-slate-400">{g.desc}</p>
            <div className="mt-4 space-y-4">
              {g.fields.map((f) => (
                <div key={f.key}>
                  <label className="block text-sm font-semibold text-navy-800">
                    {f.label}
                  </label>
                  {f.textarea ? (
                    <textarea
                      rows={3}
                      value={content[f.key] ?? ""}
                      onChange={(e) =>
                        setContent({ ...content, [f.key]: e.target.value })
                      }
                      className={inputClass}
                    />
                  ) : (
                    <input
                      type="text"
                      value={content[f.key] ?? ""}
                      onChange={(e) =>
                        setContent({ ...content, [f.key]: e.target.value })
                      }
                      className={inputClass}
                    />
                  )}
                  {f.hint && (
                    <p className="mt-1 text-xs text-slate-400">{f.hint}</p>
                  )}
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
