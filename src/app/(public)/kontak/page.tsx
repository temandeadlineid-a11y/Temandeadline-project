import type { Metadata } from "next";
import { Instagram, Mail, Clock, MessageCircle } from "lucide-react";
import { getContent } from "@/lib/data";
import { PageHero } from "@/components/public/PageHero";
import { ContactForm } from "@/components/public/ContactForm";
import { Reveal } from "@/components/public/Reveal";
import { buildWaLink } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Kontak",
  description:
    "Hubungi TemanDeadline via WhatsApp, email, atau Instagram. Respon rata-rata di bawah 1 jam, setiap hari pukul 08.00-23.00 WIB.",
};

export default async function KontakPage() {
  const content = await getContent();

  const channels = [
    {
      icon: MessageCircle,
      title: "WhatsApp",
      value: `+${content.whatsapp}`,
      note: "Cara tercepat, respon < 1 jam",
      href: buildWaLink(content.whatsapp, content.waMessage),
    },
    {
      icon: Mail,
      title: "Email",
      value: content.email,
      note: "Untuk kebutuhan formal / lampiran besar",
      href: `mailto:${content.email}`,
    },
    {
      icon: Instagram,
      title: "Instagram",
      value: `@${content.instagram}`,
      note: "Lihat portofolio & update terbaru",
      href: `https://instagram.com/${content.instagram}`,
    },
  ];

  return (
    <>
      <PageHero
        eyebrow="Kontak"
        title="Ngobrol Dulu,"
        accent="Santai Saja"
        description="Konsultasi tidak dipungut biaya dan tidak mengikat. Ceritakan kebutuhanmu, kami bantu carikan solusinya."
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Info kontak */}
          <Reveal>
            <div className="space-y-4">
              {channels.map((c) => (
                <a
                  key={c.title}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-pink-200 hover:shadow-soft"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pink-50">
                    <c.icon className="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <div className="font-bold text-navy-800">{c.title}</div>
                    <div className="text-sm text-slate-600">{c.value}</div>
                    <div className="mt-0.5 text-xs text-slate-400">
                      {c.note}
                    </div>
                  </div>
                </a>
              ))}

              <div className="flex items-start gap-4 rounded-2xl border border-pink-100 bg-pink-50/60 p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white">
                  <Clock className="h-5 w-5 text-pink-600" />
                </div>
                <div>
                  <div className="font-bold text-navy-800">
                    Jam Operasional
                  </div>
                  <div className="text-sm text-slate-600">
                    {content.jamOperasional}
                  </div>
                  <div className="mt-0.5 text-xs text-slate-400">
                    Pesan di luar jam itu dibalas keesokan paginya
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Form konsultasi */}
          <Reveal delay={100}>
            <ContactForm whatsapp={content.whatsapp} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
