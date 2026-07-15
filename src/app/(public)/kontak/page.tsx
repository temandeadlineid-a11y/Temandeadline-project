import type { Metadata } from "next";
import { Instagram, Mail, Clock, MessageCircle } from "lucide-react";
import { getContent } from "@/lib/data";
import { PageHero } from "@/components/public/PageHero";
import { ContactForm } from "@/components/public/ContactForm";
import { ContactChannelLink } from "@/components/public/ContactChannelLink";
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
      waMessage: content.waMessage,
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
        eyebrow={content.kontakHeroEyebrow}
        title={content.kontakHeroTitle}
        accent={content.kontakHeroAccent}
        description={content.kontakHeroDesc}
      />

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 md:py-20 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Info kontak */}
          <Reveal>
            <div className="space-y-4">
              {channels.map((c) => (
                <ContactChannelLink
                  key={c.title}
                  icon={<c.icon className="h-5 w-5 text-pink-600" />}
                  title={c.title}
                  value={c.value}
                  note={c.note}
                  href={c.href}
                  waMessage={c.waMessage}
                />
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
