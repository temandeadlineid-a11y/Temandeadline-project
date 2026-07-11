// ============================================================
// DATA DEFAULT TEMANDEADLINE
// Dipakai sebagai: (1) fallback saat database masih kosong,
// (2) sumber tombol "Isi Data Contoh" di dashboard admin.
// Semua bisa diubah lewat dashboard admin setelah login.
// ============================================================

export const DEFAULT_CONTENT: Record<string, string> = {
  heroBadge: "Dipercaya 500+ mahasiswa & profesional",
  heroTitle: "Deadline Mepet? Tenang,",
  heroAccent: "Ada Ahlinya.",
  heroSubtitle:
    "TemanDeadline membantu mahasiswa & profesional menyelesaikan tugas, desain, dan dokumen penting — rapi, orisinal, dan selalu tepat waktu.",
  whatsapp: "6281234567890",
  waMessage: "Halo TemanDeadline! Saya mau konsultasi tugas, boleh dibantu?",
  email: "halo@temandeadline.id",
  instagram: "temandeadline.id",
  jamOperasional: "Setiap hari, 08.00 - 23.00 WIB",
  statProjects: "500+",
  statSatisfaction: "98%",
  statRating: "4.9/5",
  statResponse: "< 1 Jam",
  ctaTitle: "Tugasmu Menunggu. Kami Siap Bantu.",
  ctaSubtitle:
    "Konsultasi dulu, gratis. Ceritakan kebutuhanmu dan tim kami akan kasih estimasi harga & waktu dalam hitungan menit.",
};

export const DEFAULT_SERVICES = [
  { emoji: "📝", title: "Makalah & Esai", description: "Penulisan makalah, esai, dan paper akademik yang terstruktur, sesuai kaidah, dan bebas plagiarisme.", order: 1 },
  { emoji: "📊", title: "PPT & Presentasi", description: "Slide presentasi yang rapi, modern, dan enak dilihat — lengkap dengan alur cerita yang meyakinkan.", order: 2 },
  { emoji: "🎨", title: "Desain Grafis", description: "Poster, feed Instagram, banner, hingga materi promosi dengan desain yang eye-catching dan profesional.", order: 3 },
  { emoji: "🎬", title: "Editing Video", description: "Edit video tugas, konten, atau dokumentasi dengan transisi halus, subtitle, dan color grading rapi.", order: 4 },
  { emoji: "📄", title: "CV & Portofolio", description: "CV ATS-friendly dan portofolio yang bikin HRD berhenti scroll. Siap untuk melamar kerja atau magang.", order: 5 },
  { emoji: "📈", title: "Excel & Olah Data", description: "Pengolahan data, rumus Excel, tabel, hingga visualisasi grafik untuk laporan dan penelitian.", order: 6 },
  { emoji: "✍️", title: "Proofread & Parafrase", description: "Perbaikan tata bahasa, penurunan skor plagiarisme, dan penyempurnaan tulisan sesuai gaya akademik.", order: 7 },
  { emoji: "💻", title: "Website & Landing Page", description: "Pembuatan website sederhana untuk tugas, profil bisnis, atau kebutuhan portofolio digital.", order: 8 },
  { emoji: "📱", title: "Konten Media Sosial", description: "Caption, copywriting, dan perencanaan konten untuk tugas kampus maupun bisnis kecilmu.", order: 9 },
  { emoji: "🌐", title: "Terjemahan", description: "Terjemahan Indonesia-Inggris (dan sebaliknya) yang natural, bukan hasil mesin mentah-mentah.", order: 10 },
];

export const DEFAULT_PRICING = [
  {
    name: "Ringan",
    price: "Rp 25rb",
    unit: "mulai dari",
    description: "Untuk tugas simpel yang butuh cepat beres.",
    features: JSON.stringify([
      "Esai pendek / PPT sederhana",
      "Pengerjaan 2-3 hari",
      "1x revisi gratis",
      "Konsultasi via WhatsApp",
    ]),
    popular: false,
    order: 1,
  },
  {
    name: "Andalan",
    price: "Rp 75rb",
    unit: "mulai dari",
    description: "Paling banyak dipilih untuk tugas utama & desain.",
    features: JSON.stringify([
      "Makalah lengkap / desain premium",
      "Pengerjaan 1-2 hari",
      "3x revisi gratis",
      "Prioritas antrian",
      "Cek plagiarisme dasar",
    ]),
    popular: true,
    order: 2,
  },
  {
    name: "Kilat",
    price: "Rp 150rb",
    unit: "mulai dari",
    description: "Untuk deadline besok pagi. Kami begadang, kamu tidur.",
    features: JSON.stringify([
      "Pengerjaan express < 24 jam",
      "Revisi minor tanpa batas",
      "Konsultasi langsung dengan pengerjanya",
      "Update progres berkala",
      "Garansi tepat waktu",
    ]),
    popular: false,
    order: 3,
  },
];

