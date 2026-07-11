import { CrudManager } from "@/components/admin/CrudManager";

export default function AdminLayananPage() {
  return (
    <CrudManager
      title="Layanan"
      description="Daftar layanan yang tampil di beranda dan halaman Layanan."
      endpoint="/api/services"
      itemLabel="layanan"
      fields={[
        { key: "emoji", label: "Emoji Ikon", type: "emoji", placeholder: "📝", hint: "Satu emoji sebagai ikon layanan.", half: true },
        { key: "order", label: "Urutan", type: "number", half: true },
        { key: "title", label: "Nama Layanan", type: "text", placeholder: "cth: Makalah & Esai" },
        { key: "description", label: "Deskripsi Singkat", type: "textarea", placeholder: "Jelaskan manfaatnya dalam 1-2 kalimat." },
        { key: "active", label: "Tampilkan di website", type: "checkbox" },
      ]}
      listCols={[
        { key: "emoji", label: "Ikon" },
        { key: "title", label: "Layanan" },
        { key: "description", label: "Deskripsi" },
        { key: "order", label: "Urutan" },
      ]}
    />
  );
}
