import { CrudManager } from "@/components/admin/CrudManager";

export default function AdminTestimoniPage() {
  return (
    <CrudManager
      title="Testimoni"
      description="Cerita klien yang tampil di beranda dan halaman Testimoni. Semakin spesifik semakin meyakinkan."
      endpoint="/api/testimonials"
      itemLabel="testimoni"
      fields={[
        { key: "name", label: "Nama Klien", type: "text", placeholder: "cth: Nadia Putri", half: true },
        { key: "role", label: "Peran / Profesi", type: "text", placeholder: "cth: Mahasiswi Ilmu Komunikasi", half: true },
        { key: "content", label: "Isi Testimoni", type: "textarea", placeholder: "Tulis pengalaman klien apa adanya." },
        { key: "rating", label: "Rating (1-5)", type: "number", half: true },
        { key: "order", label: "Urutan", type: "number", half: true },
        { key: "active", label: "Tampilkan di website", type: "checkbox" },
      ]}
      listCols={[
        { key: "name", label: "Nama" },
        { key: "role", label: "Peran" },
        { key: "content", label: "Testimoni" },
        { key: "rating", label: "Rating" },
      ]}
    />
  );
}
