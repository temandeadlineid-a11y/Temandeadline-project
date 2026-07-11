import { CrudManager } from "@/components/admin/CrudManager";

export default function AdminHargaPage() {
  return (
    <CrudManager
      title="Paket Harga"
      description="Paket yang tampil di beranda dan halaman Harga. Tandai satu paket sebagai Paling Populer."
      endpoint="/api/pricing"
      itemLabel="paket"
      fields={[
        { key: "name", label: "Nama Paket", type: "text", placeholder: "cth: Andalan", half: true },
        { key: "order", label: "Urutan", type: "number", half: true },
        { key: "price", label: "Harga", type: "text", placeholder: "cth: Rp 75rb", half: true },
        { key: "unit", label: "Keterangan Harga", type: "text", placeholder: "cth: mulai dari", half: true },
        { key: "description", label: "Deskripsi Singkat", type: "textarea", placeholder: "Untuk siapa paket ini cocok?" },
        { key: "features", label: "Fitur / Benefit", type: "lines", placeholder: "Tulis satu benefit per baris", hint: "Satu baris = satu poin centang di kartu harga." },
        { key: "popular", label: "Tandai sebagai Paling Populer", type: "checkbox" },
        { key: "active", label: "Tampilkan di website", type: "checkbox" },
      ]}
      listCols={[
        { key: "name", label: "Paket" },
        { key: "price", label: "Harga" },
        { key: "features", label: "Benefit" },
        { key: "popular", label: "Populer" },
      ]}
    />
  );
}
