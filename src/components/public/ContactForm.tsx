"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { buildWaLink } from "@/lib/utils";
import { trackWaClick } from "@/components/public/AnalyticsTracker";
import { sendInboxMessage } from "@/lib/sendInboxMessage";

// Form ini tidak butuh backend email: isiannya otomatis dirangkai
// menjadi pesan WhatsApp yang rapi, lalu membuka chat WA.
// Lebih cepat untuk klien, lebih mudah untuk pemilik bisnis.

export function ContactForm({ whatsapp }: { whatsapp: string }) {
  const [nama, setNama] = useState("");
  const [jenis, setJenis] = useState("Makalah / Esai");
  const [deadline, setDeadline] = useState("");
  const [detail, setDetail] = useState("");

  const jenisOptions = [
    "Makalah / Esai",
    "PPT / Presentasi",
    "Desain Grafis",
    "Editing Video",
    "CV / Portofolio",
    "Excel / Olah Data",
    "Proofread / Parafrase",
    "Website / Landing Page",
    "Lainnya",
  ];

  function handleSubmit() {
    const pesan = [
      "Halo TemanDeadline! Saya mau konsultasi:",
      "",
      `Nama: ${nama || "-"}`,
      `Jenis tugas: ${jenis}`,
      `Deadline: ${deadline || "belum pasti"}`,
      `Detail: ${detail || "-"}`,
    ].join("\n");

    trackWaClick("/kontak");
    sendInboxMessage({
      name: nama,
      service: jenis,
      detail: pesan,
      source: "/kontak",
    });
    window.open(buildWaLink(whatsapp, pesan), "_blank", "noopener,noreferrer");
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-navy-800 placeholder:text-slate-400 transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20";

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-soft md:p-8">
      <h2 className="font-display text-2xl font-semibold text-navy-800">
        Konsultasi Cepat
      </h2>
      <p className="mt-1.5 text-sm text-slate-500">
        Isi form ini dan pesanmu akan otomatis tersusun rapi di WhatsApp.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label
            htmlFor="nama"
            className="block text-sm font-semibold text-navy-800"
          >
            Nama Kamu
          </label>
          <input
            id="nama"
            type="text"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="cth: Rina"
            className={inputClass}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="jenis"
              className="block text-sm font-semibold text-navy-800"
            >
              Jenis Tugas
            </label>
            <select
              id="jenis"
              value={jenis}
              onChange={(e) => setJenis(e.target.value)}
              className={inputClass}
            >
              {jenisOptions.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="deadline"
              className="block text-sm font-semibold text-navy-800"
            >
              Deadline
            </label>
            <input
              id="deadline"
              type="text"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              placeholder="cth: Jumat, 20.00 WIB"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="detail"
            className="block text-sm font-semibold text-navy-800"
          >
            Ceritakan Singkat Tugasnya
          </label>
          <textarea
            id="detail"
            rows={4}
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            placeholder="cth: Makalah 10 halaman tentang pemasaran digital, format APA..."
            className={inputClass}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-pink-600 px-7 py-3.5 font-semibold text-white shadow-pinkglow transition-all duration-200 hover:-translate-y-0.5 hover:bg-pink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
        >
          <Send className="h-4 w-4" />
          Kirim via WhatsApp
        </button>
        <p className="text-center text-xs text-slate-400">
          Kamu akan diarahkan ke WhatsApp. Gratis, tanpa komitmen.
        </p>
      </div>
    </div>
  );
}
