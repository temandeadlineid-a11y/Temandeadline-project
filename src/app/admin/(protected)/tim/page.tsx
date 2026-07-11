import { CrudManager } from "@/components/admin/CrudManager";

export default function AdminTimPage() {
  return (
    <CrudManager
      title="Tim (Internal)"
      description="Catatan internal anggota tim & freelancer. Data ini TIDAK tampil di website publik — hanya untuk tracking kamu."
      endpoint="/api/team"
      itemLabel="anggota"
      fields={[
        { key: "name", label: "Nama", type: "text", placeholder: "cth: Budi", half: true },
        { key: "role", label: "Spesialisasi", type: "text", placeholder: "cth: Penulis Makalah", half: true },
        { key: "contact", label: "Kontak", type: "text", placeholder: "No. WA / email", half: true },
        { key: "active", label: "Masih aktif", type: "checkbox" },
        { key: "notes", label: "Catatan", type: "textarea", placeholder: "Tarif, jadwal, performa, dll." },
      ]}
      listCols={[
        { key: "name", label: "Nama" },
        { key: "role", label: "Spesialisasi" },
        { key: "contact", label: "Kontak" },
        { key: "notes", label: "Catatan" },
      ]}
    />
  );
}
