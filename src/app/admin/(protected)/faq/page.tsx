import { CrudManager } from "@/components/admin/CrudManager";

export default function AdminFaqPage() {
  return (
    <CrudManager
      title="FAQ"
      description="Pertanyaan yang sering ditanyakan calon klien. FAQ yang baik mengurangi keraguan sebelum order."
      endpoint="/api/faqs"
      itemLabel="FAQ"
      fields={[
        { key: "question", label: "Pertanyaan", type: "text", placeholder: "cth: Berapa lama waktu pengerjaan?" },
        { key: "answer", label: "Jawaban", type: "textarea", placeholder: "Jawab dengan jujur dan meyakinkan." },
        { key: "order", label: "Urutan", type: "number", half: true },
        { key: "active", label: "Tampilkan di website", type: "checkbox" },
      ]}
      listCols={[
        { key: "question", label: "Pertanyaan" },
        { key: "answer", label: "Jawaban" },
        { key: "order", label: "Urutan" },
      ]}
    />
  );
}
