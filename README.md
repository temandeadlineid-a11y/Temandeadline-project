# TemanDeadline v2 🎀

Website jasa pengerjaan tugas dengan **dashboard admin terintegrasi** — remake lengkap dengan design system baru "Rose & Navy Elegant".

Dibuat dengan Next.js 14 (App Router) + Tailwind CSS + Prisma + PostgreSQL (Neon).

---

## ✨ Yang Baru di Versi Ini

**Halaman Publik (6 halaman, pindah via navbar dengan transisi halus):**
- **Beranda** — hero elegan, statistik, preview layanan, keunggulan, cara kerja, testimoni, harga, CTA
- **Layanan** — 10 layanan lengkap
- **Harga** — 3 paket transparan + garansi (poin improvement: dulu harga tidak ada)
- **Testimoni** — dari beragam profesi, bukan hanya mahasiswa (poin improvement)
- **FAQ** — 8 pertanyaan umum dengan accordion (poin improvement: dulu tidak ada)
- **Kontak** — form pintar yang otomatis menyusun pesan WhatsApp

**Dashboard Admin (login di `/admin`):**
- Kelola semua konten: hero, statistik, layanan, harga, testimoni, FAQ, kontak
- **Analytics lengkap**: kunjungan harian, klik WhatsApp, conversion rate, sumber trafik (Instagram/Google/dll), perangkat (mobile/desktop), halaman terpopuler
- **Tim (internal)** — catatan anggota tim & freelancer, tidak tampil di publik
- Tombol "Isi Data Contoh" — website langsung terisi konten siap edit
- Toggle tampil/sembunyi untuk setiap item tanpa menghapusnya

**Teknis:**
- Login aman (password di-hash bcrypt, token JWT httpOnly cookie)
- Halaman setup admin pertama kali (sekali pakai, otomatis terkunci)
- SEO lengkap: meta tags, Open Graph, sitemap.xml, robots.txt
- Website tetap tampil normal walau database kosong (ada data fallback)

---

## 🚀 Cara Deploy (Tanpa Install Apa Pun di Laptop)

### Langkah 1 — Buat Database di Neon

1. Buka [neon.tech](https://neon.tech) → login/daftar (gratis)
2. Klik **New Project**, beri nama misalnya `temandeadline`
3. Setelah jadi, salin **Connection String** (yang formatnya `postgresql://....`)
4. Simpan dulu, nanti dipakai di Vercel

### Langkah 2 — Upload ke GitHub

1. Buka [github.com](https://github.com) → **New repository** → beri nama `temandeadline-v2` → Create
2. Klik **uploading an existing file**
3. Drag & drop **SEMUA isi folder project ini** (bukan folder zip-nya, tapi isinya: folder `src`, `prisma`, `public`, dan semua file konfigurasi)
4. Klik **Commit changes**

> Catatan: file `.env.example` cuma contoh — jangan diisi data asli di GitHub.

### Langkah 3 — Deploy di Vercel

1. Buka [vercel.com](https://vercel.com) → **Add New** → **Project**
2. Import repository `temandeadline-v2`
3. Sebelum klik Deploy, buka bagian **Environment Variables** dan isi:

| Name | Value |
|---|---|
| `DATABASE_URL` | Connection string dari Neon (Langkah 1) |
| `JWT_SECRET` | Teks acak bebas, minimal 32 karakter (contoh: `td2026rahasiaBangetJanganDisebar99x`) |
| `NEXT_PUBLIC_SITE_URL` | `https://namaproject.vercel.app` (opsional, bisa diisi setelah tahu URL-nya) |

4. Klik **Deploy** dan tunggu ± 2 menit
5. Saat build, tabel database otomatis dibuat (lewat `prisma db push`)

### Langkah 4 — Setup Admin Pertama Kali

1. Buka `https://website-kamu.vercel.app/admin`
2. Kamu akan otomatis diarahkan ke halaman **Setup Admin**
3. Isi nama, username, dan password (minimal 8 karakter) → **Buat Akun & Masuk**
4. Halaman setup langsung terkunci setelah admin pertama dibuat ✅

### Langkah 5 — Isi Konten

1. Di dashboard, klik tombol **"Isi Data Contoh"** → semua layanan, harga, testimoni, dan FAQ langsung terisi
2. Masuk ke **Konten Situs** → ganti **Nomor WhatsApp** dengan nomor asli (format: `628xxxxxxxxxx`, tanpa `+` dan tanpa spasi) — ini penting karena semua tombol konsultasi memakai nomor ini
3. Edit konten lain sesuai kebutuhan. Semua perubahan langsung tampil di website.

Selesai! 🎉

---

## 🔐 Halaman Penting

| URL | Fungsi |
|---|---|
| `/` | Website publik |
| `/admin` | Dashboard admin (harus login) |
| `/admin/login` | Halaman login |
| `/admin/setup` | Setup admin pertama (hanya aktif saat belum ada admin) |

---

## 🎨 Design System

| Token | Nilai |
|---|---|
| Pink (primary) | `#D42E78` — CTA, aksen, highlight |
| Navy | `#1B2A4A` — heading, footer, section gelap |
| Background | Putih + tint pink lembut |
| Font Heading | Playfair Display (serif elegan) |
| Font Body | Plus Jakarta Sans |

Semua token warna ada di `tailwind.config.ts` — ganti di satu tempat, seluruh website ikut berubah.

---

## 📊 Cara Kerja Analytics

Analytics bawaan tanpa Google Analytics — data milik kamu sendiri:
- Setiap kunjungan halaman terekam otomatis (bot/crawler diabaikan)
- Setiap klik tombol WhatsApp terekam sebagai konversi
- Dashboard menampilkan data 30 hari terakhir: tren harian, halaman terpopuler, sumber trafik, dan perbandingan mobile vs desktop
- Conversion rate = klik WhatsApp ÷ total kunjungan

---

## 🛠 Struktur Project Singkat

```
src/
├── app/
│   ├── (public)/        → 6 halaman publik + transisi antar halaman
│   ├── admin/           → login, setup, dan dashboard (protected)
│   └── api/             → auth, CRUD, tracking, analytics
├── components/
│   ├── public/          → navbar, footer, kartu, form, dll
│   └── admin/           → sidebar, CrudManager, editor, analytics
├── lib/                 → prisma, auth JWT, data default
└── middleware.ts        → penjaga rute /admin
```

---

## ❓ Troubleshooting

**Build gagal di Vercel?**
Cek `DATABASE_URL` — pastikan connection string Neon lengkap dan benar.

**Lupa password admin?**
Buka Neon → SQL Editor → jalankan `DELETE FROM "Admin";` → buka `/admin/setup` lagi untuk buat akun baru.

**Tombol WhatsApp mengarah ke nomor salah?**
Ganti di Dashboard → Konten Situs → Nomor WhatsApp.

**Mau ganti warna brand?**
Edit `tailwind.config.ts` bagian `colors.pink` dan `colors.navy`.

---

Website by **Pagiverse Studio** 🌅
