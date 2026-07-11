import type { Metadata } from "next";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://temandeadline.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TemanDeadline — Tugas Beres, Tepat Waktu, Tanpa Drama",
    template: "%s — TemanDeadline",
  },
  description:
    "Jasa pengerjaan tugas, makalah, PPT, desain, dan editing terpercaya. 500+ proyek selesai, 98% klien puas, respon di bawah 1 jam. Konsultasi gratis via WhatsApp.",
  openGraph: {
    title: "TemanDeadline — Tugas Beres, Tepat Waktu, Tanpa Drama",
    description:
      "Jasa pengerjaan tugas, makalah, PPT, desain, dan editing terpercaya. Konsultasi gratis via WhatsApp.",
    url: siteUrl,
    siteName: "TemanDeadline",
    locale: "id_ID",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
