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

type PageSection = {
  page: string;
  groups: Group[];
};

const pages: PageSection[] = [
  {
    page: "Beranda",
    groups: [
      {
        title: "Hero",
        desc: "Bagian paling atas yang pertama dilihat pengunjung.",
        fields: [
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
        title: "Section Layanan (preview)",
        desc: "Judul pengantar sebelum daftar layanan.",
        fields: [
          { key: "layananSectionEyebrow", label: "Label Kecil" },
          { key: "layananSectionTitle", label: "Judul" },
          { key: "layananSectionAccent", label: "Judul Aksen (pink)" },
          { key: "layananSectionDesc", label: "Deskripsi", textarea: true },
        ],
      },
      {
        title: "Section Kenapa TemanDeadline",
        desc: "Empat alasan kenapa harus pakai TemanDeadline.",
        fields: [
          { key: "whyUsEyebrow", label: "Label Kecil" },
          { key: "whyUsTitle", label: "Judul" },
          { key: "whyUsAccent", label: "Judul Aksen (pink)" },
          { key: "whyUs1Title", label: "Kartu 1 - Judul" },
          { key: "whyUs1Desc", label: "Kartu 1 - Deskripsi", textarea: true },
          { key: "whyUs2Title", label: "Kartu 2 - Judul" },
          { key: "whyUs2Desc", label: "Kartu 2 - Deskripsi", textarea: true },
          { key: "whyUs3Title", label: "Kartu 3 - Judul" },
          { key: "whyUs3Desc", label: "Kartu 3 - Deskripsi", textarea: true },
          { key: "whyUs4Title", label: "Kartu 4 - Judul" },
          { key: "whyUs4Desc", label: "Kartu 4 - Deskripsi", textarea: true },
        ],
      },
      {
        title: "Section Cara Kerja",
        desc: "Empat langkah dari konsultasi sampai tugas selesai.",
        fields: [
          { key: "howEyebrow", label: "Label Kecil" },
          { key: "howTitle", label: "Judul" },
          { key: "howAccent", label: "Judul Aksen (pink)" },
          { key: "howDesc", label: "Deskripsi", textarea: true },
          { key: "how1Title", label: "Langkah 1 - Judul" },
          { key: "how1Desc", label: "Langkah 1 - Deskripsi", textarea: true },
          { key: "how2Title", label: "Langkah 2 - Judul" },
          { key: "how2Desc", label: "Langkah 2 - Deskripsi", textarea: true },
          { key: "how3Title", label: "Langkah 3 - Judul" },
          { key: "how3Desc", label: "Langkah 3 - Deskripsi", textarea: true },
          { key: "how4Title", label: "Langkah 4 - Judul" },
          { key: "how4Desc", label: "Langkah 4 - Deskripsi", textarea: true },
        ],
      },
      {
        title: "Section Testimoni (preview)",
        desc: "Judul pengantar sebelum kartu testimoni.",
        fields: [
          { key: "testimoniSectionEyebrow", label: "Label Kecil" },
          { key: "testimoniSectionTitle", label: "Judul" },
          { key: "testimoniSectionAccent", label: "Judul Aksen (pink)" },
          { key: "testimoniSectionDesc", label: "Deskripsi", textarea: true },
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
    ],
  },
  {
    page: "Layanan",
    groups: [
      {
        title: "Hero",
        desc: "Bagian atas halaman /layanan.",
        fields: [
          { key: "layananHeroEyebrow", label: "Label Kecil" },
          { key: "layananHeroTitle", label: "Judul" },
          { key: "layananHeroAccent", label: "Judul Aksen (pink)" },
          { key: "layananHeroDesc", label: "Deskripsi", textarea: true },
        ],
      },
    ],
  },
  {
    page: "Testimoni",
    groups: [
      {
        title: "Hero",
        desc: "Bagian atas halaman /testimoni.",
        fields: [
          { key: "testimoniHeroEyebrow", label: "Label Kecil" },
          { key: "testimoniHeroTitle", label: "Judul" },
          { key: "testimoniHeroAccent", label: "Judul Aksen (pink)" },
          { key: "testimoniHeroDesc", label: "Deskripsi", textarea: true },
        ],
      },
    ],
  },
  {
    page: "FAQ",
    groups: [
      {
        title: "Hero",
        desc: "Bagian atas halaman /faq.",
        fields: [
          { key: "faqHeroEyebrow", label: "Label Kecil" },
          { key: "faqHeroTitle", label: "Judul" },
          { key: "faqHeroAccent", label: "Judul Aksen (pink)" },
          { key: "faqHeroDesc", label: "Deskripsi", textarea: true },
        ],
      },
      {
        title: "CTA Bawah",
        desc: "Ajakan di bagian bawah daftar FAQ.",
        fields: [
          { key: "faqCtaTitle", label: "Judul" },
          { key: "faqCtaDesc", label: "Deskripsi", textarea: true },
          { key: "faqCtaButtonLabel", label: "Label Tombol" },
        ],
      },
    ],
  },
  {
    page: "Kontak",
    groups: [
      {
        title: "Hero",
        desc: "Bagian atas halaman /kontak.",
        fields: [
          { key: "kontakHeroEyebrow", label: "Label Kecil" },
          { key: "kontakHeroTitle", label: "Judul" },
          { key: "kontakHeroAccent", label: "Judul Aksen (pink)" },
          { key: "kontakHeroDesc", label: "Deskripsi", textarea: true },
        ],
      },
    ],
  },
  {
    page: "Semua Halaman",
    groups: [
      {
        title: "Kontak & WhatsApp",
        desc: "Nomor WA dipakai semua tombol konsultasi di website.",
        fields: [
          {
            key: "whatsapp",
            label: "Nomor WhatsApp",
            hint: "Format internasional tanpa +, contoh: 6281234567890",
          },
          { key: "waMessage", label: "Pesan WA Otomatis (default)", textarea: true },
          { key: "email", label: "Email" },
          { key: "instagram", label: "Instagram (tanpa @)" },
          { key: "jamOperasional", label: "Jam Operasional" },
        ],
      },
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

      <div className="space-y-8">
        {pages.map((p) => (
          <div key={p.page}>
            <h2 className="font-display text-lg font-semibold text-navy-800">
              Halaman: {p.page}
            </h2>
            <div className="mt-3 grid gap-5 lg:grid-cols-2">
              {p.groups.map((g) => (
                <Card key={g.title} className="p-6">
                  <h3 className="font-bold text-navy-800">{g.title}</h3>
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
        ))}
      </div>
    </div>
  );
}