export const DEFAULT_TESTIMONIALS = [
  { name: "Nadia Putri", role: "Mahasiswi Ilmu Komunikasi", content: "Makalah 15 halaman selesai dalam 2 hari, rapi banget dan referensinya lengkap. Dapat A dan dosennya nggak curiga sama sekali karena aku diajak paham isinya juga.", rating: 5, order: 1 },
  { name: "Raka Pratama", role: "Staff Marketing, Bandung", content: "PPT laporan bulanan saya biasanya bikin semalaman. Sekarang tinggal kirim data mentah, besoknya jadi slide yang dipuji atasan. Worth it banget.", rating: 5, order: 2 },
  { name: "Sinta Amelia", role: "Content Creator", content: "Desain feed Instagram-ku jadi konsisten dan estetik sejak pakai TemanDeadline. Engagement naik dan aku bisa fokus bikin konten videonya aja.", rating: 5, order: 3 },
  { name: "Hendra Wijaya", role: "Owner Kedai Kopi", content: "Company profile dan menu digital kedai saya dikerjakan cepat dengan hasil melebihi ekspektasi. Komunikasinya juga enak, nggak ribet.", rating: 5, order: 4 },
  { name: "Dewi Lestari", role: "Mahasiswa Pascasarjana", content: "Parafrase jurnal yang tadinya skor plagiarisme 40% turun jadi 8%. Bahasanya tetap akademik dan makna aslinya nggak berubah. Recommended!", rating: 5, order: 5 },
  { name: "Fajar Ramadhan", role: "Fresh Graduate", content: "CV lama saya nggak pernah dilirik. Setelah dibuatkan versi ATS-friendly di sini, dua minggu kemudian dapat 3 panggilan interview. Terima kasih!", rating: 5, order: 6 },
];

export const DEFAULT_FAQS = [
  { question: "Berapa lama waktu pengerjaan?", answer: "Tergantung jenis dan tingkat kesulitan tugas. Tugas ringan biasanya 2-3 hari, tugas standar 1-2 hari dengan paket Andalan, dan untuk deadline mendesak tersedia paket Kilat dengan pengerjaan di bawah 24 jam.", order: 1 },
  { question: "Bagaimana cara memesan?", answer: "Cukup klik tombol WhatsApp di website ini, ceritakan kebutuhan dan deadline-mu. Tim kami akan memberi estimasi harga & waktu. Setelah setuju, bayar DP 50% dan pengerjaan langsung dimulai.", order: 2 },
  { question: "Metode pembayaran apa saja yang tersedia?", answer: "Kami menerima transfer bank (BCA, BRI, Mandiri), e-wallet (GoPay, OVO, DANA, ShopeePay), dan QRIS. Pembayaran dilakukan 50% di awal dan 50% setelah tugas selesai.", order: 3 },
  { question: "Apakah bisa revisi kalau hasilnya kurang sesuai?", answer: "Tentu. Setiap paket sudah termasuk revisi gratis (jumlahnya sesuai paket). Revisi di luar cakupan awal akan didiskusikan dulu biayanya secara transparan.", order: 4 },
  { question: "Apakah data dan identitas saya aman?", answer: "100% aman. Kami tidak pernah membagikan identitas klien, file tugas, maupun isi percakapan kepada pihak mana pun. Kerahasiaan adalah prioritas utama kami.", order: 5 },
  { question: "Apakah hasilnya bebas plagiarisme?", answer: "Ya. Semua tulisan dikerjakan dari nol dan dicek dengan tools plagiarisme sebelum dikirim. Untuk paket tertentu, kami sertakan bukti hasil cek plagiarismenya.", order: 6 },
  { question: "Bisa minta dikerjakan hari ini juga?", answer: "Bisa, selama slot pengerjaan masih tersedia. Pilih paket Kilat dan konfirmasi dulu via WhatsApp agar kami cek antrian. Kami tidak menerima order kilat jika tidak yakin bisa selesai tepat waktu.", order: 7 },
  { question: "Bagaimana kalau hasilnya telat dari kesepakatan?", answer: "Tepat waktu adalah janji utama kami. Jika kami telat dari deadline yang disepakati tanpa pemberitahuan, kamu berhak mendapat potongan harga hingga pengembalian DP.", order: 8 },
];
