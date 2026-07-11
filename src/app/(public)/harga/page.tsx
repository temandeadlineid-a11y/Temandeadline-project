import type { Metadata } from "next";
import { ShieldCheck, Clock, RefreshCcw } from "lucide-react";
import { getContent, getPricing } from "@/lib/data";
import { PageHero } from "@/components/public/PageHero";
import { PricingCard } from "@/components/public/PricingCard";
import { Reveal } from "@/components/public/Reveal";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Harga",
  description:
    "Harga jasa TemanDeadline transparan sejak awal, mulai Rp 25 ribu. Bayar DP 50%, sisanya setelah tugas selesai. Revisi gratis di setiap paket.",
};

export default async function HargaPage() {
  const [content, pricing] = await Promise.all([getContent(), getPricing()]);

  const guarantees = [
    {
      icon: Clock,
      title: "Garansi Tepat Waktu",
      desc: "Telat dari kesepakatan tanpa kabar? Kamu berhak dapat potongan harga hingga pengembalian DP.",
    },
    {
      icon: RefreshCcw,
      title: "Revisi Gratis",
      desc: "Setiap paket termasuk revisi gratis. Kami baru selesai kalau kamu sudah puas.",
    },
    {
      icon: ShieldCheck,
      title: "Pembayaran Aman",
      desc: "DP 50% di awal, pelunasan setelah hasil kamu terima dan periksa sendiri.",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Harga"
        title="Jelas di Awal,"
        accent="Tanpa Kejutan"
        description="Semua harga di bawah adalah harga mulai. Estimasi final kami kirim setelah melihat detail tugas dan deadline-mu — tetap sebelum kamu bayar apa pun."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {pricing.map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <PricingCard tier={p} whatsapp={content.whatsapp} />
            </Reveal>
          ))}
        </div>

        <div className="mx-auto mt-16 grid max-w-5xl gap-5 md:grid-cols-3">
          {guarantees.map((g, i) => (
            <Reveal key={g.title} delay={i * 70}>
              <div className="h-full rounded-2xl border border-slate-200 bg-white p-6 text-center">
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-pink-50">
                  <g.icon className="h-5 w-5 text-pink-600" />
                </div>
                <h3 className="mt-4 font-bold text-navy-800">{g.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {g.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-400">
          Pembayaran: Transfer Bank &bull; GoPay &bull; OVO &bull; DANA &bull;
          ShopeePay &bull; QRIS
        </p>
      </section>
    </>
  );
}
