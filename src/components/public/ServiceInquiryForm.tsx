"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { trackWaClick } from "@/components/public/AnalyticsTracker";
import { sendInboxMessage } from "@/lib/sendInboxMessage";

// Form pendaftaran/tanya layanan di halaman Layanan. Sama seperti form
// Kontak: TIDAK membuka WhatsApp langsung, hanya masuk ke "Pesan Masuk"
// admin (lengkap dengan no. WA pengunjung supaya admin bisa balas).

export function ServiceInquiryForm({
  serviceOptions,
}: {
  serviceOptions: string[];
}) {
  const options = [...serviceOptions, "Lainnya"];

  const [nama, setNama] = useState("");
  const [phone, setPhone] = useState("");
  const [layanan, setLayanan] = useState(options[0] || "Lainnya");
  const [pesan, setPesan] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  function handleSubmit() {
    if (!nama.trim() || !phone.trim()) {
      setError("Nama dan No. WhatsApp wajib diisi.");
      return;
    }
    setError("");

    const detail = [
      `Halo TemanDeadline! Saya mau daftar/tanya layanan:`,
      "",
      `Nama: ${nama}`,
      `No. WhatsApp: ${phone}`,
      `Layanan: ${layanan}`,
      `Pesan: ${pesan || "-"}`,
    ].join("\n");

    trackWaClick("/layanan");
    sendInboxMessage({
      name: nama,
      phone,
      service: layanan,
      detail,
      source: "/layanan",
    });
    setSent(true);
  }

  function handleReset() {
    setNama("");
    setPhone("");
    setLayanan(options[0] || "Lainnya");
    setPesan("");
    setSent(false);
  }

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-navy-800 placeholder:text-slate-400 transition-colors focus:border-pink-500 focus:outline-none focus:ring-2 focus:ring-pink-500/20";
  const labelClass = "block text-sm font-semibold text-navy-800";

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-pink-100 bg-pink-50/60 px-6 py-12 text-center md:px-12">
        <CheckCircle2 className="h-12 w-12 text-emerald-500" />
        <h2 className="mt-4 font-display text-2xl font-semibold text-navy-800 md:text-3xl">
          Pesan Terkirim!
        </h2>
        <p className="mx-auto mt-2 max-w-md text-slate-500">
          Tim kami sudah menerima pendaftaranmu dan akan segera menghubungi
          via WhatsApp ke nomor yang kamu isi.
        </p>
        <button
          onClick={handleReset}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white px-6 py-2.5 text-sm font-semibold text-navy-800 transition-colors hover:border-pink-300 hover:bg-pink-50"
        >
          Kirim Pesan Lain
        </button>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-pink-100 bg-pink-50/60 p-6 md:p-10">
      <div className="text-center">
        <h2 className="font-display text-2xl font-semibold text-navy-800 md:text-3xl">
          Daftar atau Tanya Dulu
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-slate-500">
          Isi form di bawah, pesanmu langsung masuk ke tim kami. Gratis,
          tanpa komitmen.
        </p>
      </div>

      {error && (
        <div className="mx-auto mt-6 max-w-xl rounded-xl border border-pink-200 bg-white px-4 py-3 text-sm text-pink-700">
          {error}
        </div>
      )}

      <div className="mx-auto mt-6 max-w-xl space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="li-nama" className={labelClass}>
              Nama Lengkap *
            </label>
            <input
              id="li-nama"
              type="text"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              placeholder="Nama kamu"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="li-phone" className={labelClass}>
              No. WhatsApp *
            </label>
            <input
              id="li-phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="08xx-xxxx-xxxx"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="li-layanan" className={labelClass}>
            Layanan yang Diminati *
          </label>
          <select
            id="li-layanan"
            value={layanan}
            onChange={(e) => setLayanan(e.target.value)}
            className={inputClass}
          >
            {options.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="li-pesan" className={labelClass}>
            Pesan (opsional)
          </label>
          <textarea
            id="li-pesan"
            rows={4}
            value={pesan}
            onChange={(e) => setPesan(e.target.value)}
            placeholder="Ada yang ingin kamu tanyakan?"
            className={inputClass}
          />
        </div>

        <button
          onClick={handleSubmit}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-pink-600 px-7 py-3.5 font-semibold text-white shadow-pinkglow transition-all duration-200 hover:-translate-y-0.5 hover:bg-pink-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-500 focus-visible:ring-offset-2"
        >
          <Send className="h-4 w-4" />
          Kirim Pesan
        </button>
      </div>
    </div>
  );
}
